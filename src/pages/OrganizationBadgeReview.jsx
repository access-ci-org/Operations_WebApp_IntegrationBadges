import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import Translate from "../locales/Translate.jsx";
import ResourceBadgeCardV2 from "../components/resource/resource-badge/ResourceBadgeCardV2.jsx";
import {BadgeWorkflowStatus} from "../contexts/constants.js";
import {useEffectWithErrorHandling} from "../components/util/useEffectWithErrorHandling.js";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function OrganizationBadgeReview() {
    let {organizationId, badgeWorkflowStatus} = useParams();
    const {organizationMap, fetchOrganization} = useOrganizations();
    const {fetchResourceRoadmapBadges, getResourceRoadmapBadges} = useResources();

    const organization = organizationMap[organizationId];

    badgeWorkflowStatus = badgeWorkflowStatus.toLowerCase();
    if (Object.values(BadgeWorkflowStatus).indexOf(badgeWorkflowStatus) < 0) {
        badgeWorkflowStatus = null;
    }

    const {processing, error, reload} = useEffectWithErrorHandling(async () => {
        await Promise.all([
            fetchOrganization({organizationId}),
            fetchResourceRoadmapBadges({organizationId, badgeWorkflowStatus})
        ]);
    }, [organizationId, badgeWorkflowStatus]);

    const resourceBadges = getResourceRoadmapBadges({organizationId, badgeWorkflowStatus});

    return <div className="container">
        <div className="row">
            <h1><Translate>badgeWorkflowVerificationStatus.{badgeWorkflowStatus}</Translate></h1>
        </div>
        <div className="w-100 d-flex flex-row pb-3 pt-3">
            <div className="bg-warning bg-opacity-25 p-2 pt-3 rounded-start-2">
                <i className="bi bi-info-circle"></i>
            </div>
            <div className="flex-fill bg-warning rounded-end-2 p-3 bg-opacity-10">
                <h2 className="fs-3 text-primary">COMMENTS:</h2>
                <p>
                    These badges were returned with feedback. Please click and “view details” for each and revise
                    the highlighted tasks and resubmit for validation.
                </p>
            </div>
        </div>
        <div className="row">
            <LoadingBlock title="returned badges" processing={processing} error={error} reload={reload}>
                {organization && resourceBadges && resourceBadges.length === 0 &&
                    <div className="text-secondary">
                        <i className="bi bi-info-circle-fill"></i>&nbsp;
                        There are no badges returned
                    </div>}
                {organization && resourceBadges && resourceBadges.map((resourceBadge, resourceBadgeIndex) =>
                    <div key={resourceBadgeIndex}
                         className="w-100 p-3">
                        <ResourceBadgeCardV2 resourceId={resourceBadge.info_resourceid}
                                             roadmapId={resourceBadge.roadmap_id} badgeId={resourceBadge.badge_id}/>
                    </div>)}
            </LoadingBlock>
        </div>
    </div>
}
