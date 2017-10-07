import React from 'react'

export default props => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="icon" type="image/jpeg" href="/kevinsimper.jpg" />
        <link rel="stylesheet" href="/vendor/css/pure.css" />
        <link rel="stylesheet" href="/vendor/css/pure-grid.css" />
        <link rel="stylesheet" href="/css/main.css" />
        <link
          rel="stylesheet"
          href="https://yandex.st/highlightjs/8.0/styles/default.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://yandex.st/highlightjs/8.0/highlight.min.js" />
        {props.production && <script src={props.assets.main.js} />}
        {props.production && (
          <link rel="stylesheet" href={props.assets.main.css} />
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
          dangerouslySetInnerHTML={{ __html: `hljs.initHighlightingOnLoad();` }}
        />
      </body>
    </html>
  )
}
