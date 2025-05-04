import Head from 'next/head'
import React from 'react'

export default () => (
  <div>
    <Head>
      <title>Kubernetes Training - Kevin Simper</title>
      <link
        rel="canonical"
        href={`https://www.kevinsimper.dk/kubernetes-training`}
      />
    </Head>
    <div style={{ textAlign: 'center' }}>
      <h1 className="text-2xl">Kubernetes Training</h1>
    </div>
    <div className="mx-auto my-6 max-w-xl border border-gray-200 bg-gray-50 px-6 py-4 italic text-gray-600 text-base relative">
      <span className="absolute -top-4 left-4 bg-gray-200 text-gray-700 font-medium text-xs px-3 py-1 uppercase tracking-wide border border-gray-300">
        Archived
      </span>
      I am not doing Kubernetes training anymore, but I like to keep this page
      for historical interest.
    </div>
    <p className="py-2">
      Kubernetes is currently the best software for running your cloud
      infrastructure. It provides a solid foundation for your company to service
      your customers and it scales with you!
    </p>
    <p className="py-2">
      Kubernetes gives you a lot of best approaches that will give you a secret
      and clear path for running stable.
    </p>
    <h3 className="text-xl">I can help you with that!</h3>
    <p className="py-2">
      With my help your company can get the most out of Kubernetes and get to
      the best approaches in the fastest time, just so you can continue what you
      and your company does best!
    </p>
    <p className="py-2">
      With a 2 day intensive workshop we will together cover serveral advanced
      topics in Kubernetes and you and your colleages will be getting a hands-on
      approach with the details.
    </p>
    <p className="py-2">
      We will cover topics like networking, security, load-balacing, deployment,
      scaling, tracing and analytics. Look at the videos and blogposts here to
      learn more;
    </p>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/6NG_cUeuNhU"
      frameBorder="0"
    />
    <p className="py-2">
      <a className="text-purple-600" href="/categories/kubernetes">
        Blogposts about Kubernetes
      </a>
    </p>
    <img
      style={{ float: 'right', width: 200, borderRadius: '100%' }}
      src={'https://i.imgur.com/quTEcgF.png'}
    />
    <h3>Let us talk about how I can help you!</h3>
  </div>
)
