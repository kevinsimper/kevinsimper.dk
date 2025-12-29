# I made a site to compare GPUs

When you look at GPU compute at any site, there is not much help to understand what kind of powerful you are actually renting. I think the worst thing is that some providers has "cheap" gpus, but they are so old that using them is directly counterproductive since it does not support any of the new features that makes GPUs fast.

Google will show a Nvidia T4 in Colab and also Google Cloud, but it is actually from 2018 and does not support BF16 or FP8. You are essentially renting outdated hardware.
They will also rent you a L4, but it only has 300 GB/S memory which is really slow compared to newer GPUs, so all in all you are underselling your own time by renting one of those cards, even though it looks like a great getting started cards. And don't get me started on the P4 which they are selling at $438 a month.

I also added computed values, because the most interesting is actually how many CUDA cores you are getting per dollar. That is the actual compute you are buying.

I also added two providers which are interesting, vast.ai which allows you to rent machines which are from a open market. If you just need access to a GPU to try out a model or try learning to finetune a model, it is perfect. I also added Modal which has a really interesting serverless and programming paradigm, and you can compare the prices across.

It is also just a fansite, it is quite exciting to see how fast the new cards are, and it also just shows that 5090 is a power beast for a consumer card, a little unknown fact that it is the exact same chip as the RTX 6000 Blackwell  just with lesser memory, but is 4 times as expensive. That you can see on [https://gpucompare.herkules.dk/](https://gpucompare.herkules.dk/)

I also wanted a better overview of choosing which GPU when buying, on all webshops you can't compare the cheapest of each kind and divide it by the price, but now you can [https://gpucompare.herkules.dk/da/buy](https://gpucompare.herkules.dk/da/buy)