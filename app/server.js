import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import { NameTagsRoute } from './routes/nametags'
import { assets, production, layout, map } from './consts.js'
import { homeRoute } from './routes/home.js'
import { server } from './routes/graphql'
import AboutRoutes from './routes/about'
import ActivitiesRoutes from './routes/activities'
import CategoriesRoutes from './routes/categories'
import ContactRoutes from './routes/contact'
import FeedRoutes from './routes/feed'
import KubernetesTrainingRoutes from './routes/kubernetes-training'
import LoginRoutes from './routes/login'
import MapRoutes from './routes/map'
import PostsRoutes from './routes/posts'
import RecommendsRoutes from './routes/recommends'
import { SocialMediaRoute } from './routes/social'
import { SearchRoute } from './routes/search'
import { ProjectsRoute } from './routes/projects'

export { assets, production, layout, map }
var app = express.Router()

app.use(compression())
app.use(cookieParser('somethingverysecret'))

if (production) {
  app.use((req, res, next) => {
    const host = req.header('host')
    if (
      req.header('X-Forwarded-Proto') &&
      req.header('X-Forwarded-Proto') === 'http'
    ) {
      res.redirect(301, 'https://' + host + req.originalUrl)
    }
    if (!host.match(/^www\..*/i) && host === 'kevinsimper.dk') {
      res.redirect(301, 'https://www.' + host + req.originalUrl)
    } else {
      next()
    }
  })
}

app.get('/', homeRoute)
app.use('/posts', PostsRoutes)
app.use('/about', AboutRoutes)
app.use('/contact', ContactRoutes)
app.use('/map', MapRoutes)
app.use('/kubernetes-training', KubernetesTrainingRoutes)
app.use('/recommends', RecommendsRoutes)
app.use('/login', LoginRoutes)
app.use('/activities', ActivitiesRoutes)
app.use('/categories', CategoriesRoutes)
app.use('/feed', FeedRoutes)
app.get('/social', SocialMediaRoute)
app.get('/nametags', NameTagsRoute)
app.get('/search', SearchRoute)
app.get('/projects', ProjectsRoute)

server.applyMiddleware({ app })

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

export { app }
