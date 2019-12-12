# How to keep secrets secret in the cloud

In this article I want to show you how to do proper secret management that don't compromise on the easyness of use and works with any frameworks or programming language you use!

It is too easy to leak secrets knowingly and unknowningly, both because of programming mistakes and people have too wide access to important stuff. 

The first example is storing secrets as environment variables. That is a bad idea for several reasons:

- Lots of programs when they crash will dump all environment variables as part of exiting, making it easier to to debug, but that means that all your secrets will end up in the logs where they often are stored permanently for a long time.
- All code will have access to it, also all third party code that is loaded. That is not ideal and examples has been seen that compromised NPM modules or Ruby Gems has taken all environment variables and send it to a remote server.
- Environment variables are typically not encrypted and are easily accessed from the consoles or CLI where they are deployed from. That means that all developers typically have access to view environment variables and in that case the secrets. You can trust employees to not do wrong things, but that means only one programmers laptop has to be comprimised before all secrets are leaked to a potential hacker!

So for those reason nobody should store secrets as environment variables! I have done it myself before, and that was because of a combination of not knowing better and not knowing the right tools. If the correct solution is too complicated the incentive is not there to do the right thing, but there is no a good solution!

## Introducing Berglas

Berglas is a open-source project that will help you store your secrets encrypted in a central storage, then when you need those secrets it will fetch the right private key, decrypt the file and provide the secrets the place you want it.