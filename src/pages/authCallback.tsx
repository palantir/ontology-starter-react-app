import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../utils/client";
import { PublicClientAuth } from "@ontology-starter/sdk";

/**
 * Component to render at `/auth/callback`
 * This calls signIn() again to save the token, and then navigates the user back to the home page.
 */
export const AuthCallback: React.FC = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        (client.auth as PublicClientAuth)
            .signIn()
            .then(() => navigate("/"))
            .catch((error: any) => setError(error.message ?? error));
    }, [navigate]);
    return <div>{error != null ? error : "Authenticating…"}</div>;
};
