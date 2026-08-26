import ReadmeRenderer from "./ReadmeRenderer.jsx";
import {Link, useParams} from "react-router-dom";
import {getRouteDetailsGithubEditUrl, getRouteFromDetailsPath} from "./application-routes-util.jsx";
import React from "react";
import RouteDetailLink from "./RouteDetailsLink.jsx";
import ApplicationRoutePageCount from "./ApplicationRoutePageCount.jsx";

export default function ApplicationRouteDetails() {

    const {routeDetailsPath} = useParams();

    const route = getRouteFromDetailsPath(routeDetailsPath);

    return <div className="w-100">
        <h2>
            <span className="pe-4">Route :</span>
            <RouteDetailLink route={route}/>
        </h2>
        <div className="w-100 mb-5 mt-5">
            <ReadmeRenderer markdownFileUrl={getRouteDetailsGithubEditUrl(route)}/>
        </div>

        <div className="w-100 mb-3">
            <h6 className="d-inline pe-3">Authentication:</h6>
            {route.authenticationRequired ? <span>Required <i className="ps-1 bi bi-lock-fill"></i></span> : "NA"}
        </div>

        <div className="w-100 mb-3">
            <h6 className="d-inline pe-3">Authorized Roles:</h6>
            {route.authorizedRoles && route.authorizedRoles.length > 0 ? route.authorizedRoles.join(" ,") : "NA"}
        </div>

        <div className="w-100 mb-3">
            <h6 className="d-inline pe-3">Total page count : </h6>
            <ApplicationRoutePageCount route={route} renderComponent={(pageCount) => pageCount}/>
        </div>
        <div className="w-100 mb-3">
            <h6>Examples:</h6>
            <ApplicationRoutePageCount route={route} renderComponent={(pageCount, examples) => <div>
                {(!examples || examples.length === 0) &&
                    <span className="text-secondary p-2">Examples are not available</span>}
                <ol>
                    {examples.map((example, exampleIndex) => <li key={exampleIndex} className="p-1">
                        {example.label && <div className="d-inline pe-2">{example.label} - </div>}

                        {example.href ?
                            <Link to={example.href}>{example.href}</Link> :
                            <span className="text-secondary p-2 small">(No available examples)</span>}
                    </li>)}
                </ol>
            </div>}/>
        </div>
    </div>;
}