import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
  smartLists: true,
  smartypants: true
});

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRssItem(post: BlogPost, markdownContent: string, htmlContent: string): string {
  const postUrl = `https://kevinsimper.dk/posts/${post.slug}`;
  const pubDate = new Date(post.date).toUTCString();
  
  // Create a summary for the description field (first paragraph or 200 chars)
  const summary = markdownContent.split('\n\n')[0].substring(0, 200) + (markdownContent.length > 200 ? '...' : '');
  
  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(summary)}</description>
      <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const blogDataPath = path.join(process.cwd(), 'app', 'blog', 'posts', '_data.json');
    const blogData: BlogPost[] = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
    
    // Sort by date descending and take the latest 20 posts
    const latestPosts = blogData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20);
    
    // Read content for each post
    const rssItems = await Promise.all(
      latestPosts.map(async (post) => {
        try {
          const postPath = path.join(process.cwd(), 'app', 'blog', 'posts', `${post.slug}.md`);
          let content = fs.readFileSync(postPath, 'utf-8');
          
          // Remove frontmatter if present
          content = content.replace(/^---[\s\S]*?---\n*/m, '');
          
          // Remove the first heading if it appears to be the title
          const lines = content.split('\n');
          if (lines.length > 0 && lines[0].startsWith('# ')) {
            // Check if the first line (without # ) roughly matches the post title
            const firstLineTitle = lines[0].substring(2).trim();
            if (firstLineTitle.toLowerCase() === post.title.toLowerCase()) {
              lines.shift(); // Remove the first line
              // Remove any empty lines at the start
              while (lines.length > 0 && lines[0].trim() === '') {
                lines.shift();
              }
              content = lines.join('\n');
            }
          }
          
          // Convert markdown to HTML
          const htmlContent = marked(content);
          
          return generateRssItem(post, content.trim(), htmlContent);
        } catch (error) {
          console.error(`Error reading post ${post.slug}:`, error);
          return generateRssItem(post, 'Content not available', '<p>Content not available</p>');
        }
      })
    );
    
    const currentDate = new Date().toUTCString();
    
    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Kevin Simper's Blog</title>
    <link>https://kevinsimper.dk</link>
    <description>Blog posts about programming, AI, cloud computing, and technology</description>
    <language>en</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="https://kevinsimper.dk/api/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems.join('\n')}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(rssContent);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}