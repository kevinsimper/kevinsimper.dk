# My experience using Claude Code vs Gemini CLI

### Missing Plan mode

It is weird that gemini cli has no plan mode. In Claude Code you can do plan mode with two shift tabs, and it makes Claude present a plan after some investigation.

### Less readable output in Gemini

Gemini

<img src="https://i.imgur.com/b8DVbdW.png" alt="image-20251127121908186" style={{zoom: '50%'}} />

Claude

<img src="https://i.imgur.com/KJLwQOp.png" alt="image-20251127122128824" style={{zoom: '50%'}} />

The missing space in Gemini makes it look cramped.

## Plans are confusing

Google has many plans, and at the moment they don't work with Gemini CLI 

Only Google AI Ultra has access.

Google also has

- Google AI Plus
- Google AI Pro
- Gemini Code Assist Standard
- Gemini Code Assist Enterprise
- Antigravity
  - Has no plans yet, but has Gemini 3 Pro

## Formatting is worse

Gemini is far worse at getting the indentation and for formatting correct.

<img src="https://i.imgur.com/WZpMeNt.png" />

## Gemini saves pasted files

That is pretty nice.

Also configuration once you have done:

```
{
  "tools": {
    "enableToolOutputTruncation": false
  },
  "model": {
    "summarizeToolOutput": null
  }
}
```

