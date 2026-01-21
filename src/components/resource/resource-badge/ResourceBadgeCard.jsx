import {useResources} from "../../../contexts/ResourcesContext.jsx";
import {Link} from "react-router-dom";
import ResourceBadgeStatus from "../../status/ResourceBadgeStatus.jsx";
import ResourceBadgeIcon from "./ResourceBadgeIcon.jsx";
import {HtmlToText} from "../../util/text-editors.jsx";

export default function ResourceBadgeCard({resourceId, roadmapId, badgeId}) {
    const {getResource, getResourceOrganization, getResourceRoadmapBadge} = useResources();

    const resource = getResource({resourceId});
    const organization = getResourceOrganization({resourceId});
    const badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});

    if (organization && resource && badge) {
        return <div className="w-100 badge-card rounded-4 p-3">
            <div className="w-100 p-1 badge-card-header">
                <div className="w-100 badge-card-header-thumbnail">
                    <ResourceBadgeIcon resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}/>
                </div>
                <h3 className="w-100">{badge.name}</h3>
            </div>
            <div className="w-100 badge-card-body">
                <p className="w-100 small">
                    <HtmlToText>{badge.resource_provider_summary}</HtmlToText>
                </p>
                <div className="w-100 text-center">
                    <ResourceBadgeStatus resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}/>
                </div>
            </div>
            <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}/badges/${badge.badge_id}`}
                  className="btn btn-dark rounded-5 w-100">
                View
            </Link>
        </div>
    }
}