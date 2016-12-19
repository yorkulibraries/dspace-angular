# dspace-angular
> The next UI for DSpace, based on Angular 2 Universal.

This project is currently in pre-alpha.

You can find additional information on the [wiki](https://wiki.duraspace.org/display/DSPACE/DSpace+7+-+Angular+2+UI) or [the project board (waffle.io)](https://waffle.io/DSpace/dspace-angular).

If you're looking for the 2016 Angular 2 DSpace UI prototype, you can find it [here](https://github.com/DSpace-Labs/angular2-ui-prototype)

## Quick start
**Make sure you have Node version >= 5.0 and NPM >= 3**

```bash
# clone the repo
git clone https://github.com/DSpace/dspace-angular.git

# change directory to our repo
cd dspace-angular

# install the global dependencies
npm run global

# install the repo with npm
npm install

# start the server
npm start
```
Then go to [http://localhost:3000](http://localhost:3000) in your browser

## Table of Contents
* [Introduction to the technology](#introduction-to-the-technology)
* [Requirements](#requirements)
* [Installing](#installing)
* [Running the app](#running-the-app)
* [Running in production mode](#running-in-production-mode)
* [Cleaning](#cleaning)
* [Other commands](#other-commands)
* [Recommended Editors/IDEs](#recommended-editorsides)
* [Collaborating](#collaborating)
* [File Structure](#file-structure)
* [3rd Party Library Installation](#3rd-party-library-installation)
* [Frequently asked questions](#frequently-asked-questions)
* [License](#license)

## Introduction to the technology
You can find more information on the technologies used in this project (Angular 2, Typescript, Angular Universal, RxJS, etc) on the [DuraSpace wiki](https://wiki.duraspace.org/display/DSPACE/DSpace+7+UI+Technology+Stack)

## Requirements
* [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/)
* Ensure you're running node >= `v5.x` and npm >= `v3.x`

If you have [`nvm`](https://github.com/creationix/nvm#install-script) or [`nvm-windows`](https://github.com/coreybutler/nvm-windows) installed, which is highly recommended, you can run `nvm install --lts && nvm use` to install and start using the latest Node LTS.

## Installing
* `npm run global` to install the required global dependencies
* `npm install` to install the local dependencies


## Running the app
After you have installed all dependencies you can now run the app. Run `npm run watch:dev` to start a local server which will watch for changes, rebuild the code, and reload the server for you. You can visit it at `http://localhost:3000`.

## Running in production mode
When building for production we're using Ahead of Time (AoT) compilation. With AoT, the browser downloads a pre-compiled version of the application, so it can render the application immediately, without waiting to compile the app first. The compiler is roughly half the size of Angular itself, so omitting it dramatically reduces the application payload.

To build the app for production and start the server run: 	
```bash
npm start
```
If you only want to build for production, without starting, run:
```bash
npm run build:prod:ngc:json
```
This will build the application and put the result in the `dist` folder

## Cleaning
```bash
# clean everything, including node_modules. You'll need to run npm install again afterwards.
npm run clean

# clean files generated by the production build (.ngfactory files, css files, etc)
npm run clean:prod

# cleans the distribution directory
npm run clean:dist
```

## Other commands
There are many more commands in the `scripts` section of `package.json`. Most of these are executed by one of the commands mentioned above.
A command with a name that starts with `pre` or `post` will be executed automatically before or after the script with the matching name. e.g. if you type `npm run start` the `prestart` script will run first, then the `start` script will trigger.


## Recommended Editors/IDEs
To get the most out of TypeScript, you'll need a TypeScript-aware editor. We've had good experiences using these editors:

* Free
  * [Visual Studio Code](https://code.visualstudio.com/)
    * [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
  * [Atom](https://atom.io/)
    * [TypeScript plugin](https://atom.io/packages/atom-typescript)
* Paid
  * [Webstorm](https://www.jetbrains.com/webstorm/download/) or [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/)
  * [Sublime Text](http://www.sublimetext.com/3)
    * [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

## Collaborating
See [the guide on the wiki](https://wiki.duraspace.org/display/DSPACE/DSpace+7+-+Angular+2+UI#DSpace7-Angular2UI-Howtocontribute)

## File Structure
```
dspace-angular
├── README.md               * This document
├── app.json                * Application manifest file
├── nodemon.json            * Nodemon (https://nodemon.io/) configuration
├── package.json            * This file describes the npm package for this project, its dependencies, scripts, etc.
├── resources               * Folder for static resources
│   ├── i18n                * Folder for i18n translations
│   └── images              * Folder for images
├── rollup-client.js        * Rollup (http://rollupjs.org/) configuration for the client
├── rollup-server.js        * Rollup (http://rollupjs.org/) configuration for the server
├── src                     * The source of the application
│   ├── app                 * The location of the app module, and root of the application shared by client and server
│   ├── backend             * Folder containing a mock of the REST API, hosted by the express server
│   ├── browser.module.ts   * The root module for the client
│   ├── client.aot.ts       * The bootstrap file for the client, in production
│   ├── client.ts           * The bootstrap file for the client, during development
│   ├── index-aot.html      * The index.html file, for production
│   ├── index.html          * The index.html file, for development
│   ├── node.module.ts      * The root module for the server
│   ├── server.aot.ts       * The express (http://expressjs.com/) config and bootstrap file for the server, in production
│   ├── server.routes.ts    * The routes file for the server
│   ├── server.ts           * The express (http://expressjs.com/) config and bootstrap file for the server, during development
│   ├── styles              * Folder containing global styles.
│   │   ├── main.scss       * Global scss file
│   │   └── variables.scss  * Global sass variables file
│   └── typings.d.ts        * File that allows you to add custom typings for libraries without TypeScript support
├── tsconfig.aot.json       * TypeScript config for production builds
├── tsconfig.json           * TypeScript config for development build
├── tslint.json             * TSLint (https://palantir.github.io/tslint/) configuration
├── webpack.config.ts       * Webpack (https://webpack.github.io/) config for development builds
└── webpack.prod.config.ts  * Webpack (https://webpack.github.io/) config for production builds
```

## 3rd Party Library Installation

Install your library via `npm install lib-name --save` and import it in your code. `--save` will add it to `package.json`. 

If the library does not include typings, you can install them using npm:

```bash
npm install d3 --save
npm install @types/d3 --save-dev
```

If the library doesn't have typings available at `@types/`, you can still use it by
manually adding typings for it:

1. In `src/typings.d.ts`, add the following code:

  ```typescript
  declare module 'typeless-package';
  ```

2. Then, in the component or file that uses the library, add the following code:

  ```typescript
  import * as typelessPackage from 'typeless-package';
  typelessPackage.method();
  ```

Done. Note: you might need or find useful to define more typings for the library that you're trying to use.


If you're importing a module that uses CommonJS you need to import as

```typescript
import * as _ from 'lodash';
```

## Frequently asked questions
* Why is my service, aka provider, is not injecting a parameter correctly?
  * Please use `@Injectable()` for your service for typescript to correctly attach the metadata 
* Where do I write my tests?
  * You can write your tests next to your component files. e.g. for `src/app/home/home.component.ts` call it `src/app/home/home.component.spec.ts`
* How do I start the app when I get `EACCES` and `EADDRINUSE` errors?
  * The `EADDRINUSE` error means the port `3000` is currently being used and `EACCES` is lack of permission to build files to `./dist/`
* What are the naming conventions for Angular 2?
 * See [the official angular 2 style guide](https://angular.io/styleguide)
* Why is the size of my app larger in development?
 * The production build uses a whole host of techniques (ahead-of-time compilation, rollup to remove unreachable code, minification, etc.) to reduce the size, that aren't used during development in the intrest of build speed.
* node-pre-gyp ERR in npm install (Windows)
 * install Python x86 version between 2.5 and 3.0 on windows. See [this issue](https://github.com/AngularClass/angular2-webpack-starter/issues/626)


## License
http://www.dspace.org/license
