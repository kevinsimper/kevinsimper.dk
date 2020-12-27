import { useRouter } from 'next/router'
import { readFileSync } from 'fs'
import mdx from '@mdx-js/mdx'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'

const components = {
  h1: (props) => <h1 className="text-3xl py-2" {...props} />,
  h2: (props) => <h2 className="text-2xl py-2" {...props} />,
  h3: (props) => <h3 className="text-xl py-2" {...props} />,
  p: (props) => <p className="py-2" {...props} />,
  a: (props) => <a className="text-purple-600" {...props} />,
  Test: <div />,
}

function PostPage({ source, title }) {
  const router = useRouter()
  const { slug } = router.query

  const content = hydrate(source, { components })
  return <div>{content}</div>
}

export async function getServerSideProps(context) {
  const path = process.cwd() + '/app/blog/posts/'
  const data: {
    slug: string
    title: string
    date: string
    tags: string[]
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
    },
  }
}

export default PostPage
