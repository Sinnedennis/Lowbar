# Lowbar

A reimplementation of the popular [underscore.js](http://underscorejs.org/) library to demonstrate a solid understanding of vanilla *JavaScript* and *Test Driven Development*.
___

### Table of contents

* [Setup](https://github.com/Sinnedennis/Lowbar#setup)
* [Lowbar Installation](https://github.com/Sinnedennis/Lowbar#lowbar-installation)
* [Usage](https://github.com/Sinnedennis/Lowbar#usage)
* [Depenencies](https://github.com/Sinnedennis/Lowbar#depenencies)
* [Table of methods](https://github.com/Sinnedennis/Lowbar#table-of-methods)

### Setup

1. Ensure that your machine is running Node version 7 or above. To check what version you are running, open a terminal window and type:
    ``` 
    node -v
    ```
    If you do not receieve a response in the format of v7.2.1, or your version of Node is older than 7x, [click here](https://nodejs.org/en/) to download and install Node from the official website.
   
2. Ensure you have Node Package Manager (NPM) installed. As above, open a terminal window and type:
    ``` 
    npm -v
    ```
    If you do not receieve a response in the format of v5.5.1, or your version of NPM is older than 5x, type the following commands into your terminal:
    ``` 
    npm install npm
    ```
    If you run into any issues with the above steps, [click here](https://docs.npmjs.com/getting-started/installing-node) to follow NPM's official guide to installing Node and NPM.
___

### Lowbar Installation

1. Open a terminal window, navigate to the directory where you wish to install this repository, and run the following command:
    ```
    git clone https://github.com/Sinnedennis/Lowbar
    ```

2. Navigate into the freshly-cloned directory and run:
    ```
    npm install
    ```
___
### Usage
To run the test suite using Lowbar, type the following terminal command:

```
npm t
```

To run the same test suite using Underscore.js, type: 

```
npm run _
```

___
### Depenencies
The Lowbar library and testing suite makes use of the following packages:

|    Package    | Use          |
|:-------------:|:-------------|
| [Mocha](https://www.npmjs.com/package/mocha)                 | Testing enviromnent |
| [Chai](https://www.npmjs.com/package/chai)                   | Assertion library |
| [Sinon](https://www.npmjs.com/package/sinon)                 | Spies, mocks, and stubs library |
| [Underscore.js](https://www.npmjs.com/package/underscore)    | The subject of this reimplementation |
| [ESLint](https://www.npmjs.com/package/eslint)               | Code linting tool |
| [Husky](https://www.npmjs.com/package/husky)                 | Provides git hooks |

___

### Table of methods

| #        | Method        |
|:-------------:|:-------------|
| 1 | [identity](http://underscorejs.org/#identity)         |
| 2 | [values](http://underscorejs.org/#values)             |
| 3 | [first](http://underscorejs.org/#first)               |
| 4 | [last](http://underscorejs.org/#last)                 |
| 5 | [each](http://underscorejs.org/#each)                 |
| 6 | [indexOf](http://underscorejs.org/#indexOf)           |
| 7 | [filter](http://underscorejs.org/#filter)             |
| 8 | [reject](http://underscorejs.org/#reject)             |
| 9 | [uniq](http://underscorejs.org/#uniq)                 |
| 10| [map](http://underscorejs.org/#map)                   |
| 11| [contains](http://underscorejs.org/#contains)         |
| 12| [pluck](http://underscorejs.org/#pluck)               |
| 13| [reduce](http://underscorejs.org/#reduce)             |
| 14| [every](http://underscorejs.org/#every)               |
| 15| [some](http://underscorejs.org/#some)                 |
| 16| [extends](http://underscorejs.org/#extends)           |
| 17| [defaults](http://underscorejs.org/#defaults)         |
| 18| [once](http://underscorejs.org/#once)                 |
| 19| [negate](http://underscorejs.org/#negate)             |
| 20| [shuffle](http://underscorejs.org/#shuffle)           |
| 21| [invoke](http://underscorejs.org/#invoke)             |
| 22| [sortBy](http://underscorejs.org/#sortBy)             |
| 23| [zip](http://underscorejs.org/#zip)                   |
| 24| [sortedIndex](http://underscorejs.org/#sortedIndex)   |
| 25| [flatten](http://underscorejs.org/#flatten)           |
| 26| [intersection](http://underscorejs.org/#intersection) |
| 27| [difference](http://underscorejs.org/#difference)     |
| 28| [memoize](http://underscorejs.org/#memoize)           |
| 29| [delay](http://underscorejs.org/#delay)               |
| 30| [where](http://underscorejs.org/#where)               |
| 31| [throttle](http://underscorejs.org/#throttle)         |
| 32| [partial](http://underscorejs.org/#partial)           |
