import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-indigo-700">
        <div className="max-w-screen-md mx-auto text-white p-4">
          <a href="/">
            <h1 className="text-2xl">KevinSimper</h1>
          </a>
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
            <a className="pr-2" href="/nametags">
              Nametags
            </a>
          </div>
        </div>
      </header>
      <div className="max-w-screen-md mx-auto p-4 flex-1 w-full">
        <Component {...pageProps} />
      </div>
      <footer className="bg-indigo-900 text-white p-8">
        <div className="max-w-screen-md mx-auto">
          <a href="/social">Contact me</a>
        </div>
      </footer>
    </div>
  )
}

export default MyApp
