import {useEffect, useState} from "react";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link, useLocation} from "react-router-dom";
import {Nav} from "react-bootstrap";
import GridAndListSwitch from "../../components/util/GridAndListSwitch.jsx";
import Translate from "../../locales/Translate.jsx";
import {StaffRouteUrls} from "./StaffRoute.jsx";
import RoadmapName from "../../components/roadmap/RoadmapName.jsx";
import {HideIfAuthorized, ShowIfAuthorized} from "../../components/util/Permissions.jsx";
import {IntegrationRoles, BadgeWorkflowStatus} from "../../contexts/constants.js";

export const BadgeWorkflowStatus_VIEW_ALL = "*";

export default function ResourceBadgeStatusListing() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let badgeWorkflowStatusParam = queryParams.get('badgeWorkflowStatus');

    const {
        fetchResourceRoadmapBadges, fetchResourceRoadmapBadgeStatusSummary,
        getResourceRoadmapBadges, getResourceRoadmapBadgeStatusSummary, getResource
    } = useResources();
    const {getBadge} = useBadges();
    const {getRoadmap} = useRoadmaps();

    const [badgeWorkflowStatus, setBadgeWorkflowStatus] = useState(null);

    const badges = getResourceRoadmapBadges({
        badgeWorkflowStatus: badgeWorkflowStatus === BadgeWorkflowStatus_VIEW_ALL ? null : badgeWorkflowStatus
    });
    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary();

    const getTabLink = (tab) => {
        return StaffRouteUrls.BADGE_STATUS + `?badgeWorkflowStatus=${tab.status}`;
    };

    const tabs = [
        {
            title: "Pending Verification",
            status: BadgeWorkflowStatus.TASK_COMPLETED,
            count: () => resourceRoadmapBadgeStatusSummary[BadgeWorkflowStatus.TASK_COMPLETED]
        },
        {
            title: "RP Attention Needed",
            status: BadgeWorkflowStatus.VERIFICATION_FAILED,
            count: () => resourceRoadmapBadgeStatusSummary[BadgeWorkflowStatus.VERIFICATION_FAILED]
        },
        {
            title: "In Progress",
            status: BadgeWorkflowStatus.PLANNED,
            count: () => resourceRoadmapBadgeStatusSummary[BadgeWorkflowStatus.PLANNED]
        },
        {
            title: "Available",
            status: BadgeWorkflowStatus.VERIFIED,
            count: () => resourceRoadmapBadgeStatusSummary[BadgeWorkflowStatus.VERIFIED]
        },
        {
            title: "Deprecated",
            status: BadgeWorkflowStatus.DEPRECATED,
            count: () => resourceRoadmapBadgeStatusSummary[BadgeWorkflowStatus.DEPRECATED]
        },
        {
            title: "View All",
            status: BadgeWorkflowStatus_VIEW_ALL,
            count: () => resourceRoadmapBadgeStatusSummary["total"]
        }
    ];

    useEffect(() => {
        fetchResourceRoadmapBadgeStatusSummary();
    }, []);

    useEffect(() => {
        if (resourceRoadmapBadgeStatusSummary) {
            if ([BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFICATION_FAILED,
                BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.DEPRECATED, BadgeWorkflowStatus_VIEW_ALL].indexOf(badgeWorkflowStatusParam) < 0) {

                badgeWorkflowStatusParam = null;
            }

            // If the tab is not specified, set it to the first tab with some entries. Or the "View All"
            if (!badgeWorkflowStatusParam) {
                badgeWorkflowStatusParam = BadgeWorkflowStatus_VIEW_ALL
                for (let tab of tabs) {
                    if (tab.count() > 0) {
                        badgeWorkflowStatusParam = tab.status;
                        break;
                    }
                }
            }

            setBadgeWorkflowStatus(badgeWorkflowStatusParam);
        }
    }, [!!resourceRoadmapBadgeStatusSummary, badgeWorkflowStatusParam]);

    useEffect(() => {
        if (badgeWorkflowStatus) {
            fetchResourceRoadmapBadges({
                badgeWorkflowStatus: badgeWorkflowStatus === BadgeWorkflowStatus_VIEW_ALL ? null : badgeWorkflowStatus
            });
        }
    }, [badgeWorkflowStatus]);

    if (badgeWorkflowStatus && resourceRoadmapBadgeStatusSummary) {

        return <div className="container">
            <div className="row mt-2 p-3">
                <div className="w-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                    <div className="w-100 " style={{borderBottom: "1px dashed"}}>
                        <h2 className="text-medium">Badge Verification Status</h2>
                    </div>

                    <div className="w-100 pt-4">
                        <div className="w-100 d-flex flex-row">
                            <div className="flex-fill">
                                <Nav variant="underline" activeKey={badgeWorkflowStatus}
                                     className="pe-3 border-bottom border-1 border-gray-200">
                                    {tabs.map((tab, tabIndex) => <Nav.Item key={tabIndex}>
                                        <Nav.Link eventKey={tab.status} as={Link} to={getTabLink(tab)}>
                                            {tab.title} ({tab.count()})
                                        </Nav.Link>
                                    </Nav.Item>)}
                                </Nav>
                            </div>
                            <GridAndListSwitch state="list"/>
                        </div>
                        <div className="w-100 pt-4">
                            <table className="table">
                                <thead>
                                <tr className="table-dark">
                                    <th scope="col">
                                        <div className="fs-7 pt-2 pb-2">Resource ID</div>
                                    </th>
                                    <th scope="col">
                                        <div className="fs-7 pt-2 pb-2">Badge</div>
                                    </th>
                                    <th scope="col">
                                        <div className="fs-7 pt-2 pb-2">Roadmap</div>
                                    </th>
                                    <th scope="col">
                                        <div className="fs-7 pt-2 pb-2">Status</div>
                                    </th>
                                    <th scope="col">
                                        <div className="fs-7 pt-2 pb-2 text-end">Action</div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                {badges && badges.length === 0 &&
                                    <tr className="pt-2 pb-2">
                                        <td colSpan={5}>
                                            <div className="w-100 p-3 text-center lead">
                                                No resource badge integrations available to display
                                            </div>
                                        </td>
                                    </tr>
                                }

                                {badges && badges.map((resourceBadge, resourceBadgeIndex) => {
                                    const resourceId = resourceBadge.info_resourceid;
                                    const badgeId = resourceBadge.badge_id;
                                    const roadmapId = resourceBadge.roadmap_id;
                                    const badge = getBadge({badgeId});

                                    return <tr key={resourceBadgeIndex} className="pt-2 pb-2">
                                        <td>
                                            <div className="fs-7 pt-2 pb-2">{resourceId}</div>
                                        </td>
                                        <td>
                                            <div className="fs-7 pt-2 pb-2">{badge.name}</div>
                                        </td>
                                        <td>
                                            <div className="fs-7 pt-2 pb-2">
                                                <RoadmapName roadmapId={roadmapId} seperator=" "/></div>
                                        </td>
                                        <td>
                                            <div className="fs-7 pt-2 pb-2">
                                                {/*<BadgeStatus>{resourceBadge.status}</BadgeStatus>*/}
                                                <small
                                                    className="ps-2 pe-2 pt-1 pb-1 rounded-1 text-nowrap bg-secondary-subtle">
                                                    <Translate>badgeWorkflowStatus.{resourceBadge.status}</Translate>
                                                </small>
                                            </div>
                                        </td>
                                        <td>
                                            <Link style={{minWidth: "175px"}}
                                                  to={`/resources/${resourceId}/roadmaps/${roadmapId}/badges/${badgeId}`}
                                                  className="btn btn-link text-medium text-decoration-none fw-normal fs-7 pt-2 pb-2 text-end"
                                                  target="_blank">
                                                <ShowIfAuthorized
                                                    resourceIds={[resourceId]}
                                                    roles={[IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER]}>
                                                    BADGE ACTION
                                                </ShowIfAuthorized>
                                                <HideIfAuthorized
                                                    resourceIds={[resourceId]}
                                                    roles={[IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER]}>
                                                    VIEW
                                                </HideIfAuthorized>
                                                <i className="bi bi-box-arrow-up-right ps-2"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                })}
                                </tbody>


                            </table>
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
