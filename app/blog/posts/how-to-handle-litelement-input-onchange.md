# How to handle LitElement input onChange

I am creating an new application with LitElement and LitHtml and it works pretty well, at the start it was just to show data, but then I had to handle input tags with onchange event handlers, and I could not figure out how! I have used React and was used to writing:

```javascript
<input type="text" onChange={e => console.log(e.target.value)}/>
```

But that didn't work of course, that is JSX and lit-element uses template literal, so it had to be something with `${}` .

So after reading the documentation but not finding a single example with an <input/>, I figure this is how you uses onChange event:

```javascript
<input type="text" @change=${e => console.log(e.target.value)}/>
```

So you can see the event is called `@change`, so the "on" has been replaced by the "at"/@ sign.

So all values are now this:

- onChange -> @change
- onSubmit -> @submit
- onMouseOver -> @mouseover
- onKeyUp -> @keyup

And to show the value in a input you don't have to define it any special way, it is just like normal html:

```javascript
<input type="text" value="${myVariable}"/>
```

And this would show the value in the DOM.

LitElement and LitHtml is a pretty cool way to get started with Webcomponents, it is nice that it follows the browser implementation or the intent of the browser and you don't have to use any tools to write a JavaScript application.

I am a happy camper for now! And if you don't know how React and Webcomponents play together I can really recommend reading this article on the react documentation. React and Webcomponents are not competing, but working together!

https://reactjs.org/docs/web-components.html