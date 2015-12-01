var express = require('express');
var harp = require('harp');
var app = express();

var layout = require('jade!./layout.jade')

var blogposts = require('./blog/posts/_data.json')

var production = process.env.NODE_ENV === 'production'

app.use(express.static(process.cwd() + '/public'));

import React from 'react'
import { renderToString } from 'react-dom/server'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

var sidebar = renderToString(<Sidebar/>)

app.get('/', (req, res) => {
  let content = renderToString(
    <div>
      <div className="pure-g">
        <div className="pure-u-1-4 sidebar">
          <Sidebar/>
        </div>
      </div>
      <div className="pure-u-3-4 content">
        <div className="innercontent">
          <div className="pure-u-5-6">
            <Content>
              {blogposts.map(post =>
                <a className='articlelink' href={'/posts/' + post.slug}>
                  <i className='date'>{post.date}</i>
                  <h3 className='title'>{post.title}</h3>
                </a>
              )}
            </Content>
          </div>
        </div>
      </div>
    </div>
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
    <div>
      <div className="pure-g">
        <div className="pure-u-1-4 sidebar">
          <Sidebar/>
        </div>
      </div>
      <div className="pure-u-3-4 content">
        <div className="innercontent">
          <div className="pure-u-5-6">
            <Content>
              <div dangerouslySetInnerHTML={{__html: blogcontent}}></div>
            </Content>
          </div>
        </div>
      </div>
    </div>
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
