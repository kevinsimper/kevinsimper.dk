# Turborepo is the new build system

We just started using turborepo at GreenMobility https://turbo.build/repo

We had for a long time evaluated build systems to introduce a [GreenMobility](https://github.com/greenmobility), but we had not found a sastisfied solution. The biggest problems with build tools like Bazel and Please.build was editor integration, being able to quickly find code referenced is more important than quick build time usually.

It however took is quite some time to switch to turborepo. First we split out a subset of a big Next.js application. That took several days.

Second we switched using turbo to build the two repositories. The important thing was using turborepo prune so that docker cache could be used effectively.

Third we had to sign up to Vercel to have the remote cache. A bit expensive of $20 per team member even if the only thing we use it the Remote cache.

Lastly we have switched to having only a single CI trigger, this trigger will build our whole monorepo and then try to deploy. If nothing has changed the deploy step will not run. If something has changed, deploy task will run and trigger a new Cloud Build that will deploy to staging.

This took our 19 minute build down to minutes. We are now ready at GreenMobility to a lot more innovation. The next thing we are doing is splitting out Prisma. Normally it is a strict no to share database between applications, but with turborepo it should be possible to without the major downsides.