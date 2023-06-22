# ontology-starter-react-app

A simple skeleton application to get you started on React/TypeScript development on top of the Ontology SDK in Foundry.

## Prerequisites

1. Make sure you're on Node >= 16.15.0
    1. You can run `node -v` to check the version of Node you're using

## Getting started

1. Copy or make a fork of this repository (you can delete `.policy.yml`)
1. Run `npm install`
1. Create an application via the Foundry Developer Console with the configuration below. Once the application has been created, come back to these instructions.
    1. Select client facing application (creates a public client) when asked what type of application you're building
    1. Add `https://localhost:8080/auth/callback` as a redirect URL when asked for one
    1. If you know where your application is getting deployed, you can add your production URL as well: `https://example.app.com/auth/callback`
1. Follow the instructions in the Foundry Developer Console to generate and then install your application's Ontology SDK via the application-specific NPM registry
1. Run `mv .env.development.sample .env.development` to start setting up your environment variables, and fill in the fields marked with `<>`

    a. You can find your Client ID in either the Quickstart guide for the SDK or in the Permissions & OAuth page

1. Update the following files with your Ontology SDK and Object types:
    1. Update [`src/utils/client.ts`](./src/utils/client.ts) with the correct package name
    1. Update [`src/pages/home.tsx`](./src/pages/home.tsx) with the correct package name and Ontology Objects you want to use.
1. Run `npm run dev`
1. Go to https://localhost:8080
    1. There will be a browser warning saying the site is untrusted, which is expected since this sample repository runs a HTTPS server on localhost with a self-signed certificate. You can safely click continue to start developing.

## Deploying to production

1. Store `FOUNDRY_CLIENT_ID`, `FOUNDRY_ONTOLOGY_API_URL`, and `APPLICATION_REDIRECT_URL` in your CI/CD environment secret management system (see below for example documentation)
    1. [CircleCi](https://circleci.com/docs/env-vars/#private-keys-and-secrets)
    1. [GitHub Actions](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)
1. Before building your application, write an `.env` file to disk:

    ```
    # Replace variables with your CI/CD environment variable injection mechanism
    echo FOUNDRY_CLIENT_ID="$FOUNDRY_CLIENT_ID" >> .env.production
    echo FOUNDRY_API_URL="$FOUNDRY_ONTOLOGY_API_URL" >> .env.production
    echo APPLICATION_REDIRECT_URL="$PRODUCTION_REDIRECT_URL" >> .env.production
    ```

1. Run `npm run build`
1. Upload the resulting `dist/` directory to your hosting solution.

## Troubleshooting

### I'm getting `npm ERR! code E401` / `401 Unauthorized` when running `npm install`

When following the instructions in the Foundry Developer Console make sure to set up your Foundry API token in your local machine environment correctly in order to install your application's Ontology SDK via the application-specific NPM registry.

### I'm seeing `npm ERR! code SELF_SIGNED_CERT_IN_CHAIN` / `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` when running `npm run dev`

During local development API requests are routed through a [webpack-dev-server proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy) via [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) to avoid Cross-Origin Resource Sharing (CORS) issues during development. These errors can happen if your production Foundry instance certificate is signed by a custom certificate authority (CA) that Node.js has not been set up to trust correctly.

If you have access to the trusted custom CA certificates you can add them to Node.js by setting up your environment as follows:

```
export NODE_EXTRA_CA_CERTS=/path/to/your/cert.pem
```
