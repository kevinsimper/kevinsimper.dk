# Aframe with Oculus GO is great WebVR
The Oculus Go is the most interesting hardware for me this year, no doubt! I knew that WebVR existed and I had seen it, but it was never interesting, since it always looked weird on desktop. However now with the Oculus GO on my head I had to checkout the WebVR situation, what had I been missing out on!

## ReactVR now React 360
When the release of the Oculus Go facebook also launched or renamed React 360 as the web to make VR content for the web. The changed the name to better reflect what people where using the project for, more virtual tours than creating crazy VR experiences and also because the Oculus Go is not so performant that it can run anything without limits like the Oculus Rift where you have a powerful CPU in your desktop PC. The Oculus Go also have a browser that is based on the Android Chrome browser and although you can use the normal android debugging tools it is much more unusual and difficult to debug slow performance inside the Oculus Go browser, therefore it makes sense to make React 360 simple and performant. 

## Aframe the real WebVR framework
Mozilla is sponsoring the Aframe framework and it is amazing to see the effort that has been put in but the people there. Aframe is quite different in how you use it compared to React 360 in that you manipulate the browser DOM which is then picked up and drawn to the VR world. Aframe is also different in that it is 100x easier to get started with, has better examples and a fuller documentation, it feels nearly too easy to use! However once you get over the first examples you experience that there is clearly less people working on WebVR than there is working on the normalt Web.

**Examples get outdated super quick, lots of aframe demos uses 0.5.0 but that does not work with Oculus and updating all examples to see if the work in a never version is tedious, but just an example of the field is still super young!**

## Where to go from here?
React 360 is no doubt the predictable "boring" solution where Aframe is the exciting solution that may not be as performant. React focuses on video and streamlining interactions across all kinds of headsets, Aframe has lot more components and easier 3D effects. 
One clear example is that Aframe has already a inWebVR controller that has a red raycaster that you can see where points where React360 only has a small dot with a projection ray, which is not as fun!
But both frameworks has people working on it and it is great to see them taking two different focuses that each bring a lot to the table! The future is not bright not three dimensional! ;)
