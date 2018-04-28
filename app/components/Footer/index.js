import React from 'react'
import styles from './style.scss'

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.Col}>
        <div>
          Contact me, I love speaking to new people!<br />
          <a href="/contact">Contact</a>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>2018</div>
        <div>
          <strong>Pages:</strong>
          <div>
            <a href="/kubernetes-training">Kubernetes Training</a>
            <br />
            <a href="/recommends">Recommends</a>
          </div>
        </div>
      </div>
    </div>
  )
}
