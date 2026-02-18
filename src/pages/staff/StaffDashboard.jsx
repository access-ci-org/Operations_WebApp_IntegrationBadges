import React, {useEffect, useState} from "react";
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
import RoadmapIcon from "../../components/roadmap/RoadmapIcon.jsx";
import {HtmlToText} from "../../components/util/text-editors.jsx";
import {BadgeWorkflowStatus_VIEW_ALL} from "./ResourceBadgeStatusListing.jsx";

export default function StaffDashboard() {
    const {
        fetchResourceRoadmapBadgeStatusSummary,
        getResourceRoadmapBadgeStatusSummary
    } = useResources();
    const {getRoadmaps, getRoadmap, getRoadmapBadges} = useRoadmaps();
    const {getBadges} = useBadges();

    const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);

    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary();
    const roadmaps = getRoadmaps();
    let badges = getBadges();

    let selectedRoadmap;
    if (selectedRoadmapId) {
        selectedRoadmap = getRoadmap({roadmapId: selectedRoadmapId});
        badges = getRoadmapBadges({roadmapId: selectedRoadmapId});
    }

    useEffect(() => {
        fetchResourceRoadmapBadgeStatusSummary();
    }, []);

    const verificationHighlightList = [
        {
            status: BadgeWorkflowStatus.TASK_COMPLETED,
            icon: <i className="bi bi-clock"></i>,
            variant: "orange",
        },
        {
            status: BadgeWorkflowStatus.VERIFICATION_FAILED,
            icon: <i className="bi bi-exclamation-circle"></i>,
            variant: "danger",
        },
        {
            status: BadgeWorkflowStatus.PLANNED,
            icon: <i className="bi bi-activity"></i>,
            variant: "blue",
        },
        {
            status: BadgeWorkflowStatus.VERIFIED,
            icon: <i className="bi bi-check2-circle"></i>,
            variant: "green",
        },
        {
            status: BadgeWorkflowStatus.DEPRECATED,
            icon: <i className="bi bi-archive"></i>,
            variant: "secondary",
        }
    ];

    const toggleSelectedRoadmap = ({roadmapId}) => (evt) => {
        if (selectedRoadmapId === roadmapId) {
            setSelectedRoadmapId(null);
        } else {
            setSelectedRoadmapId(roadmapId);
        }
    };

    if (roadmaps && badges && resourceRoadmapBadgeStatusSummary) {

        return <div className="container">
            <div className="row visually-hidden">
                <h1>Staff Dashboard</h1>
            </div>

            <div className="row mt-2 p-3">

                <div className="col-12 p-0 pb-4">
                    <div className="w-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                        <div className="w-100 d-flex flex-row p-0">
                            <h2 className="text-medium">Badge Verification Status</h2>
                            <div className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4">
                            </div>
                            <div style={{minWidth: 100}}>
                                <Link className="btn btn-sm btn-medium rounded-2"
                                      to={`${StaffRouteUrls.BADGE_STATUS}?badgeWorkflowStatus=${BadgeWorkflowStatus_VIEW_ALL}`}>View All</Link>
                            </div>
                        </div>
                        <div className="w-100 pt-4">
                            <ul className="row p-0 list-unstyled">
                                {verificationHighlightList.map((verificationHighlight, verificationHighlightIndex) => {
                                    const variantClass = `border-${verificationHighlight.variant} bg-${verificationHighlight.variant} text-${verificationHighlight.variant}`

                                    return <li className="col p-2" key={verificationHighlightIndex}>
                                        <Link
                                            to={`${StaffRouteUrls.BADGE_STATUS}?badgeWorkflowStatus=${verificationHighlight.status}`}
                                            className={`btn w-100 h-100 p-2 bg-opacity-10 border border-2 border-opacity-10 rounded-3 ${variantClass}`}>
                                            <div className="w-100 text-center fs-2">
                                                {verificationHighlight.icon}
                                            </div>
                                            <div className="w-100 text-center fs-2 fw-bolder">
                                                {resourceRoadmapBadgeStatusSummary[verificationHighlight.status] ?
                                                    resourceRoadmapBadgeStatusSummary[verificationHighlight.status] : 0}
                                            </div>
                                            <div className="w-100 text-center text-secondary">
                                                <Translate>badgeWorkflowStatus.{verificationHighlight.status}</Translate>
                                            </div>
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 p-0 pb-4 pe-md-3 pe-sm-1">
                    <div className="w-100 h-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                        <div className="w-100 d-flex flex-row pb-4">
                            <h2 className="text-medium">Roadmaps</h2>
                            <div className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4">
                            </div>
                            <div style={{minWidth: 100}}>
                                <Link className="btn btn-sm btn-medium rounded-2"
                                      to={StaffRouteUrls.ROADMAP_NEW}>Create New</Link>
                            </div>
                        </div>

                        <ul className="w-100 p-0">
                            {roadmaps && roadmaps.map((roadmap, roadmapIndex) => {
                                const roadmapId = roadmap.roadmap_id;
                                let activeClassName = "";
                                if (selectedRoadmapId === roadmapId) activeClassName = "bg-gray-200";

                                return <li key={roadmapIndex} onClick={toggleSelectedRoadmap({roadmapId})}
                                    className={`w-100 d-flex flex-row p-3 btn btn-outline-gray-100 rounded-1 mb-2 ${activeClassName}`}>
                                    <div>
                                        {/*<RoadmapIcon roadmapId={roadmap.roadmap_id}/>*/}
                                        <i className="bi bi-map text-medium"></i>
                                    </div>
                                    <div className="flex-fill ps-3 align-content-center text-start">
                                        <h3 className="w-100 fs-6 text-black mb-0 text-one-line-overflow-ellipsis">
                                            {roadmap.name}
                                        </h3>
                                        <div className="w-100 small text-gray-600 mb-0 text-one-line-overflow-ellipsis">
                                            <HtmlToText>{roadmap.executive_summary}</HtmlToText>
                                        </div>
                                    </div>
                                    <div className="align-content-center text-end" style={{minWidth: 80}}>
                                        <Link to={StaffRouteUrls.ROADMAP_EDIT.replace(":badgeId", roadmap.roadmap_id)}
                                              className="btn btn-sm me-1 btn-outline-secondary rounded-1 border-0 text-center">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <Link to={StaffRouteUrls.ROADMAP_EDIT.replace(":badgeId", roadmap.roadmap_id)}
                                              className="btn btn-sm ms-1 btn-outline-secondary rounded-1 border-0 text-center">
                                            <i className="bi bi-trash"></i>
                                        </Link>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>

                <div className="col-md-6 p-0 pb-4 ps-md-3 ps-sm-1">
                    <div className="w-100 h-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                        <div className="w-100 d-flex flex-row pb-4">
                            <div className="align-content-center text-start" style={{minHeight: 40}}>
                                {!selectedRoadmap && <h2 className="text-medium">Badges</h2>}
                                {!!selectedRoadmap && <h2 className="text-medium fs-6">
                                    {selectedRoadmap.name} Badges
                                </h2>}
                            </div>
                            <div
                                className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4 align-content-center">
                            </div>
                            <div style={{minWidth: 100}}>
                                <Link className="btn btn-sm btn-medium rounded-2" to={StaffRouteUrls.BADGE_NEW}>
                                    Create New</Link>
                            </div>
                        </div>
                        <ul className="p-0">
                            {badges && badges.map((badge, badgeIndex) => {
                                let borderClass = "border-gray-200 border-bottom border-1";
                                if (badgeIndex === badges.length - 1) borderClass = "";

                                return <li key={badgeIndex} className={"d-flex flex-row pb-2 mb-2 " + borderClass}>
                                    <div className="align-content-center">
                                        {/*<BadgeIcon badgeId={badge.badge_id}/>*/}
                                        <i className="bi bi-patch-check text-medium"></i>
                                    </div>
                                    <div className="flex-fill ps-3 align-content-center text-start">
                                        <h3 className="w-100 fs-6 text-black mb-0 text-one-line-overflow-ellipsis fw-normal">
                                            {badge.name}
                                        </h3>
                                    </div>
                                    <div className="align-content-center">
                                        <Link to={StaffRouteUrls.BADGE_EDIT.replace(":badgeId", badge.badge_id)}
                                              className="btn btn-sm me-1 btn-outline-secondary rounded-1 border-0 text-center">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                    </div>
                                </li>

                            })}
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
