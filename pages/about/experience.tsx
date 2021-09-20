import experiences from '../../data/experiences'

function HomePage() {
  return (
    <div>
      <h1 className="text-2xl">Work Experience</h1>
      {experiences.map((experience) => {
        return (
          <div className="py-2">
            <h2 className="text-xl">
              {experience.link ? (
                <a
                  href={experience.link}
                  className="text-blue-400 underline"
                  rel="nofollow"
                >
                  {experience.company}
                </a>
              ) : (
                experience.company
              )}
            </h2>
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

export default HomePage
