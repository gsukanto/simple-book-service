# Simple Book Service

Simple NodeJS microservice that serving basic create, read, update, and delete for book entity. Run `docker-compose up` to consume the service, or check the [Using the Microservice](#using-the-microservice) to learn how to develop against it.


## Content

- [Technology Stack](#technology-stack)
- [Using the Microservice](#using-the-microservice)
- [Commands](#commands)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Testing Guide](#testing-guide)
    - [Unit Tests](#unit-tests)
    - [Code Coverage](#code-coverage)
- [Healthchecks](#healthchecks)


## Technology Stack

Following is technology stack that is used in this service

| Name | Version | Description |
|------|---------|-------------|
| [NodeJS](https://nodejs.org/en/) | 10.16 | Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. |
| [MongoDB](https://www.mongodb.com/) | any | MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. |
| [Docker](https://www.docker.com/) | any | Enterprise Container Platform for High-Velocity Innovation. |
| [Docker Compose](https://docs.docker.com/compose/) | any | Compose is a tool for defining and running multi-container Docker applications. |
| [Mocha](https://mochajs.org/) | any | Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. |
| [Chai](https://www.chaijs.com/) | any | Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.. |
| [Istanbul](https://istanbul.js.org/) | any | JavaScript test coverage made simple. |
| [Eslint](https://eslint.org/) | any | The pluggable linting utility for JavaScript and JSX. |


## Using the Microservice

The first step is to ensure you have a valid `.env` configuration. By default, `.env` in this repository is used for docker compose. Thus for local development and testing, make sure to change the `.env` using `.env.local`

The the microservice (with all dependencies running in containers) with:

```bash
docker-compose up
```

This will:

1. Run Mongo docker at: `localhost:27017`
2. Run data seeding for that Mongo docker.
3. Run the server at: `http://localhost:3000`
4. Run the API contract/documentation at: `http://localhost:3000/swagger`

For local development/test, use this command to init the service:

```bash
npm install
cp .env.local .env
```

and run the service using this command:

```bash
npm start
```

## Commands

The following commands are useful when working with this repo:

| Command | Usage |
|---------|-------|
| `npm start` | Start the server in development mode. |
| `npm test` | Run all specs matching the pattern `*.spec.js`. |
| `npm run test:coverage` | Run all spec followed with test report. |
| `npm run lint` | Run static syntax checker for Javascript using AirBnB standard. |
| `npm run lint:fix` | Run static syntax checker for Javascript using AirBnB standard with automatic fix some pattern. |

## Project Structure

```
.
├── Dockerfile
├── README.md
├── data
│   ├── books.dump
│   ├── configdb
│   ├── counters.dump
│   ├── db
│   └── import.sh
├── docker-compose.yml
├── package-lock.json
├── package.json
├── src
│   ├── controller
│   │   └── book_controller.js
│   ├── index.js
│   ├── model
│   │   └── book.js
│   └── swagger.json
└── test
    └── unit
        └── api
            └── books.spec.js
```


## Coding Guidelines

- **Coding Style**: Run `npm run lint` to check the code.
- **Pull Requests**: Any pull requests which drop code coverage are likely to be rejected, test your code!
- **Error Handling**: Handlers should catch exceptions and use `boom`. Normal functions should throw exceptions or use error callbacks if they are async.
- **Data Model**: Data received from the client should be validated, sanitised and new objects created before passing over to the backend.
- **Business Logic**: If writing a fair amount of business logic that should be unit tested, you should write the code in a modular way that can easily be unit tested.


## Testing Guide

We all love testing.

### Unit Tests

The unit tests are all kept in the `test/unit` folder.

To manually run the in-proc unit tests, run:

```bash
npm test
```

This will run `mocha`, executing tests in the `test/` folder.

### Code Coverage

Code coverage reports can be generated with:

```bash
npm run test:coverage
```

Reports are written to the screen. This is the code coverage for current (init) project:

```
---------------------|----------|----------|----------|----------|-------------------|
File                 |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------|----------|----------|----------|----------|-------------------|
All files            |    98.11 |      100 |    92.31 |      100 |                   |
 src                 |    95.83 |      100 |       50 |      100 |                   |
  index.js           |    95.83 |      100 |       50 |      100 |                   |
 src/controller      |      100 |      100 |      100 |      100 |                   |
  book_controller.js |      100 |      100 |      100 |      100 |                   |
 src/model           |      100 |      100 |      100 |      100 |                   |
  book.js            |      100 |      100 |      100 |      100 |                   |
---------------------|----------|----------|----------|----------|-------------------|
```

## Healthchecks

This service exposes a basic healthcheck at `/health`:

```
GET /health HTTP/1.1
host: localhost:3000

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 18

{ "status": "ok" }
```