# Continuous Deployment with Cloud Run and Cloud Build - workshop resources

A friend asked me for what resources I made during the workshop i did and if he could use some of it, so I prepared this for him :) I hope you can also use it!

You can see the original event here: https://www.meetup.com/gdg-cloud-copenhagen/events/266466598/

You can use for inspiration and what a schedule could look like. I do make these materials from scratch each time, because I think it is difficult to generalize and I put a lot of energy into making it great and personal. A workshop for me I also a lot about the person presenting and how he/she makes the whole process of learning feel.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Meetup Description](#meetup-description)
- [Sign up form](#sign-up-form)
  - [Google Forms](#google-forms)
  - [Ti.to](#tito)
  - [EventBrite](#eventbrite)
- [Email 1-2 days before the workshop](#email-1-2-days-before-the-workshop)
- [Content at the workshop](#content-at-the-workshop)
- [Slides for the workshop](#slides-for-the-workshop)
- [Considerations with materials and attendees](#considerations-with-materials-and-attendees)
- [Food and drinks during the workshop](#food-and-drinks-during-the-workshop)
- [Budget](#budget)
- [Follow up email](#follow-up-email)
- [Conclusion](#conclusion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Meetup Description

Here is how the meetup description can look like:

---

Hi everyone!

In this workshop we are going to learn about Google Cloud new product called Cloud Run which was launched this year. It is a super interesting product that allows you to run any Docker container and you only pay for what you use! Meaning this is the perfect product for developers that are making new product, startups or even for side-projects!

Sign up here: LINK TO FORM

In this workshop we will start from scratch, build a simple application and then launch it on Cloud Run. Afterwards will we try to use Google Cloud - Cloud Build to build our app each time we make a commit. This would be continuous integration as each time we make a chance we ensure that everything is building and works. Lastly we will connect Cloud Build to Cloud Run so that each time we commit it will automatically deploy our latest chances. This is incredible powerful as we are able to deploy something with very little overhead and pay nearly nothing for something high value, keeping backend online at all times!

This workshop is non-profit and it costs 50 kroners to cover renting the room and for the drinks and food. All details will publish like this last workshop
LINK IF YOU HAVE IT TO PREVIOUS EVENTS

Schedule:
17:00 Doors Open
17:30 Welcome
17:40 What is serverless and Cloud Run?
18:00 Exercises with Cloud Run
18:30 Sandwiches and drinks
18:50 Continuous Integration and Continuous Deployment with Cloud Build
19:10 Exercises with Cloud Build
20:30 Follow up talk and networking!

Before the workshop it would be best if you signed up for Google Cloud. It is free and will not cost you anything monthly, but it takes a few minutes as you have to confirm your mobile number.

Who is behind and why?
DESCRIPTION WHY YOU ARE DOING IT AND ARE PASSIONATE ABOUT IT

Where can I read more about Cloud Run?
Yes, you can read more about Cloud Run here https://cloud.google.com/run/ Our community friend Martin Omander has also made this cool series on youtube about Serverless Toolbox, they are pretty funny https://www.youtube.com/playlist?list=PLIivdWyY5sqKiWvnaA5A8F3UQ0Xu5i49U
I also have two talks about serverless and cloud run that shows a bit what we are going to go through:
How Cloud Run is the final destination in my Cloud Native journey https://www.youtube.com/watch?v=oY9Mv9PHu7U
Why serverless never really worked for me until now! https://www.youtube.com/watch?v=viGxI22fOuo

Best regards ORGANIZERS

If you have any questions please reach out to me either here or on mail. YOUREMAIL

Remember to sign up on the link here: LINKTOFORM

## Sign up form

I use meetup.com for all events but for workshops you need more informations and their email so that you can write them more information before and after.

You need also to know:

- if they have experience with the topic already
- if you provide food what Dietary Requirements they have.

### Google Forms

A great tool but you can't limit the amount of responses and on a workshop there is often limited amount of space. You can't easily charge people either. I have done charging with Google Forms where I would request payment from each form submissions manually through something called MobilePay in Denmark, which is like Venmo or Paypal. This is often the cheapast as you are allowed to transfer money for free with MobilePay in Denmark.

### Ti.to

It allows a lot of customization and is really great! It is easy to get started but the menus can be complicated as there is many things you can customise. They also have lower fees for non-proft. You have to provide your own payment provider. This can be cheap with 1% to ti.to and 1,4% + 1,8 kroner to stripe. So of 50 kroners it cost 3,00 kroner.

### EventBrite

It is a bit expensive in terms of fees and feels old, but it works but for the ticket I sell 50 kroners (6.7 USD), EventBrite would take 5,5 kroner, more than 10% of the price! That is ridiculous in my mind.

## Email 1-2 days before the workshop

I also made an email for what the attendees need to prepare before the come:

---

Hi everyone

Thanks everyone for attending tomorrow, really looking forward to it!

Location:
HOW TO FIND THE LOCATION

LINK TO GOOGLE MAPS

Prerequisites to have done before tomorrow:

- You should have a Google Cloud account or sign up here https://cloud.google.com/
- Bring a computer with charger, it doesn't matter if it is Mac/Win/Chrome
- If you want to try it out locally have Docker-for-Desktop installed, but it is not necessary, but I recommend it:
  - [Mac](https://docs.docker.com/v17.12/docker-for-mac/install/) - I recommend installing with brew.sh "$ brew cask install docker"
  - [Windows](https://docs.docker.com/v17.12/docker-for-windows/install/) - I recommend installing with Chocolatey https://chocolatey.org/packages/docker-desktop/2.1.0.4#files
  - [Linux](https://docs.docker.com/v17.12/install/linux/docker-ce/ubuntu/#install-using-the-repository) - That is native docker
- Github user account, this is for the Continues Deployment examples https://github.com/

I also wrote a bit about what I think a good workshop is :) https://www.kevinsimper.dk/posts/what-is-a-good-workshop

If you have any questions please let me know! If you can't find the location tomorrow, give me a call on TELEPHONE NUMBER

What will you build with Cloud Run? 😄

## Content at the workshop

In this video I go through all the steps the attendees needs to do in one go:

https://www.youtube.com/watch?v=GhSAQ19f4HA

<div style="position: relative; padding-bottom: 56.25%; padding-top: 25; height: 0">
  <iframe allowfullscreen frameborder="0" src="https://www.youtube.com/embed/GhSAQ19f4HA" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

I have also written a blogpost with screenshots of each step:

https://www.kevinsimper.dk/posts/continuous-deployment-with-cloud-run-and-cloud-build

## Slides for the workshop

I wrote some simple slides in markdown. This is mostly to show at the start, in the break and at the end to round up. Most of it will be the workshop host showing his/her screen.

https://github.com/kevinsimper/cloud-run-cloud-build-workshop

## Considerations with materials and attendees

Considerations I took with the content:

- It should be possible to do from any computer.
- We should not try to cover too much.

I also link to my blogpost about workshops. https://www.kevinsimper.dk/posts/what-is-a-good-workshop

That is because workshops are typically run where an instructor is typing in stuff on the screen and students are typing after, essentially copy and pasting, they don't learn that much doing that!

Therefore doing the workshop, give out multiple challenges that allow the people that know maybe the stuff already to do something more advance, something that you may not need to help them with that much because the challange will be for them to also look it up for themselve and then you can help them.

In my case I use CloudShell, say that a person is already familiar with Cloud Shell challenge them to do it on their own computer or tell them to figure out how to use the `$ gcloud cloudshell` that will enable them to use it from their own shell and transfer files back and forth.

If those people have to do the exact same thing as everyone else it will be boring for them so a great workshop allows wickleroom and if they fail they can still resort to the easy method and catch up to the others.

## Food and drinks during the workshop

Depending on when the workshop starts it is a good idea to have some drinks and food prepared so that the attendees don't get thirsty or hungry while the learn. This is not a requirement but it makes for a great experience as you can have a small break and eat something together.

I will buy some pizza's, around 1 pizza for each two people and I will buy a 24 case of diet cokes for the event.

Remember to bring some paper towels and paper cups as the venue where you do it may not have it.

## Budget

Here is a budget that I made afterwards. I think it is a good idea to let people know what has been spend and what has been received, transparency creates trust, espcially because workshops are a lot of work and we often do it for the fun and not for the money.

https://docs.google.com/spreadsheets/d/1nu52zrMkksZepIFcB0p72LLeb0Ng5_1lpM-xDxNnSws/edit?usp=sharing

## Follow up email

I also like to send a follow up email that can include follow up materials, links to resources and in generally just a thank you for participating! Also celebrating if people have been extra good at helping each other.

---

Hi everyone

Thanks for participating in the workshop Tuesday, it was a really good experience teaching and seeing everyone helping and I hope that you all got something out of it!

If you have any questions please let me know!

I also tried to record what we did at the workshop if you want to go through some of it again.

It is here on Youtube: https://www.youtube.com/watch?v=GhSAQ19f4HA

I also made the budget here, WRITE THE RESULT HERE

LINK TO BUDGET

Also our next GDG Cloud Copenhagen meetups is on Monday at Karnov, they are pretty cool and there is going to be 3 speakers https://www.meetup.com/gdg-cloud-copenhagen/events/266399945/

LINK TO OTHER RESOURCES

Hope to see you again another time!

## Conclusion

It does take a lot of work planning a workshop, but it is so much fun as you can get to go deep and learn with other people in your community.

I as a workshop teacher also learn a lot each time, I learn what is easy for people and what is hard. The Protégé effect is also very much true, ["Why teaching someone else is the best way to learn"](http://ideas.time.com/2011/11/30/the-protege-effect/).

I am also happy when somebody make a mistake during the workshop, the student don't feel good about it but it is good because he/she is in a environment where there is a lot of people to help and you get to understand also how the person got there and you get challenge to get them out of it.

I can only say: Try it out, it is the best feeling! 😄
