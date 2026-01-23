import {useEffect, useState} from "react";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {BadgeWorkflowStatus, useBadges} from "../../contexts/BadgeContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link} from "react-router-dom";
import Translate from "../../locales/Translate.jsx";
import {StaffRoadmapCard} from "../../components/staff/StaffRoadmapCard.jsx";
import BadgeIcon from "../../components/badge/BadgeIcon.jsx";
import {Fade} from "react-bootstrap";
import {StaffRouteUrls} from "./StaffRoute.jsx";

export default function StaffDashboard() {
    const {
        fetchResourceRoadmapBadgeStatusSummary,
        getResourceRoadmapBadgeStatusSummary
    } = useResources();
    const {getRoadmaps} = useRoadmaps();
    const {getBadges} = useBadges();

    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary();
    const roadmaps = getRoadmaps();
    const badges = getBadges();

    useEffect(() => {
        fetchResourceRoadmapBadgeStatusSummary();
    }, []);

    const visibleStatusList = [
        // BadgeWorkflowStatus.NOT_PLANNED,
        BadgeWorkflowStatus.VERIFICATION_FAILED,
        BadgeWorkflowStatus.TASK_COMPLETED,
        BadgeWorkflowStatus.PLANNED,
        BadgeWorkflowStatus.VERIFIED,
        BadgeWorkflowStatus.DEPRECATED
    ]

    const [roadmapPaginationIndex, setRoadmapPaginationIndex] = useState(0);
    const prevRoadmapPaginationIndex = roadmapPaginationIndex - 4;
    const nextRoadmapPaginationIndex = roadmapPaginationIndex + 4;

    if (roadmaps && badges && resourceRoadmapBadgeStatusSummary) {
        const roadmapsPrevDisabled = prevRoadmapPaginationIndex < 0;
        const roadmapsNextDisabled = nextRoadmapPaginationIndex >= roadmaps.length;

        return <div className="container">
            <div className="row visually-hidden">
                <h1>Staff Dashboard</h1>
            </div>

            <div className="row mt-2 p-3">

                <div className="col-12 p-0 pb-4">
                    <div className="w-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                        <div className="w-100 d-flex flex-row p-0">
                            <h2 className="text-medium">Roadmaps</h2>
                            <div className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4">
                            </div>
                            <div>
                                <Link className="btn btn-sm btn-medium rounded-2"
                                      to={StaffRouteUrls.ROADMAP_NEW}>Create New</Link>
                                <Link className="btn btn-link ms-3 me-3 fw-light"
                                      to={StaffRouteUrls.ROADMAPS}>View All</Link>
                                <div className="btn-group">
                                    <button className="btn btn-sm btn-outline-gray-500 rounded-start"
                                            onClick={setRoadmapPaginationIndex.bind(null, prevRoadmapPaginationIndex)}
                                            disabled={roadmapsPrevDisabled}>
                                        <i className={`bi bi-chevron-left ${!roadmapsPrevDisabled && "text-black"}`}></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-gray-500 rounded-end"
                                            onClick={setRoadmapPaginationIndex.bind(null, nextRoadmapPaginationIndex)}
                                            disabled={roadmapsNextDisabled}>
                                        <i className={`bi bi-chevron-right ${!roadmapsNextDisabled && "text-black"}`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {roadmaps && roadmaps.map((roadmap, roadmapIndex) => {
                                let show = roadmapPaginationIndex <= roadmapIndex && (roadmapPaginationIndex + 3) >= roadmapIndex;

                                return <Fade in={show} timeout="2000" key={roadmapIndex}>
                                    <div className={`col-lg-3 col-md-4 col-sm-6 p-2 ${show ? "" : "visually-hidden"}`}>
                                        <StaffRoadmapCard roadmapId={roadmap.roadmap_id}/>
                                    </div>
                                </Fade>
                            })}
                        </div>
                    </div>
                </div>

                <div className="col-md-8 col-sm-6 p-0 pe-md-3 pe-sm-1">
                    <div className="w-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                        <div className="w-100 d-flex flex-row pb-4">
                            <h2 className="text-medium">Badges</h2>
                            <div className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4">
                            </div>
                            <div>
                                <Link className="btn btn-sm btn-medium rounded-2" to={StaffRouteUrls.BADGE_NEW}>
                                    Create New</Link>
                                <Link className="btn btn-link ms-3 me-3 fw-light" to={StaffRouteUrls.BADGES}>
                                    View All</Link>
                            </div>
                        </div>
                        <ul className="p-0">
                            {badges && badges.map((badge, badgeIndex) => (
                                <li key={badgeIndex} className="d-flex flex-row pb-2">
                                    <div>
                                        <BadgeIcon badgeId={badge.badge_id}/>
                                    </div>
                                    <div className="flex-fill ps-4 align-content-center">{badge.name}</div>
                                    <div className="align-content-center">
                                        <Link to={StaffRouteUrls.BADGE_EDIT.replace(":badgeId", badge.badge_id)}
                                              className="btn btn-sm btn-link text-center" style={{width: 80}}>
                                            <i className="bi bi-pencil-square pe-2"></i>
                                            Edit
                                        </Link>
                                    </div>
                                </li>))}
                        </ul>
                    </div>
                </div>

                <div className="col-md-4 col-sm-6 p-0 ps-sm-1">
                    <div className="w-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                        <div className="w-100 d-flex flex-row pb-4">
                            <h2 className="text-medium">Badge Status</h2>
                            <div className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4">
                            </div>
                            <div>
                                <Link className="btn btn-link ms-3 me-1 fw-light" to={StaffRouteUrls.BADGE_STATUS}>
                                    View All</Link>
                            </div>
                        </div>
                        <ul className="p-0">
                            {visibleStatusList.map((status) => (
                                <li key={status} className="d-flex flex-row pb-2">
                                    <div className="flex-fill">
                                        <Link to={`/staff/badge-status/?badgeWorkflowStatus=${status}`}
                                              className="btn btn-sm btn-link text-center fw-normal">
                                            <Translate>badgeWorkflowStatus.{status}</Translate>
                                        </Link>
                                    </div>
                                    <div className="text-center" style={{width: 60}}>
                                        {resourceRoadmapBadgeStatusSummary[status] ? resourceRoadmapBadgeStatusSummary[status] : 0}
                                    </div>
                                </li>))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
