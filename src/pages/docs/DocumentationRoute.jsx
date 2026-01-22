import {Link, Outlet, Route} from "react-router-dom";
import FiveStepsForNewIntegrations from "./FiveStepsForNewIntegrations.jsx";
import WhyBecomeAnRP from "./WhyBecomeAnRP.jsx";
import HowToIntegrateResource from "./HowToIntegrateResource.jsx";
import HowToChooseRoadmap from "./HowToChooseRoadmap.jsx";
import Roadmaps from "./Roadmaps.jsx";
import Badges from "./Badges.jsx";
import Debug from "../../components/util/Debug.jsx";
import WhyIntegrateResources from "./WhyIntegrateResources.jsx";

export const DocumentationRouteUrls = {
    INDEX: "/docs",
    WHY_BECOME_AN_RP: "/docs/why-become-an-rp",
    HOW_TO_INTEGRATE_RESOURCE: "/docs/how-to-integrate-resource",
    HOW_TO_CHOOSE_ROADMAP: "/docs/how-to-choose-roadmap",
    WHY_INTEGRATE_RESOURCES: "/docs/why-should-i-integrate-resources",
    ROADMAPS: "/docs/roadmaps",
    BADGES: "/docs/badges",
};

const RouterLayout = () => {
    return (
        <div className="row">
            <Debug>
                <div className="col-md-2 bg-white" style={{fontSize: 11}}>
                    <ul className="m-0 p-0">
                        <li className="d-inline-block p-2">
                            <Link className="btn btn-link border-3 border-start ps-1" to="/">Integration
                                Dashboard</Link></li>
                        <li className="d-inline-block p-2">
                            <Link className="btn btn-link border-3 border-start ps-1"
                                  to={DocumentationRouteUrls.INDEX}>Documentation</Link>

                            <ul className="m-0 p-0 ps-2">
                                <li className="d-inline-block p-2">
                                    <Link className="btn btn-link border-3 border-start ps-1"
                                          to={DocumentationRouteUrls.WHY_BECOME_AN_RP}>
                                        Why become an RP</Link></li>
                                <li className="d-inline-block p-2">
                                    <Link className="btn btn-link border-3 border-start ps-1"
                                          to={DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE}>
                                        How Do I Integrate My Resource into ACCESS</Link></li>
                                <li className="d-inline-block p-2">
                                    <Link className="btn btn-link border-3 border-start ps-1"
                                          to={DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP}>
                                        What is an Integration Roadmap and how do I choose the right one</Link></li>
                                <li className="d-inline-block p-2">
                                    <Link className="btn btn-link border-3 border-start ps-1"
                                          to={DocumentationRouteUrls.ROADMAPS}>
                                        Roadmaps</Link>
                                </li>
                                <li className="d-inline-block p-2">
                                    <Link className="btn btn-link border-3 border-start ps-1"
                                          to={DocumentationRouteUrls.BADGES}>
                                        Badges</Link>
                                </li>
                            </ul>
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
export const DocumentationRoute = <Route path="/docs" element={<RouterLayout/>}>
    <Route path={DocumentationRouteUrls.INDEX} element={<FiveStepsForNewIntegrations/>}/>
    <Route path={DocumentationRouteUrls.WHY_BECOME_AN_RP} element={<WhyBecomeAnRP/>}/>
    <Route path={DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE} element={<HowToIntegrateResource/>}/>
    <Route path={DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP} element={<HowToChooseRoadmap/>}/>
    <Route path={DocumentationRouteUrls.WHY_INTEGRATE_RESOURCES} element={<WhyIntegrateResources/>}/>
    <Route path={DocumentationRouteUrls.ROADMAPS} element={<Roadmaps/>}/>
    <Route path={DocumentationRouteUrls.BADGES} element={<Badges/>}/>
</Route>
