import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Nav} from "react-bootstrap";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {DocumentationRouteUrls} from "./DocumentationRoute.jsx";
import {useEffect} from "react";
import {scrollToTop} from "../../components/util/scroll.jsx";
import {BadgeCardRowWithRequiredLabel} from "../../components/resource-edit/resource-edit-page-cards.jsx";
import {HtmlToReact} from "../../components/util/text-editors.jsx";
import RoadmapName from "../../components/roadmap/RoadmapName.jsx";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function Roadmaps() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let roadmapId = queryParams.get('roadmapId');

    const {fetchBadges, getBadges} = useBadges();
    const {fetchRoadmaps, getRoadmaps, getRoadmap, getRoadmapBadges} = useRoadmaps();

    const roadmaps = getRoadmaps();
    const badges = getBadges();

    const selectedRoadmap = getRoadmap({roadmapId});
    const selectedRoadmapBadges = getRoadmapBadges({roadmapId});

    useEffect(() => {
        fetchRoadmaps();
        fetchBadges();
    }, []);

    useEffect(() => {
        scrollToTop();
    }, [roadmapId]);

    useEffect(() => {
        if (!roadmapId && !!roadmaps && roadmaps.length > 0) {
            navigate(DocumentationRouteUrls.ROADMAPS + `?roadmapId=${roadmaps[0].roadmap_id}`);
        }
    }, [roadmapId, roadmaps]);

    if (!!roadmaps && !!badges) {

        const tabs = roadmaps.map((roadmap) => {
            return {
                title: <RoadmapName roadmapId={roadmap.roadmap_id} seperator=" "/> ,
                link: DocumentationRouteUrls.ROADMAPS + `?roadmapId=${roadmap.roadmap_id}`
            }
        });

        let activeKey = DocumentationRouteUrls.ROADMAPS;
        if (!!roadmapId) activeKey += `?roadmapId=${roadmapId}`;

        return <div className="container">
            <div className="row pt-4">
                <h1>Available Roadmaps</h1>
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
                                             className += " bg-light text-medium border-medium";
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
                    {selectedRoadmap && <div className="w-100">
                        <div className="w-100 d-flex flex-row">
                            <div className="p-2">
                                <div style={{width: "150px", height: "150px"}} className="overflow-hidden">
                                    {!!selectedRoadmap.graphic ?
                                        <img alt="Roadmap graphic" src={selectedRoadmap.graphic}
                                             className="w-100"/> :
                                        <div
                                            className="w-100 h-100 p-2 text-secondary bg-gray-200 text-center align-content-center">
                                            No Roadmap Graphic Available to Display</div>}
                                </div>
                            </div>
                            <div className="flex-fill align-content-center ps-3">
                                <h2><RoadmapName roadmapId={selectedRoadmap.roadmap_id} seperator=" "/></h2>
                            </div>
                        </div>

                        <div className="w-100 pb-5">
                            <div className="row pb-3">
                                <h4 className="col-sm-3 fs-6" style={{minWidth: "200px"}}>Infrastructure Type(s):</h4>
                                <div className="col-sm-9">{selectedRoadmap.infrastructure_types}</div>
                            </div>
                            <div className="row pb-3">
                                <h4 className="col-sm-3 fs-6" style={{minWidth: "200px"}}>Roadmap RP Summary:</h4>
                                <div className="col-sm-9">
                                    <HtmlToReact>{selectedRoadmap.executive_summary}</HtmlToReact>
                                </div>
                            </div>
                            <div className="row pb-3">
                                <h4 className="col-sm-3 fs-6" style={{minWidth: "200px"}}>Integration Concierge:</h4>
                                <div className="col-sm-9">{selectedRoadmap.integration_coordinators}</div>
                            </div>
                            <div className="row pb-3">
                                <h4 className="col-sm-3 fs-6" style={{minWidth: "200px"}}>Roadmap Status:</h4>
                                <div className="col-sm-9">{selectedRoadmap.status}</div>
                            </div>
                        </div>

                        <div className="w-100">
                            <h3 className="text-black">Badges</h3>
                            <div className="w-100">
                                {selectedRoadmapBadges && selectedRoadmapBadges.length === 0 &&
                                    <div className="w-100 p-3 text-center lead">
                                        No Badges Available to Display
                                    </div>}
                                {selectedRoadmapBadges.map((badge, badgeIndex) => {
                                    return <BadgeCardRowWithRequiredLabel key={badgeIndex} badgeId={badge.badge_id}
                                                                          required={badge.required}/>
                                })}
                            </div>
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
