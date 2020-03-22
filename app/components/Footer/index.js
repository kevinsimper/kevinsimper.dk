import React from 'react'
import styles from './style.scss'

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.Col}>
        <div>
          <strong>Sign up for my newsletter:</strong>
          <form
            action="https://kevinsimper.us18.list-manage.com/subscribe/post?u=86d243154d55f1cdbc293d5bd&amp;id=a0e9448354"
            method="post"
            target="_blank"
          >
            <div>I will write once a while about what I do!</div>
            <input
              type="email"
              placeholder="youremail@mail.com"
              value=""
              name="EMAIL"
              onChange={() => {}}
            />
            <input type="submit" value="Subscribe" name="subscribe" />
          </form>
        </div>
        <div style={{ textAlign: 'center' }}>👨‍💻</div>
        <div>
          <strong>Pages:</strong>
          <div>
            <a href="/nametags">Nametags</a>
            <br />
            <a href="/kubernetes-training">Kubernetes Training</a>
            <br />
            <a href="/recommends">Recommends</a>
            <br />
            <a href="/projects">Projects</a>
            <br />
            <a href="/contact">Contact</a>
            <br />
            <a href="https://talkfrom.com">Talkfrom</a>
            <br />
            <a href="http://kevinsimper.eth">kevinsimper.eth</a>
            <br />
            <a href="https://gdg-search.firebaseapp.com">GDG Search</a>
            <br />
            <a href="https://copenhagenjs.dk/speaker/?name=kevin-simper">
              CopenhagenJS Speaker Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
