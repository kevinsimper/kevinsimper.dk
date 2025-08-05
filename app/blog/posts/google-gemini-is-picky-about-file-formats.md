# Google Gemini is picky about file formats

The current forms of LLMs are reached by an API call, and to make them easier to work with they are supposed to be stateless. That also means they are not more clever than the people that programmed it.

That means that Google Gemini only supports png, jpeg and webp. That is peculiar. 200 IQ but can not read common images like .gif, .heic, .tiff

That gives us two options:

- Predictable: convert it before giving it to the LLM
- Unpredictable: give the LLM access to file storage and have it use tools to convert it itself

We are right now in v1 of LLM interfaces. We are seeing tools like Claude Code (local code development) and Manus.im  (online saas) that works with files.

## V2 API of LLM

Setting up file access to a LLM, defining tools and then returning a response, that is the next version of LLMs API. Developers want to have something easy, but also predictable and that is not what the LLMs are now.

That is why we do not have the V2 of LLM API's yet. We can't be sure that it will use tools to convert a GIF to jpeg so it can read it, or read the raw display bytes.

### Research

OpenAI has Code Interpreter that allows it to write Python, https://platform.openai.com/docs/guides/tools-code-interpreter#page-top
But it only can write python code.

Gemini has Code Execution, but they are more calculating with numbers
https://ai.google.dev/gemini-api/docs/code-execution