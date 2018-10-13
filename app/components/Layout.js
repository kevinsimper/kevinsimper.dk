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
          href="https://cdn.jsdelivr.net/npm/prismjs@1.15.0/themes/prism.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/prismjs@1.15.0/plugins/line-numbers/prism-line-numbers.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          src="https://cdn.jsdelivr.net/npm/prismjs@1.15.0/prism.min.js"
          data-manual
        />
        <script src="https://cdn.rawgit.com/jacob-long/b34b65ff1a56a1c772c3b4e9e204a035/raw/959da4fd550cf77ac20d42f3e7e442fdb906b6da/prism-line-numbers.js" />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `document.querySelectorAll('code').forEach(i => Prism.highlightElement(i))`
          }}
        />
      </body>
    </html>
  )
}
