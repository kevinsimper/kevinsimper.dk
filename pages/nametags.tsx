import React from 'react'
import Head from 'next/head'

export default () => (
  <div>
    <h1 className="text-2xl">Printing nametags</h1>
    <Head>
      <title>Printing Nametags - Kevin Simper</title>
      <link rel="canonical" href={`https://www.kevinsimper.dk/nametags`} />
    </Head>
    <p className="py-2">
      I have helped communities print nametags. It is a great way to help people
      start conversations. It also allows for some interesting thing with
      personlized QR codes on the nametags.
    </p>
    <h2 className="text-xl">I have helped:</h2>
    <ul className="py-2">
      <li>Ruby Brigade</li>
      <li>CopenhagenJS</li>
      <li>SFNode</li>
      <li>Copenhagen Ethereum</li>
      <li>FoundersHouse Fridaybar</li>
      <li>HackYourFuture</li>
      <li>GDG Cloud London</li>
      <li>JSLovers New Delhi</li>
      <li>GDG Organizers Summit</li>
      <li>React Copenhagen</li>
      <li>Nordic Growth Hackers</li>
    </ul>
    <p className="py-2">
      I can also help you! I really like seeing communities grow and become
      better.
    </p>
    <p className="py-2">
      <a href="https://medium.com/@kevinsimper/how-to-print-name-tags-for-your-meetup-c6293a8faf8f">
        A bit how I initially made the labelprinter work
      </a>
      .
    </p>
    <img src="https://cdn-images-1.medium.com/max/1600/1*7yWCggscg_nF1t8s57iVvg.jpeg" />
  </div>
)
