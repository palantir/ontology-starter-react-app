import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../utils/client";
import { ReplaceMeObject } from "@replace-me/sdk";

import "./home.scss";

export const HomePage: React.FC = () => {
    const [objectList, setObjectList] = useState<
        { status: "loading" } | { status: "loaded"; value: ReplaceMeObject[] } | { status: "failed_loading" }
    >({ status: "loading" });
    const navigate = useNavigate();

    // Handle token refresh
    const [token, setToken] = useState(client.auth.token);
    useEffect(() => {
        if (client.auth.token == null) {
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
    }, [navigate]);

    // Do an initial load of all Objects of a particular type
    useEffect(() => {
        if (token != null) {
            client.ontology.objects.ReplaceMeObject.all().then(objects =>
                setObjectList({ value: objects, status: "loaded" }),
            );
        }
    }, [token]);

    return (
        <div className="home">
            <h1>Hello World!</h1>
            {objectList.status === "loading" && <div>Loading…</div>}
            {objectList.status === "loaded" && (
                <ul>
                    {objectList.value.map(object => (
                        <li key={object.__rid}>{object.myProperty}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
