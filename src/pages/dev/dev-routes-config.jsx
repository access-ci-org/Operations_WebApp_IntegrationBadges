import {Link, Navigate, Outlet} from "react-router-dom";
import {ProtectedRouteElement} from "../../components/util/Permissions.jsx";
import {DevRouteUrls} from "../pages-config.js";
import ReadmeRenderer from "./ReadmeRenderer.jsx";

// '?raw' tells Vite to import text, not a module
import applicationRoutesSummaryMarkdown from "./application-routes-summary.md?raw";
import changelogMarkdown from "../../../CHANGELOG.md?raw";

import ApplicationConfigsOverview from "./ApplicationConfigsOverview.jsx";
import ApplicationRouteDetails from "./ApplicationRouteDetails.jsx";

const RouterLayout = () => {
    return (
        <div className="container">
            <div className="w-100 bg-white mb-5">
                <h1>Integration Dashboard Developer Documentation</h1>
                <ul className="m-0 p-0 fs-8">
                    <li className="d-inline-block p-3">
                        <Link className="btn btn-link border-3 border-start ps-1 text-primary"
                              to={DevRouteUrls.CONFIG}>Application Configs</Link></li>
                    <li className="d-inline-block p-3">
                        <Link className="btn btn-link border-3 border-start ps-1 text-primary"
                              to={DevRouteUrls.ROUTES}>Application Routes</Link>
                    </li>
                    <li className="d-inline-block p-3">
                        <Link className="btn btn-link border-3 border-start ps-1 text-primary"
                              to={DevRouteUrls.CHANGELOG}>Changelog</Link>
                    </li>
                </ul>
            </div>
            <div className="w-100">
                <Outlet/>
            </div>
        </div>
    );
};

const DevRoutesConfig = {
    path: '/dev', // Base structural path wrapper
    element: <RouterLayout/>,
    children: [
        {index: true, element: <Navigate to={DevRouteUrls.CONFIG} replace={true}/>},
        {
            name: "Dev: Config",
            path: DevRouteUrls.CONFIG,
            element: <ProtectedRouteElement>
                <ApplicationConfigsOverview/>
            </ProtectedRouteElement>
        },
        {
            name: "Dev: Routes",
            path: DevRouteUrls.ROUTES,
            element: <ProtectedRouteElement>
                <ReadmeRenderer
                    showNotMentionedRoutsList={true}
                    editUrl="https://github.com/access-ci-org/Operations_WebApp_IntegrationBadges/edit/main/src/pages/dev/application-routes-summary.md">

                    {applicationRoutesSummaryMarkdown}
                </ReadmeRenderer>
            </ProtectedRouteElement>
        },
        {
            name: "Dev: Routes",
            path: DevRouteUrls.ROUTE_DETAILS,
            element: <ProtectedRouteElement>
                <ApplicationRouteDetails/>
            </ProtectedRouteElement>
        },
        {
            name: "Dev: Changelog",
            path: DevRouteUrls.CHANGELOG,
            element: <ProtectedRouteElement>
                <ReadmeRenderer>{changelogMarkdown}</ReadmeRenderer>
            </ProtectedRouteElement>
        },
        {path: '*', element: <Navigate to={DevRouteUrls.INDEX} replace={true}/>},
    ]
};

export default DevRoutesConfig;