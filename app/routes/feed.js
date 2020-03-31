import dayjs from 'dayjs'
import express from 'express'
import marked from 'marked'
import rss from 'rss'

import { join } from 'path'
import { promises } from 'fs'

import blogdata from '../blog/posts/_data.json'

let app = express()

app.get('/rss.xml', (req, res) => {
  const url =
    process.env.NODE_ENV === 'production'
      ? `https://www.kevinsimper.dk`
      : `${req.protocol}://${req.hostname}:9000`

  let feed = new rss({
    title: 'Kevin Simper',
    site_url: url,
    webMaster: 'kevin.simper@gmail.com',
  })

  const posts = blogdata.filter((d) => !d.skip)
  Promise.all(
    posts.map((blog) => {
      return promises
        .readFile(
          join(__dirname, `../../app/blog/posts/${blog.slug}.md`),
          'utf8'
        )
        .then((blogcontent) => {
          return {
            title: blog.title,
            description: marked(blogcontent),
            author: 'Kevin Simper',
            date: dayjs(blog.date).toDate(),
            url: encodeURI(`${url}/posts/${blog.slug}`),
            guid: `${blog.slug}`,
          }
        })
    })
  ).then((blogs) => {
    blogs.forEach((b) => {
      feed.item(b)
    })
    res.setHeader('Content-Type', 'application/rss+xml')
    res.send(feed.xml({ indent: true }))
  })
})

export default app
