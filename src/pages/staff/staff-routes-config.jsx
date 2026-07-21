import {Link, Navigate, Outlet} from "react-router-dom";
import Debug from "../../components/util/Debug.jsx";
import ResourceBadgeStatusListing from "./ResourceBadgeStatusListing.jsx";
import StaffDashboard from "./StaffDashboard.jsx";
import StaffRoadmaps from "./StaffRoadmaps.jsx";
import StaffRoadmapEdit from "./StaffRoadmapEdit.jsx";
import StaffBadgeEdit from "./StaffBadgeEdit.jsx";
import StaffContacts from "./StaffContacts.jsx";
import {ProtectedRouteElement} from "../../components/util/Permissions.jsx";
import {IntegrationRoles} from "../../contexts/constants.js";
import {StaffRouteUrls} from "../pages-config.js";

const RouterLayout = () => {
    return (
        <div className="row">
            <Debug>
                <div className="col-md-2 bg-white" style={{fontSize: 11}}>
                    <ul className="m-0 p-0">
                        <li className="d-inline-block p-2">
                            <Link className="btn btn-link border-3 border-start ps-1" to="/">
                                Integration Dashboard</Link></li>
                        <li className="d-inline-block p-2">
                            <Link className="btn btn-link border-3 border-start ps-1"
                                  to={StaffRouteUrls.INDEX}>Staff</Link>
                        </li>
                    </ul>
                </div>
            </Debug>
            <div className="col">
                <Outlet/>
            </div>
        </div>
    );
};

const StaffRoutesConfig = {
    path: '/staff', // Base structural path wrapper
    element: <RouterLayout/>,
    children: [
        {index: true, element: <Navigate to={StaffRouteUrls.INDEX} replace={true}/>},
        {name: "Staff: Dashboard", path: StaffRouteUrls.INDEX, element: <StaffDashboard/>},
        {name: "Staff: Roadmap list and administration", path: StaffRouteUrls.ROADMAPS, element: <StaffRoadmaps/>},
        {
            name: "Staff: Roadmap Edit",
            path: StaffRouteUrls.ROADMAP_EDIT,
            element: <ProtectedRouteElement roles={[IntegrationRoles.ROADMAP_MAINTAINER, IntegrationRoles.CONCIERGE]}>
                <StaffRoadmapEdit/>
            </ProtectedRouteElement>
        },
        {
            name: "Staff: Add new roadmap",
            path: StaffRouteUrls.ROADMAP_NEW,
            element: <ProtectedRouteElement roles={[IntegrationRoles.ROADMAP_MAINTAINER, IntegrationRoles.CONCIERGE]}>
                <StaffRoadmapEdit/>
            </ProtectedRouteElement>
        },
        {
            name: "Staff: Badge edit",
            path: StaffRouteUrls.BADGE_EDIT,
            element: <ProtectedRouteElement roles={[IntegrationRoles.BADGE_MAINTAINER, IntegrationRoles.CONCIERGE]}>
                <StaffBadgeEdit/>
            </ProtectedRouteElement>
        },
        {
            name: "Staff: Add new badge",
            path: StaffRouteUrls.BADGE_NEW,
            element: <ProtectedRouteElement roles={[IntegrationRoles.BADGE_MAINTAINER, IntegrationRoles.CONCIERGE]}>
                <StaffBadgeEdit/>
            </ProtectedRouteElement>
        },
        {
            name: "Staff: Resource Roadmap Badge status listing",
            path: StaffRouteUrls.BADGE_STATUS,
            element: <ResourceBadgeStatusListing/>
        },
        {
            name: "Staff: Resource Provider Contacts",
            path: StaffRouteUrls.CONTACTS,
            element: <ProtectedRouteElement roles={[
                IntegrationRoles.IMPLEMENTER, IntegrationRoles.COORDINATOR,
                IntegrationRoles.ROADMAP_MAINTAINER, IntegrationRoles.BADGE_MAINTAINER, IntegrationRoles.CONCIERGE
            ]}>
                <StaffContacts/>
            </ProtectedRouteElement>
        }
    ]
};

export default StaffRoutesConfig;