import { readFileSync } from 'fs'

function HomePage({ posts }) {
  return (
    <div>
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
        Hi, my name is Kevin Simper. I work at GreenMobility as Tech Lead and
        like to write about tech. I also like to make videos on youtube about
        programming and organize meetups.
      </div>
      <h2 className="text-xl my-2">My latest posts:</h2>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.slug} className="py-2">
              <a href={'/posts/' + post.slug}>
                <h3 className="text-xl text-purple-600">{post.title}</h3>
              </a>
              <div>{new Date(post.date).toISOString()}</div>
              <ul className="flex">
                {post.tags?.map((tag, key) => (
                  <li key={tag} className="pr-1">
                    <a className="text-purple-600" href={`/categories/${tag}`}>
                      #{tag}
                    </a>
                  </li>
                ))}
              </ul>
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

  return {
    props: {
      posts: data,
    },
  }
}

export default HomePage
