# Going to production, harder than it seems! What to do about it?

You are supposed to do a simple feature, it is only talking to a single API, how long can it take? Let us just tell the others that it will take 1 week to implement. 2 weeks later you are still working on that feature, what went wrong?

1. You did not handle all error states
2. You did not have the right to debug
3. You did not have the right permissions to properly test the endpoint
4. You did not train the users of your feature how to test if it works as they asked for
5. The system that was supposed to talk to your feature fails before it reaches your service
6. You did not understand the requirements properly
7. You choose a technology that you did not understand properly
8. You were sidetracked because of a previous feature that now has a critical bug that you have to fix
9. You spend too much time debugging and monitor the log
10. You did not plan how to release the new feature that had to replace an old version
11. You did not plan that a refactor was needed to make the feature

#### “Testing in production”

You should test all you can locally and in staging but a feature is only properly done when it is in production. Saying a feature is anywhere done before it is actually shipped is an understatement.

Get the ball rolling early and deploy a minimal version to production as early as possible! This will highlight any dependency you may need help with from others, this you can get help with alongside that will not slow you down if you first figure it the day before release.

#### Get your logging framework right early on

Logs are vital to debug and locally it is easy to follow, there is not much traffic and you can follow each line easily.

However in production, it is a nightmare, there is actual traffic and your normal loglines will fly by faster than you can read them!

You will need your logging framework to do:

- Log in JSON
- A lot of logging services will allow you to filter on individual properties, thus making it easier to filter.
- Attach all logs to a single request
- Whenever a request comes in, generate a unique ID and every time you log anything related to that request, log it together with that id. You need this when your web server can handle multiple requests at a time, you will not know which logline relates to which request!
- Log in different log levels, not all logs are of equal importance.
- This means you can filter them based on severity, say you want to see all errors that have happened. This is not possible if your code doesn’t distinguish between log.error and log.info.

## Be extremely careful with if (env === prod)

It is more difficult but considers your service as it is in production always, as soon as you begin making a difference you begin making a matrix of different ways your app can work and you need to explain to all what the difference is between prod/staging/dev/test/etc. and nobody can remember.

Say you use Twilio in production likesendSMS(), don’t add in your code if(env === prod) { sendSMS() } else { // do nothing because staging}. Only the developers will remember and your staging will begin to drift away from looking like production. 

The solution is in staging also use Twilio exactly like in production. Create another account and use those instead. This will make your application predictable. Predictable is key for quick development!

## Do not connect to production from your own machine by default

You should have an expectation of how things will work before you start. Are you working with Twilio, their API documentation will give you an expectation of how it behaves and work at the start with that. It will force you to develop tests properly as it is the only way to know if it works.

You are allowed to connect to production API’s while you make the feature, but as soon as you don’t work with that API or database, delete the credentials! If you don’t you will likely develop your app like with crutches.

## Don’t test in your browser

It is simply too slow to test in your browser manually. You do not notice it as you can get used to it but clicking with the mouse around in your app is the slowest way to make sure your app works properly.

If you make a new feature and do it like that, you also force your colleagues down that path. It is totally easy to make a new feature and test it in the browser. The problem arises when another person has to read your code and alter/extend it and they have to be sure that nothing breaks. It will take them the double time to make that change because they also either have to write the first test for that feature and ensure it was how it was intended to work or double-check both the original code and the new code they wrote.

## Think of how to build a watchdog

In IoT projects you have what is called a watchdog, you have the main CPU which will do the computation and then another CPU next to. The watchdog CPU will have a rule that if it is not called every X seconds it will reboot the main CPU. In a perfect world, everything will run forever, but it is nice to have a watchdog so in an IoT project you don’t have to manually go out to reset the device.

The same can be done in normal development. Say you depend on a webhook to tell you when something has happened. In a perfect world, the webhook would never miss calling your code, but in reality, there are 10+ reasons why it would fail to deliver the webhook. It is also impossible to have 100% uptime even if you tried the hardest. The solution is to have another process check-up and ensure that all work that was supposed to be done was executed or redone.

## Communicate early and often

It is a classic as a developer to not say anything when the schedule shifts and think you can just push and work harder to catch up on the lost time. It may work this time but it will catch up on you and it is exponential! You are behind and suddenly another reason makes you even further behind and now it is even harder to explain why you are behind.

You don’t have to write directly to the stakeholders and say that you are late. I understand that it is not a nice feeling even though they would like that more than not knowing, but let us take that later. The solution is to write it in a public place like a task manager or chat channel, just write it honestly without addressing anyone directly or excusing yourself. If somebody asks you for a status on the task/project, point them to the public place in the company and they can see that you are not trying to hide.

## Make errors in production delibrately

Make a endpoint that will trigger an error and a endpoint that will loop burn cpu to simulate high load. This is so useful for teaching and seeing how your system behaves when errors happen. Don't wait to see it fail accidentally, make your own functions in the system that you can force to fail and create good workflows to get notified about that.