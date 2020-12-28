import { useRouter } from 'next/router'
import { readFileSync } from 'fs'
import mdx from '@mdx-js/mdx'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import Head from 'next/head'

const components = {
  h1: (props) => <h1 className="text-3xl py-2" {...props} />,
  h2: (props) => <h2 className="text-2xl py-2" {...props} />,
  h3: (props) => <h3 className="text-xl py-2" {...props} />,
  p: (props) => <p className="py-2" {...props} />,
  a: (props) => <a className="text-purple-600" {...props} />,
  pre: (props) => <pre className="overflow-auto" {...props} />,
  ul: (props) => <ol className="pl-10 list-disc" {...props} />,
  ol: (props) => <ol className="pl-10 list-decimal" {...props} />,
  Test: <div />,
}

function PostPage({ source, title, tags }) {
  const router = useRouter()
  const { slug } = router.query

  const content = hydrate(source, { components })
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <article>{content}</article>
      <div>
        Tags:{' '}
        {tags &&
          tags.map((t, id) => (
            <span key={id}>
              <a className="text-purple-600" href={`/categories/${t}`}>
                #{t}
              </a>{' '}
            </span>
          ))}
      </div>
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

  const markdown = readFileSync(path + '/' + post.slug + '.md', 'utf8')

  const mdxSource = await renderToString(markdown, { components })

  return {
    props: {
      title: post.title,
      source: mdxSource,
      tags: post.tags || [],
    },
  }
}

export default PostPage
