import { readFileSync, promises } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import { mdxComponents } from '../components/mdx-components'


function HomePage({ posts, full }) {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Kevin Simper - Developer Blog</title>
        <link rel="canonical" href={`https://www.kevinsimper.dk/`} />
      </Head>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src="https://i.imgur.com/TXDOXbD.png"
              alt="Kevin Simper"
              className="w-full h-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Kevin Simper</h1>
              <p className="text-lg text-gray-100 drop-shadow-md">
                I work at my own startup that makes AI Agents for Bid Managers. 
                I write about tech, make videos on youtube about programming and organize meetups.
              </p>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-16">
          {posts.map((post, id) => {
            const source = full[id]
            const isLastPost = id === posts.length - 1
            return (
              <article key={post.slug} className={`${!isLastPost ? 'border-b border-gray-100 pb-12' : 'pb-12'}`}>
                <div className="flex items-center justify-between mb-6">
                  <time className="text-sm font-medium text-gray-500">
                    {new Date(post.date).toISOString().split('T')[0]}
                  </time>
                  {post.tags && (
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <a
                          key={tag}
                          href={`/categories/${tag}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                        >
                          #{tag}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                  <a href={'/posts/' + post.slug} className="text-purple-600 hover:text-purple-700 transition-colors">
                    {post.title}
                  </a>
                </h2>

                {source && (
                  <div className="prose prose-lg max-w-none">
                    <MDXRemote {...source} components={mdxComponents} />
                    <a
                      href={'/posts/' + post.slug}
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      Read full post
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const path = process.cwd() + '/app/blog/posts/'
  const data: {
    slug: string
    title: string
    date: string
    tags: string[]
  }[] = JSON.parse(readFileSync(path + '_data.json', 'utf8'))

  const full = await Promise.all(
    data.slice(0, 5).map(async (post) => {
      const file = await promises.readFile(path + post.slug + '.md', 'utf-8')
      let lines = file.trim().split('\n')
      if (file.charAt(0) === '#') {
        lines = lines.slice(2)
      }
      const maxParagraphs = Math.min(Math.floor(lines.length / 3), 10)
      lines = lines.slice(0, maxParagraphs)
      return lines.join('\n')
    })
  )
  const serialized = await Promise.all(
    full.map((post) => {
      return serialize(post)
    })
  )

  return {
    props: {
      posts: data,
      full: serialized,
    },
  }
}

export default HomePage
