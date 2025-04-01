# Best way to get access to GPU Compute

Compute is everywhere and companies like AWS and Google Cloud are some of the most profitable companies in the world and they keep growing. They make it really easy and affordable to get compute.

But getting GPU compute is still new and unsolved, GPU compute is expensive and we are very much tied to a single provider called Nvidia if you want to do something.

The easiest way to get started is definitely your own computer, but most times if not all the time your computer is simply not powerful enough, so many things are not even possible to run locally in relation to machine learning.

What is also easy is using Google Colab, it is a easy web interface that allows you to run Python through what is called a notebook, concretely a Jupyter notebook. It is really good for proving a point and visualising the output of your machine learning or data processing.

Downsides quickly arises that automations is not what Google Colab is built for, it does allow running in the background if you are a paying subscriber, but it does not give you any details and it can not be started automatically, the most it has a "Run all", which is not that helpful when running more than a experiment.

Next you can look at spinning up your own machines, that can be through Terraform, but that only gives you a server you can access, it does very little to help you iterate on a solution that runs inside the machine. You can also try out one of the many batch processing platforms that exist, but their problem is that they cater to the old school big data processing where data is mainly processed on a CPU which you can easily emulate during development on your own machine, back to our initial problem.

In comes the Skypilot tool!

Skypilot is the best solution for the problem of going from Google Colab where you proved your point, but before you have a final solution which has to run without bugs. Skypilot is for when you need to build and iterate fast on GPU compute solutions.

Skypilot spans any cloud, as they have integrated and uses all the major cloud providers CLI. They allow you easily to spin up a machine and can easily do it on a spot instance to save you money. It is made in python and you can easily program in your experiments so that your can submit 10 jobs if you want to try out different parameters.
Contrary to Batch Processing platforms, Skypilot executes on a instance with SSH, allowing you also to easily SSH into the machine if there is any problems, allowing you to retry commands in seconds instead of having to resubmit a job from scratch.
It automatically copies your working directory with rsync, so you can iterate super quickly, you are not bound to a slow "edit/git commit/git push/run" workflow, it is just a "edit/run" workflow. They also help with mounting cloud storage, enabling you to easily share your output, something that is neither easy on Google Colab.

So try out Skypilot after you have used Google Colab, and are thinking about how to continue your fast paced GPU development tasks 😄

[https://docs.skypilot.co](https://docs.skypilot.co)
