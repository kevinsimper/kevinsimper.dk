# My programming stack of 2020

I wrote a blogpost nearly 5 years ago about [my programming stack of 2015](https://medium.com/@kevinsimper/the-programming-stack-of-2015-40ef4d77e0) and I thought it would be funny to revisit and write an updated one.

## Looking back

### IO.js

The first I mention is IO.js which is node.js, but it was funny at that time node.js development had slowed down and the fork was a critical point. I still use Node.js a lot and I think it is still a solid choice for a programming stack in 2020. It is still evolving and with the new ES Modules that aligns with the web browsers. The [ES Modules](https://nodejs.org/api/esm.html) are still experimental, but I use [ESM](https://www.npmjs.com/package/esm) which is a great way to bridge until it is ready.

### React.js

My first sentence is how the popularity of React.js has been through the roof, but it is still growing and I don't think we have seen the peak yet. React.js is a UI library and a lot of what made React great in 2015, a lot of other cool libraries have adopted. Angular has also changed in a big way and in general, the frontend javascript scene is moving fast still!

### Docker - Containers

I was very dramatic in 2015 proudly pronouncing it as the year of the container. A lot has happened since and containers are now the defacto and not like in 2015 where it was just new and hot. After I wrote the article I even started a company that would do container hosting, but I learned that being early is both great but a pain in that nobody knew the technology. In 2020 it is still new and many more advanced features have come since, but containers keep on rocking. (Not the company docker anymore, that is a bit of a mess!)

![](https://i.imgur.com/HmZ5692.png)

### Databases in 2015

I was talking about multiple databases and MongoDB and graph databases. Looking back I have never had much success with MongoDB, partly because SQL databases have been improved greatly over the past years and have no incorporated many of the great features of NoSQL databases like JSON support and computed fields. I still like that I said SQL and different problems, different databases, but that is not so true anymore.
And I have yet to use a Graph database, I simply haven't had the issues where a SQL database couldn't solve it and the overhead of keeping another database is too big. We haven't seen many hosted graph databases either from big cloud providers so that is also a reason.

### Pay-for-what-you-use

I was talking about serverless without using the word serverless, which is quite funny compared to how popular the term has grown over the last 2-3 years.

![](https://i.imgur.com/GLaBEmD.png)

AWS was a first-mover on this, but their product was simply too complicated and I ran several workshops and gave talks about it and it was soo few people that understood it that it was nearly surreal!

A lot of people have also mocked the term and said they used serverless products in the past, but the problem was that those products did not allow you to scale up which still only paying a small fixed amount.

## My programming stack of 2020

So on to my programming stack for next year and probably for the next couple of years! I think it is important to not choose technologies based on hype but based on what potential you see it and how it aligns with your values. A good talk by Bryan Cantrill talks about the different values of programming languages and that it is impossible for a language to encompass all values, https://www.youtube.com/watch?v=2wZ1pCpJUIM

![](https://i.imgur.com/MxptciF.png)

### Kubernetes

I first noticed Kubernetes while I and James were working on our startup and at that time we dismissed it as it was too complicated, but over time it has become one of the most user-friendly complicated software I know! There are now hosted version by all major cloud providers and kubernetes is now _the_ platform to develop for! Kubernetes is the answer when you want to host something reliable in your company and you can align it with the values of the company, whether that is going fast or going slow and steady!

We are seeing people moving away from Kubernetes again, but that is because everything cloud providers are now doing (Google Cloud Run, AWS Fargate, etc.) is built on top of Kubernetes and one knows that they are not going down the total proprietary way. I feel that Kubernetes also made the right abstraction and including extensibility in the Kubernetes API server, which made so many frameworks being able to build on top of Kubernetes instead of next to, this was so critical!

I don't use Kubernetes in smaller projects as Kubernetes is a big machine that both cost money to keep going and keep up. 

### Serverless / Cloud Run

2019 was also when Google launched Cloud Run which is essentially Kubernetes underneath but you only pay for what you use. This product is amazing and the value you get is 100x. The product is so flexible because of using the container format and just HTTP, while providing loadbalacing and HTTPS on top. Your website will never go down because of a small compounding mistake, no cloud run simply spins it up again on another server perhaps, in reality, you don't have to care!

It is also not limiting in the sense of old serverless where the cloud provider was providing the runtime. That had a major downside that you couldn't decide and was often stuck on very old versions of example Node.js and some runtimes simply not existing!

Cloud Run also has the scale of Google which means that the product cost very little and it doesn't matter to Google, where with other smaller startups they can't afford having a lot of customers that don't pay much. They bet is that you will grow big and stay on the platform.

### TypeScript

I was definitely not a first-mover on this one, but I am not too proud to change my opinion. TypeScript is pretty cool and it solves two major problems, providing extra checks for your code integrity and keeping the output readable. With the many improvements over the last years, it solves that! I have been for long on the outlook for a language that would do this and most would often fail on the last problem and produce JavaScript that would be so different that it would not be JavaScript that you would be able to adapt without TypeScript. JavaScript is a very fast-moving target and is the language of the browser, so choosing something that would prevent you from using new features or would be in the way would be a huge hurdle, TypeScript in 2020 is not that!

There is also been writing a lot of documentation and tutorials on how to solve the most problems while still taking advantage of the whole JavaScript ecosystem, but it is worth noticing that using a typed language is not as easy to learn as a dynamic language and I still like writing just plain JavaScript.

### Firestore / SQL

Being able to run something really cheap and not have a monthly expense has been possible in 2019 and going into 2020. Firestore is a wonderful example of a great database that is hosted and has very few downsides. It is cheap, it can handle scale, it has a lot of features built-in and every emulator for local development if you need that! Firestore is not at all like its predecessor Firebase although they share a lot of similarities! Firestore is a proper tool where Firebase was its own product and focuses more on smaller developer teams, firestore has proper Google Cloud integration with IAM and everything!

In my toolbelt, I still keep SQL which is still wonderful with its flexibility and its commonness. It is very cheap to run in the Cloud for a merely $7 you can run it in Google Cloud, but the downsides for side-projects is that even if you don't use it you have to pay, so Firestore is a winner for projects that have low usage at the start. But SQL means a lot of things, SQL can also be used with Google Cloud BigQuery which can handle Terabytes of data and can be queried with SQL easily. Learning SQL and keeping it is a well worth trade.

### GraphQL

It is amazing how popular REST is and still, something new can come along and take its place. GraphQL has for me been an amazing shift and I think it is partly because I do full-stack and I can judge both from the front-end side and the back-end. If you only look from one of the sides REST looks simpler to both, but what can be seen is all the extra overhead of logic to achieve the same result as one can with GraphQL. With GraphQL it is possible to write one HTTP request and get back that that would have taken 10s of requests and a lot of logic.

GraphQL is mocked by looking similar to a lot of other old RPC/SOAP frameworks, the difference is in all the tooling that has been made and the learnings of those frameworks and also with the grown interest of types. All the unnecessary logic has been moved back to the backend and the front-end developers are making features faster than ever with GraphQL. I have yet to see many developers use GraphQL fragments, but that is something I hope to see in 2020, I am definitely using it.

### Containers

I still really like the ideas of containers because of the predictability you get by having something being reproduced over and over again in the same environment saving everyone time when everyone speaks the same language. The tools have not improved as much on Mac and Windows as you would like and everything is far from running in containers yet, but on the Cloud side it is well established. Everything is still based around the Docker standard but slowly open source common standards are popping up liked Containerd and podman for running. The best user experience is still Docker and I still like how easy it is, 1-click installs nearly and that has taken a lot of work to get there.

I don't use docker-compose as much anymore and I think that is because I have become better at using CI/CD and writing tests. I used to use docker-compose spinning up a whole environment to allow an end-to-end test, but the things I have worked on lately have not needed that and the cost of maintaining that (yes it breaks) has not been worth it.

I am excited about the continuing progress of containers and so is containers still a big part of my programming stack of 2020.

### Bazel

This tool is the newest one in my stack, for long have I had problems with scaling apps and keeping build time low while not putting more overhead on the collaboration inside a company. That is what bazel can help you with, keeping your development cycles fast and ensuring high collaborations across the company. It does that by intelligent caching using a global cache for all developers and allowing developers to define relationships between software that is being built to know when a library has changed, what services have to be tested again! This tool is what Google has internally and it recently reached version 1. It was not a dramatic change but a signal that it is ready I think. It feels a bit like Docker in the early days with rough edges and documentation that are hard to figure out, but a tool like Bazel is sure to become the standard as we go into the future of software development. As software is eating the world, making reliable software becomes more important and more difficult to do, believing that we can't automate us of that problem would be a mistake.

## Conclusion

It is funny looking back as some of the things were not obvious and also keeping a journey of a point in time is interesting. I for one couldn't have predicted how big the technologies have become, but I did see some clear signals back then. Docker in 2015 felt awesome and I was really into it, but for many people it was still something that had to be reflected and considered which is understandable, one can not just jump on any new technology that comes along.

One thing I didn't write in the article at that time and which I was looking at later was Docker Swarm which was like Kubernetes but much simpler. Back then I was sure Docker Swarm would win as it was the built-in cluster tool and it was much easier, but **I turned out to be wrong**. If Docker Swarm was the default today, Docker the company had probably been a big success, but when the other big companies saw that early on, most of them bet on Kubernetes as it had a more democratic approached and so it won.

As mentioned choosing popular technologies is not a goal, aka. hype-driven development, but knowing when a technology will give you a clear advantage and if you evaluate it and confirm that it will work for you, is a definite plus in skills! I will still use these tools even if nobody is using them next year, but using something that is popular will get you a lot of value because more people are using it and thereby fixing all the small and annoying things around it.

GraphQL is still new, Bazel is still new, Cloud Run is still new, Firestore is still new, but it is clear that the modern programmer has a pretty good life in 2020 in terms of productivity, everything is cheaper and easier than ever and only good ideas and executing is the to blame soon!



