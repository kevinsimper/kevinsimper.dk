# Single page app with WebComponents and Router

Using webcomponents is awesome and it lets you start super quickly, even without using any bundler but only replying on the browser native module loader.

Let us try to create a simple app that has multiple pages that you can switch between.

First we need a web page, call it index.html:

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      console.log('Hello WebComponents!')
    </script>
  </body>
</html>
```

You should be able to see this works by just opening it in your default browser and see something in your developer tools.

Next let's try to make the browser load a javascript file with the new [Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

Create a `main.js` with

```javascript
console.log('Hello WebComponents!')
```

and include it in the html

```javascript
<script type="module" src="./main.js" />
```

With this you should be able to open that up and see it works the same, but now we are using native module loading in the browser, this means we can import other modules with `import`.

The problem is that browser modules will not work with the `file://`, so you have to load it with a server.

You can do that in a lot of ways, if you have Node.js installed, you can in the terminal write

```bash
$ npx serve
   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:            http://localhost:5000      │
   │   - On Your Network:  http://192.168.1.37:5000   │
   │                                                  │
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

## Loading a module with Native Modules

Let us make our first webcomponent with LitElement. Make a new file called `mybutton.js`.

We need to load the library lit-element and we can find it on [unpkg.com](https://unpkg.com/)

It is a super simple website that exposes all npmjs.com modules and makes it super easy to load them in the browser.

We can load lit-element by going to <https://unpkg.com/lit-element> and we will be redirected to the latest version if we want to include the specific version.

Like this: <https://unpkg.com/lit-element@2.1.0/lit-element.js>

The new thing with native module loading requires _all_ imports to be relative, and unpkg does also support that. It will automatically rewrite the script file if you append `?module` to the URL.

Like this: <https://unpkg.com/lit-element@2.1.0/lit-element.js?module>

You will see that it has rewritten imports like this

```javascript
import { TemplateResult } from 'lit-html'; # Before rewrite
import { TemplateResult } from "https://unpkg.com/lit-html@^1.0.0?module"; # After rewrite
```

This makes it work in our browser!

So in your `main.js` include LitElement

```javascript
import {
  LitElement,
  html
} from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'
```

You will be able to go to the network tab and see it has resolved and loaded all the necessary modules.

![](https://i.imgur.com/ONq0QdA.png)

Congrats, now you have loaded your first native browser module!

## Writing your first Webcomponent

With LitElement we can write a small component that renders a simple button. LitElement exposes a class that extends the native `HTMLElement`, if it doesn't make sense don't worry too much for the example, we will not go that deep in JavaScript.

So you can now write a component and define it like this:

```javascript
class MyButton extends LitElement {
  render() {
    return html`
      <button>My Button</button>
    `
  }
}
```

The html in front of the string is a helper function, we are utilising [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) and LitElement knows how to call this function.

With that component we can register it as a web component

```javascript
customElements.define('my-button', MyButton)
```

and this is a webcomponent!

You can now use it in the `index.html` by simply putting in `<my-button></my-button>` .

So now our html looks like this

```html
<!DOCTYPE html>
<html>
  <body>
    <my-button></my-button>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

Now that is mostly what you need to know, with this we can create new components and nest them however we like.

## Creating multiple pages

Let us try to create two pages like if we had a website with multiple pages.

```javascript
class PageA extends LitElement {
  render() {
    return html`
      <div>Page A</div>
    `
  }
}
customElements.define('my-pagea', PageA)

class PageB extends LitElement {
  render() {
    return html`
      <div>Page B</div>
    `
  }
}
customElements.define('my-pageb', PageB)
```

Those pages are pretty simple but that is nothing that prevents us from making them full featured with a lot of functionality but for this example we keep it short.

And since we now have two pages we need a main entrypoint for our app, so we can make a new component responsible for showing the correct page.

```javascript
class MyAwesomeApp extends LitElement {
  render() {
    return html`
      <div><h1>MyAwesomeApp</h1></div>
    `
  }
}
customElements.define('my-awesome-app', MyAwesomeApp)
```

That is now our main webcomponent entrypoint, that we need to add to the HTML instead of the button.

```diff
...
  <body>
+   <my-awesome-app></my-awesome-app>
-   <my-button></my-button>
    <script type="module" src="./main.js"></script>
  </body>
...
```

In our `MyAwesomeApp` we can define a property that define the currently active route, and we can populate it with PageA.

```diff
 class MyAwesomeApp extends LitElement {
+  static get properties() {
+    return {
+      route: { type: Object }
+    };
+  }
   render() {
     return html`
       <div>
         <h1>MyAwesomeApp</h1>
+        ${this.route}
       </div>
     `
   }
 }
```

This define a property that when updated with `this.route = …` will cause a rerender of the component, this is what we need so we don't need to remember to call `render()` ourselves.

## Setting up a Router

We now need a router library, such a library has responsibility to look at the URL and trigger some specific code, it also has responsibility to listen to URL changes and then update accordingly.

One library like that could be Navigo, https://www.npmjs.com/package/navigo

Include that at the top of the file with unpkg.com, you can see the URL to the "module" version, <https://github.com/krasimir/navigo/blob/master/package.json#L7>

```javascript
import Navigo from 'https://unpkg.com/navigo@7.1.2/lib/navigo.es.js'
```

It has a super simple api and it supports both new and old browsers.

```javascript
let router = new Navigo('/', true, '#!')
```

The first argument is the starting route, the next if it should use hash fragment routing, it is nicer as you don't have to configure your webserver to respond with the same HTML file to every path, and the last is what we will want to prefix our hash fragment with.

For this router we can add different routes:

```javascript
router
  .on('/pagea', () => {
    // do something
  })
  .on('/pageb', () => {})
  .on('*', () => {
    // show home
  })
```

To activate our router we can call `router.resolve()`

And now we can setup each route and as shown earlier we can change the route by calling `this.route`

The constructor function is called whenever the component is created.

```diff
 import { LitElement, html } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module';
+import Navigo from "https://unpkg.com/navigo@7.1.2/lib/navigo.es.js"

 class MyAwesomeApp extends LitElement {
   static get properties() {
     return {
       route: { type: Object }
     };
   }
+  constructor() {
+    super() // Must call super in constructor
+    let router = new Navigo("/", true, "#!")
+    router.on("pagea", () => {
+      this.route = html`<my-pagea></my-pagea>`
+    })
+    .on("pageb", () => {
+      this.route = html`<my-pageb></my-pageb>`
+    })
+    .on("*", () => {
+      this.route = html`This is home.`
+    })
+    router.resolve()
+  }
   render() {
     return html`
       <div>
         <h1>MyAwesomeApp</h1>
         ${this.route}
       <div>
     `
   }
 }
```

And now you have a multiple spa, you can make links inbetween pages like this

```html
<a href="#!/pagea">Page A</a> <a href="#!/pageb">Page B</a>
<a href="#!/">Home</a>
```

Try to add them yourself!

## Conclusion

This is an awesome start on any small app and you can continue with making small components and building up your pages.

LitElement also supports CSS which you can see here <https://lit-element.polymer-project.org/guide/styles>

You can find the full example here, try making something similar!

You can find the sourcecode here <https://github.com/kevinsimper/lit-element-with-router>

and a working example here <https://kevinsimper.github.io/lit-element-with-router/>
