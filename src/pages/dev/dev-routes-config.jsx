import {Link, Navigate, Outlet} from "react-router-dom";
import {ProtectedRouteElement} from "../../components/util/Permissions.jsx";
import {DevRouteUrls} from "../pages-config.js";
import ReadmeRenderer from "./ReadmeRenderer.jsx";

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
                    markdownFileUrl="/src/pages/dev/application-routes-summary.md"/>
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
                <ReadmeRenderer
                    markdownFileUrl="/CHANGELOG.md"/>
            </ProtectedRouteElement>
        },
        {path: '*', element: <Navigate to={DevRouteUrls.INDEX} replace={true}/>},
    ]
};

export default DevRoutesConfig;