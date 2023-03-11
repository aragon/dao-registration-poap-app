# DAO Registration POAP APP (Client)

This is the Client for the DAO Registration POAP. It is a NextJS API that allows users to mint POAPs whenever they launch an Aragon Community.

## Setup

Prior running commands, make sure you have installed Docker and Postgres.

Install dependencies:

```bash
yarn
```

Copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env.local
```

## Building and running the app

```bash
# build postgres and api
docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
