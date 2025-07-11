# Claude Code review after a month

When Anthropic annonced Claude 4 and together with Claude Code I was pretty much on board. I had been using Windsurf and it was funny how you learnt how each model behaved and it was clear that Claude Sonnet 3.7 was the most intelligent.

With Windsurf it worked like this:
Claude Sonnet 3.7 was however the model that most likely would edit another file without being asked to. Gemini 2.5 Pro would pretty reliable edit a file, but would selfdomly go out of its way to do something smart and think bigger.

With Claude Code:
I am not using Windsurf anymore, my workflow with Claude Code solely in the commandline is better. My biggest gripe with Windsurf how it was frustrating wainting for models to respond. With Claude 4 Opus it can work for longer by itself, and with having multiple tabs in your terminal open can immediately switch to the next thing you had in mind.

I signed up for Claude Max 20x and it has been a good return, it cost 180 euro per month, but with a tool call [ccusage](https://github.com/ryoppippi/ccusage) I can see that I use for way more like that. I tried the first day of using Claude Code with just API usage and in a 1,5 hour usage I spent 9 euro and that was on the cheaper model Sonnet 4, so I could see the subscription easily be worth it.

It is clear that Claude Code and Claude Opus 4 work great in tandem, Opus 4 is surproir in coming up with tool calls to predict what files it has to look at and Claude Code makes it easy for it to call the functions it needs to.

Final thoughts, Claude Code is beginning to have a harder time navigate the bigger codebase. With `cloc` I can meassure the codebase to 58 thousand lines of code. I have 6 CLAUDE.md which helps giving it hints, but it
I feel it allows me to do what I am good at, being a Lead Architect since neither Claude Code or Opus 4 makes even attempts in improving code structure.

But [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) is here to stay.