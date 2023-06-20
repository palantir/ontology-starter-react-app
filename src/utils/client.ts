// Replace the package name with your application's package name instead.
import { FoundryBrowserClient } from "@replace-me/sdk";

/**
 * Initialize the client to interact with the Ontology SDK
 */
export const client = new FoundryBrowserClient({
    clientId: process.env.FOUNDRY_CLIENT_ID!,
    url: process.env.NODE_ENV === "production" ? process.env.FOUNDRY_ONTOLOGY_API_URL! : process.env.LOCALHOST_API_URL!,
    redirectUrl:
        process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_REDIRECT_URL!
            : process.env.LOCALHOST_REDIRECT_URL!,
});
