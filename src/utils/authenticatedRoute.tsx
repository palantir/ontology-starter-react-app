import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { client } from "./client";

export const AuthenticatedRoute: React.FC = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(client.auth.token);
    useEffect(() => {
        if (client.auth.token == null || client.auth.token.isExpired) {
            client.auth
                .refresh()
                .then(() => {
                    setToken(client.auth.token);
                })
                .catch(() => {
                    // If we cannot refresh the token (i.e. the user is not logged in) we redirect to the login page
                    navigate("/login");
                });
        }
    }, []);

    if (token == null || token.isExpired) {
        return null;
    }

    return <Outlet />;
};
