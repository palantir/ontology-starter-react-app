import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { client } from "./client";
import { PublicClientAuth } from "@ontology-starter/sdk";

/**
 * A component that can be used to wrap routes that require authentication.
 * Nested routes may assume that a valid token is present.
 */
export const AuthenticatedRoute: React.FC = () => {
    if (client.auth instanceof PublicClientAuth) {
        return <AuthenticatedRouteContent auth={client.auth} />;
    }
    if (process.env.USER_TOKEN == null) {
        return <div>You are using UserTokenAuth without a token</div>;
    }

    return <Outlet />;
};

interface AuthenticatedRouteContentProps {
    auth: PublicClientAuth;
}
export const AuthenticatedRouteContent: React.FC<AuthenticatedRouteContentProps> = ({ auth }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(auth.token);
    useEffect(() => {
        if (auth.token == null || auth.token.isExpired) {
            auth.signIn()
                .then(() => {
                    setToken(auth.token);
                })
                .catch(() => {
                    // If we cannot refresh the token (i.e. the user is not logged in) we redirect to the login page
                    navigate("/login");
                });
        }
    }, [auth, navigate]);

    if (token == null || token.isExpired) {
        return null;
    }

    return <Outlet />;
};
