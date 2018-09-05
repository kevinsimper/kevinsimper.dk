import React, { Component } from 'react'
import styles from './style.scss'
import data from './data.json'
import Presentation from '../Presentation'

export default ({ limit = data.presentations.length }) => {
  return (
    <div className={styles.Presentations}>
      <h1>Presentations I have done</h1>
      <p>I have given <strong>{data.presentations.length}</strong> presentations and workshops in total.</p>
      <ul>
        <li>{data.presentations.filter(p => p.type !== "workshop").length} presentations</li>
        <li>{data.presentations.filter(p => p.type === "workshop").length} workshops</li>
      </ul>
      <h3>The list in chronological order:</h3>
      {data.presentations.slice(0, limit).map((presentation, key) => {
        return <Presentation presentation={presentation} key={key} />
      })}
    </div>
  )
}
