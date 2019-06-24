# Starlite JS

A web port of [Starlite](https://github.com/dannydenenberg/Starlite) using Node.js (& TypeScript).

## Getting Started/Installing

1. Clone the project: `$ git clone https://github.com/dannydenenberg/Starlite-JS.git`
2. cd into the directory: `$ cd Starlite-JS`
3. Install dependencies: `$ npm i`
4. Compile the typescript: `$ tsc`
5. Run the project: `$ node build/app.js`
6. Go to the web page (the port will show in the console): `localhost:port`

### Prerequisites

**NOTE: Do not run this program in Windows subsystem for Linux 1 (WSL1). Functions WILL break.**

### Files

#### app.ts

> This is the main entrypoint for the application. The server starts here. I use the express.js package for handling requests and responses. This file is also where you can add post/get/etc responses to requests if an added functionality needs to be talking to the server.

#### passwords.ts

> An easy modular way to store your passwords to email, etc. Just `import` them and use them in the code.

#### public/index.js

> This is the main entrypoint for the client side JavaScript. All of the speech recognition and calling of the function associated with a command happens here. Also the `getSpeechToText()` function is defined here.

#### public/actions.js

> This is the 'meat' of the commands for starlite. This file holds the `actions` object which associates what a user would say as a command with a function to be executed (all of the associated functions should be stored in this file as well). Also, the `say(text)` function that 'talks' to the user is in here.

#### public/imports.js

> This holds public variables one might want to access (such as the trigger word, 'starlite').

#### public/getAction.js

> This holds the `getAction(text)` function which takes a user command as an argument and uses the `actions` object in [public/actions.js](public/actions.js) to choose the associated function to run. It returns this function.

## Built With

- [Node.js](https://nodejs.org/)

## Contributing

Pull requests for code updates are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
