import React from 'react'
import Content from '../Content'

const Item = ({ children }) => (
  <li style={{ listStyleType: 'none' }}>
    <label>
      <input style={{ fontSize: 20, verticalAlign: 2 }} type="checkbox" />{' '}
      {children}
    </label>
  </li>
)

export default () => (
  <Content>
    <h1>Stuff I recommend</h1>
    <p>Recipes:</p>
    <h3>Pancakes - 20 pancakes</h3>
    <ul>
      <Item>250 gram flour</Item>
      <Item>3 eggs</Item>
      <Item>6 dl milk</Item>
      <Item>2 spoon sugar</Item>
      <Item>1 nip salt</Item>
    </ul>
    <h3>Pizza - 2 pizzas</h3>
    <ul>
      <Item>0,5 yeast</Item>
      <Item>3 lukewarm water</Item>
      <Item>1 spoon oliveoil</Item>
      <Item>0,5 tespoon salt</Item>
      <Item>200 gram flour</Item>
      <Item>100 gram durumflour</Item>
    </ul>
    <h3>Lasagne - 4 persons</h3>
    <ul>
      <Item>500 grounded beef</Item>
      <Item>1 onion</Item>
      <Item>1 tomato puree</Item>
      <Item>1 cut tomato</Item>
      <Item>1 beef boulion</Item>
      <Item>0,5 liter water</Item>
      <Item>2 carrots</Item>
      <Item>Salt/Paper</Item>
      <Item>Cheese ontop</Item>
      <Item>Lasagne plates</Item>
    </ul>
  </Content>
)
