# How to deal with long running agent calls?

ChatGPT type conversations are based on quick back and forth, it was often depending on the users input and quick feedback.

Since many LLM platforms has introduced deep research which is based on long running tasks. They go out fetch a lot of resources on the internet and makes a long analysis, often comprising of multiple reports.

### How to build it technically

Normal webapps are built with the idea of Request/Response, and if the user closes the browser the response is cancelled and not stored. That means the user will have to do the actions again.

It has worked really well for LLM calls with Request/Response, we can call ChatGPT/Gemini based on the users request and return the response from the LLM directly and save it once it it done to the database so we can show it later.

So what happens if we have long running calls like deep research and webapps? **Problem arises**: we can't cancel valuable LLM calls just because the users closes their browser

Other ways other solves it: *have the client on the users computer*. With Claude Code it runs on your own machine and the long running LLM calls depends on your machine being turned on, and users understands that.

### Can't we just use Background jobs?

It is pretty common to have background jobs in webapps. Most common is emails, the user clicks send email, and webapp puts a job in a queue which is then picked up by a background job which ensures the email is sendt reliablely and without having a slow response.

The problem with background jobs is that they are mostly broken up into short pieces so they can be executed reliably. Long LLM calls also depends heavily on state and continuing. It is non determinist at the start how long a LLM call will run for, it all depends on how many *function calls* and turns it chooses to take.

That is is not a great fit for background jobs like Celery/Sidekiq.

**You could** break the problem down into individual tasks, but a task queue is not for many sequatial tasks. It would be like transcoding a movie one second at a time, but having to load the full movie every time.

### Requirements

Let us turn it around and look at what is our requirements since the normal methods like Request/Response and Backghround Tasks does not work.

- It has to be streaming feedback to the user
- Users should be able to help the agent
- Response from LLM is stored for viewing later

With the requirement we can design a solution that will work.

### Solution

We first need a batch platform, something that allows for longer compute. That can either be Google Cloud Run Jobs, or Cloudflare Workflows.

Then we need a live chat, something were we can update, and the updates are reflected at the users frontend. Here Firebase a option, also Cloudflare has Cloudflare Agent or the lower level Cloudflare Durable Object.

Last we still want to store the results in a SQL database of such. Here Google Cloud has Cloud SQL and Cloudflare has D1.

![](https://i.imgur.com/pPwizgx.png)

```
User -> WebServer: "Can you order dinner?"

WebServer -> Batch: Start Agent call

Batch -> Batch: Calls LLM

Batch --> User: Update WebSocket "Finding places"

Batch -> Batch: Execute LLM Tool calls

Batch --> User: Update WebSocket "Evaluating spaces"

note:
User Disconnects and Reconnects

Batch --> User: Sends history over Websocket

note:
As the user reconnects the batch sends all the history to the user, eg. "Finding places", "Evaluting spaces"

Batch --> User: Update WebSocket "Made reservation for you"

Batch -> WebServer: Save conversation to Database
```

You can extend your own on [https://swimlanes.io/](https://swimlanes.io/)

## Conclusion

You can start fine with developing your LLM calls in normal serverless Request/Response style, but once you begin wanting to give the LLM tools and have true agents, this is the considerations you have to take.

Users are very accustomed now to constant feedback of what agents does. We have to step up our game to make these agent flows good, but with a little work we can really elevate what the agents can do.

It is clear with examples of Claude Code that long agentic calls are possible now, and having the Agent be able to work for longer and think is really beneficial. Once-shot LLM calls with perfect prompts are last year way of solving the problem.