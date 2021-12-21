# The idea of OpenStreetMap is great

OpenStreetMap was started in 2004 and it is very similar to Wikipedia, the idea that data should be available to everyone and everyone can contribute.

At GreenMobility we use maps a lot, we need it for customers to show where vehicles are and we need it operational to know where all our vehicles are placed and how to get to them.

During the last year we have made multiple features that really leverage the idea of maps;

- first thing was street cleaning where we prevent customers parking on certain places and give street runners a tool to know if a vehicle is parked where street cleaning is going to be the next day
- Radar which allows our customers to say they want to be notified about new vehicles coming available in the area and we visualized it on a map
- Charging stations on a map so people know where they can charge the vehicles
- A better version of our Prebook which allows customers to order a vehicle to a certain address and also specify how close we need to deliver the vehicle to that address.

All the features depends on showing a map, something we are so used to do with our smartphones. I have also made interactive maps since 2012 since I worked in Ravn IT and plotted all our customers on maps.

But one thing I remember is also always using Google Maps. We had local variants in Denmark, but they were always way worse looking and functionality wise, and Google Maps was free and better!

## Public data and common goods

The problem with always using Google Maps is that Google is an American company and Denmark has basically no say over the product or functionality.

Google has also begun showing advertisement inside the Map and it also hiked the price serval magnitudes for companies wanting to use the Map on their website.

Goverments have begun to improve a lot, sharing the public data through API's, in Denmark through https://datafordeler.dk/

But as with all services, Google Maps have become 100x better because we users have spent time on the website. So every time we have used Google Maps, they have gotten data and used that to improved the service, and you in turn have gotten a route where you needed to go. That is a fair trade because Mapping is expensive (Google Street Car all over denmark).

But what does that do to competition? Google shares very little back to the government, they don't give any usage data to municipalities (as far as I know) and you are not allowed to download and store Google Maps data.

This potentielle makes us dependent on Google.

## OpenStreetMap to the rescue

OpenStreetMap (OSM) is basically the opposite of Google Maps, here all the data is for free and you can freely use the data as long as you credit the OpenStreetMap contributors. All the data on OSM have been provided by volenteers and Denmark has basically been mapped by people who believe in the common good! And it is no small feat! In OSM everything is basically a node, a way or a relation and all these three types can have tags that tell what a node for example is. A way can have name or can be made into polygon and defined as a park.

It is an amazing project and basically the world has been mapped, the good thing is also that roads and buildings does not change that often, so once it has been mapped a lot of people can benefit from it.

Google Maps also used to allow public contributions, I remember mapping several walking routes and submitting patches for blind roads, however that feature has been removed now, probably for the same reason, roads do not change that often and if, it is better to have professionel mappers, so Google does not need to trust public contributors that could lie.

But that also leads to other cases, I have tried submitting a fix for my doctor where the physical street number is not what it says on Google and therefore hard to find, but Google rejected that edit.

And not to forget how privileged we are in for example Denmark, we have many competing maps, but in some parts of the world where Google Street Car have not been and where the local goverment have not have capacity to make maps, there is a great need for everyone to be able to map their city to be able to find their way around!

## Managing such large database

Mapping the whole world is not small, there is currently 8 billion objects on OpenStreetMap https://taginfo.openstreetmap.org/reports/database_statistics

You can download the whole world, companies like Geofabrik provides data dumps in highly compressed formats https://download.geofabrik.de/
The whole Europe you can download for 25 GBs which does not sound like a lot in todays computer games, however if you want to import the "planet", you need minimum 64 gb of memory which no consumer desktops has today https://osm2pgsql.org/doc/faq.html

That is why geofabrik and others allows you to download subsets of the data so that you don't need to download the whole work. After the initial setup you can use osmosis (genius name) to keep your postgres database up to data.

## Querying OSM data

There is a lot of values in OSM data, for GreenMobility, it would be useful to know speed limits of roads, parking areas, and being able to tell what the road is based on the GPS lat/lon from the vehicle hardware. OpenStreetMap community has developed a service called Nominatim and do host a public access one, but you are no supposed to use it for commercial usage which makes sense. 

You either have to host OSM yourself or find a provider that offers to host it for you. In the OSM wiki you can find links to providers.

OpenCage looks to provide a great and honest service on top of OSM https://opencagedata.com/

GraphHopper provides a routing API and the open source Java engine behind it https://www.graphhopper.com/open-source/

https://wiki.openstreetmap.org/wiki/Nominatim
https://wiki.openstreetmap.org/wiki/Search_engines

And something I only found recently is Overpass Turbo (weird/funny name), which allows you to do queries and find nodes and ways with specific tags, but the tool is targettet very advanced users https://overpass-turbo.eu/

## Tragedy of the commons

And this is here where the picture starts to crackle, between common good and Tragedy of the Commons. You either have to host OSM yourself or find a provider that offers to host it for you.

But if I need to find a provider, why not just use Google Maps? Short term it gives the best developer experience and the best customer experience.

What about the providers that uses OSM data? Tragedy of the commons is that it can feel like they are taking advantage of the free work that mappers have done, and not enough work have gone into developing the technical backend of OpenStreetMap. Emacsen writes a very good post about the problems https://blog.emacsen.net/blog/2018/02/16/osm-is-in-trouble/
He brings up some good points and you can see the benefit and downsides of design by commety, it is slower and when the initial enthuiame dies of change becomes tremendously difficult. There is a [Engineering Working Group](https://wiki.osmfoundation.org/wiki/Engineering_Working_Group), but unfortunate it [looks not that active](https://wiki.osmfoundation.org/wiki/Engineering_Working_Group/Minutes) which makes sense as nobody can keep up a volenteering job, everyone needs a job that gives money for rent.

But what is the maintaince cost of mapping the changes that now is missing from the planet? I think that is where the problem is, people does not agree which direction to go. You obviously can not add the same road twice, so one group would say nothing needs to change, but the other group is on the other end and tries to optimize even further, like adding more details.

I think that blockchain is the help to the common good. I am not talking about the overhyped cryptocurrencies, but the coordinate and funding of public goods. Vitalik has written to really good blogposts about that 
https://vitalik.ca/general/2019/12/07/quadratic.html
https://vitalik.ca/general/2021/03/23/legitimacy.html

Another story of the commons, [Mapbox does also use OpenStreetMap](https://wiki.openstreetmap.org/wiki/Mapbox), but felt a bit out of the "not-evil" providers [when they stopped the open source map library](https://www.maptiler.com/news/2021/01/mapbox-gl-open-source-fork/) and it was forked to MapLibre https://maplibre.org/

## Conclusion

I want to live in a world where OpenStreetMap exists, where everyone can help fix roads and buildings the area around them, and especially not just in areas where people have money.

There is clearly people in the community doing a lot of amazing work, both mapping and in providing free services like geofabrik that allows downloading subsets of the planet, and reading the OpenCage and GraphHopper website also makes you want to support them.

However it is clearly a scattered community and the competition is steep from companies that provides it all "in-a-box". Local companies should think in supporting the common goods while they are shopping for their mapping needs, that is the only way the community can become better and the services can match Googles and others.

I do think that blockchains can help bring back the optimism to OSM as OSM is not a project in a single country, but a planet project which needs planet coordination. However we do not need that to start contributing back and improving OSM slowly, if everyone starts being aware of OSM and the tools around it, I am sure that things will change for the better!