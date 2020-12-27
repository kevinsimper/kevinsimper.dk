import { readFileSync } from 'fs'

function HomePage({ experiences }) {
  return (
    <div>
      {experiences.map((experience) => {
        return (
          <div className="py-2">
            <h2 className="text-xl">{experience.company}</h2>
            <div>{experience.title}</div>
            <div>{experience.location}</div>
            <div>
              Started {experience.start}
              {experience.end ? ' - ' + experience.end : ''}
            </div>
            <div>{experience.description}</div>
          </div>
        )
      })}
    </div>
  )
}

export async function getStaticProps(context) {
  const path = process.cwd() + '/data/'
  const data = JSON.parse(readFileSync(path + 'experiences.json', 'utf8'))

  return {
    props: {
      experiences: data.experiences,
    }, // will be passed to the page component as props
  }
}

export default HomePage
