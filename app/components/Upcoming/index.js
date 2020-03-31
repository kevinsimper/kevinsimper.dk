import React from 'react'

const events = [
  {
    title: 'May 30th & June 1st - GR8conf',
    link: 'https://gr8conf.eu/',
    finished: true,
  },
  {
    title: 'June 1st & 2nd - JSConfEU',
    link: 'https://2018.jsconf.eu/',
    finished: true,
  },
  {
    title: 'June 7th - Learn Kubernetes - Best practices and showcases',
    link:
      'https://www.meetup.com/Google-Cloud-Developer-Community-Copenhagen/events/250877840/',
    finished: true,
  },
  {
    title: 'June 19th - Introduction to Docker',
    link: 'https://www.meetup.com/Docker-Copenhagen/events/251794160/',
    finished: true,
  },
  {
    title: 'July 10th - Beer.js',
    link: 'https://www.meetup.com/beerjs/events/251205105/',
    finished: true,
  },
  {
    title: 'July 11th - Waffle.js',
    link: 'https://wafflejs.com/?day=2018-07-11',
    finished: true,
  },
  {
    title: 'July 12th - SFNode',
    link: 'https://www.meetup.com/sfnode/events/250440975/',
    finished: true,
  },
  {
    title: 'July 14th - NodeSchool.io Oakland',
    link: 'https://nodeschool.io/oakland/',
    finished: true,
  },
  {
    title: 'July 17th - Serverless meetup',
    link: 'https://www.meetup.com/Serverless/events/252006429/',
    finished: true,
  },
  {
    title: 'July 18th - CodeClimate Conference',
    link: 'https://codeclimate.com/summit/',
    finished: true,
  },
  {
    title: 'July 24th & 26th - Google Cloud Next',
    link: 'https://cloud.withgoogle.com/next18/sf/',
    finished: true,
  },
  {
    title: 'Oct 30 & Nov 2 - Ethereum devcon 4',
    link: 'https://devcon4.ethereum.org/',
    finished: true,
  },
  {
    title: 'Nov 13-14 - Coldfront',
    link: 'https://coldfront.co/',
    finished: true,
  },
  {
    title: 'Nov 24 - Cloudfest.dk',
    link: 'http://www.cloudfest.dk/',
    finished: true,
  },
  {
    title: 'Nov 28 - VRConf.se',
    link: 'http://www.vrconf.se/',
    finished: true,
  },
  {
    title: `April 9th-11th - Google Cloud Next \'19`,
    link: 'https://cloud.withgoogle.com/next/sf',
    finished: true,
  },
  {
    title: `May 6th-9th - Google IO \'19`,
    link: 'https://events.google.com/io/',
  },
]

const finished = events.filter((i) => !i.finished)

export default () => [
  <h2 style={{ color: 'white' }}>
    <svg
      height="30px"
      version="1"
      width="30px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      style={{
        verticalAlign: -5,
        marginRight: 10,
      }}
    >
      <path
        clipRule="evenodd"
        d="M250 41c-8 0-15 5-17 13l-43 132H49c-9 0-17 9-17 19 0 6 3 11 7 14l114 83-43 133-1 6a18 18 0 0 0 27 15l114-83 114 83c2 2 6 3 10 3a18 18 0 0 0 16-24l-43-133 114-83c4-3 7-8 7-14 0-10-7-19-17-19H310L267 54c-2-8-9-13-17-13z"
        fill="#ffe407"
        fillRule="evenodd"
        style={{
          color: '#ffe407',
        }}
      />
    </svg>
    Upcoming events to find me
  </h2>,
  <ul>
    {finished.map((i, key) => (
      <li key={key}>
        <a style={{ color: 'white' }} href={i.link}>
          {i.title}
        </a>
      </li>
    ))}
    {finished.length === 0 && (
      <div>Sadly, no upcoming events, you should invite me!</div>
    )}
  </ul>,
]
