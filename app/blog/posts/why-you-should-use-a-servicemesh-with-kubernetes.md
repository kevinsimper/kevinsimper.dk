# Why you should use a Servicemesh with Kubernetes

![Servicemesh](https://i.imgur.com/5fARgSK.jpg)

Servicemesh is becoming more and more popular and Google Cloud even announced a hosted version of [Istio Service Mesh](https://cloud.google.com/service-mesh/) that is in Alpha. If you follow Istio on Github, there is so much activity that you will quickly fall behind.

A servicemesh is needed because more and more customers are moving their production workloads to the cloud and it is accelerating. Now it is not just new applications that are built from the start in the cloud, but also old applications that is now moved into containers and therefore can run anywhere. With all those new applications a new problem arises, how do you monitor and keep them safe? They may be used to be in a datacenter, where they had a hardware firewall in front on dedicated machines, but suddenly that application can be sitting in a Kubernetes cluster on a node that host multiple applications and not just one like the "old days".

I am not saying that it is my favorite activity moving old applications to the cloud, but there is a ton of value of keeping them running as the cost of rewriting is exponentially more expensive. So with a servicemesh we are going to solve the metrics and security with one solution, we deploy a dedicated load balancer in front of every single application and forces the application to route all the traffic through that proxy, that accomplices two things:

1. We can get total control of what exact traffic is going in and out of the application
   This allows us to prevent unintended traffic and can even prevent unauthenticated traffic
2. With having a proxy in front, we can get a lot of useful metrics without changing a single line of code in the original application

The second reason is often a huge debate at companies of how many resources should be used to change the applications to be more modern and expose metrics that can be used to scale the application. Developer time is scarce and old applications are often very cumbersome to change, so if something can be done without changing the application that is a huge win as it allows cloud operations to continue their efforts of moving stuff to the cloud and streamlining the business.

Google Cloud is also encouraging this idea of [BeyondCorp](https://cloud.google.com/beyondcorp/) which is a way to think of infrastructure and security. It is a look away from VPN and internal networks and a look towards zero-trust mobile devices that each prove their identity instead. This fit together the whole idea of servicemesh as applications will have no trust by default and therefore more secure.

This will be the next huge step in Cloud infrastructure and many companies are trying to tackle this, some with simpler approaches like [Linkerd](https://linkerd.io/) others with more managed Istio like [Aspen](https://aspenmesh.io/). Who will succeed is interesting, Istio is the big winner with how much energy that is invested in it right now!
