import React from 'react'
import Head from 'next/head'

function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl">About me</h1>
      <Head>
        <title>About - Kevin Simper</title>
        <link rel="canonical" href={`https://www.kevinsimper.dk/about`} />
      </Head>
      <p>My name Kevin and I like to make new stuff.</p>
      <h2 className="text-xl mt-4">My biggest interests at the moment</h2>

      <ul>
        <li>
          <a className="text-purple-600" href="/categories/kubernetes">
            Kubernetes
          </a>{' '}
          and{' '}
          <a className="text-purple-600" href="/categories/google%20cloud">
            Google Cloud
          </a>
        </li>
        <li>
          <a className="text-purple-600" href="/categories/community">
            Organizing community events
          </a>
        </li>
        <li>
          <a className="text-purple-600" href="/categories/speaking">
            Public speaking and teaching
          </a>
        </li>
        <li>
          <a className="text-purple-600" href="/categories/ethereum">
            Ethereum
          </a>{' '}
          and Crypto currencies
        </li>
        <li>
          <a className="text-purple-600" href="/categories/vr">
            Virtual Reality
          </a>
        </li>
      </ul>

      <h2 className="text-xl mt-4">Meetups I help organize</h2>
      <p>Check them out and join me!</p>

      <ul>
        <li>
          <a className="text-purple-600" href="https://copenhagenjs.dk">
            CopenhagenJS
          </a>
        </li>
        <li>
          <a
            className="text-purple-600"
            href="https://www.meetup.com/gdg-cloud-copenhagen/"
          >
            GDG Cloud Copenhagen
          </a>
        </li>
      </ul>

      <div>
        <div>
          <h2 className="text-xl mt-4">Presentations</h2>
          <p>
            I have done 30+ presentations at different meetups. It is something
            that I really like to do and wants to do more!
          </p>
          <p>Here is the latest 5 presentations:</p>
          <a className="text-purple-600" href="about/presentations">
            See all my presentations
          </a>
        </div>
      </div>
      <div>
        <h2 className="text-xl mt-4">Certifications</h2>
        <p>I am a Google Cloud Professionel Cloud Architect.</p>
        <p>
          Proof can be seen here:{' '}
          <a
            className="text-purple-600"
            href="https://www.credential.net/gifyqget?key=5db5c6df3703061c8d4de82373a4bfd51f681c36f10caedf031dcb4fd6da6f25"
          >
            https://www.credential.net/gifyqget?key=5db5c6df3703061c8d4de82373a4bfd51f681c36f10caedf031dcb4fd6da6f25
          </a>
        </p>
      </div>
    </div>
  )
}

export default AboutPage
