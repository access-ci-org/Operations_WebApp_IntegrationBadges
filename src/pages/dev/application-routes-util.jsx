import {ProtectedRouteElement} from "../../components/util/Permissions.jsx";
import {Link, Navigate} from "react-router-dom";
import ApplicationRoutesConfig from "../application-routes-config.jsx";

export function getRouteDetailsGithubEditUrl(route) {
    return `/src/pages/dev/application-routes-details/${getRouteDetailsPath(route)}.md`
}

export function getRouteDetailsPath(route) {
    return route.path.replaceAll(/^\//ig, "").replaceAll("/", "__");
}

export function getRouteFromDetailsPath(routeDetailsPath) {
    const routePath = "/" + routeDetailsPath.replaceAll("__", "/");
    return getApplicationRoutesMap()[routePath];
}

export function getRouteListItemsBFSList(config, listOfRouteListItems = []) {
    for (let route of Object.values(config)) {
        if (route.index) continue;

        let urlCount = 1;

        let exampleUrl = route.path;

        if (route.path && route.element && route.element.type !== Navigate) {

            // Replacing to "verification-failed" because the webapp uses only that route
            const routePath = route.path.replace(":badgeWorkflowStatus", "verification-failed");

            listOfRouteListItems.push({
                ...route,
                name: route.name,
                description: route.description,
                path: routePath,
                authenticationRequired: route.element.type === ProtectedRouteElement,
                authorizedRoles: route.element.props.roles,
                urlCount: urlCount,
                example: <Link to={exampleUrl}>{exampleUrl}</Link>
            });
        }

        if (route.children) getRouteListItemsBFSList(route.children, listOfRouteListItems);
    }

    return listOfRouteListItems;
}

export function getApplicationRoutesList() {
    return getRouteListItemsBFSList(ApplicationRoutesConfig);
}

export function getApplicationRoutesMap() {
    const applicationRoutesList = getApplicationRoutesList();
    const applicationRoutesMap = {};
    for (let route of applicationRoutesList) {
        applicationRoutesMap[route.path] = route;
    }

    return applicationRoutesMap;
}

export function getRoutesListNotMentionedInMarkdownContent(markdownContent) {
    const mentionedRoutesSet = new Set(markdownContent.matchAll(/`([^`]*)`/ig).map(r => r[1]));

    return getApplicationRoutesList().filter(r => !mentionedRoutesSet.has(r.path));
}
