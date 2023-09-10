# Bun is the new leap forward in TypeScript

[Bun version 1](https://bun.sh/blog/bun-v1.0) has just been released and it looks like it is going to be the new default runtime for TypeScript.

Bun takes a lot of best practices and oppinonated choices and brings them into one package, that is everything from hot reloading, testing, module loading, package managing and on top being crazy fast.

It has been pretty crazy to follow how quickly they have been able to match Node.js features 1-to-1 in basically under 1 year. They have also within the last couple of months made all the popular libraries like Next.js and Prisma work in Bun.

Node.js is fast thanks to Chrome V8 JavaScript Engine, and I think many had gotten the idea that there was not much more perforamance to gain further, as V8 "probrably" was as optimized as it could.

### Faster IO performance

If you have been following Hacker News, you will also have noted a lot of Redis competitors clamming to be much faster. That is because of new Kernel system calls called [io_uring](https://en.wikipedia.org/wiki/Io_uring), so if your application does not use those underneath, it is automatically going to be much slower than programs that does.

Bun also seems to have implemented those new faster system calls and are able to show incredible performance. Most incredible for me is the startup time, I have noticed the 0,3 second for a "hello world" and wondered why other languages was faster by default.

---

So all in all, Bun.sh looks to be a winner. They have taken an opponionated approach based on a lot of best practices which I think the majority of Node.js developers will like. That is to the contratry of Node.js which has opted for keeping the "Core" functionality slim and instead asking people to find packages that does what they want themselves.
It is the same reason that many people like Ruby On Rails which also has a lot of oppoinited choices and things built in.

Hooray for the continue improvement, exciting times ahead!

Watch out for all the job ads mentioning Bun.sh going forward.