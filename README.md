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

An easy modular way to store your passwords to email, etc. Just `import` them and use them in the code.

####

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

⌘ + Shift + J
