import React from 'react'
import Contactform from '../Contactform'
import KubernetesSvg from '../HelloWorld/kubernetes.svg'

export default () => (
  <div>
    <div style={{ textAlign: 'center' }}>
      <img width="200px" src={KubernetesSvg} />
      <h1>Kubernetes Training</h1>
    </div>
    <p>
      Kubernetes is currently the best software for running your cloud
      infrastructure. It provides a solid foundation for your company to service
      your customers and it scales with you!
    </p>
    <p>
      Kubernetes gives you a lot of best approaches that will give you a secret
      and clear path for running stable.
    </p>
    <h3>I can help you with that!</h3>
    <p>
      With my help your company can get the most out of Kubernetes and get to
      the best approaches in the fastest time, just so you can continue what you
      and your company does best!
    </p>
    <p>
      With a 2 day intensive workshop we will together cover serveral advanced
      topics in Kubernetes and you and your colleages will be getting a hands-on
      approach with the details.
    </p>
    <p>
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
    <p>
      <a href="/categories/kubernetes">Blogposts about Kubernetes</a>
    </p>
    <img
      style={{ float: 'right', width: 200, borderRadius: '100%' }}
      src={'https://i.imgur.com/quTEcgF.png'}
    />
    <h3>Let us talk about how I can help you!</h3>
    <Contactform />
  </div>
)
