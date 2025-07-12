# Next level of LLMs is live

ChatGPT was a next generation of LLM, OpenAI used to have a playground where you could use GPT3 and it was just a textarea where you could have GPT3 continue your sentence. 

It was quite difficult to use, and it did not feel like talking to anybody since it was more like continuing your own sentence, but it felt like magic.

Conversations are now longer than ever, combined with function calls and including a lot of text like files, the old method is beginning to break down. Sending infinite messages back and forth, making sure to use the prefered Context cache, and having to support Voice to text; **you will be seeing very long processing time!**

The next level of LLM api is live, customers are expecting more, faster responses from the LLM models, we want it to be **intelligent** and intelligent means a fast interaction.

That requires that the API server is closer to the model and that it is the same machine, stateless HTTP need to be replaced with Websocket, low latency connection to a machine.

Gemini Live is an example of trying to make an abstraction to make LLM calls faster. It supports both Text and Audio. Every session is 15 minutes and supports restarting the session, but it will be forcely closed and for the client to reconnect. It supports function calls to be able to react quickly to the users questions with sub 1 second delay.

https://ai.google.dev/gemini-api/docs/live

OpenAI also have a Beta version of Realtime

https://platform.openai.com/docs/guides/realtime-conversations

But it is clear from the both Google and OpenAI that we are early, their examples are complicated with no easy examples of trying them out. It means it is time to build!

