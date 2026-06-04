import React, {useEffect, useState} from "react";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import Translate from "../../locales/Translate.jsx";
import {StaffRouteUrls} from "./StaffRoute.jsx";
import RoadmapName from "../../components/roadmap/RoadmapName.jsx";
import {HideIfAuthorized, ShowIfAuthorized} from "../../components/util/Permissions.jsx";
import {IntegrationRoles, BadgeWorkflowStatus} from "../../contexts/constants.js";
import BadgeStatusSummaryHeader from "../../components/staff/BadgeStatusSummaryHeader.jsx";
import BadgeStatus from "../../components/status/BadgeStatus.jsx";

export const BadgeWorkflowStatus_VIEW_ALL = "*";

export default function ResourceBadgeStatusListing() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    let badgeWorkflowStatusParam = queryParams.getAll('badgeWorkflowStatus');
    const orderBy = queryParams.get('orderBy');

    const {
        fetchResourceRoadmapBadges, fetchResourceRoadmapBadgeStatusSummary,
        getResourceRoadmapBadges, getResourceRoadmapBadgeStatusSummary
    } = useResources();
    const {getBadge} = useBadges();

    const [badgeWorkflowStatus, setBadgeWorkflowStatus] = useState(null);

    const allowedBadgeWorkflowStatusParamSet = new Set([BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFICATION_FAILED,
        BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.DEPRECATED, BadgeWorkflowStatus.EXEMPTED,
        BadgeWorkflowStatus_VIEW_ALL]);
    let badgeWorkflowStatusParamSet = new Set(badgeWorkflowStatusParam);

    badgeWorkflowStatusParam = badgeWorkflowStatusParamSet.values().toArray();
    if (allowedBadgeWorkflowStatusParamSet.intersection(badgeWorkflowStatusParamSet).size === 0) {
        badgeWorkflowStatusParam = BadgeWorkflowStatus_VIEW_ALL;
    }
    if (badgeWorkflowStatusParamSet.size > 0 && badgeWorkflowStatusParamSet.has(BadgeWorkflowStatus_VIEW_ALL)) {
        // Handle the view all scenario
        badgeWorkflowStatusParam = BadgeWorkflowStatus_VIEW_ALL;
    }

    const [orderByDirection, orderByColumnFieldName] = /(-)?(.*)/.exec(orderBy).slice(1);

    const badges = getResourceRoadmapBadges({
        badgeWorkflowStatus: badgeWorkflowStatus === BadgeWorkflowStatus_VIEW_ALL ? null : badgeWorkflowStatus,
        orderBy: orderBy
    });
    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary();


    // "info_resourceid", "badge__name", "roadmap__name", "status"
    const columns = [
        {
            title: "Resource ID",
            sortable: true,
            sortableFieldName: "info_resourceid"
        },
        {
            title: "Badge",
            sortable: true,
            sortableFieldName: "badge__name"
        },
        {
            title: "Roadmap",
            sortable: true,
            sortableFieldName: "roadmap__name"
        },
        {
            title: "Status",
            sortable: true,
            sortableFieldName: "status"
        },
        {
            title: "Action",
            sortable: false
        }
    ];

    useEffect(() => {
        fetchResourceRoadmapBadgeStatusSummary();
    }, []);

    useEffect(() => {
        if (resourceRoadmapBadgeStatusSummary) {
            setBadgeWorkflowStatus(badgeWorkflowStatusParam);
        }
    }, [!!resourceRoadmapBadgeStatusSummary, JSON.stringify(badgeWorkflowStatusParam)]);

    useEffect(() => {
        if (badgeWorkflowStatus) {
            fetchResourceRoadmapBadges({
                badgeWorkflowStatus: badgeWorkflowStatus === BadgeWorkflowStatus_VIEW_ALL ? null : badgeWorkflowStatus,
                orderBy: orderBy
            });
        }
    }, [badgeWorkflowStatus, orderBy]);

    const sortOrderIndicator = (orderByDirection === "-" ?
        <i className="ps-3 bi bi-chevron-up"></i> : <i className="ps-3 bi bi-chevron-down"></i>);

    const onClickSort = (fieldName) => () => {
        let _orderBy = fieldName;

        if (orderByColumnFieldName === fieldName && !orderByDirection) {
            _orderBy = "-" + _orderBy;
        }

        let url = StaffRouteUrls.BADGE_STATUS + "?";
        if (badgeWorkflowStatusParam) {
            if (!Array.isArray(badgeWorkflowStatusParam)) url += `badgeWorkflowStatus=${badgeWorkflowStatusParam}&`;
            else url += badgeWorkflowStatusParam.map(s => `badgeWorkflowStatus=${s}&`).join("");
        }

        url += `orderBy=${_orderBy}&`;
        navigate(url);
    }

    const sortingActiveColumnClass = "bg-opacity-10 bg-blue";

    if (badgeWorkflowStatus && resourceRoadmapBadgeStatusSummary) {

        return <div className="container">
            <div className="row mt-2 p-3">
                <div className="w-100 bg-white border-3 rounded-2 p-4 ps-5 pe-5">
                    <div className="w-100 " style={{borderBottom: "1px dashed"}}>
                        <h2 className="text-medium">Badge Verification Status</h2>
                    </div>

                    <p className="w-100 pt-3 text-gray-600">
                        View and manage badge verification across all resources.
                    </p>

                    <div className="w-100 pt-2 pb-4" style={{borderBottom: "1px dashed"}}>
                        <BadgeStatusSummaryHeader/>
                    </div>

                    <div className="w-100 pt-4">
                        <div className="w-100 mt-4 border border-1 rounded-2">
                            <table className="table sortable-table">
                                <thead>
                                <tr className="table-gray-100">
                                    {columns.map((column, columnIndex) => {
                                        const tooltip = <Tooltip>
                                            {column.sortableFieldName === orderByColumnFieldName && !orderByDirection ?
                                                "Sort descending" : "Sort ascending"}
                                        </Tooltip>


                                        return <th scope="col" key={columnIndex}
                                                   className={column.sortableFieldName === orderByColumnFieldName ? sortingActiveColumnClass : ""}>
                                            {column.sortable ?
                                                <OverlayTrigger overlay={tooltip} placement="bottom-start"
                                                                delayShow={300}
                                                                delayHide={150}>
                                                    <button
                                                        className={`w-100 fs-7 pt-2 pb-2 border-0 text-start bg-transparent`}
                                                        onClick={onClickSort(column.sortableFieldName)}>
                                                    <span
                                                        className="fs-7 pt-2 pb-2 text-start fw-bold">{column.title}</span>
                                                        {orderByColumnFieldName === column.sortableFieldName &&
                                                            sortOrderIndicator}
                                                    </button>
                                                </OverlayTrigger> :
                                                <div className="fs-7 pt-2 pb-2 text-start fw-bold">{column.title}</div>
                                            }
                                        </th>
                                    })}
                                </tr>
                                </thead>
                                <tbody>

                                {badges && badges.length === 0 &&
                                    <tr className="pt-2 pb-2">
                                        <td colSpan={5}>
                                            <div className="w-100 p-3 text-center lead text-gray-600">
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
                                            <div className="fs-7 pt-2 pb-2 text-gray-700">{resourceId}</div>
                                        </td>
                                        <td>
                                            <div className="fs-7 pt-2 pb-2 text-gray-700">{badge.name}</div>
                                        </td>
                                        <td>
                                            <div className="fs-7 pt-2 pb-2 text-gray-700">
                                                <RoadmapName roadmapId={roadmapId} seperator=" "/></div>
                                        </td>
                                        <td>
                                            <div className="pt-2 pb-2">
                                                <BadgeStatus status={resourceBadge.status}/>
                                            </div>
                                        </td>
                                        <td>
                                            <Link style={{minWidth: "175px"}}
                                                  to={`/resources/${resourceId}/roadmaps/${roadmapId}/badges/${badgeId}`}
                                                  className="btn btn-link text-medium text-decoration-none fw-normal fs-7 pt-2 pb-2 text-start"
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
                            <div className="w-100 mt-5 mb-5 p-3 bg-gray-100 fs-7 text-gray-800">
                                Showing {badges && badges.length} of {resourceRoadmapBadgeStatusSummary && resourceRoadmapBadgeStatusSummary.total} records
                            </div>
                        </div>

                        <div className="w-100 mt-1 mb-5 border border-1 rounded-2 bg-light p-3">
                            <div className="row text-blue-800">
                                <div className="col-sm-6 pb-2">
                                    <h4 className="d-inline fs-7 text-blue-800">Active Filter:</h4>
                                    <div className="d-inline ps-2 fs-7">
                                        {badgeWorkflowStatus === BadgeWorkflowStatus_VIEW_ALL ?
                                            "View All" :
                                            Array.isArray(badgeWorkflowStatus) ?
                                                badgeWorkflowStatus.map((bws, bwsIndex) =>
                                                    <span key={bwsIndex}>
                                                        <Translate>badgeWorkflowStatus.{bws}</Translate><br/></span>) :
                                                <Translate>badgeWorkflowStatus.{badgeWorkflowStatus}</Translate>}
                                    </div>
                                </div>
                                <div className="col-sm-6 pb-2">
                                    <h4 className="d-inline fs-7 text-blue-800">Current Sort:</h4>
                                    <div className="d-inline ps-2 fs-7">
                                        {columns.filter(c => c.sortableFieldName === orderByColumnFieldName)
                                            .map(c => c.title).join(", ")}
                                        {orderBy ? <span className="ps-1">
                                                ({!orderByDirection ? "Ascending" : "Descending"})</span> : "None"}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-inline fs-7">
                                        Filtering does not affect column sort order
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <h4 className="d-inline fs-7 text-blue-800">Priorities:</h4>
                                    <div className="d-inline ps-2 fs-7">
                                        Resource Id → Badge → Roadmap
                                    </div>
                                </div>
                            </div>
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
