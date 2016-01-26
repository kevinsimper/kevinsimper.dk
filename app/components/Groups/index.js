import React from 'react'
import styles from './style.scss'
import Card from 'material-ui/lib/card/card'

const data = [
  {
    name: 'CopenhagenJS',
    description: 'A monthly meetup group for people who like javascript.'
  },
  {
    name: 'Docker Copenhagen',
    description: 'A meetup group that likes Docker and wants to improve their workflow.'
  }
]

export default class Groups extends React.Component {
  render() {
    return (
      <div>
        <h2>Groups</h2>
        <p>I am current active in two meetup groups.</p>
        <div className={styles.Groups}>
          {data.map(item =>
            <Card className={styles.Group}>
              <h3 className={styles.Header}>{item.name}</h3>
              <div>{item.description}</div>
            </Card>
          )}
        </div>
      </div>
    )
  }
}
