import Head from 'next/head'
import React from 'react'

function Projectspage() {
  return (
    <div>
      <Head>
        <title>Projects - Kevin Simper</title>
        <link rel="canonical" href={`https://www.kevinsimper.dk/projects`} />
      </Head>
      <h1 className="text-2xl">Projects that I work on</h1>
      <ul>
        <li>
          <a href="https://gdgsearch.com/">GDG Search</a>
        </li>
        <li>
          <a href="https://contactform.dk/">Contactform.dk</a>
        </li>
        <li>
          <a href="https://talkfrom.com/">Talkfrom</a>
        </li>
        <li>
          <a href="https://copenhagen.community/">Copenhagen.community</a>
        </li>
      </ul>
    </div>
  )
}

export default Projectspage
