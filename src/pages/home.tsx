import React, { useEffect, useState } from "react";
import { client } from "../utils/client";
import { Country } from "@ontology-starter/sdk/ontology/objects";

import "./home.scss";

export const HomePage: React.FC = () => {
    const [objectList, setObjectList] = useState<
        { status: "loading" } | { status: "loaded"; value: Country[] } | { status: "failed_loading" }
    >({ status: "loading" });

    // Do an initial load of all Objects of a particular type
    useEffect(() => {
        client.ontology.objects.Country.all().then((objects: Country[]) =>
            setObjectList({ value: objects, status: "loaded" }),
        );
    }, []);

    return (
        <div className="home">
            <h1>Hello World!</h1>
            {objectList.status === "loading" && <div>Loading…</div>}
            {objectList.status === "loaded" && (
                <ul>
                    {objectList.value.map(object => (
                        <li key={object.__rid}>{object.countryName}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
