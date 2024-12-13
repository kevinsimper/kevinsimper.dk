import { useState } from 'react'
import experiences from '../../data/experiences'
import Head from 'next/head'
import exp from 'constants'
import { start } from 'repl'

interface Position {
  title: string
  startDate: string
  endDate: string
  description: string
  technologies?: string[]
}

interface ExperienceCardProps {
  company: string
  companyUrl: string
  location: string
  positions: Position[]
}

export function ExperienceCard({
  company,
  companyUrl,
  location,
  positions,
}: ExperienceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            {company}
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </h3>
          <div className="flex items-center gap-1 text-purple-100 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {positions.map((position, index) => (
            <PositionItem key={index} {...position} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface PositionItemProps {
  title: string
  startDate: string
  endDate: string
  description: string
  technologies?: string[]
}

export function PositionItem({
  title,
  startDate,
  endDate,
  description,
  technologies,
}: PositionItemProps) {
  return (
    <div className="relative pl-6 border-l border-purple-200 dark:border-purple-700">
      <div className="absolute -left-[5px] top-1 w-3 h-3 rounded-full bg-purple-500" />
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-purple-600 dark:text-purple-400"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {title}
            </h4>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>
              {startDate} - {endDate}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
        {technologies && (
          <div className="flex items-center gap-1 flex-wrap mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 text-purple-600 dark:text-purple-400"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function HomePage() {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="space-y-6">
      <Head>
        <title>Work Experience from Kevin Simper</title>
        <link
          rel="canonical"
          href={`https://www.kevinsimper.dk/about/experience`}
        />
      </Head>
      <h1 className="text-2xl">Work Experience</h1>

      <div className="space-y-6">
        {(showAll ? experiences : experiences.slice(0, 5)).map((experience) => {
          return (
            <ExperienceCard
              company={experience.company}
              companyUrl={experience.link || ''}
              location={experience.location}
              positions={
                experience.advancements?.map((a) => {
                  return {
                    description: a.description,
                    title: a.title,
                    endDate: a.end.length === 0 ? 'Currently' : a.end,
                    startDate: a.start,
                    technologies: experience.technologies,
                  }
                }) || [{
                  description: experience.description || '',
                  title: experience.title || '',
                  startDate: experience.start || '',
                  endDate: experience.end || '',
                  technologies: experience.technologies || []
                }]
              }
            />
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
