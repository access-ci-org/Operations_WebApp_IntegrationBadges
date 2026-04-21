import './App.scss';
import './styles/style.scss';
import "bootstrap-icons/font/bootstrap-icons.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Outlet, Route, Routes, BrowserRouter, Navigate, useLocation} from 'react-router-dom';
import {BadgeProvider, useBadges} from "./contexts/BadgeContext";
import {ResourcesProvider, useResources} from "./contexts/ResourcesContext";
import NewResource from "./pages/NewResource";
import IntegrationDashboard from "./pages/IntegrationDashboard";
import {OrganizationsProvider, useOrganizations} from "./contexts/OrganizationsContext";
import Organization from "./pages/Organization";
import CustomizedBreadcrumb from "./components/CustomizedBreadcrumb";
import Resource from "./pages/Resource";
import ResourceBadge from "./pages/ResourceBadge";
import {TaskProvider, useTasks} from "./contexts/TaskContext";
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import {useEffect} from "react";
import LoadingBlock from "./components/util/LoadingBlock.jsx";
import ResourceEdit from "./pages/ResourceEdit.jsx";
import {RoadmapProvider, useRoadmaps} from "./contexts/RoadmapContext.jsx";
import {DocumentationRoute} from "./pages/docs/DocumentationRoute.jsx";
import OrganizationBadgeReview from "./pages/OrganizationBadgeReview.jsx";
import {StaffRoute} from "./pages/staff/StaffRoute.jsx";
import {StaffMainNavigation} from "./components/staff/StaffMainNavigation.jsx";
import {AlwaysScrollToTop} from "./components/util/scroll.jsx";
import About from "./pages/About.jsx";
import {ContactProvider} from "./contexts/ContactsContext.jsx";
import {RolesProvider, useRoles} from "./contexts/PermissionContext.jsx";

const RouterLayout = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const initialFetchesAreRequired = !(/^\/(docs|about)/i.exec(pathname));
    const isStaffPage = !!(/^\/staff/i.exec(pathname));

    const {fetchRoles} = useRoles();
    const {fetchOrganizations, getOrganizations} = useOrganizations();
    const {fetchResources, getResources} = useResources();
    const {fetchRoadmaps, getRoadmaps} = useRoadmaps();
    const {fetchBadges, getBadges} = useBadges();
    const {fetchTasks, getTasks} = useTasks();

    const organizations = getOrganizations();
    const resources = getResources();
    const roadmaps = getRoadmaps();
    const badges = getBadges();
    const tasks = getTasks();

    useEffect(() => {
        fetchRoles();

        if (initialFetchesAreRequired) {
            fetchOrganizations();
            fetchResources();
            fetchRoadmaps();
            fetchBadges();
            fetchTasks();
        }
    }, [initialFetchesAreRequired]);

    let isDataReady = (organizations && organizations.length > 0)
        && (resources && resources.length > 0)
        && (roadmaps && roadmaps.length > 0)
        && (badges && badges.length > 0)
        && (tasks && tasks.length > 0);

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


function App() {
    return (
        <OrganizationsProvider>
            <RolesProvider>
                <BadgeProvider>
                    <TaskProvider>
                        <RoadmapProvider>
                            <ContactProvider>
                                <ResourcesProvider>
                                    <I18nextProvider i18n={i18n}>
                                        <div className="w-100">
                                            <div className="w-100">
                                                <BrowserRouter basename={window.SETTINGS.APP_BASENAME}>
                                                    <AlwaysScrollToTop/>
                                                    <Routes>
                                                        <Route path="/" element={<RouterLayout/>}>

                                                            <Route path="/about" element={<About/>}/>

                                                            <Route path="/organizations"
                                                                   element={<IntegrationDashboard/>}/>
                                                            <Route path="/organizations/:organizationId"
                                                                   element={<Organization/>}/>
                                                            <Route
                                                                path="/organizations/:organizationId/badge-review/:badgeWorkflowStatus"
                                                                element={<OrganizationBadgeReview/>}/>

                                                            <Route path="/resources/new" element={<NewResource/>}/>

                                                            <Route path="/resources/:resourceId" element={<Resource/>}/>
                                                            <Route path="/resources/:resourceId/roadmaps/:roadmapId"
                                                                   element={<Resource/>}/>

                                                            <Route path="/resources/:resourceId/edit"
                                                                   element={<ResourceEdit/>}/>
                                                            <Route
                                                                path="/resources/:resourceId/roadmaps/:roadmapId/edit"
                                                                element={<ResourceEdit/>}/>

                                                            <Route
                                                                path="/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId"
                                                                element={<ResourceBadge/>}/>

                                                            {DocumentationRoute}
                                                            {StaffRoute}

                                                            <Route path="/*?"
                                                                   element={<Navigate to="/organizations"
                                                                                      replace={true}/>}/>

                                                        </Route>
                                                    </Routes>
                                                </BrowserRouter>
                                            </div>
                                        </div>
                                    </I18nextProvider>
                                </ResourcesProvider>
                            </ContactProvider>
                        </RoadmapProvider>
                    </TaskProvider>
                </BadgeProvider>
            </RolesProvider>
        </OrganizationsProvider>
    );
}

export default App;
