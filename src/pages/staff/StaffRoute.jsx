import {Link, Navigate, Outlet, Route} from "react-router-dom";
import Debug from "../../components/util/Debug.jsx";
import ResourceBadgeStatusListing from "./ResourceBadgeStatusListing.jsx";
import StaffDashboard from "./StaffDashboard.jsx";
import StaffRoadmaps from "./StaffRoadmaps.jsx";
import StaffRoadmapEdit from "./StaffRoadmapEdit.jsx";
import StaffBadgeEdit from "./StaffBadgeEdit.jsx";
import StaffContacts from "./StaffContacts.jsx";

export const StaffRouteUrls = {
    INDEX: "/staff/dashboard",
    ROADMAPS: "/staff/roadmaps",
    ROADMAP_NEW: "/staff/roadmaps/new",
    ROADMAP_EDIT: "/staff/roadmaps/:roadmapId/edit",
    BADGES: "/staff/badges",
    BADGE_NEW: "/staff/badges/new",
    BADGE_EDIT: "/staff/badges/:badgeId/edit",
    BADGE_STATUS: "/staff/badge-status",
    CONTACTS: "/staff/contacts",
};

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
export const StaffRoute = <Route path="/staff" element={<RouterLayout/>}>
    <Route path={StaffRouteUrls.INDEX} element={<StaffDashboard/>}/>
    <Route path={StaffRouteUrls.ROADMAPS} element={<StaffRoadmaps/>}/>
    <Route path={StaffRouteUrls.ROADMAP_EDIT} element={<StaffRoadmapEdit/>}/>
    <Route path={StaffRouteUrls.ROADMAP_NEW} element={<StaffRoadmapEdit/>}/>
    <Route path={StaffRouteUrls.BADGE_EDIT} element={<StaffBadgeEdit/>}/>
    <Route path={StaffRouteUrls.BADGE_NEW} element={<StaffBadgeEdit/>}/>
    <Route path={StaffRouteUrls.BADGE_STATUS} element={<ResourceBadgeStatusListing/>}/>
    <Route path={StaffRouteUrls.CONTACTS} element={<StaffContacts/>}/>

    <Route path="/staff/*?" element={<Navigate to={StaffRouteUrls.INDEX} replace={true}/>}/>
</Route>
