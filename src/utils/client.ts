// Replace the package name with your application's package name instead.
import { FoundryBrowserClient } from "@ontology-starter/sdk";

/**
 * Initialize the client to interact with the Ontology SDK
 */
export const client = new FoundryBrowserClient({
    clientId: process.env.FOUNDRY_CLIENT_ID!,
    url: process.env.FOUNDRY_API_URL!,
    redirectUrl: process.env.APPLICATION_REDIRECT_URL!,
});
