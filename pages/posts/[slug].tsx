import { useRouter } from 'next/router'
import { readFileSync } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import Prism from 'prismjs'
import { useEffect } from 'react'
import Link from 'next/link'
import { mdxComponentsBlog } from '../../components/mdx-components'

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-jsx')


interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 ${className}`}
    >
      {children}
    </span>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}

export const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

export const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const PostNavigation = ({ tags, prev, next }) => {
  return (
    <div className="space-y-6 mt-8">
      {tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, id) => (
              <Link key={id} href={`/categories/${tag}`}>
                <Badge className="text-sm hover:bg-secondary/80">#{tag}</Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {(prev || next) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {prev && (
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <ChevronLeft className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Previous</p>
                  <Link
                    href={`/posts/${prev.slug}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {prev.title}
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {next && (
            <Card className="p-4">
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <p className="text-sm text-muted-foreground">Next</p>
                  <Link
                    href={`/posts/${next.slug}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {next.title}
                  </Link>
                </div>
                <ChevronRight className="h-5 w-5 flex-shrink-0" />
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

function PostPage({ source, title, tags, published, next, prev }) {
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link
          rel="canonical"
          href={`https://www.kevinsimper.dk/posts/${slug}`}
        />
      </Head>
      <article className="mb-12">
        <div className="text-right">{new Date(published).toISOString()}</div>
        <MDXRemote {...source} components={mdxComponentsBlog} />
      </article>
      <PostNavigation tags={tags} prev={prev} next={next} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const path = process.cwd() + '/app/blog/posts/'
  const data: {
    slug: string
    title: string
    date: string
    tags?: string[]
  }[] = JSON.parse(readFileSync(path + '_data.json', 'utf8'))

  const slug = context.params.slug
  const post = data.find((p) => p.slug === slug)

  if (post === undefined) {
    return {
      notFound: true,
    }
  }

  const index = data.indexOf(post)
  const next = index + 1 !== data.length ? data[index + 1] : null
  const prev = index != 0 ? data[index - 1] : null

  const markdown = readFileSync(path + '/' + post.slug + '.md', 'utf8')

  const mdxSource = await serialize(markdown)

  return {
    props: {
      title: post.title,
      source: mdxSource,
      published: post.date,
      tags: post.tags || [],
      next,
      prev,
    },
  }
}

export default PostPage
