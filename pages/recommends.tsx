import React from 'react'

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

function SocialPage() {
  const pizza = 4
  const lasagne = 6
  return (
    <div>
      <h1 className="text-2xl">Stuff I recommend</h1>
      <p>Recipes:</p>
      <div className="mb-2">
        <h3 className="text-xl">Pancakes - 20 pancakes</h3>
        <ul>
          <Item>250 gram flour</Item>
          <Item>3 eggs</Item>
          <Item>6 dl milk</Item>
          <Item>2 spoon sugar</Item>
          <Item>1 nip salt</Item>
        </ul>
      </div>
      <div className="mb-2">
        <h3 className="text-xl">Pizza - {pizza} pizzas</h3>
        <ul>
          <Item>{0.5 * (pizza / 2)} yeast</Item>
          <Item>{3 * (pizza / 2)} lukewarm water</Item>
          <Item>{1 * (pizza / 2)} spoon oliveoil</Item>
          <Item>{0.5 * (pizza / 2)} tespoon salt</Item>
          <Item>{200 * (pizza / 2)} gram flour</Item>
          <Item>{100 * (pizza / 2)} gram durumflour</Item>
        </ul>
      </div>
      <div className="mb-2">
        <h3 className="text-xl">Lasagne - {lasagne} persons</h3>
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
      </div>
    </div>
  )
}

export default SocialPage
