// Replace the package name with your application's package name instead.
import { FoundryClient, PublicClientAuth, UserTokenAuth } from "@ontology-starter/sdk";

/**
 * Initialize the client to interact with the Ontology SDK
 */
export let client: FoundryClient =
    process.env.NODE_ENV === "production"
        ? new FoundryClient({
              url: process.env.FOUNDRY_API_URL!,
              auth: new PublicClientAuth({
                  clientId: process.env.FOUNDRY_CLIENT_ID!,
                  url: process.env.FOUNDRY_API_URL!,
                  redirectUrl: process.env.APPLICATION_REDIRECT_URL!,
              }),
          })
        : new FoundryClient({
              url: process.env.FOUNDRY_API_URL!,
              auth: new UserTokenAuth({
                  userToken: process.env.USER_TOKEN!,
              }),
          });
