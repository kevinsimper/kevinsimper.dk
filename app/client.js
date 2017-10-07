import './global.scss'

import App from './components/App'
import Content from './components/Content'
import Presentations from './components/Presentations'
import WorkExperience from './components/WorkExperience'
import Groups from './components/Groups'
import HelloWorld from './components/HelloWorld'
import Blogpost from './components/Blogpost'
import Activities from './components/Activities'
import Contact from './components/Contact'
import About from './components/About'
import Instagram from './components/Instagram'
import Frontpage from './components/Frontpage'

module.hot.status(status => {
  if (status === 'idle') {
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
})
