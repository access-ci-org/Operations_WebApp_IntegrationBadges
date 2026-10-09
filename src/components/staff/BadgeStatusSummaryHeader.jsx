import {Link, useLocation} from "react-router-dom";
import {StaffRouteUrls} from "../../pages/pages-config.js";
import Translate from "../../locales/Translate.jsx";
import React, {useEffect} from "react";
import {BadgeWorkflowStatus} from "../../contexts/constants.js";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {BadgeStatusHoverCssClass, BadgeStatusCssClass} from "../status/BadgeStatus.jsx";
import {useEffectWithErrorHandling} from "../util/useEffectWithErrorHandling.js";
import LoadingBlock from "../util/LoadingBlock.jsx";

export default function BadgeStatusSummaryHeader() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderBy = queryParams.get('orderBy');

    const {fetchResourceRoadmapBadgeStatusSummary, getResourceRoadmapBadgeStatusSummary} = useResources();

    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary();

    const {processing, error, reload} = useEffectWithErrorHandling(async () => {
        await fetchResourceRoadmapBadgeStatusSummary();
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
            status: [BadgeWorkflowStatus.EXEMPTED, BadgeWorkflowStatus.EXEMPTION_REQUESTED,
                BadgeWorkflowStatus.EXEMPTION_REJECTED],
            title: "Exemptions",
            icon: <i className="bi bi-journal-check"></i>,
            variant: "black"
        },
        {
            status: BadgeWorkflowStatus.DEPRECATED,
            icon: <i className="bi bi-archive"></i>
        },
    ];

    if (resourceRoadmapBadgeStatusSummary) {
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
                verificationHighlight.variant = BadgeStatusCssClass[verificationHighlight.status] + " " + BadgeStatusHoverCssClass[verificationHighlight.status];
            }
        }
    }

    const getBadgeStatusLink = (status) => {
        let url = StaffRouteUrls.BADGE_STATUS + "?";

        if (!Array.isArray(status)) url += `badgeWorkflowStatus=${status}&`;
        else url += status.map(s => `badgeWorkflowStatus=${s}&`).join("");

        if (orderBy) url += `orderBy=${orderBy}&`;

        return url;
    }

    return <LoadingBlock title="badge status summary" processing={processing} error={error} reload={reload}>
        <ul className="row p-0 list-unstyled">
            {verificationHighlightList.map((verificationHighlight, verificationHighlightIndex) => {
                const variant = verificationHighlight.variant;
                const variantClass = `${variant}`;

                return <li className="col p-2" key={verificationHighlightIndex}>
                    <Link
                        to={getBadgeStatusLink(verificationHighlight.status)}
                        className={`btn btn-outline-primary fw-normal text-decoration-none underline w-100 h-100 p-2 border border-1 rounded-3 ${variantClass}`}>
                        <div className="w-100 text-center fs-2">
                            {verificationHighlight.icon}
                        </div>
                        <div className="w-100 text-center fs-2 fw-bolder">
                            {verificationHighlight.count}
                        </div>
                        <div className="w-100 text-center">
                            {verificationHighlight.title}
                        </div>
                    </Link>
                </li>
            })}
        </ul>
    </LoadingBlock>
}