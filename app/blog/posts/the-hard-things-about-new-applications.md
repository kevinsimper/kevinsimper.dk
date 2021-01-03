# The hard things about new applications

There is always a desire to start fresh, build a new app instead of continuing to develop on the old.

The problem is that the old application is stable, meaning that it is not producing errors that are not noticed, but it is considered old because it lacks certain features.

The problem with new applications is that they are much simpler since there is much less code, and adding new code is super quick since finding out and dealing with the new inevitable bugs are harder since the platform is new.

A new application does not start out with a common catch-all errors handler, but such are quickly added when the first problem arises and the developers discover that there is nothing in the logs.

The next problem is that a catch-all error handler is terrible, any errors caught by it takes a lot of time to triangulate to where the original problem arises since it can be anywhere in the code.

More detailed logging is added so when an error happens the problem can be found quicker because the logs tell it more precisely.

Once the application has multiple users, the application starts to log errors which are detailed, but now to figure out why it happened we have to look at the previous logs to know what was the steps before to reproduce. To have the logging be more detailed, a unique request-id is added to each request. The logging now has to work in a specific way to ensure the request-id is added to each log statement.

More features is added and more places are uncovered that are not producing the right errors so they are noticed. Some errors are not reporting as critical enough, other errors are swallowed up and not reported. Monitoring is added so the developing team is notified, not for all errors, but for a certain threshold of errors in a time period. 

The new app is now an old app that is not producing errors but is consider old because it lacks certain features.