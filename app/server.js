var express = require('express');
var harp = require('harp');
var app = express();
import compression from 'compression'

var layout = require('jade!./layout.jade')

var blogposts = require('./blog/posts/_data.json')

var production = process.env.NODE_ENV === 'production'

import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './components/App'
import Content from './components/Content'

app.use(compression())
app.use(express.static(process.cwd() + '/public', { maxAge: 86400000 }));

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        {blogposts.map(post =>
          <a className='articlelink' href={'/posts/' + post.slug}>
            <i className='date'>{post.date}</i>
            <h3 className='title'>{post.title}</h3>
          </a>
        )}
      </Content>
    </App>
  )

  res.send(layout({
    content: content,
    production: production
  }))
})

app.get('/posts/:post', (req, res) => {
  var slug = req.params.post
  var blogpost = blogposts.find(item => item.slug === slug)
  var blogcontent = require('./blog/posts/' + slug + '.md')

  let content = renderToString(
    <App>
      <Content>
        <div dangerouslySetInnerHTML={{__html: blogcontent}}></div>
      </Content>
    </App>
  )

  res.send(layout({
    content: content,
    production: production
  }))
})

var port = process.env.PORT || 9000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
