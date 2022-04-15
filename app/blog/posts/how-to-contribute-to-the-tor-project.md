# How to contribute to the Tor Project

I really admire and appreciate what the Tor project does, it is a lot of hard work for what can be very ungrateful from many people, but crucial for people that can't speak up!

For that reason I think it is a super awesome to contribute to!

I did contribute very little last year to their now launched support portal, and I wanted to help more, but for several reasons I want to talk about here it didn't become more.

I did however receive the most warmest welcome from the team I interacted with and they even send me a Tor Project t-shirt for my small contributions. So this feedback is not ment for the people as they are the nicest, but more on the technical aspect on how one would get started contributing. This can also be seen as the missing guide for how to get started helping the Tor Project.

## New website has been launched

It is super awesome that their new website has been launched, previously when you landed on the page it was unclear what the tor project was, or also called the onion router. Now it is super clear, the Tor project is for most people a browser that they can surf the web anonmously and securely. That is awesome that the messesing is this straight!

Of course the Tor project is so much more, but it is important to onboard new people and most people are looking for the Tor Browser.

## Finding out how to contribute

Right now if you look on the new page, there is no link to a page mentioning "contribute". That is not that great, it should be easy to find!

You can click the "Documentation" page, that leads to the old website, gives you a long page about a lot of things pointing you in all kinds of directions. You can find a link in the "f." section to "our bugtracker", but it is so easy to miss in the wall of text.

If you click "how to report a Tor bug", you get to a long FAQ page, that at the top says _"This FAQ has been migrated to General FAQ. The answers in this FAQ may be old, incorrect, or obsolete."_. Not that great.

## Finding a bugtracker

If you somehow find the link to the bugtracker, because you want to find the issues to help with or report a bug, you will be meet by the a issue tracker that uses "trac", which was a popular issue tracker many years ago but nowadays very few open source projects uses. There is also a good reason as it is very complicated to get used to if you never have used it before. All text is super small, menu overwhelming and if you click "New Ticket" you are meet with a big box.

![](https://i.imgur.com/4oLFCa4.png)

Not that user-friendly, but you click the link it suggest on "do so", and you get redirected to this page.

![](https://i.imgur.com/RxxMeTL.png)

Where there is no link to sign up on the page, you have to find that small link in the menu that says "Register"!

But the Register page is not that bad

![](https://i.imgur.com/drzeu7v.png)

When you then create a user and logged in, creating a issue looks like this

![](https://i.imgur.com/Y6iEIOU.png)

Which is a lot different from the simplicity of creating issue on Github. This is more for pro users that knows what they are doing and know what the different inputs mean, but if you are just starting out, just don't know and should not care about it. That begs the question then, why are they there?

## They don't use github

There is a link to github on the tor project website. It is not a text link but a very small icon of the github logo, so if you know that logo you can guess it links to their github organization.

But it is a blind alley as it does not contain a correct picture of what activity is going on, it is only a very small subset of project that is there and most of them are not active. The only project that is active is the new https://ooni.io/ which is a recent project.

They did last year try that you could submit a pull request to a github git repo and they would take the "patch" and apply it to their own git repo, but it look like they have gone away from that approach again, probrably because it introduced a lot of overhead and spread out efforts.

## Show me the code

So if the code is not organized on github, where is it then found. I can tell you that they do use git, but finding a link to the repo is very difficult! Going to the frontpage of the bugtracker which is this link, you will not find any single mention of git https://trac.torproject.org/projects/tor.

Searching for git in the searchbar gives you 11k results, where the first is a recent issue that is not related. https://trac.torproject.org/projects/tor/search?q=git

if you go back and look under "Support", you will find a FAQ, but there is no way to search them!? and doing a in-page search gives no results either :/ https://support.torproject.org/

If you look on the ["Documentation"](https://2019.www.torproject.org/docs/documentation) page you can find a section called "For Developers" which leads you to https://gitweb.torproject.org/tor.git?a=tree;hb=HEAD

![](https://i.imgur.com/UZhlCD8.png)

and "Basic instructions for using Git to contribute to Tor software." which is far from Basic, it looks like this. I have no idea how that counts as Basic. https://gitweb.torproject.org/githax.git?a=blob;f=doc/Howto.txt;hb=HEAD

![](https://i.imgur.com/AH2ndPd.png)

Please check out the page yourself, you would think I mislead you!

Let resolve to using Google and search for "tor project git" and only the forth result is the correct answer and clearly there is a problem since the fifth result is a reddit thread asking where is the source!

![](https://i.imgur.com/KgSiIoa.png)

### But that is for the tor client!

This link is for the tor client, the one that you can use to connect to the tor network and host your own node. Basically the backbone of the Tor project, but as mentioned before not the only project in the Tor Project organization and this repo does not contain the website or the tor browser.

You have to click the index or change the url yourself to see all the git repos that they host!

![](https://i.imgur.com/FvI1fHN.png)

https://gitweb.torproject.org/

which gives you a list of a whopping 85 repos at the moment!

![](https://i.imgur.com/a1iChWE.png)

### and now for the biggest surprise

Let say you want to contribute to Kubernetes, the core project, you can find both the source code and issues together here https://github.com/kubernetes/kubernetes

and if you want to help with the kubernetes.io website you can find them all combined here https://github.com/kubernetes/website

so that brings me to the Tor Project, git repos and issues are spread across two systems! Git hosting in one and you have to search and find the responding issues in the "trac" bugtracker!

**That feels incredible ancient and feels like a system that caters for people that has enormouse time or are hired by the Tor Project! Just finding out all these things on your own is a time sinking task and I am writing this post as the missing guide on how to contribute to the Tor project because I have not found any guide that could help me!**

### Most conversation happens on IRC

If you never used IRC, it is like Slack but not owned by a single company. It is awesome that they Tor Project and haven't caved to using Slack. I am personally tired of using Slack for open source projects as it spreads out notifications across multiple tabs, it is like having a gmail account for each Slack community you are a part of!

BUT, a big BUT, that makes it a big barrier for newcomers to help contributing. I am not saying that people shouldn't learn to use IRC, but it means that you have to learn yet another system.

One kudos is that they greatly improved the information about IRC on this page https://www.torproject.org/contact/#irc so it is actually possible to get on fairly easy with the webclient, but again that page is missing a link to their guide on how to use IRC, which you can find here https://trac.torproject.org/projects/tor/wiki/org/teams/CommunityTeam#Communication

## Conclusion

The Tor project is awesome and I will encourage people to help as much as they can, as privacy and security is something we have to fight for and demand! And I know the nature of the Tor Project is privacy and hosting services themselves is the way to do it, I applaud that they do that, but that also means that all efforts for making it user friendly to contribute also lies in their hand and they can't ride the wave of Github and Slack that most people have learnt to use with their wide adoption.

And I don't think much has to change, I just think there needs to exist more clear paths to contribute. Like we messure how long it takes to load a page, that is a important factor, open source projects should be aware or maybe even track how long it takes for a newcomer to make their first contribution.

I used the Kubernetes project as a example and I recently made my first pull request for the kubernetes.io website and it was a blast to contribute because it felt my effort was worth it and it encourage me to make the next change! https://github.com/kubernetes/website/pull/13417

Thank you Tor Project for all the work! Cheers to all the cool people that makes this possible and I hope to help move the project forward!

Kevin
