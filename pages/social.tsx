import React from 'react'
import Head from 'next/head'

function SocialPage() {
  return (
    <div className="py-6">
      <Head>
        <title>Social media - Kevin Simper</title>
        <link rel="canonical" href={`https://www.kevinsimper.dk/social`} />
      </Head>
      <h1 className="text-2xl text-center">Find me on social media</h1>
      <ul className="grid lg:grid-cols-4 gap-3 my-4 content-center items-center">
        <li className="text-center bg-black text-white rounded-xl shadow-xl border">
          <a
            className="block aspect-square flex place-items-center"
            href="https://github.com/kevinsimper"
          >
            <div className="flex-1">👨‍💻 GitHub</div>
          </a>
        </li>
        <li className="text-center bg-blue-400 text-white rounded-xl shadow-xl border">
          <a
            className="block aspect-square flex place-items-center"
            href="https://twitter.com/kevinsimper"
          >
            <div className="flex-1">🐦 Twitter</div>
          </a>
        </li>
        <li className="text-center rounded-xl shadow-xl border">
          <a
            className="block aspect-square flex place-items-center"
            href="https://linkedin.com/in/kevinsimper"
          >
            <div className="flex-1">👨‍💼 LinkedIn</div>
          </a>
        </li>
        <li className="text-center bg-red-600 text-white rounded-xl shadow-xl border">
          <a
            className="block aspect-square flex place-items-center"
            href="https://www.youtube.com/channel/UCarQbOR6-lCqaa0d_MB9iGQ"
          >
            <div className="flex-1">🎥 YouTube</div>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SocialPage
