import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Nav, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {DocumentationRouteUrls} from "./DocumentationRoute.jsx";
import {useEffect} from "react";
import {scrollToTop} from "../../components/util/scroll.jsx";
import {useTasks} from "../../contexts/TaskContext.jsx";
import ResourceBadgePrerequisites from "../../components/resource/resource-badge/ResourceBadgePrerequisites.jsx";
import ResourceBadgeTasks from "../../components/resource/resource-badge/ResourceBadgeTasks.jsx";
import {HtmlToReact} from "../../components/util/text-editors.jsx";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function Badges() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let badgeId = queryParams.get('badgeId');

    const {fetchBadges, getBadges, getBadge} = useBadges();
    const {fetchTasks, getTasks} = useTasks();

    const badges = getBadges();
    const tasks = getTasks();
    const selectedBadge = getBadge({badgeId});

    useEffect(() => {
        fetchBadges();
        fetchTasks();
    }, []);

    useEffect(() => {
        scrollToTop();
    }, [badgeId]);

    useEffect(() => {
        if (!badgeId && !!badges && badges.length > 0) {
            navigate(DocumentationRouteUrls.BADGES + `?badgeId=${badges[0].badge_id}`);
        }
    }, [badgeId, badges]);

    if (!!badges && !!tasks) {

        const tabs = badges.map((badge) => {
            return {
                title: badge.name,
                link: DocumentationRouteUrls.BADGES + `?badgeId=${badge.badge_id}`
            }
        });

        let activeKey = DocumentationRouteUrls.BADGES;
        if (!!badgeId) activeKey += `?badgeId=${badgeId}`;

        return <div className="container">
            <div className="row pt-4">
                <h1>Available Badges</h1>
            </div>

            <div className="w-100 pt-4 d-flex flex-row">
                <div style={{minWidth: "250px", maxWidth: "250px"}} className="pe-3">
                    <Nav variant="pills" activeKey={activeKey}
                         className="d-flex flex-column">
                        {tabs.map((tab, tabIndex) => <Nav.Item key={tabIndex}>
                            <NavLink eventKey={tab.link} to={tab.link} as={Link}
                                     className={() => {
                                         let className = "mb-2 p-2 d-block border-4 border-start rounded-start-0 text-decoration-none";

                                         if (activeKey === tab.link) {
                                             className += " bg-light text-dark border-medium";
                                         } else {
                                             className += " bg-gray-100 text-secondary border-gray-300";
                                         }

                                         return className;
                                     }}>
                                {tab.title}
                            </NavLink>
                        </Nav.Item>)}
                    </Nav>
                </div>
                <div className="flex-fill ps-4">
                    {selectedBadge && <div className="w-100">
                        <div className="w-100 pb-5 d-flex flex-row">
                            <div className="p-2">
                                <div style={{width: "100px", height: "125px"}} className="overflow-hidden">
                                    {!!selectedBadge.graphic ?
                                        <img alt="Roadmap graphic" src={selectedBadge.graphic}
                                             className="w-100"/> :
                                        <div
                                            className="w-100 h-100 p-2 text-secondary bg-gray-200 text-center align-content-center">
                                            No Badge Graphic Available to Display</div>}
                                </div>
                            </div>
                            <div className="flex-fill align-content-center ps-3">
                                <h2>{selectedBadge.name}</h2>
                            </div>
                        </div>

                        <div className="w-100 pb-5">
                            <div className="row pb-3">
                                <h4 className="col-sm-3 fs-6">Researcher Summary:</h4>
                                <div className="col-sm-9"><HtmlToReact>{selectedBadge.researcher_summary}</HtmlToReact>
                                </div>
                            </div>
                            <div className="row pb-3">
                                <h4 className="col-sm-3 fs-6">Resource Provider Summary:</h4>
                                <div className="col-sm-9">
                                    <HtmlToReact>{selectedBadge.resource_provider_summary}</HtmlToReact></div>
                            </div>
                            <div className="row pb-3">
                                <h4 className="col-sm-3 fs-6">Verification:</h4>
                                <div className="col-sm-9">
                                    <div><strong>[{selectedBadge.verification_method}]&nbsp;</strong></div>
                                    <HtmlToReact>{selectedBadge.verification_summary}</HtmlToReact>
                                </div>
                            </div>
                            <div className="row pb-3">
                                <h4 className="fs-6 col-sm-3 align-content-center">Default Badge
                                    Access:</h4>
                                <div className="col-sm-9 align-content-center">
                                    <Link to={selectedBadge.default_badge_access_url}
                                          className="btn btn-outline-dark btn-sm">
                                        {selectedBadge.default_badge_access_url_label}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="w-100 text-start pb-2">
                                <h3 className="d-inline me-4 text-black">Pre-Requisite Badges</h3>
                                <OverlayTrigger placement="right" delayShow={300} delayHide={150}
                                                overlay={<Tooltip id="tooltip-tasks">
                                                    Prerequisite badges must be completed before submitting this badge
                                                    for concierge
                                                    verification. Click badge details to view and complete the required
                                                    tasks.
                                                </Tooltip>}>
                                    <button className="btn btn-link text-yellow d-inline">
                                        <i className="bi bi-question-square-fill"></i></button>
                                </OverlayTrigger>
                            </div>
                            <ResourceBadgePrerequisites badgeId={badgeId}/>
                        </div>

                        <div className="row pt-4">
                            <div className="w-100 text-start pb-2">
                                <h3 className="d-inline me-4 text-black">Key Tasks & Tips</h3>
                                <OverlayTrigger placement="right" delayShow={300} delayHide={150}
                                                overlay={<Tooltip id="tooltip-tasks">
                                                    Some tasks are informational, while others require action. Review
                                                    them, return
                                                    here, and mark each as Complete or N/A.
                                                </Tooltip>}>
                                    <button className="btn btn-link text-yellow d-inline">
                                        <i className="bi bi-question-square-fill"></i></button>
                                </OverlayTrigger>
                            </div>

                            <ResourceBadgeTasks badgeId={badgeId}/>

                        </div>

                    </div>}
                </div>
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
