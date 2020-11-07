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
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## Stopping the database

```bash
docker-compose down
```
