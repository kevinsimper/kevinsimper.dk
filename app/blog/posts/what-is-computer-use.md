# What is Computer Use

<iframe style={{aspectRatio: '16 / 9'}} src="https://www.youtube.com/embed/J6yukG90ngE?si=XgbkD_ho_rMMWFpA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

[Gemini Computer use just launched](https://blog.google/technology/google-deepmind/gemini-computer-use-model/) and I think it is going to be amazing. So much of programming is making integrations to different systems, and many systems does not have integrations yet.

Also integrations also requires something both searching, combining and inserting records, where a interface often combines those things into one.

So what is computer use? It is the next evolution of Large Language Models, it means that they are able to look at screenshots and take action. Previously LLM's could also look at screenshots (essentially just pictures) and try to predict what to do, but so much of automations is keeping a red thread through your actions. A model trained on a series of actions will be so much better at keeping the task in mind and trying different things while solving the task.

But we are still early!

The Computer Use from Gemini is pretty bare, you have to combine it with some kind of computer, and Google Cloud does not offer anything like that. You can use it with other startups like Browserbase which has recently raised a lot of money, but even their tech does not help much with debugging.

Debugging is knowing what the model clicked on and what it tried to do. You also want to combine it with logged in states and allowing remote control when a Recaptcha shows up.

## Simple Gemini Computer Use Example

Here is an example showing how to use Gemini's Computer Use API:

## The API Call

```typescript
import { GoogleGenAI } from '@google/genai'

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const response = await client.models.generateContent({
  model: 'gemini-2.5-computer-use-preview-10-2025',
  contents: [
    {
      role: 'user',
      parts: [
        {
          text: 'Go to dsb.dk and search for the next train to Copenhagen from Århus',
        },
      ],
    },
  ],
  config: {
    tools: [
      {
        computerUse: {
          environment: 'ENVIRONMENT_BROWSER',
        },
      },
    ],
  },
})
```

## The Response

The model will respond with a function call telling you what to do:

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "functionCall": {
              "name": "open_web_browser"
            }
          }
        ],
        "role": "model"
      }
    }
  ]
}
```

## What You Do Next

1. Execute the action (open the browser to that URL)
2. Take a screenshot
3. Send back a function response with the screenshot:

```typescript
const turn2Response = await client.models.generateContent({
  model: 'gemini-2.5-computer-use-preview-10-2025',
  contents: [
    {
      role: 'user',
      parts: [
        {
          text: 'Go to dsb.dk and search for the next train to Copenhagen from Århus',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          functionCall: {
            name: 'open_web_browser',
          },
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          functionResponse: {
            name: 'open_web_browser',
            response: { url: 'https://dsb.dk' },
          },
        },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: screenshotBytes.toString('base64'),
          },
        },
      ],
    },
  ],
  config: {
    tools: [
      {
        computerUse: {
          environment: 'ENVIRONMENT_BROWSER',
        },
      },
    ],
  },
})
```

## The Second Response

Gemini now sees the screenshot and might respond with the answer:

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "The next train is at XX"
          }
        ],
        "role": "model"
      }
    }
  ]
}
```

Or it might ask to click something:

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "functionCall": {
              "name": "click",
              "args": {
                "x": 250,
                "y": 180
              }
            }
          }
        ],
        "role": "model"
      }
    }
  ]
}
```

## Gemini Actions

The Computer Use API supports these function calls:

- `open_web_browser` - Start webbrowser
- `navigate` - Go to a URL
- `click` - Click at coordinates (x, y on a 1000x1000 grid)
- `type_text` - Type text into focused element
- `key_press` - Press keyboard keys
- `scroll` - Scroll up or down
- `new_tab` - Open a new browser tab
- `close_tab` - Close current tab
- `switch_tab` - Switch to a different tab

### The loop

So the loop you should run it in:

1. Sends task
2. Model responds with action
3. You execute action and send screenshot
4. Repeat steps 2-3 until model returns answer
