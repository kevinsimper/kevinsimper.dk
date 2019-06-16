import express from 'express'
import {join } from 'path'
import marked from 'marked'
import { promises } from 'fs'
import rss from 'rss'
import blogdata from '../blog/posts/_data.json'
import dayjs from 'dayjs'

let app = express()

app.get('/rss.xml', (req, res) => {
  const url =
    process.env.NODE_ENV === 'production'
      ? `https://www.kevinsimper.dk`
      : `${req.protocol}://${req.hostname}:9000`
  let feed = new rss({
    title: 'Kevin Simper',
    site_url: url,
    managingEditor: 'Kevin Simper',
    webMaster: 'Kevin Simper'
  })
  let blogs = Promise.all(
    blogdata.map(blog => {
      return promises.readFile(join(__dirname,`./app/blog/posts/${blog.slug}.md`), 'utf8').then(blogcontent => {
        return {
          title: blog.title,
          description: marked(blogcontent),
          author: 'Kevin Simper',
          date: dayjs(blog.date).toDate(),
          url: `${url}/posts/${blog.slug}`,
          guid: `${blog.slug}`
        }
      })
    })
  ).then(blogs => {
    blogs.forEach(b => {
      feed.item(b)
    })
    res.send(feed.xml({ indent: true }))
  })
})

export default app
