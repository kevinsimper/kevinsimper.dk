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
            <div>{experience.location}</div>
            <div className="space-y-2 my-2">
              {(experience.advancements || [experience]).map((advancements) => {
                return (
                  <div className="flex">
                    <div className="w-1/4">{advancements.title}</div>
                    <div className="flex-1">
                      <div>
                        Started {advancements.start}
                        {advancements.end
                          ? ' - ' + advancements.end
                          : ' - Currently'}
                      </div>
                      <div>{advancements.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HomePage
