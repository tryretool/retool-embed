# Development 

This document is intended to help Retool engineers contribute to this project. 

## Local dev

To build the package:

`npm run build:npm`

Reference [these docs](https://docs.npmjs.com/cli/v10/commands/npm-link) for importing this as an NPM package in another repo/folder locally to develop against your work.

I had good luck using [nwb](https://github.com/insin/nwb) to quickly spin up a test vanilla JS app as a client for embedding a retool app. I hit the backend server in our (internal) embed debug repo to generate an embed URL and used that in my test app.

## Tests

`npm run test`

## NPM

1. Make sure you're a member of the `@tryretool` organization
2. Bump version with `npm version [major|minor|patch]`
3. Build the latest code and sync relevant files using `npm run build:npm`. This will build the latest version in `/dst`
4. `cd dst`
4. `npm login`
5. `npm publish`
