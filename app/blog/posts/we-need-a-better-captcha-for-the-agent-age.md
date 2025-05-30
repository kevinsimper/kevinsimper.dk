# We need a better captcha for the Agent age

You want to put a AI agent online so that people can try it out and benefit from it. The easiest way would be to require everyone to sign up as a user. We know that is not a good user experience, it takes time and may be too much effort if it is just for a search on a website.

The solution is often a captcha, a small widget that tries to detect if you are a real human. It often relies on huristics and metrics. In the GDPR ages, they are forced to not save personal data, but it then makes it harder to disguinsish who is the good and bad if you can't have history on a user.

Why do we need captcha? Two reasons:

1. to protect the valuable data we have
2. prevent abuse which cost money

What are our options to prove that we are human that we can use, that is also cheap and fit our usage case for search:

## Captcha

There are companies like Recaptcha from Google, hCaptcha and Turnstile from Cloudflare. They try to cheaply guess if you are a human, but relies on the human doing a hard challenge like solving a visual identification problem. Most people don't want to solve other hard problems while they are trying to solve their own problem.

## DIY limit usages per day

You could make your own solution that tracks how many times your feature has been used, hence preventing any more usage after a threshold. If you limit it to a certain amount total per day and a max per hashed IP, you could make a half decent solution. A big downside is that you would have to constantly monitor and adjust it based on your popularity and often have poor experience once you have to disable it.

## Login with external provider

This is a solution that relies on a 3rd-party, but login with Google or Facebook is a solution. It only takes one click and most login providers have today an anonomous option where the website you log in to does not get any information from the third party.

## Send one-time-code with email

A solution can be to have the user login with email, that can be a fine solution since it requires a step and it is not hard problem, however spammers can often have access to large amount of emails, and beginning to filter on which email domains are good and bad is tough.

However not really quick if the user just want to do a web search and/or be anonymous 

## Sign in with Ethereum

Blockchain have now been around for 10 years and solutions to sign in with your crypto wallet has now formulated as a standard that many wallets now support. https://login.xyz/

This is low effort since signing a message with your browser wallet is quick and can be anonymously if choosen a wallet with a anonymous id. This is probrably going to be the viable solution in the future, coming that it will also be possible to do a microtransaction like a postage stamp, something that would really prevent abuse.

## Web application firewall

Cloudflare and many online has a possiblity to have a firewall active, that could be used to prevent abuse, the problem is that firewalls has little or no information about the application they are serving. Scammers are able to get around this using many different IP's and making it impossible to differentiate who is the legitimate users.

## Creditcard payment

Often the proven way of proving you are a legitimate user, but it has several downsides. Consumers has high protections against abuse, so if a consumer with ill itentions can make a chargeback, often costing a lot of money, so even charging a little can end up being really expensive. Scammers can also have access to hacked creditcards.

## Goverment ids

In the EU, a lot of contries are issuing electronic online ids that can be used for anything online. In denmark it is called MitID (MyId) and it is exactly like Oauth with 2factor authentication. It cost around $0.2 USD for every login a user does on the providers page, but you are sure that abuse is almost minimal. Privacy at the provider side is high, no information is shared, but the goverment of course has potential information.

---

All these solutions has flaws and prevents more solutions out there to be developed. It is not so much the protection of valuable data, but the abuse with AI systems can be really expensive.

Adding to the problem that many Cloud Providers like Google Cloud and Cloudflare have not spend limits, allowing you to rag up huge amount of bills of many $10,000s of thousands, and they seem very little interested in solving the problem.

A good system would be a combination of all the above, a good anti-abuse-system would be aware of usage, different IP's and allow users to log in to use the system if the system has detected high abuse at the momement.

Current capcha systems has no fallback, they don't allow the good user any alternative than keep filling in Captchas. Todays captchas has little application knowledge of what they owners consider acceptable usage of their systems. Recaptcha, hCaptcha and Turnstile allows no configuration, you can only see stats of what they deemed okay. That means that everyone who implements captcha has to reinvent the wheel of a good anti-abuse system.

We need a better solution for the new AI agentic age, that is privacy focused, easy to use and cheap for new developers to get started with!