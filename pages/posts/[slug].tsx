import { useRouter } from 'next/router'
import { readFileSync } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import Prism from 'prismjs'
import { useEffect } from 'react'
import Link from 'next/link'

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-jsx')


export const components = {
  h1: (props) => (
    <h1
      className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mt-8 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4"
      {...props}
    />
  ),
  p: (props) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
  a: ({ href, ...props }) => (
    <Link
      href={href}
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      {...props}
    />
  ),
  pre: (props) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4" {...props} />
  ),
  ul: (props) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
  ol: (props) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
  hr: (props) => <hr className="my-4 md:my-8" {...props} />,
  Test: <div />,
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
      <article>
        <div className="text-right">{new Date(published).toISOString()}</div>
        <MDXRemote {...source} components={components} />
      </article>
      <table>
        <tbody>
          {tags.length > 0 && (
            <tr>
              <td align="right">
                <strong>Tags:</strong>
              </td>
              <td>
                {tags.map((t, id) => (
                  <span key={id}>
                    <a className="text-purple-600" href={`/categories/${t}`}>
                      #{t}
                    </a>{' '}
                  </span>
                ))}
              </td>
            </tr>
          )}
          {prev && (
            <tr>
              <td align="right">
                <strong>Previous:</strong>
              </td>
              <td>
                <a className="text-purple-600" href={'/posts/' + prev.slug}>
                  {prev.title}
                </a>
              </td>
            </tr>
          )}
          {next && (
            <tr>
              <td align="right">
                <strong>Next:</strong>
              </td>
              <td>
                <a className="text-purple-600" href={'/posts/' + next.slug}>
                  {next.title}
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
