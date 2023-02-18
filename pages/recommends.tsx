import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

function RecommendsPage() {
  const router = useRouter()
  const pizza = router.query?.pizza?.toString()
    ? parseInt(router.query?.pizza?.toString())
    : 4
  const lasagne = router.query?.lasagne?.toString()
    ? parseInt(router.query?.lasagne?.toString())
    : 4
  const pancake = router.query?.pancake?.toString()
    ? parseInt(router.query?.pancake?.toString())
    : 20

  return (
    <div>
      <h1 className="text-3xl mb-2">Stuff I recommend</h1>
      <Head>
        <title>Stuff I recommend - Kevin Simper</title>
      </Head>
      <Link href={{ pathname: '/climbs' }} className="text-purple-600">
        Climbs I have done on bike
      </Link>
      <h2 className="text-2xl py-2">Recipes:</h2>
      <div className="mb-2">
        <h3 className="text-xl">
          Pancakes -{' '}
          <input
            type="text"
            style={{ width: 25 }}
            defaultValue={pancake}
            onChange={(e) => {
              router.push('?pancake=' + e.target.value)
            }}
          />{' '}
          pancakes
        </h3>
        <ul>
          <Item>{(250 / 20) * pancake} gram flour</Item>
          <Item>{(3 / 20) * pancake} eggs</Item>
          <Item>{(6 / 20) * pancake} dl milk</Item>
          <Item>{(2 / 20) * pancake} spoon sugar</Item>
          <Item>{(1 / 20) * pancake} nip salt</Item>
        </ul>
      </div>
      <div className="mb-2">
        <h3 className="text-xl">
          Pizza -{' '}
          <input
            type="text"
            style={{ width: 25 }}
            defaultValue={pizza}
            onChange={(e) => {
              router.push('?pizza=' + e.target.value)
            }}
          />{' '}
          pizzas
        </h3>
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
        <h3 className="text-xl">
          Lasagne -{' '}
          <input
            type="text"
            style={{ width: 25 }}
            defaultValue={lasagne}
            onChange={(e) => {
              router.push('?lasagne=' + e.target.value)
            }}
          />{' '}
          persons
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
      </div>
    </div>
  )
}

export default RecommendsPage
