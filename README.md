

## Installation

You need to [install Docker](https://docs.docker.com/compose/install/)

It is also recommended to use [Postico](https://eggerapps.at/postico/)

```bash
npm install
```

## Running the app

First get the DB up
```bash
cp .env.example .env

docker-compose up -d
```

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```