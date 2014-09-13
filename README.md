# Zero-to-Lisp in 60-ish Minutes

By Jeff Olson, circa 2014

Although I haven't dropped in `LICENSE.txt` file(s) for the project, the docs/slides are [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) and the code itself is [3-Clause BSD](http://opensource.org/licenses/BSD-3-Clause).  

This is a repository containing the materials for a presentation I'm giving about building a basic scheme interpreter in JavaScript.

The project is pretty much browser-based, for now, with surrounding infrastructure built in `node`. You can bring the server up, like so:

```
# Assuming you're already in the repo root
> npm install
> node server.js
```

At this point, the server is up and running on port `8080`. There is a `/dawdle.html` file that contains the test suite for the JavaScript implementation used in this talk. `/slides.html` contains the `remark.js`-based slides.

You can also point `docco` at the contents of the `/src` dir to get some reading material, that way.

Beyond that: The actual implementation is in `/src`, the tests are all in `/src/tests`. `require.js` setup is in `/src/require-config.js`. All of the external browser dependencies are in `/vendor`. `/content` has whatever static assets I used for the talk.

Have fun!
