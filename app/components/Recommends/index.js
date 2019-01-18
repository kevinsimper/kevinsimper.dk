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

const Button = ({ href, children }) => (
  <a
    href={href}
    style={{ appearance: 'button', WebkitAppearance: 'push-button' }}
  >
    {children}
  </a>
)

export default ({ lasagne = 4, pizza = 2 }) => (
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
    <h3>
      Pizza - {pizza} pizzas <Button href="?pizza=4">4 pcs</Button>{' '}
      <Button href="?pizza=8">8 pcs</Button>
    </h3>
    <ul>
      <Item>{0.5 * (pizza / 2)} yeast</Item>
      <Item>{3 * (pizza / 2)} lukewarm water</Item>
      <Item>{1 * (pizza / 2)} spoon oliveoil</Item>
      <Item>{0.5 * (pizza / 2)} tespoon salt</Item>
      <Item>{200 * (pizza / 2)} gram flour</Item>
      <Item>{100 * (pizza / 2)} gram durumflour</Item>
    </ul>
    <h3>
      Lasagne - {lasagne} persons <Button href="?lasagne=6">6 pp</Button>{' '}
      <Button href="?lasagne=8">8 pp</Button>
    </h3>
    <ul>
      <Item>{500 * (lasagne / 4)} grounded beef</Item>
      <Item>{1 * (lasagne / 4)} onion</Item>
      <Item>{1 * (lasagne / 4)} tomato puré</Item>
      <Item>{1 * (lasagne / 4)} canned cuttet tomato</Item>
      <Item>{1 * (lasagne / 4)} beef boulion</Item>
      <Item>{0.5 * (lasagne / 4)} liter water</Item>
      <Item>{2 * (lasagne / 4)} carrots</Item>
      <Item>Salt/Pepper</Item>
      <Item>{0.5 * (lasagne / 4)} Cheese slices ontop</Item>
      <Item>{1 * (lasagne / 4)} Lasagne plates</Item>
      <Item>{1 * (lasagne / 4)} Mornay sause</Item>
    </ul>
  </Content>
)
