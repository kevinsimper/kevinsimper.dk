import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { Menu } from '../components/Menu'
import Link from 'next/link'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantStyles = {
    primary: 'bg-white text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
    secondary: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500'
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`rounded-md border border-indigo-300 bg-white px-3 py-2 text-sm text-indigo-900 placeholder-indigo-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  )
}





export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Search</h3>
            <form method="GET" action="/search" className="space-y-2">
              <div className="flex gap-2">
                <Input
                  name="q"
                  type="search"
                  placeholder="Search and press enter.."
                  className="flex-grow"
                  aria-label="Search"
                />
                <Button type="submit" variant="secondary">
                  Search
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-4 col-span-2">
            <h3 className="text-lg font-semibold">Pages</h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link href="/nametags" className="hover:text-indigo-200 transition-colors">Nametags</Link>
              <Link href="/recommends" className="hover:text-indigo-200 transition-colors">Recommends</Link>
              <Link href="/projects" className="hover:text-indigo-200 transition-colors">Projects</Link>
              <Link href="https://talkfrom.com" className="hover:text-indigo-200 transition-colors">Talkfrom</Link>
              <Link href="http://kevinsimper.eth" className="hover:text-indigo-200 transition-colors">kevinsimper.eth</Link>
              <Link href="https://copenhagenjs.dk/speaker/?name=kevin-simper" className="hover:text-indigo-200 transition-colors">
                CopenhagenJS Speaker
              </Link>
            </nav>
          </div>

          {/* <div className="space-y-4 lg:col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <p className="text-sm">Join our newsletter for the latest updates and insights.</p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
                aria-label="Email for newsletter"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <Link
              href="/social"
              className="inline-block mt-4 text-indigo-200 hover:text-white transition-colors"
            >
              Get in touch!
            </Link>
          </div> */}
        </div>

        <div className="mt-8 border-t border-indigo-500 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Kevin Simper. All rights reserved.
        </div>
      </div>
    </footer>
  )
}


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
        <link rel="alternate" type="application/rss+xml" title="Kevin Simper's Blog RSS Feed" href="/api/rss.xml" />
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
        className={`${Component?.pageStyle?.fullWidth
            ? ''
            : 'max-w-screen-md mx-auto p-4 mb-8'
          } flex-1 w-full`}
      >
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
