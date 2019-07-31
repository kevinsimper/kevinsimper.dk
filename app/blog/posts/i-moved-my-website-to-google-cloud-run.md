# I moved my website to Google Cloud Run

This website used to be hosted on AWS Lambda and deployed with Apex Up, but it was quickly bumping against limits. I recently wrote about how to set up Continuous Deployment with Cloud Build, and I tested out the website on a subdomain to see if it would work and it was a success, so I pulled the plug and moved it. Here are the benefits and what I had to do!

### Saving money by avoiding AWS Route 53

When you use AWS Lambda and want to use a custom domain, you _have_ to use AWS Route 53 to host your domain, as it is required to be configured with AWS API Gateway. With Cloud Run, you can easily map a domain to a Cloud Run service and you get back a series of ipv4 and ipv6 you can set up for your root domain. So I moved my domain to Cloudflare and I am now saving $0.5 per month which is what Route 53 costed. That was a small amount but it saves some overhead.

### AWS Lambda has a limit on app size

With Lambda you applications are uploaded as a zip file with a max size of 64 MB and the maximum size unextracted is 250 megabytes. That is big, but an application that starts simple can quickly grow in size. My blog, for example, has more and more assets and node.js npm packages also take up a lot of space.

That is my problem of course and how I architected my website, I could split it up into multiple Lambda functions so they each become smaller, but that makes it more complicated compared to having a single app that has it all. 

With Cloud Run, there is [no limit on size for what it seems like](https://cloud.google.com/run/quotas), but the smaller your app is in size the faster the app will startup. So I win here in that my app can grow more now.

### Set up is simpler

From start to end getting set up with a custom domain, Cloud Run is vastly easier to explain. I have taught workshops and giving presentations about serverless and custom domain is extremely complicated with AWS Lambda and API Gateway. I believe with Cloud Run more people will be able to deploy a service with a custom domain. It is not perfect as you are redirected to Google Webmaster Tools to verify a domain in Google Cloud, but it is okay.

## So overall

a great success so far, I can only recommend using Cloud Run for your blog. AWS Lambda is an impressive product and it turned 5 years old recently which is impressive, compared to Cloud Run was launched publically this April. Google Cloud has finally caught up and passed AWS greatly with all their work with Kubernetes and Istio/Knative!