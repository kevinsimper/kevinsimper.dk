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
            <a className="pr-2" href="/projects">
              Projects
            </a>
          </div>
        </div>
      </header>
      <div className="max-w-screen-md mx-auto p-4 flex-1 w-full">
        <Component {...pageProps} />
      </div>
      <footer className="bg-indigo-900 text-white p-8">
        <div className="max-w-screen-md mx-auto flex justify-around">
          <a href="/social">Contact me!</a>
          <form method="GET" action="/search">
            <input
              className="p-2"
              name="q"
              type="search"
              placeholder="Search.."
            />
          </form>
          <div>
            <strong>Pages:</strong>
            <div>
              <a href="/nametags">Nametags</a>
              <br />
              <a href="/kubernetes-training">Kubernetes Training</a>
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
              <a href="https://gdg-search.firebaseapp.com">GDG Search</a>
              <br />
              <a href="https://copenhagenjs.dk/speaker/?name=kevin-simper">
                CopenhagenJS Speaker Profile
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MyApp
