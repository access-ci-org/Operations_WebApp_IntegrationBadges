import {Link, useLocation, useNavigate} from "react-router-dom";
import {StaffRouteUrls} from "../../pages/staff/StaffRoute.jsx";
import Translate from "../../locales/Translate.jsx";
import React, {useEffect} from "react";
import {BadgeWorkflowStatus} from "../../contexts/constants.js";
import {useResources} from "../../contexts/ResourcesContext.jsx";

export const StaffBadgeStatusVariant = {
    [BadgeWorkflowStatus.TASK_COMPLETED]: "orange",
    [BadgeWorkflowStatus.VERIFICATION_FAILED]: "danger",
    [BadgeWorkflowStatus.PLANNED]: "blue",
    [BadgeWorkflowStatus.VERIFIED]: "green",
    [BadgeWorkflowStatus.DEPRECATED]: "secondary",
    [BadgeWorkflowStatus.EXEMPTED]: "green",
    [BadgeWorkflowStatus.EXEMPTION_REQUESTED]: "orange",
    [BadgeWorkflowStatus.EXEMPTION_REJECTED]: "danger"
}

export default function BadgeStatusSummaryHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    let badgeWorkflowStatusParam = queryParams.get('badgeWorkflowStatus');
    const orderBy = queryParams.get('orderBy');

    const {fetchResourceRoadmapBadgeStatusSummary, getResourceRoadmapBadgeStatusSummary} = useResources();

    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary();

    useEffect(() => {
        fetchResourceRoadmapBadgeStatusSummary();
    }, []);

    const verificationHighlightList = [
        {
            status: BadgeWorkflowStatus.TASK_COMPLETED,
            icon: <i className="bi bi-clock"></i>
        },
        {
            status: BadgeWorkflowStatus.VERIFICATION_FAILED,
            icon: <i className="bi bi-exclamation-circle"></i>
        },
        {
            status: BadgeWorkflowStatus.PLANNED,
            icon: <i className="bi bi-activity"></i>
        },
        {
            status: BadgeWorkflowStatus.VERIFIED,
            icon: <i className="bi bi-check2-circle"></i>
        },
        {
            status: BadgeWorkflowStatus.DEPRECATED,
            icon: <i className="bi bi-archive"></i>
        },
        {
            status: [BadgeWorkflowStatus.EXEMPTED, BadgeWorkflowStatus.EXEMPTION_REQUESTED,
                BadgeWorkflowStatus.EXEMPTION_REJECTED],
            title: "Exemptions",
            icon: <i className="bi bi-journal-check"></i>,
            variant: "black"
        }
    ];

    for (let i in verificationHighlightList) {
        const verificationHighlight = verificationHighlightList[i];

        if (Array.isArray(verificationHighlight.status)) {
            verificationHighlight.count = Math.sumPrecise(verificationHighlight.status.map(s =>
                resourceRoadmapBadgeStatusSummary[s]));
        } else {
            verificationHighlight.count = resourceRoadmapBadgeStatusSummary[verificationHighlight.status];
        }

        if (!verificationHighlight.title) {
            verificationHighlight.title = <Translate>badgeWorkflowStatus.{verificationHighlight.status}</Translate>;
        }

        if (!verificationHighlight.variant) {
            verificationHighlight.variant = StaffBadgeStatusVariant[verificationHighlight.status];
        }
    }

    const getBadgeStatusLink = (status) => {
        let url = StaffRouteUrls.BADGE_STATUS + "?";

        if (!Array.isArray(status)) url += `badgeWorkflowStatus=${status}&`;
        else url += status.map(s => `badgeWorkflowStatus=${s}&`).join("");

        if (orderBy) url += `orderBy=${orderBy}&`;

        return url;
    }

    return <div className="w-100">
        <ul className="row p-0 list-unstyled">
            {verificationHighlightList.map((verificationHighlight, verificationHighlightIndex) => {
                const variant = verificationHighlight.variant;
                const variantClass = `border-${variant} bg-${variant} text-${variant}`

                return <li className="col p-2" key={verificationHighlightIndex}>
                    <Link
                        to={getBadgeStatusLink(verificationHighlight.status)}
                        className={`btn w-100 h-100 p-2 bg-opacity-10 border border-2 border-opacity-10 rounded-3 ${variantClass}`}>
                        <div className="w-100 text-center fs-2">
                            {verificationHighlight.icon}
                        </div>
                        <div className="w-100 text-center fs-2 fw-bolder">
                            {verificationHighlight.count}
                        </div>
                        <div className="w-100 text-center text-secondary">
                            {verificationHighlight.title}
                        </div>
                    </Link>
                </li>
            })}
        </ul>
    </div>
}