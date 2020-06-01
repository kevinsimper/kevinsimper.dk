# The modern frontend workflow

We need better websites and for that, we need better workflows. Creating frontends has often been seen as an "easier" task than backend. The reason was that the tools were not there to create the right building blocks. Frontend code was often built on top of whatever backend programming language that was chosen, leading to frontend code that had to adapt to the structure of the backend. That meant that testing was often done in the browser as it was the backend that dictated how the resulting HTML structure would look like. Frontend developers then often worked around that and made an interactive app on top.

If the app was made in Ruby on Rails, that meant you as a frontend developer had to know how to spin up a Ruby application and edit ERB templates (Embedded Ruby templates).

SPA (Single Page Application) became possible when browsers became much faster, but that was not without problems either. The app would be built in javascript, interacting with an API exposed by the backend. This is much more flexible, but the whole responsibility now lied on the shoulders of the frontend developers. That was a fine separation, but it is dependent on both teams working at the same speed. If frontend was quicker than backend or reverse, teams would be waiting and problems were spread across teams.

Making a SPA requires more work and knowledge for a small team. The overhead is the need to expose the data as an API and then in the frontend consume that API. And while making, exposing and consuming the API, mistakes are often made, mistakes that would have been avoided by a backend rendered app. That created a new title, the "FullStack developer", who supposedly knows how to navigate both the frontend and the backend, often spreading themselves thin in the pursuit.

And where did we come from? "We need better websites", yes that! We need people that can focus solely on the user interfaces and user experience and not have to care about backend and all that makes it complicated in between. We need people that care about error messages and accessibility and creating seamless interfaces that are easy to navigate. Not how to handle the scaling a backend with cloud-native.

## The modern frontend workflow

It should allow frontend developers to create great reusable building blocks that are not tied to any backend language but can be used by any.

It should allow creating high-quality responsive designs without testing manually in the browser to see if something works.

It should allow quick iterations and easily sharing of prototypes without extra or wasted work.

### Webcomponents

Webcomponents are the most important aspect of the modern frontend workflow. It is a huge leap because it allows frontenders to create reusable building blocks that can be used anywhere. Webcomponents can be either big or small, but it allows encapsulation of HTML, CSS, and JS that can be either a complete app or a small vital replacement component for a `<input>` field.

It makes it possible for backend developers to use new webcomponents in their layout files as easily as HTML tags. Frontend developers can make new HTML tags and backend developers can consume them. Everything can be kept small and lean.

https://developers.google.com/web/fundamentals/web-components/customelements

### Storybook

A great website has great error handling! With storybook, you can show how that error handling looks like with a predefined story. As a frontend developer, you should not have to sit and fill out forms endlessly to test how the error handling flow looks like.

Make a story for each: a story for a successful form, a story for an error in a form, a story for clicking the submit, a story for an empty form. Now more time can be spent perfecting those often hidden states of your application.

https://storybook.js.org/

### Components with React.js

React.js is the most popular framework to create interactive experiences in the browser and the reason why is the ability to create small components that you can easily compose into larger ones. Webcomponents are the standard, but by being a standard it is both more low level and moves slower. They both benefit, but React.js benefits right now by being the most popular and therefore having the most attention in terms of tools and extensions built for it.

Building something for others to consume, Webcomponents. Building something to consume yourself, choose React.js and you are sure to be developing minimal components that can be adapted easily.

https://reactjs.org/docs/components-and-props.html

### CSS modules

All visuals, all colors, and styling are made with CSS, but CSS is difficult because it is Cascading, as the name says. CSS Modules allows you to focus on the styling for one component at a time, allowing fewer concerns about how it will affect the whole app and avoiding side effects.

https://github.com/css-modules/css-modules

### No setup hot reloading

Frameworks like create-react-app and Next.js make it so you can create an app with nearly no-setup and the app automatically refreshes whenever the files are saved in your editor. No manual actions to refresh the browser are needed anymore.

https://reactjs.org/docs/create-a-new-react-app.html

https://nextjs.org/docs

### GraphQL data binding

Graphql allows you to create reusable components that each define what kind of data they need. Create a profile page and declare that this component needs the name and profile picture. When this component is needed somewhere, no time is spent guessing what data is needed to be passed to this component.

https://why-use-graphql-fragments.surge.sh/

https://graphql.org/learn/queries/#fragments

### Testing with Jest, Typescript, and Cypress

Emulating the chaos that is the real-life is not easy and testing is needed. Jest is a first-class javascript test runner allowing even simulated browser environments with jsdom.

TypeScript has become the de facto standard for creating large enterprise apps. Sharing and collaborating on large codebases is no small task and strict structure is achievable with TypeScript allowing interactions between to be more aligned.

Cypress is world-class browser automation, creating integration tests that simulate real-world users easily. Real users do not need to know how you made the app, their focus is on achieving a task, try that with Cypress and avoid doing manual testing over and over again in the browser to test flows end-to-end.

https://jestjs.io/

https://www.typescriptlang.org/

https://www.cypress.io/how-it-works

## Conclusion

The modern frontend workflow is free from lock-in, allows reusable building blocks _with webcomponents_, easily sharable flows _with storybooks_, building highly interactive components _with react.js_, expressive encapsulated styling _with CSS modules_, quick iterations and developing _with cra or next_, declarative data fetching _with graphql_, ensures extensive testing _with jest and typescript_ and simulates real-world browsers e2e testing with Cypress.

The days where frontend developers are forced into backend territory are over, the frontend can be made with the best tools that cover every aspect and can avoid any slowdown that you have experienced in the past. It creates progressive enhancement with webcomponents that backend can use without taking all the responsibility.

These tools are for the next decade! Go build the future!
