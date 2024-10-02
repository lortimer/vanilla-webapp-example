# Vanilla Webapp Example

## How to use this example

Clone this repository and run `npm install`, `yarn install`, or the install script for whatever package manager you use. I was using NodeJS 18.20.4 when I built it.  

To run the full app in development mode, run `npm run server-watch`, `npm run server-dev`, and `npm run parcel-dev` in separate terminals.

To build and run the full app in production mode, run `npm run build` followed by `npm start`.

### Scripts

#### `build`
Builds for production. Deletes the dist folder if it exists, transpiles the server code with `tsc`, and bundles the frontend using Parcel.

#### `clean`
Deletes the dist folder if it exists. 

#### `server-watch`
Transpiles the server code in watch mode. re-transpiles files when they change.

#### `server-dev`
Runs the Express server in dev mode. Uses `nodemon` to run the transpiled server files and restart the server when they're updated.

#### `parcel-dev`
Bundles the frontend files in watch mode. Parcel automatically rebuilds source files when they change. Caching is disabled because Parcel was failing to see some changes.

#### `start`
Runs the transpiled server in production mode (using NodeJS, not watching for file changes). The server currently serves the index page and serves the rest of the frontend files statically.

#### `test`
Runs all the tests using Vitest. Any file in the repo ending with `.test.ts` will be run. remove `--run` from the script in `package.json` to run tests in watch mode.

## Why does this example exist

Heisldice is dead. Or at least it's dying. I built a multiplayer implementation of [Yacht, the dice game](https://en.wikipedia.org/wiki/Yacht_(dice_game)) in 2018 using Angular. Since then, I've switched to working mostly in React. The code is long out of date, and I have virtually no memory of Angular or how the app works anymore. It only still works because Heroku hasn't stopped supporting the version of Node I used yet, and all the outdated packages are still available on npm. It's only a matter of time before my code can't run on their servers anymore, and at that point, I have two bad options.

One is to spend hours upon hours updating technologies until it can run on Heroku again. I don't have the free time to figure that out. Even if I was somehow able to update everything so it all played nicely together, it's only a bandaid until the whole thing happens again.

The other is to let it die. That sucks, because I play online with my family every week. When it dies, we lose something I worked hard to build that brings us together. 

### Keep it Simple

Writing code and markdown that a browser can interpret directly gives a webapp greater longevity. Proprietary systems like React or Angular, NextJS or Remix, and Bootstrap or MaterialUI rise and fall over relatively short periods of time. Even when they last a while, they change so drastically that migrating from version to version is painful and sometimes requires huge overhauls.

Those systems also require specialization to maintain. You have to learn how to use React in addition to JavaScript to effectively build a React App, and you have to maintain your knowledge of both as they change over time. JavaScript has existed for almost 30 years, and while it's added heaps of great, convenient features, a lot of the oldest code still works just fine (citation needed).

The point is, I want to practice building with the technologies that underpin all the fancy stuff people are using to build the web today. Maybe you need a framework to build enterprise-level applications. Maybe you don't. I think learning to build with vanilla will make me better at developing anything for the web 

### Accessibility and Control

The modern web with its slick UI, and despite the decades we've had to become experts, is inaccessible to more people than ever. Products I use every day constantly experience regressions in basic user experiences. Developers cobble together component libraries and frameworks into something that looks nice but good luck explaining to your parents that they have to _hover over_ a certain part of the screen just to make a menu button appear. Worse, imagine telling someone who can't use a mouse to do that.

Abstractions, while occasionally convenient rob you of your control and your knowledge of how things work. Despite the fancy animations, most of those devs couldn't center a `div` with vanilla CSS if their ultrawide curved monitor depended on it. "Why can't I just do `<div position={center}>`??" they scream while an abstract-looking sculpture they ordered from AliExpress hangs on the wall behind them, endlessly cycling through the colors of the rainbow.

 I cannot tell you the hours I've spent trying to bend Material components to the will of some oblivious designer when vanilla CSS would've solved the problem in a few minutes. I certainly _can_ tell you how many component libraries ignore the most basic of accessibility best-practices and give you absolutely no way of fixing the problem on your own. It's all of them.

Accessibility is not just about meeting the bare minimum rules for building a page - it's about the user experience. For most pages, loading React just so the user can fill out a form costs seconds. Sure, a framework could help you load a complex shopping site more quickly, but how often do you really need that power? Let's just send a static page and let our users get on with it!

[vanilla-js.com](http://vanilla-js.com) is a snarky joke, but I agree with its spirit. The vanilla stuff is not difficult. You read a few docs and it can do almost anything you want for less code and a smaller bundle.

I don't buy the argument that frameworks make building apps easier, more convenient, or faster, or that vanilla is necessarily messy. As a consultant, every client React app I've ever seen is an unholy mess of abuses and hacks that make the most basic changes into Herculean feats. The tech won't do it for you - you have to learn how to write code so it's easy for others to work with (including your future self).

### Testing and the Developer Experience

So despite all that ranting, I do want some convenience where it matters most, at least to me. I'm a worshipper at the church of Test-Driven Development. Regardless of how you feel about TDD, I think we mostly agree that some tests are good these days.

I really wanted to figure out how to test my pages using [Testing Library](https://testing-library.com/) because it's the only testing utility I've really ever used that, used correctly, tests for good _behavior_ rather than implementation detail. Along with that, I included [Vitest](https://vitest.dev/) because Vite is fast and setting up the tests without a framework was relatively simple.

I also don't actually want to write JavaScript. My IDE could probably catch a lot of the issues I would accidentally create without a type system, but Typescript is, in my experience, the only way to write JS without runtime errors taking over your life. So, Typescript is included in this example for both frontend scripts and the server.

The server is [Express](https://expressjs.com/). Sure, maybe I could write my own server from scratch, but I'm more concerned about building good user experiences than I am about optimizing a very simple REST API. Plus, my concerns about small bundle size and subjecting users to [potentially dangerous 3rd-party packages](https://thehackernews.com/2024/06/over-110000-websites-affected-by.html) don't apply to a server I control.

Finally, wouldn't you know it I needed a bundler. I toyed with writing some shell scripts to copy all my frontend files to a dist folder alongside the transpiled JS code, but there's a reason tools like Webpack exist. They're complicated! I settled on [Parcel](https://parceljs.org/) because I've used Webpack before and I wanted to try something new. It seems lightweight and it mostly works with no configuration. Its docs are decent and it's configurable enough to let me, for example, tell it not to minify my code (accessibility is _also_ about transparency).

## Sources

I could not have built this example without the work [Tyler Hawkins](http://tylerhawkins.info/201R/) did for his [article, "How to Unit Test HTML and Vanilla JavaScript Without a UI Framework"](https://levelup.gitconnected.com/how-to-unit-test-html-and-vanilla-javascript-without-a-ui-framework-c4c89c9f5e56). Like him, I've done a lot of testing with Jest, React, and React Testing Library, and the work he did saved me a lot of headache figuring out how to test this app without a bunch of frameworks. [His four-year-old, but still working, example codebase is here on Github](https://github.com/thawkin3/dom-testing-demo).
