import React, {useEffect, useState} from "react";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {BadgeWorkflowStatus} from "../../contexts/constants.js";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link} from "react-router-dom";
import Translate from "../../locales/Translate.jsx";
import {StaffRouteUrls} from "./StaffRoute.jsx";
import {HtmlToText} from "../../components/util/text-editors.jsx";
import {BadgeWorkflowStatus_VIEW_ALL} from "./ResourceBadgeStatusListing.jsx";
import {BadgeMaintainer, RoadmapMaintainer} from "../../components/util/Permissions.jsx";
import {DocumentationRouteUrls} from "../docs/DocumentationRoute.jsx";
import BadgeStatusSummaryHeader from "../../components/staff/BadgeStatusSummaryHeader.jsx";

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

    const documents = [
        {
            title: "ACCESS Resource Badges Status",
            description: "High-level view showing the status of features/badges on individual ACCESS pre-production, production, and post-production resources",
            link: "https://operations-api.access-ci.org/wh2/integration_views/v1/resource_pivot/?roadmap=67",
            icon: <i className="bi bi-file-earmark-bar-graph"></i>
        },
        {
            title: "ACCESS Resource Group Badges",
            description: "High-level view showing badge statistics for ACCESS pre-production, production, and post-production resource groups",
            link: "https://operations-api.access-ci.org/wh2/integration_views/v1/group_pivot/",
            icon: <i className="bi bi-collection"></i>
        },
        {
            title: "ACCESS Integration News",
            description: "News for resource providers about the ACCESS integration process, including significant roadmap, badge, task, and software releases",
            link: "https://operations.access-ci.org/integration_news",
            icon: <i className="bi bi-newspaper"></i>
        },
        {
            title: "Integration Roadmap Information for RPs",
            description: "View all RP facing information about ACCESS roadmaps, badges, and related tasks",
            link: DocumentationRouteUrls.ROADMAPS,
            icon: <i className="bi bi-list-columns"></i>
        },
        {
            title: "Badge Availability Information for Researchers",
            description: "View all researcher facing information about the badges available on ACCESS resources (for internal use)",
            link: "https://operations-api.access-ci.org/wh2/integration_badges/v1/badge_review/?mode=badges",
            icon: <i className="bi-stickies-fill"></i>
        },
        {
            title: "Roadmap Management Playbook",
            description: "ACCESS staff instructions for managing roadmap, badges, and tasks, and verifying RP badge completion",
            link: "https://docs.google.com/document/d/1Pg1WMr64c-0ZBjjIACwK8kzkjYpcftWR8aWG21OPdxk/ ",
            icon: <i className="bi bi-journals"></i>
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
                            <h2 className="text-primary">Badge Verification Status</h2>
                            <div className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4">
                            </div>
                            <div style={{minWidth: 100}}>
                                <Link className="btn btn-sm btn-primary rounded-2"
                                      to={`${StaffRouteUrls.BADGE_STATUS}?badgeWorkflowStatus=${BadgeWorkflowStatus_VIEW_ALL}`}>View
                                    All</Link>
                            </div>
                        </div>
                        <div className="w-100 pt-4">
                            <BadgeStatusSummaryHeader/>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 p-0 pb-4 pe-md-3 pe-sm-1">
                    <div className="w-100 h-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                        <div className="w-100 d-flex flex-row pb-4">
                            <h2 className="text-primary">Roadmaps</h2>
                            <div className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4">
                            </div>
                            <RoadmapMaintainer>
                                <div style={{minWidth: 100}}>
                                    <Link className="btn btn-sm btn-primary rounded-2"
                                          to={StaffRouteUrls.ROADMAP_NEW}>Create New</Link>
                                </div>
                            </RoadmapMaintainer>
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
                                        <i className="bi bi-map text-primary"></i>
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
                                        <RoadmapMaintainer>
                                            <Link
                                                to={StaffRouteUrls.ROADMAP_EDIT.replace(":roadmapId", roadmap.roadmap_id)}
                                                className="btn btn-sm me-1 btn-outline-secondary width-fit-content rounded-1 border-0 text-center">
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                        </RoadmapMaintainer>
                                        <Link target="_blank"
                                              to={DocumentationRouteUrls.ROADMAPS + `?roadmapId=${roadmap.roadmap_id}`}
                                              className="btn btn-sm me-1 btn-outline-secondary width-fit-content rounded-1 border-0 text-center">
                                            <i className="bi bi-info-circle"></i>
                                        </Link>
                                        {/*<Link*/}
                                        {/*    to={StaffRouteUrls.ROADMAP_EDIT.replace(":roadmapId", roadmap.roadmap_id)}*/}
                                        {/*    className="btn btn-sm ms-1 btn-outline-secondary rounded-1 border-0 text-center">*/}
                                        {/*    <i className="bi bi-trash"></i>*/}
                                        {/*</Link>*/}
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
                                {!selectedRoadmap && <h2 className="text-primary">Badges</h2>}
                                {!!selectedRoadmap && <h2 className="text-primary fs-6">
                                    {selectedRoadmap.name} Badges
                                </h2>}
                            </div>
                            <div
                                className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4 align-content-center">
                            </div>
                            <BadgeMaintainer>
                                <div style={{minWidth: 100}}>
                                    <Link className="btn btn-sm btn-primary rounded-2" to={StaffRouteUrls.BADGE_NEW}>
                                        Create New</Link>
                                </div>
                            </BadgeMaintainer>
                        </div>
                        <ul className="p-0">
                            {badges && badges.map((badge, badgeIndex) => {
                                let borderClass = "border-gray-200 border-bottom border-1";
                                if (badgeIndex === badges.length - 1) borderClass = "";

                                return <li key={badgeIndex} className={"d-flex flex-row pb-2 mb-2 " + borderClass}>
                                    <div className="align-content-center">
                                        {/*<BadgeIcon badgeId={badge.badge_id}/>*/}
                                        <i className="bi bi-patch-check text-primary"></i>
                                    </div>
                                    <div className="flex-fill ps-3 align-content-center text-start">
                                        <h3 className="w-100 fs-6 text-black mb-0 text-one-line-overflow-ellipsis fw-normal">
                                            {badge.name}
                                        </h3>
                                    </div>

                                    <div className="align-content-center">
                                        <BadgeMaintainer>
                                            <Link to={StaffRouteUrls.BADGE_EDIT.replace(":badgeId", badge.badge_id)}
                                                  className="btn btn-sm me-1 btn-outline-secondary width-fit-content rounded-1 border-0 text-center">
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                        </BadgeMaintainer>
                                        <Link target="_blank"
                                            to={DocumentationRouteUrls.BADGES + `?badgeId=${badge.badge_id}`}
                                            className="btn btn-sm me-1 btn-outline-secondary width-fit-content rounded-1 border-0 text-center">
                                            <i className="bi bi-info-circle"></i>
                                        </Link>
                                    </div>
                                </li>

                            })}
                        </ul>
                    </div>
                </div>

                <div className="col-12 p-0 pb-4">
                    <div className="w-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                        <div className="w-100 d-flex flex-row p-0">
                            <h2 className="text-primary">Documents & Views</h2>
                            <div className="flex-fill border-dark border-bottom border-1 ms-3 me-3 mb-4">
                            </div>
                        </div>
                        <div className="w-100 pt-4">
                            <ul className="p-0 list-unstyled">
                                {documents.map((document, documentIndex) => {
                                    return <li key={documentIndex} className="w-100">

                                        <Link to={document.link}
                                              className="w-100 d-flex flex-row p-3 btn btn-outline-gray-100 rounded-1 mb-2">
                                            <div className="align-content-start text-accent-primary fs-3">
                                                {document.icon}
                                            </div>
                                            <div className="flex-fill ps-3 align-content-center text-start">
                                                <h3 className="w-100 fs-6 text-black mb-0 text-one-line-overflow-ellipsis">
                                                    {document.title}
                                                </h3>
                                                <div
                                                    className="w-100 small text-gray-600 mb-0 text-one-line-overflow-ellipsis">
                                                    {document.description}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>
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
