import { useRouter } from 'next/router'
import { readFileSync } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'

const components = {
  h1: (props) => <h1 className="text-3xl py-2" {...props} />,
  h2: (props) => <h2 className="text-2xl py-2" {...props} />,
  h3: (props) => <h3 className="text-xl py-2" {...props} />,
  p: (props) => <p className="pb-5" {...props} />,
  a: (props) => <a className="text-purple-600" {...props} />,
  pre: (props) => <pre className="overflow-auto pb-4" {...props} />,
  ul: (props) => <ol className="pl-10 pb-4 list-disc" {...props} />,
  ol: (props) => <ol className="pl-10 pb-4 list-decimal" {...props} />,
  Test: <div />,
}

function PostPage({ source, title, tags, published, next, prev }) {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <Head>
        <title>{title}</title>
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
