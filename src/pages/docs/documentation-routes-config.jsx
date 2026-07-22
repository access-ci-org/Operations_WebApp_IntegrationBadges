import {Link, Navigate, Outlet} from "react-router-dom";
import FiveStepsForNewIntegrations from "./FiveStepsForNewIntegrations.jsx";
import WhyBecomeAnRP from "./WhyBecomeAnRP.jsx";
import HowToIntegrateResource from "./HowToIntegrateResource.jsx";
import HowToChooseRoadmap from "./HowToChooseRoadmap.jsx";
import Roadmaps from "./Roadmaps.jsx";
import Badges from "./Badges.jsx";
import Debug from "../../components/util/Debug.jsx";
import WhyIntegrateResources from "./WhyIntegrateResources.jsx";
import WhatIsTicketingSystem from "./WhatIsTicketingSystem.jsx";
import {DocumentationRouteUrls} from "../pages-config.js";

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
const DocumentationRoutesConfig = {
    name: "Doc: Five steps for new resource integrations",
    path: DocumentationRouteUrls.INDEX,
    element: <RouterLayout/>,
    children: [
        {index: true, element: <FiveStepsForNewIntegrations/>},
        {name: "Doc: Why become an RP", path: DocumentationRouteUrls.WHY_BECOME_AN_RP, element: <WhyBecomeAnRP/>},
        {name: "Doc: How to integrate resource", path: DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE, element: <HowToIntegrateResource/>},
        {name: "Doc: How to choose roadmap", path: DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP, element: <HowToChooseRoadmap/>},
        {name: "Doc: Why integrate resources", path: DocumentationRouteUrls.WHY_INTEGRATE_RESOURCES, element: <WhyIntegrateResources/>},
        {name: "Doc: What is ticketing system", path: DocumentationRouteUrls.WHAT_IS_TICKETING_SYSTEM, element: <WhatIsTicketingSystem/>},
        {name: "Doc: Available roadmaps", path: DocumentationRouteUrls.ROADMAPS, element: <Roadmaps/>},
        {name: "Doc: Available badges", path: DocumentationRouteUrls.BADGES, element: <Badges/>},
        {path: '*', element: <Navigate to={DocumentationRouteUrls.INDEX} replace={true}/>},
    ]
};

export default DocumentationRoutesConfig;
