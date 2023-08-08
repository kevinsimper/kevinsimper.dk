import { readFileSync } from 'fs'
import Head from 'next/head'

function HomePage({ presentations }) {
  return (
    <div>
      <h1 className="text-2xl">Presentations</h1>
      <Head>
        <title>Presentations from Kevin Simper</title>
        <link
          rel="canonical"
          href={`https://www.kevinsimper.dk/about/presentations`}
        />
      </Head>
      <p>
        I have given <strong>{presentations.length}</strong> presentations and
        workshops in total.
      </p>
      <ul>
        <li>
          {presentations.filter((p) => p.type !== 'workshop').length}{' '}
          presentations
        </li>
        <li>
          {presentations.filter((p) => p.type === 'workshop').length} workshops
        </li>
      </ul>
      {presentations.map((presentation) => {
        return (
          <div id={presentation.name} className="py-2">
            <h2 className="text-xl">
              {presentation.name} <a href={'#' + presentation.name}>#</a>
            </h2>
            <div>{presentation.location}</div>
            <div>{presentation.description}</div>
            <ul>
              {presentation.links &&
                presentation.links.map((link, key) => (
                  <li key={key}>
                    <a className="text-purple-600" href={link.link}>
                      {link.text}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export async function getStaticProps(context) {
  const path = process.cwd() + '/data/'
  const data = JSON.parse(readFileSync(path + 'presentations.json', 'utf8'))

  return {
    props: {
      presentations: data.presentations,
    }, // will be passed to the page component as props
  }
}

export default HomePage
