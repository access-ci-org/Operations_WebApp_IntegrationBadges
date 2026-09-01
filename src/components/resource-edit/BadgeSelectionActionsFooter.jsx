import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import LoadingBlock from "../util/LoadingBlock.jsx";
import {useState} from "react";
import {useDialogs} from "../../contexts/DialogContext.jsx";
import {AppRouteUrls} from "../../pages/pages-config.js";

export default function BadgeSelectionActionsFooter({resourceId, roadmapId, selected, next, prev, showSave}) {
    const {getResource, setResourceRoadmap} = useResources();
    const {getRoadmapBadges} = useRoadmaps();
    const {showDialog} = useDialogs();

    const [saveProcessing, setSaveProcessing] = useState(false);

    const resource = getResource({resourceId});
    const roadmapBadges = getRoadmapBadges({roadmapId});

    const selectedBadgeIds = [];

    const handleSave = async () => {
        setSaveProcessing(true);

        try {
            await setResourceRoadmap({resourceId, roadmapId: roadmapId, badgeIds: selectedBadgeIds});
            await showDialog({
                variant: 'primary',
                title: "",
                icon: "bi-floppy-fill",
                message: "Changes Have Been Successfully Saved",
                buttons: [
                    {
                        label: "Go to Dashboard",
                        answer: false,
                        className: "btn btn-outline-primary",
                        to: AppRouteUrls.ORGANIZATIONS
                    },
                    {
                        label: "Resource Overview",
                        answer: false,
                        className: "btn btn-primary",
                        to: AppRouteUrls.RESOURCE_ROADMAP
                            .replace(":resourceId", resourceId)
                            .replace(":roadmapId", roadmapId)
                    }
                ]
            });
        } catch {
            await showDialog({
                variant: 'danger',
                title: "",
                icon: "bi-exclamation-triangle-fill",
                message: <div>
                    <p>
                        You don't have permissions to make this change. If you should have it, please submit an ACCESS
                        ticket requesting:</p>

                    <p>
                        Integration Dashboard <strong>coordinator</strong> permission for the
                        resource <strong>{resourceId}</strong></p>
                </div>,
                buttons: [
                    {label: "Cancel", answer: false, className: "btn btn-outline-primary"}
                ]
            });
        }

        setSaveProcessing(false);
    };

    if (!!resource && !!roadmapBadges) {

        for (let i = 0; i < roadmapBadges.length; i++) {
            const badge = roadmapBadges[i];
            const badgeId = badge.badge_id;

            if (selected(badgeId)) {
                selectedBadgeIds.push(badgeId);
            }
        }

        return <div className="w-100 text-end pt-3 pb-5">
            <button className="btn btn-outline-primary rounded-1 m-1" onClick={prev}>
                Cancel
            </button>

            {!showSave ?
                <button className="btn btn-primary rounded-1 m-1 ${}" disabled={selectedBadgeIds.length === 0}
                        onClick={next}>
                    Continue with {selectedBadgeIds.length} Selected Badges
                </button> :
                saveProcessing ?
                    <button className="btn btn-primary rounded-1 m-1">
                        <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                        Loading...
                    </button> :
                    <button className="btn btn-primary rounded-1 m-1" disabled={selectedBadgeIds.length === 0}
                            onClick={handleSave}>
                        Save Selection
                    </button>}
        </div>
    } else {
        return <LoadingBlock/>
    }
}
