import {Link} from "react-router-dom";
import React from "react";
import ReadmeRenderer from "./ReadmeRenderer.jsx";
import {DevRouteUrls} from "../pages-config.js";
import {getRouteDetailsPath, getRouteMarkdownFilePath} from "./application-routes-util.jsx";

export default function RouteDetailLink({route}) {
    return <div>

        {route.authenticationRequired ? <i className="ps-1 pe-2 bi bi-lock-fill"></i> :
            <i className="ps-1 pe-2 bi bi-globe"></i>}
        <Link className="btn btn-link fs-7"
              to={DevRouteUrls.ROUTE_DETAILS.replace(":routeDetailsPath", getRouteDetailsPath(route))}>


            <span dangerouslySetInnerHTML={{
                __html: route.path.replaceAll(/:[a-zA-Z0-9_]*/ig, (v) =>
                    `<code>${v}</code>`)
            }}>
            </span>
        </Link>
        <span className="ms-2 fs-9 badge bg-gray-300">{route.urlCount} page(s)</span>
        {/*<div>getRouteDetailsPath : {getRouteDetailsPath(route)}</div>*/}
        {/*<div>getRouteMarkdownFilePath : {getRouteMarkdownFilePath(route)}</div>*/}
        {/*<ReadmeRenderer>{route.detailedMarkdown}</ReadmeRenderer>*/}
    </div>
}