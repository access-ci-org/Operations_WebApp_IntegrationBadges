import {Link} from "react-router-dom";
import {BadgeWorkflowStatus} from "../../../contexts/BadgeContext.jsx";
import {useResources} from "../../../contexts/ResourcesContext.jsx";
import Translate from "../../../locales/Translate.jsx";
import {BadgeCardRow} from "../../resource-edit/resource-edit-page-cards.jsx";

const badgePrerequisiteActionIconClass = {
    "": "bi-info-circle-fill",
    "undefined": "bi-info-circle-fill",
    [BadgeWorkflowStatus.NOT_PLANNED]: "bi-info-circle-fill",
    [BadgeWorkflowStatus.PLANNED]: "bi-layers",
    [BadgeWorkflowStatus.TASK_COMPLETED]: "bi-layers",
    [BadgeWorkflowStatus.VERIFICATION_FAILED]: "bi-layers",
    [BadgeWorkflowStatus.VERIFIED]: "bi-check-circle-fill",
    [BadgeWorkflowStatus.DEPRECATED]: "bi-info-circle-fill"
};

export default function ResourceBadgePrerequisites({resourceId, roadmapId, badgeId}) {
    const {getResourceRoadmapBadgePrerequisites} = useResources();

    let prerequisiteBadges = getResourceRoadmapBadgePrerequisites({resourceId, roadmapId, badgeId});

    if (prerequisiteBadges) {
        const toggleComponent = <div
            className="p-4 h-100 bg-warning-subtle rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
            role="button">
        </div>

        return <div className="w-100 pb-3">
            {prerequisiteBadges && prerequisiteBadges.length === 0 &&
                <div className="w-100 p-3 text-center lead">
                    No Prerequisites
                </div>}
            {prerequisiteBadges && prerequisiteBadges.map((prerequisiteBadge, taskIndex) => {
                let actions = null;

                if (!!resourceId && !!roadmapId) {
                    actions = <Link
                        to={`/resources/${resourceId}/roadmaps/${roadmapId}/badges/${prerequisiteBadge.badge_id}`}
                        className="w-100 btn btn-outline-medium btn-sm rounded-3 d-flex flex-row">
                        <span className="flex-fill text-start">
                            <i className={`bi ${badgePrerequisiteActionIconClass[prerequisiteBadge.status]}`}></i>
                            <span className="ps-3 pe-3">
                                <Translate>badgePrerequisiteActionLabel.{prerequisiteBadge.status}</Translate>
                            </span>
                        </span>
                        <span className="">
                            <i className="bi bi-chevron-right"></i>
                        </span>
                    </Link>
                }

                return <BadgeCardRow key={taskIndex} resourceId={resourceId} roadmapId={roadmapId}
                                     badgeId={prerequisiteBadge.badge_id}
                                     toggleComponent={toggleComponent} actions={actions}/>

            })}
        </div>
    }
}