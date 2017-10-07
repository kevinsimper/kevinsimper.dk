import React from 'react'

export default (props) => {
  return (
    <html>
      <head>
        <title></title>
        <link rel="icon" type="image/jpeg" href="/kevinsimper.jpg"/>
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,600"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {props.production &&
          <script src={props.assets.map.js}></script>
        }
        {props.production &&
          <link rel="stylesheet" href={props.assets.main.css}/>
        }
        {!props.production &&
          <script src="/build/map.bundle.js"></script>
        }
        {!props.production &&
          <link rel="stylesheet" href="/build/main.css"/>
        }
        <script dangerouslySetInnerHTML={{__html: `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-4309863-18', 'auto');
          ga('send', 'pageview');
        `}}>
        </script>
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: props.content }}/>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyClL8CXbqII1QIVaNThKW-E9crgEw7zSYk&amp;libraries=drawing&amp;callback=initMap"></script>
      </body>
    </html>
  )
}
