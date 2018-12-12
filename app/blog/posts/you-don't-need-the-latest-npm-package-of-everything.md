# You don't need the latest npm package of everything

Now there is another example of an npm package that contains malicious code, and
it happened exactly how you would have predicted. A social attack to get
publishing access, not to a popular package, but to a package that a popular
package depends on.

The hack was pretty genius and not a script kiddie like, as it code was
encrypted and could only be decrypted by the package "bitpay/copay" module
description. Not something you would immediately discover.

I was at Node.js Interactive in 2016 and did ask a few people as Node.js got
more a more popular it would also become a bigger and bigger target for hackers
as more and more people install packages that could contain malicious code. The
response was there was not much to do and we must wait and see, and it is also
easy to go around cry wolf at everybody.

So what could be the solutions? I have multiples that could work by itself or
mixed together.

### Run everything in containers

You can limit everything from disk access, network activity both during
installation and runtime. Even in production with new solutions like Istio you
will be able to control exactly what a container is allowed to do like disk
access and outgoing traffic on per-container-level.

### Don't install anything that is less than 7/14/X days old

If you don't install something that is very new, you can depend on others and
automated systems to scan and find new vulnerabilities.

### Sign all packages published with a private key

After a package has been built, the tar ball, a private key is used to sign the
package and generating a signature. Then everyone can verify with the signature
if the package has been manipulated or if somebody tries to impersonate a
author.

We do have integrety checks right now in `package-lock.json`, but that is only a
check that is generate when you download the package the first time so that you
can check it against next time you download it on another machine.

### Complain if the package you dependent on have changed signing key

This would have caught the attach mentioned at the top, the new author or more
really, the hacker, would not have had @dominictarr publishing key and the
publishing streak of him would have been broken.

### Install only packages from authors you have marked as trusted

http://node-modules.com/ is a super cool npm search engine which if you log in
with your github account, factors in which github users you follow into the
ranking so that authors you follow on github comes up much higher than unknown
authors.

### Only install packages that have been signed by 2/3/X other people

Publishing doesn't need to be centralized like many publishing platforms are
that seeks to keep users safe like the App Store. Centralization allows reviews,
but it also keeps one company in power. If npm suddenly decided that all
packages have to be reviewed by their team, it would be pretty terrible from a
authors perspective but you would not have any other choice really as npm is the
defacto package hosting.

So a solution would be to crowdsource reviews, and host them in a decentralized
way, a decentralized platform like Ethereum would allow anybody to sign packages
that they have reviewed and you could select which people or groups you trust
and only download packages or really code that they have signed.

---

Tell me what you think! Would love to hear your thoughts on this!
https://twitter.com/kevinsimper
