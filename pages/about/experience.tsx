import { useState } from 'react'
import experiences from '../../data/experiences'

function HomePage() {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">Work Experience</h1>
      <div className="space-y-6">
        {(showAll ? experiences : experiences.slice(0, 5)).map((experience) => {
          return (
            <div className="flex">
              <div className="flex flex-col">
                <div className="bg-purple-400 mt-3 mr-2 p-1 h-1"></div>
                <div className="flex-1 border-l-2 border-purple-400 mt-4 ml-1"></div>
              </div>
              <div>
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
                  {(experience.advancements || [experience]).map(
                    (advancements) => {
                      return (
                        <div className="flex gap-2">
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
                    }
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-center">
        {!showAll && (
          <button
            className="border border-purple-500 rounded p-2 px-4"
            onClick={() => {
              setShowAll(!showAll)
            }}
          >
            Show all experiences
          </button>
        )}
      </div>
    </div>
  )
}

export default HomePage
