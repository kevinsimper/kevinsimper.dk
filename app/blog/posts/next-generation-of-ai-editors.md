# Next generation of AI Editors

Cursor and Windsurf has shown that AI can be an incredible enabler. You can quickly ask the AI and add context to your prompts.

Windsurf is new in that it is the most agentic, in that a agent can call functions and follow its own lead.

## Ideas to make it better

- **Multi Agent**

  I want and should be able to create multiple agents inside my repo. I want to create an expert agent that knows how to edit my prisma schema. I want an agent that is an expert in creating visual components.
  I don't want to instruct the agent to do that, it should be based on the folder it is trying to edit in, then it should delegate responsibility to that agent and wait for it to finish.

- **Concurrent agents**

  I want to be able to control multiple agents, I want to be able to edit multiple places in my source code. I want to make a agent that updates the frontend.

- **CronJob Agents**

  I want a agent to listen to a feed and begin working when it sees a bug reported. It should be inside my editors as I need to be able to quickly fix the invitable bug it makes.

- **Learn from my Git Commits lengths**

  Current agents does not at all look at git commit history and learns from how I program. Current agents tries to much to get the code correct on the first try and then fails when it does not work, it should learn my preference for how much code that I am willingly to commit at a time and not try to do more than that.

- **Run tests all the time in the background**

  Current agents forgets to run tests too much, even if you write it in the rules and in the prompt it will forget. It should run and give it as the context for every prompt, the AI should be ultra aware.

- **Suggest to refactor**

  The AI Editor should suggest to do a refactor commit. A commit that does not add new functionality but only tries to refactor something into a better structure. This is something very oppiniotated, so it should try and ask me if I agree with the new structure, then it should keep a document updated with my refactor preferences.

- **Allow me to work from my phone**

  Being able to only prompt my repo from my computer is really limiting as I often get good ideas when I am away from the computer or I am thinking of something I want validated.

- **Ask two/n-th models the same question and choose the best answer**
  
  Gemini 2.5 Pro is good for straight answers but struggles on harder problems. Claude 3.7 Thinking is slow but good, but will often edit other files than asked to.

- **Documentation**

  How hard is it to download documentation locally and do RAG and make me learn by showcasing the documentation. Learning to read documentation is a essential skill of a senior developer.

- **Export conversation**

  In windsurf there is not even a copy answer button. I want to be able to export whole conversations and share with colleagues.

- **Find my weakest areas**

  I want to be able to ask the AI to find the weakest areas in my code and give me exercises to improve.
