import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { Menu } from '../components/Menu'

function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false)

  const links = (
    <>
      <a className="pr-2" href="/">
        Home
      </a>
      <a className="pr-2" href="/about">
        About
      </a>
      <a className="pr-2" href="/about/experience">
        CV
      </a>
      <a className="pr-2" href="/about/presentations">
        Presentation
      </a>
      <a className="pr-2" href="/social">
        Social
      </a>
      <a className="pr-2" href="/recommends">
        Recommends
      </a>
      <a className="pr-2" href="/nametags">
        Nametags
      </a>
      <a className="pr-2" href="/projects">
        Projects
      </a>
      <a className="pr-2" href="/map">
        Map
      </a>
    </>
  )
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Kevin Simper</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/jpeg" href="/favicon.jpg" />
        // stylesheet
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css"
        />
      </Head>
      <header
        className="bg-indigo-700"
        style={{
          background:
            'linear-gradient(297deg, rgba(105,44,145,1) 11%, rgba(55,58,199,1) 100%)',
        }}
      >
        <div className="max-w-screen-md mx-auto flex md:block justify-between text-white p-4">
          <a href="/">
            <h1 className="text-2xl">KevinSimper</h1>
          </a>
          <div className="hidden md:block">{links}</div>
          <div className="block md:hidden" onClick={() => setShowMenu(true)}>
            Menu
          </div>
        </div>
        <Menu
          shownFrom={'left'}
          show={showMenu}
          onClickClose={() => {
            setShowMenu(false)
          }}
        >
          <div style={{ minWidth: '250px' }} className="flex flex-col m-6">
            {links}
          </div>
        </Menu>
      </header>
      <div
        className={`${
          Component?.pageStyle?.fullWidth
            ? ''
            : 'max-w-screen-md mx-auto p-4 mb-8'
        } flex-1 w-full`}
      >
        <Component {...pageProps} />
      </div>
      <footer className="bg-indigo-900 text-white p-8">
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row gap-4 justify-around">
          <div className="flex-1">
            <a href="/social" className="py-2">
              Contact me!
            </a>
            <form method="GET" action="/search" className="py-4">
              <div className="py-2">Search:</div>
              <input
                className="p-2 text-black w-full"
                name="q"
                type="search"
                placeholder="Search and press enter.."
              />
            </form>
          </div>
          <div className="py-2">
            <strong>Pages:</strong>
            <div>
              <a href="/nametags">Nametags</a>
              <br />
              <a href="/recommends">Recommends</a>
              <br />
              <a href="/projects">Projects</a>
              <br />
              <a href="/contact">Contact</a>
              <br />
              <a href="https://talkfrom.com">Talkfrom</a>
              <br />
              <a href="http://kevinsimper.eth">kevinsimper.eth</a>
              <br />
              <a href="https://copenhagenjs.dk/speaker/?name=kevin-simper">
                CopenhagenJS Speaker
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MyApp
