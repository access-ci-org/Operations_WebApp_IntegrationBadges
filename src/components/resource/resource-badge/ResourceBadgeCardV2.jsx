import {useResources} from "../../../contexts/ResourcesContext.jsx";
import {Link} from "react-router-dom";
import ResourceBadgeIcon from "./ResourceBadgeIcon.jsx";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";

export default function ResourceBadgeCardV2({resourceId, roadmapId, badgeId}) {
    const {getRoadmap} = useRoadmaps();
    const {getResource, getResourceOrganization, getResourceRoadmapBadge} = useResources();

    const resource = getResource({resourceId});
    const roadmap = getRoadmap({roadmapId});
    const organization = getResourceOrganization({resourceId});
    const badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});

    const badgeWorkflowStatusClass = {
        "tasks-completed": "bg-light",
        "verification-failed": "bg-danger-subtle"
    };

    if (organization && resource && badge) {
        return <div className="w-100 shadow-sm border border-1 rounded-1 ps-4">
            <div className="w-100 border-start border-1 ps-4 pe-4 pt-3 pb-3">
                <div className="w-100 d-flex flex-row">
                    <div className="ps-2 pe-4">
                        <ResourceBadgeIcon resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}/>
                    </div>
                    <div className="flex-fill">
                        <h4 className="w-100">{badge.name}</h4>
                        <div className="w-100 fst-italic">{roadmap.name}</div>
                    </div>
                </div>
                <div className="w-100 d-flex flex-row mt-2 mb-4">
                    <div
                        className={`ps-4 border border-1 border-end-0 rounded-start-1  ${badgeWorkflowStatusClass[badge.status]}`}>
                    </div>
                    <div className="flex-fill p-3 border border-1 border-start-0 rounded-end-1">
                        <div>
                            <strong>Resource Type : </strong> {resource.cider_type}
                        </div>
                        <div>
                            <strong>Resource Name : </strong> {resource.resource_descriptive_name}
                        </div>
                        <div>
                            <strong>Roadmap : </strong> {roadmap.name}
                        </div>
                    </div>
                </div>
                <div className="w-100 text-end">
                    <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}/badges/${badge.badge_id}`}
                          className="btn btn-outline-medium">
                        VIEW DETAILS
                    </Link>
                </div>
            </div>
        </div>
    }
}