import {Navigate, Outlet, useLocation} from "react-router-dom";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
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
import DevRoutesConfig from "./dev/dev-routes-config.jsx";
import {useEffectWithErrorHandling} from "../components/util/useEffectWithErrorHandling.js";
import {useState} from "react";

const RouterLayout = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const initialFetchesAreRequired = !(/^\/(docs|about)/i.exec(pathname));
    const isStaffPage = !!(/^\/staff/i.exec(pathname));

    const {fetchOrganizations} = useOrganizations();
    const {fetchResources} = useResources();
    const {fetchRoadmaps} = useRoadmaps();
    const {fetchBadges} = useBadges();
    const {fetchTasks} = useTasks();
    const {fetchContactTypes} = useContacts();

    const [isDataReady, setIsDataReady] = useState(false);

    const {processing, error, reload} = useEffectWithErrorHandling(async () => {
        if (initialFetchesAreRequired) {
            await Promise.all([
                fetchOrganizations(),
                fetchResources(),
                fetchRoadmaps(),
                fetchBadges(),
                fetchTasks(),
                fetchContactTypes()
            ]);
        }

        setIsDataReady(true)
    }, []);

    let content = <LoadingBlock title="metadata" processing={processing} error={error} reload={reload}
                                className="w-100 p-5 text-center">
        {isDataReady && <Outlet/>}
    </LoadingBlock>;

    if (isStaffPage) {
        content = <div className="w-100 pt-3 pb-5 bg-gray-200">
            <div className="container">
                <StaffMainNavigation/>
            </div>
            {content}
        </div>;
    } else {
        content = <div className="w-100">
            <CustomizedBreadcrumb/>
            <div className="w-100 pt-3 pb-5">
                {content}
            </div>
        </div>;
    }

    return content;
};

const ApplicationRoutesConfig = [
    {
        path: AppRouteUrls.ROOT,
        element: <RouterLayout/>,
        children: [
            {index: true, element: <Navigate to={AppRouteUrls.ORGANIZATIONS} replace={true}/>},
            {
                name: "Integration Dashboard Home",
                path: AppRouteUrls.ORGANIZATIONS,
                element: <ProtectedRouteElement><IntegrationDashboard/></ProtectedRouteElement>
            },
            {
                name: "Resource Provider Dashboard",
                path: AppRouteUrls.ORGANIZATION,
                element: <ProtectedRouteElement><Organization/></ProtectedRouteElement>
            },
            {
                name: "Resource Provider Badge Review",
                path: AppRouteUrls.ORGANIZATION_BADGE_REVIEW,
                element: <ProtectedRouteElement><OrganizationBadgeReview/></ProtectedRouteElement>
            },
            {
                name: "Resource",
                path: AppRouteUrls.RESOURCE,
                element: <ProtectedRouteElement><Resource/></ProtectedRouteElement>
            },
            {
                name: "Resource Roadmap",
                path: AppRouteUrls.RESOURCE_ROADMAP,
                element: <ProtectedRouteElement><Resource/></ProtectedRouteElement>
            },
            {
                name: "Resource Roadmap Integration - NEW",
                description: "Currently this is available only if the selected resource is not integrated to any roadmap",
                path: AppRouteUrls.RESOURCE_EDIT,
                element: <ProtectedRouteElement roles={[IntegrationRoles.COORDINATOR, IntegrationRoles.CONCIERGE]}>
                    <ResourceEdit/>
                </ProtectedRouteElement>
            },
            {
                name: "Resource Roadmap Integration - EDIT",
                description: "This is where the selection of badges can be altered for the selected roadmap integration",
                path: AppRouteUrls.RESOURCE_ROADMAP_EDIT,
                element: <ProtectedRouteElement roles={[IntegrationRoles.COORDINATOR, IntegrationRoles.CONCIERGE]}>
                    <ResourceEdit/>
                </ProtectedRouteElement>
            },
            {
                name: "Resource Roadmap Integration Badge",
                description: "This is the detailed page for an individual badge within the selected resource roadmap integration",
                path: AppRouteUrls.RESOURCE_BADGE,
                element: <ProtectedRouteElement><ResourceBadge/></ProtectedRouteElement>
            },
            StaffRoutesConfig,
            DocumentationRoutesConfig,
            DevRoutesConfig,
            {path: '*', element: <Navigate to={AppRouteUrls.ORGANIZATIONS} replace={true}/>},
        ]
    }
];

export default ApplicationRoutesConfig;
