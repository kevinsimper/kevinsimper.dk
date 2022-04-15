# Building JS apps with npm packages without build steps

I really like that you can load javascript with the new native module loader in the browser by just specifying `type="module"`, it lets you build things faster and it doesn't require any build steps! That is amazing!

However trying to use npm packages like you are used to can be a problem, because most code expects that you bundle the code and are not prepared to be loaded directly.

There is the website unpkg.com which you can use to load npm packages, and if you append `?module` to the url, it will automatically find the `"module"` tag in the `package.json` and serve that file to you! Awesome!

Next problem is that many packages don't have a `"module"` in their package.json yet, that is where pikapkg can help you, it will highlight packages that support "modules".

https://www.pikapkg.com/

You can even see packages that don't have any dependencies!

There can still be problems loading npm packages, as some of them load other packages that do not use the import/export javascript syntax yet, but instead the node.js commonjs style.

But sometimes that is because the npm package is focused on node.js which by default can't load import/export packages, but sometimes the ES module code is still published, sometimes it is in a folder called `src`, so would be able to load the code with unplug.com by doing `import "https://unpkg.com/MYPACKAGE/src/index.js?module"` , but there is no easy way to look at the folders published in the `.tar` files that npmjs.org serves.

That you can solve with jsdelivr.com, they can be used as a CDN, but they also show any npmjs package contain on their website. https://www.jsdelivr.com/package/npm/lit-element

### In conclusion

Native modules in the browser are awesome, but there is still a bit of work to get it to work in the browser without problems. Finding the right packages from the start with pikapkg.com really helps as you don't end down the rabbit hole with incompatible packages without knowing.
