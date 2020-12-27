import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-indigo-700 text-white p-4">
        <h1 className="text-2xl">KevinSimper</h1>
        <div>
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
          <a className="pr-2" href="/social">
            Recommends
          </a>
        </div>
      </header>
      <div className="p-4 flex-1">
        <Component {...pageProps} />
      </div>
      <footer className="bg-indigo-900 text-white p-8">Contact me</footer>
    </div>
  )
}

export default MyApp
