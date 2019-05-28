import React from 'react'

export default props => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link
          rel="icon"
          type="image/jpeg"
          href="https://cdn.kevinsimper.dk/favicon.jpg"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {props.production && (
          <script src={`https://cdn.kevinsimper.dk${props.assets.main.js}`} />
        )}
        {props.production && (
          <link
            rel="stylesheet"
            href={`https://cdn.kevinsimper.dk${props.assets.main.css}`}
          />
        )}
        {!props.production && <script src="/build/main.bundle.js" />}
        {!props.production && <link rel="stylesheet" href="/build/main.css" />}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-4309863-18', 'auto');
          ga('send', 'pageview');`
          }}
        />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: props.content }} />
        {props.production && (
          <div>
            <link
              rel="stylesheet"
              href="https://cdn.kevinsimper.dk/prism.css"
            />
            <script src="https://cdn.kevinsimper.dk/prism.js" data-manual />
          </div>
        )}
        {!props.production && (
          <div>
            <link rel="stylesheet" href="/prism.css" />
            <script src="/prism.js" data-manual />
          </div>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.querySelectorAll('pre').forEach(i => {
              i.classList.add('line-numbers')
            })
            document.querySelectorAll('code').forEach(i => {
              Prism.highlightElement(i)
            })`
          }}
        />
      </body>
    </html>
  )
}
