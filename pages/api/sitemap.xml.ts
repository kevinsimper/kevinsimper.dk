import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://www.kevinsimper.dk';
  
  // Read blog posts data
  const dataPath = path.join(process.cwd(), 'app', 'blog', 'posts', '_data.json');
  const blogData = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as BlogPost[];
  
  // Start building the sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Homepage
  sitemap += `
  <url>
    <loc>${baseUrl}/</loc>
  </url>`;

  // Static pages
  const staticPages = ['/about', '/projects', '/social', '/recommends'];

  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
  </url>`;
  });

  // Blog posts - sorted by date (newest first) for better crawl priority
  const sortedPosts = blogData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  sortedPosts.forEach(post => {
    sitemap += `
  <url>
    <loc>${baseUrl}/posts/${escapeXml(post.slug)}</loc>
    <lastmod>${formatDate(post.date)}</lastmod>
  </url>`;
  });

  // Close the sitemap
  sitemap += `
</urlset>`;

  // Set appropriate headers
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  
  res.status(200).send(sitemap);
}