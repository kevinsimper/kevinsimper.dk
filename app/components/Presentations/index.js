import React, { Component } from 'react'
import styles from './style.scss'
import data from './data.json'
import Presentation from '../Presentation'

export default ({ limit = data.presentations.length }) => {
  return (
    <div className={styles.Presentations}>
      {data.presentations.slice(0, limit).map((presentation, key) => {
        return <Presentation presentation={presentation} key={key} />
      })}
    </div>
  )
}
