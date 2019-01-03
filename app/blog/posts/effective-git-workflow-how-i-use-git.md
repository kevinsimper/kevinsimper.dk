# Effective Git workflow - How I use Git

Having an effective git workflow means being productive and a collaborative team member, sharing early and often makes everything easier, but getting there and getting used to the workflow can be a challenge and often also requires to change the mental model.

There are multiple reasons why sharing your code early is often is important and ranking them is pretty difficult, so here is the list of reasons.

And what I mean by sharing is making the code accessible online, that can be multiple ways, but is often as simple as `git commit` and `git push`.

## Pull Request after the first commit

You should as soon as you have created the first commit make a pull request for that feature you want to build. It can be quite intimidating thinking about making a PR that quickly because it feels like exposing yourself. But this is actually the most effective tip I can give, the reason is when you create a PR:

- You communicate with your teammates what tasks you are working on. No need to tell them in slack or assign yourself to a ticket, simply open a PR and reference the tasks you are working on, two birds with one stone!
- You have a public thread to share thoughts on the code you are making
- It forces you to be concrete in what task you are actually trying to solve, preventing a PR that tries to solve 20 tasks as mentioning that in the description makes it pretty obvious.
- The CI/CD system has a way to do its thing and give you feedback on the PR
- The PR shows you potential merge conflicts right away upfront
- You can ask a team member for help without doing a lot of work first or telling them the branch name

All these benefits you get if you create a Pull Request early and not first when you are done.

## How to create a Pull Request easily

Github has made this tool called `hub`, which is a CLI tool that extends `git` with extra functionality. When you install `hub`, you can easily just use it as `$ hub`, but better is to make an `ALIAS git=hub` in your bash config.

Now you can call `git pull-request` and this will open your default text editor, often vim if you are on a mac, which is not that useful if you are just starting to program. You can change that by running `git config --global core.editor "code —wait"` or [read here](https://stackoverflow.com/questions/30024353/how-to-use-visual-studio-code-as-default-editor-for-git).

Boom and you can now create pull-requests without clicking any buttons or using any browsers, this is efficient!

### Opening Pull Requests that you have created

Another helpful command `hub` provides is the ability to open a branch on Github with a simple command like `hub browse` or `git browse`. This will open a link in your default browser and you can then click on the link that to that pull-request that follows that branch.

No more navigating to the "Pull Request" tab on the Github repo to find your own PR.

## Never stage everything aka. `git add .`

This is another important tip in being effective, as it seems more effective to quickly add everything in one simple command, but doing that adds everything unintended as well. When you add everything, it makes it so much harder to write a small and concrete `git commit` message, that the description often ends up being vague instead of concrete.

What you should do instead:

Find a program like `SourceTree` or learn how to use `git add -i` (not recommended for beginners) and only stage small related changes at a time. If you made multiple changes you can and should still break it up to multiple commits! It is not uncommon for me to write two or three commits breaking my changes into descriptive commits.

## Add bash shortcuts for commands you use often

You can add shortcuts for anything in bash and it is a super useful thing to do to avoid slow and repetitive typing.

My shortcuts to git is as this:

```
ALIAS git="hub"
ALIAS g="git"
ALIAS p="git push"
ALIAS pull="git pull-request"
alias sourcetree="open . -a 'SourceTree'"
alias st="sourcetree"
m() {
  git commit -m "$@"
}
trigger() {
  git commit --amend --no-edit && git push -f
}
```

You can see I can type most commands with one letter, which lets me execute commands after each other easily.

## Commit often and rebase later!

It can often feel difficult committing often at the start because you feel like the code is not ready to be shared or it does not solve what you intended to do!

Two things regarding that:

1. Your code may possibly never solve the task/issue and by not committing you lose your history of what approaches you have tried taking. You also lose the ability to push your code to a colleague and have him understand and help midway.

2. You need to timebox the task you are working on! Sometimes a task takes longer than you thought it would do and often not your thought. It can be that there needs to be changes something first before the task can be solved. By committing early and often and along the way you can end your task earlier and change the scope of your Pull Request so it is smaller and fits the new task. You can then get it approved by your team and merged and you can now start a new Pull Request.

   Compare that with the opposite where you don't commit and you instead end up having to extend your task to multiple days, having to excuse yourself to your team and product manager why you are still working on the task. That is not effective.

Now if you committed a lot at the start and you finished the task, you can look back at the commit history and use the command `git rebase —interactive` to not only combine but also remove commits from history, making it look like you are a pro that solved the task quickly and without any detours. When you rebase the PR is also then tidy and only contains the code related to the task making it easy for your teammates to review it.

And don't worry about your teammates seeing your ugly attempts of solving a task. Either they are too busy hiding their own attempts that they don't have time to look at your code or the person/team lead appreciates you working in the public and being open to feedback early.
