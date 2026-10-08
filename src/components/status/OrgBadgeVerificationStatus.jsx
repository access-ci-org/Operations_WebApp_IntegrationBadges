import {useResources} from "../../contexts/ResourcesContext.jsx";
import Translate from "../../locales/Translate.jsx";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useEffectWithErrorHandling} from "../util/useEffectWithErrorHandling.js";
import LoadingBlock from "../util/LoadingBlock.jsx";

const badgeWorkflowStatusClass = {
    "tasks-completed": "bg-light",
    "verification-failed": "bg-danger-subtle"
};

export default function OrgBadgeVerificationStatus({organizationId, badgeWorkflowStatus}) {
    const {
        fetchResourceRoadmapBadgeStatusSummary,
        getResourceRoadmapBadgeStatusSummary
    } = useResources();

    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary({organizationId});

    const {error, processing, reload} = useEffectWithErrorHandling(async () => {
        await fetchResourceRoadmapBadgeStatusSummary({organizationId});
    }, []);

    let badgeCount = 0;
    if (resourceRoadmapBadgeStatusSummary) {
        badgeCount = resourceRoadmapBadgeStatusSummary[badgeWorkflowStatus] || 0;
    }

    return <div className="w-100 pe-3 mt-2 mb-2">
        {(processing || error || badgeCount > 0) && <h2 className="fs-6 text-gray-700">Badge Verification <br/>Status</h2>}
        <LoadingBlock processing={processing} error={error} reload={reload}>
            {badgeCount > 0 && <Link to={`/organizations/${organizationId}/badge-review/${badgeWorkflowStatus}`}
                                     style={{fontWeight: 400}}
                                     className={`btn btn-link text-decoration-none m-1 w-100 ps-2 pe-2 pt-1 pb-1 rounded-1 d-flex flex-row ${badgeWorkflowStatusClass[badgeWorkflowStatus]}`}>
                <small className="w-100 text-nowrap flex-fill">
                    <Translate>badgeWorkflowVerificationStatus.{badgeWorkflowStatus}</Translate>
                </small>
                <small>{badgeCount}</small>
            </Link>}
        </LoadingBlock>
    </div>
}
