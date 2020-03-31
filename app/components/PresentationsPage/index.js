import React from 'react'
import Presentations from '../Presentations'
import data from '../Presentations/data.json'

export default () => (
  <div>
    <h1>Presentations I have done</h1>
    <p>
      I have given <strong>{data.presentations.length}</strong> presentations
      and workshops in total.
    </p>
    <ul>
      <li>
        {data.presentations.filter((p) => p.type !== 'workshop').length}{' '}
        presentations
      </li>
      <li>
        {data.presentations.filter((p) => p.type === 'workshop').length}{' '}
        workshops
      </li>
    </ul>
    <h3>The list in chronological order:</h3>
    <Presentations />
  </div>
)
