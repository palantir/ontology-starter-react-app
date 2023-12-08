import React, { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";

import "./login.scss";
import { client } from "../utils/client";
import { PublicClientAuth } from "@ontology-starter/sdk";

export const LoginPage: React.FC = () => {
    if (!(client.auth instanceof PublicClientAuth)) {
        return <></>;
    }
    return <LoginPageContent auth={client.auth} />;
};

interface LoginPageContentProps {
    auth: PublicClientAuth;
}
export const LoginPageContent: React.FC<LoginPageContentProps> = ({ auth }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const token = auth.token;

    const onLoginClick = useCallback(async () => {
        setIsLoggingIn(true);
        try {
            // Initiate the OAuth flow, which will redirect the user to log into Foundry
            // Once the login has completed, the user will be redirected back to the route defined via the
            // APPLICATION_REDIRECT_URL variable in .env.development
            await auth.signIn();
        } catch (err: any) {
            setError(err.message ?? err);
        }
    }, [auth]);

    // If the token exists but a user tries to load /login, redirect to the home page instead
    if (token != null) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="login">
            <h1>Please log in</h1>
            <button onClick={onLoginClick}>{isLoggingIn ? "Logging in…" : "Log in "}</button>
            {error && <div>Unable to log in: {error}</div>}
        </div>
    );
};
