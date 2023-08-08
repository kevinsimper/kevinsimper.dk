import { readFileSync, promises } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'

const components = {
  h1: (props) => <h1 className="text-3xl py-2" {...props} />,
  h2: (props) => <h2 className="text-2xl py-2" {...props} />,
  h3: (props) => <h3 className="text-xl py-2" {...props} />,
  p: (props) => <p className="pb-5" {...props} />,
  a: (props) => <a className="text-purple-600 hover:underline" {...props} />,
  pre: (props) => <pre className="overflow-auto pb-4" {...props} />,
  ul: (props) => <ol className="pl-10 pb-4 list-disc" {...props} />,
  ol: (props) => <ol className="pl-10 pb-4 list-decimal" {...props} />,
  Test: <div />,
}

function HomePage({ posts, full }) {
  return (
    <div>
      <Head>
        <title>Kevin Simper - Developer Blog</title>
        <link rel="canonical" href={`https://www.kevinsimper.dk/`} />
      </Head>
      <div
        className="rounded"
        style={{
          backgroundImage: 'url(https://i.imgur.com/TXDOXbD.png)',
          height: 400,
          backgroundSize: 'cover',
          backgroundPositionX: 'calc(50% - -50px)',
        }}
      ></div>
      <div
        className="my-4 md:my-6 md:p-8 p-6 rounded text-2xl md:leading-tight bg-indigo-500 text-white"
        style={{
          background:
            'linear-gradient(297deg, rgba(125,52,173,1) 11%, rgba(99,102,241,1) 100%)',
        }}
      >
        Hi, my name is Kevin Simper. I work at GreenMobility as CTO and like to
        write about tech. I also like to make videos on youtube about
        programming and organize meetups.
      </div>
      <h2 className="text-xl my-2">My latest posts:</h2>
      <div className="space-y-8">
        {posts.map((post, id) => {
          const source = full[id]
          return (
            <div key={post.slug} className="py-2 space-y-2">
              <a href={'/posts/' + post.slug}>
                <h2 className="text-2xl text-purple-600 hover:underline">
                  {post.title}
                </h2>
              </a>

              <div>
                {source && <MDXRemote {...source} components={components} />}
              </div>

              <div className="flex justify-between border-t-2 border-indigo-500/50">
                <div>{new Date(post.date).toISOString().split('T')[0]}</div>
                <ul className="flex">
                  {post.tags?.map((tag, key) => (
                    <li key={tag} className="pr-1">
                      <a
                        className="text-purple-600"
                        href={`/categories/${tag}`}
                      >
                        #{tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
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
      if (file.charAt(0) === '#') {
        return file.split('\n').slice(1).join('\n')
      }
      return file
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
