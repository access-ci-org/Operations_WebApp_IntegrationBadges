import ReadmeRenderer from "./ReadmeRenderer.jsx";
import {Link, useParams} from "react-router-dom";
import {getRouteDetailsGithubEditUrl, getRouteFromDetailsPath} from "./application-routes-util.jsx";
import React from "react";
import RouteDetailLink from "./RouteDetailsLink.jsx";

export default function ApplicationRouteDetails() {

    const {routeDetailsPath} = useParams();

    const route = getRouteFromDetailsPath(routeDetailsPath);

    return <div className="w-100">
        <h2>
            <span className="pe-4">Route :</span>
            <RouteDetailLink route={route}/>
        </h2>
        <div className="w-100 mb-5 mt-5">
            <ReadmeRenderer editUrl={getRouteDetailsGithubEditUrl(route)}>{route.detailedMarkdown}</ReadmeRenderer>
        </div>
        <div className="w-100 mb-3">
            <h6 className="d-inline">Total page count : </h6>
            {route.urlCount}
        </div>
        <div className="w-100 mb-3">
            <h6>Examples:</h6>
            <ul>
                <li>{route.example}</li>
            </ul>
        </div>
    </div>;
}