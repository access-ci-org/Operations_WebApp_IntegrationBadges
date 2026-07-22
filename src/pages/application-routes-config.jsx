import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import About from "./About.jsx";
import IntegrationDashboard from "./IntegrationDashboard.jsx";
import Organization from "./Organization.jsx";
import Resource from "./Resource.jsx";
import OrganizationBadgeReview from "./OrganizationBadgeReview.jsx";
import {AppRouteUrls} from "./pages-config.js";
import CustomizedBreadcrumb from "../components/CustomizedBreadcrumb.jsx";
import {StaffMainNavigation} from "../components/staff/StaffMainNavigation.jsx";
import {useOrganizations} from "../contexts/OrganizationsContext.jsx";
import {useResources} from "../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";
import {useTasks} from "../contexts/TaskContext.jsx";
import {useContacts} from "../contexts/ContactsContext.jsx";
import {useBadges} from "../contexts/BadgeContext.jsx";
import ResourceBadge from "./ResourceBadge.jsx";
import {ProtectedRouteElement} from "../components/util/Permissions.jsx";
import {IntegrationRoles} from "../contexts/constants.js";
import ResourceEdit from "./ResourceEdit.jsx";
import DocumentationRoutesConfig from "./docs/documentation-routes-config.jsx";
import StaffRoutesConfig from "./staff/staff-routes-config.jsx";

const RouterLayout = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const initialFetchesAreRequired = !(/^\/(docs|about)/i.exec(pathname));
    const isStaffPage = !!(/^\/staff/i.exec(pathname));

    const {fetchOrganizations, getOrganizations} = useOrganizations();
    const {fetchResources, getResources} = useResources();
    const {fetchRoadmaps, getRoadmaps} = useRoadmaps();
    const {fetchBadges, getBadges} = useBadges();
    const {fetchTasks, getTasks} = useTasks();
    const {fetchContactTypes, getContactTypes} = useContacts();

    const organizations = getOrganizations();
    const resources = getResources();
    const roadmaps = getRoadmaps();
    const badges = getBadges();
    const tasks = getTasks();
    const contactTypes = getContactTypes();

    useEffect(() => {
        fetchOrganizations();
        fetchResources();
        fetchRoadmaps();
        fetchBadges();
        fetchTasks();
        fetchContactTypes();
    }, []);

    let isDataReady = (organizations && organizations.length > 0)
        && (resources && resources.length > 0)
        && (roadmaps && roadmaps.length > 0)
        && (badges && badges.length > 0)
        && (tasks && tasks.length > 0)
        && (contactTypes && contactTypes.length > 0);

    if (isStaffPage) {
        return <div className="w-100 pt-3 pb-5 bg-gray-200">
            <div className="container">
                <StaffMainNavigation/>
            </div>
            {!initialFetchesAreRequired || isDataReady ? <Outlet/> : <LoadingBlock processing={true}/>}
        </div>;
    } else {
        return <div className="w-100">
            <CustomizedBreadcrumb/>
            <div className="w-100 pt-3 pb-5">
                {!initialFetchesAreRequired || isDataReady ? <Outlet/> : <LoadingBlock processing={true}/>}
            </div>
        </div>;
    }
};

const ApplicationRoutesConfig = [
    {
        path: AppRouteUrls.ROOT,
        element: <RouterLayout/>,
        children: [
            {index: true, element: <Navigate to={AppRouteUrls.ORGANIZATIONS} replace={true}/>},
            {name: "About page for Developers", path: AppRouteUrls.ABOUT, element: <About/>},
            {name: "Integration Dashboard Home", path: AppRouteUrls.ORGANIZATIONS, element: <IntegrationDashboard/>},
            {name: "Resource Provider Dashboard", path: AppRouteUrls.ORGANIZATION, element: <Organization/>},
            {
                name: "Resource Provider Badge Review",
                path: AppRouteUrls.ORGANIZATION_BADGE_REVIEW,
                element: <OrganizationBadgeReview/>
            },
            {name: "Resource", path: AppRouteUrls.RESOURCE, element: <Resource/>},
            {name: "Resource Roadmap", path: AppRouteUrls.RESOURCE_ROADMAP, element: <Resource/>},
            {
                name: "New Roadmap Integration",
                description: "Currently this is available only if the selected resource is not integrated to any roadmap",
                path: AppRouteUrls.RESOURCE_EDIT,
                element: <ProtectedRouteElement roles={[IntegrationRoles.COORDINATOR, IntegrationRoles.CONCIERGE]}>
                    <ResourceEdit/>
                </ProtectedRouteElement>
            },
            {
                name: "Edit Roadmap Integration",
                description: "This is where the selection of badges can be altered for the selected roadmap integration",
                path: AppRouteUrls.RESOURCE_ROADMAP_EDIT,
                element: <ProtectedRouteElement roles={[IntegrationRoles.COORDINATOR, IntegrationRoles.CONCIERGE]}>
                    <ResourceEdit/>
                </ProtectedRouteElement>
            },
            {
                name: "Resource Roadmap Badge",
                description: "This is the detailed page for an individual badge within the selected resource roadmap integration",
                path: AppRouteUrls.RESOURCE_BADGE, element: <ResourceBadge/>
            },
            DocumentationRoutesConfig,
            StaffRoutesConfig,
            {path: '*', element: <Navigate to={AppRouteUrls.ORGANIZATIONS} replace={true}/>},
        ]
    }
];

export default ApplicationRoutesConfig;
