# @devpodio/access
Adds cloudflare access jwt validation and logout button to Devpod(fork of Theia IDE).

## Requirements

- Your domain dns must be hosted at cloudflare
- Got to your Cloudflare dashboard and navigate to `Access`
- Setup your Access configurations and take note of the `AUD` when creating a policy.

## Getting started

- Include this extension to your package.json `"@devpodio/access": "^0.5.0"`

## Validation via AUD

- Load the `AUD_ACCESS` environment variable when starting the app. example: `AUD_ACCESS=xxxxx yarn start`
- Multiple `AUD_ACCESS` can be set by separating them by commas. example `AUD_ACCESS=xxxxx,yyyyy,zzzzz yarn start`

## Recommended way to load AUD environment

- Install `dotenv` via yarn or npm. 
- Create a `.env` file and set up your `AUD_ACCESS`
- Start theia via plain `node` style. example: `node -r dotenv/config ./src-gen/backend/main.js`

## Publishin

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

    npm login

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

    npx lerna publish
