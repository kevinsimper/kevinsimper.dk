# Streaming an AI prompt with Cloudflare Worker

Today I want to show how streaming an AI prompt response from a CloudFlare worker. We have been used to know that ChatGPT streams the response of the large language model, it is pretty mesmerizing and adds to the fealing of a thinking mashine that you can see the dialog as it is coming.

## Simulating the response

We don't want to call an AI model during development just to simulate the LLM sending the events.

We can work with streams in Node.js by creating a `TransformStream`, that will allow us to both write and read the stream.

```javascript
let { readable, writable } = new TransformStream();
let writer = writable.getWriter();
```

Then we can instantiate a `TextEncoder` which takes characters and turns them into bytes.

```javascript
const textEncoder = new TextEncoder();
```

To get some data we create a loop and generate a random number

```javascript
(async () => {
  for (let i = 0; i < 20; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    const jsonSerialized = JSON.stringify({ number: randomNumber.toString() })
    writer.write(
      textEncoder.encode(jsonSerialized + "\n")
    );
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5-second delay
  }
  writer.close();
})()
```

Here we create a loop and write a JSON string. We want it to be JSON so that in the frontend we can do some logic if need be.

At the end we close the writeable stream indicating no more data is coming.

This loop will continue to run, but we want to return the headers to the client and tell that this data will be coming as an event stream.

```javascript
return new Response(readable, {
  headers: {
    'Content-Type': 'text/event-stream'
  },
});
```

Notice that we are returning the readable part of the transformstream.

And for Cloudflare to know when the HTTP connection can be closed we wrap the function that writes to the transform stream in a `context.waitUntil`

````
ctx.waitUntil(// beforehand promise)
````

This is handy since normally Cloudflare would close your worker when you have returned a response. [https://developers.cloudflare.com/workers/runtime-apis/context/](https://developers.cloudflare.com/workers/runtime-apis/context/)

### Full example

````typescript
export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    switch (url.pathname) {
      case '/': {
        return new Response(
          JSON.stringify({ message: 'Welcome to the API!' }, null, 2), 
          {
          	headers: { 'Content-Type': 'application/json' },
        });
      }
        
      case '/streaming': {
        let { readable, writable } = new TransformStream();
        let writer = writable.getWriter();
        const textEncoder = new TextEncoder();

        ctx.waitUntil(
          (async () => {
            for (let i = 0; i < 20; i++) {
              const randomNumber = Math.floor(Math.random() * 100);
              const jsonSerialized = JSON.stringify({ number: randomNumber.toString() })
              writer.write(
                textEncoder.encode(jsonSerialized + "\n")
              );
              await new Promise(resolve => setTimeout(resolve, 1000)); // 0.5-second delay
            }
            writer.close();
          })(),
        );

        return new Response(readable, {
          headers: {
            'Content-Type': 'text/event-stream'
          },
        });
      }
    }
  },
} satisfies ExportedHandler<Env>;
````

## Frontend receiving the stream

In the frontend we want to make a `fetch` request to the backend and instead of `response.json()`, get a readable stream for the body with `response.body.getReader()`.

We can do the reverse of turning characters into bytes by creating a TextDecoder and saying which charset we used to encode.

```javascript
const decoder = new TextDecoder('utf-8');
```

Then in a while loop we can read from the body

````javascript
while (true) {
  const { done, value } = await reader.read();

  if (done) {
    console.log('Stream complete.');
    break;
  }
}
````

Inside that while loop we can decode the value, and by adding `{stream: true}` we do avoid if the stream has emitted non full characters.

Finally we can append it to a dom element

```javascript
const chunk = decoder.decode(value, { stream: true });
outputElement.textContent += chunk;
```

### Full frontend code example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Streaming Output</title>
</head>
<body>
  <div id="output" style="white-space: pre-wrap; font-family: monospace;"></div>
  <script>
    async function streamData(url) {
      const outputElement = document.getElementById('output');

      try {
        const response = await fetch(url);

        if (!response.body) {
          throw new Error('ReadableStream not supported!');
        }

        const reader = response.body.getReader();

        const decoder = new TextDecoder('utf-8');

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            console.log('Stream complete.');
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          outputElement.textContent += chunk;
        }
      } catch (error) {
        console.error('Error:', error);
        outputElement.textContent = 'Error: ' + error.message;
      }
    }

    streamData('/streaming');
  </script>
</body>
</html>
```

## Returning the HTML inside a worker

You can then inside the worker, because wrangler is using esbuild, import a HTML file and return the response

````javascript
// At the top of your index.ts
import html from "./stream.html";

// inside your fetch handler
case '/view': {
  return new Response(
    html,
    {
      headers: { "Content-Type": "text/html" }
    }
  );
}
````

## Conclusion

Now you can test out and continue working on how you show the AI response to the user, giving them the feedback as early as possible. I hope you also see how cool Cloudflare workers are in implementing something fast really simple. Getting started with Cloudflare Worker with their CLI wrangler is incredibly fast.