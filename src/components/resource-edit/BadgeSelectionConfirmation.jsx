import {BadgeCardRowWithAddRemove} from "./resource-edit-page-cards.jsx";
import BadgeSelectionHeader from "./BadgeSelectionHeader.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import LoadingBlock from "../util/LoadingBlock.jsx";
import BadgeSelectionActionsFooter from "./BadgeSelectionActionsFooter.jsx";

export default function BadgeSelectionConfirmation({resourceId, roadmapId, selected, toggle, next, prev}) {
    const {getResource} = useResources();
    const {getRoadmapBadges} = useRoadmaps();

    const resource = getResource({resourceId});
    const roadmapBadges = getRoadmapBadges({roadmapId});

    const selectedBadges = [];
    const notSelectedBadges = [];

    if (!!resource && !!roadmapBadges) {

        for (let i = 0; i < roadmapBadges.length; i++) {
            const badge = roadmapBadges[i];
            const badgeId = badge.badge_id;

            if (!selected(badgeId)) {
                notSelectedBadges.push(badge);
            } else {
                selectedBadges.push(badge);
            }
        }

        return <>
            <div className="row pt-5">
                <h1>Review & Approve Resource Badge Selections</h1>
                <p>
                    In this step, review and confirm your selections. Once you submit your selections your roadmap will
                    switch to the “in progress” stage, and any team members assigned will see badges/tasks in their
                    ACCESS
                    Dashboard.
                </p>
            </div>
            <BadgeSelectionHeader resourceId={resourceId} roadmapId={roadmapId}/>
            <div className="row pt-5">
                <div className="col-lg-12">
                    <h3 className="text-black">Selected Badges ({selectedBadges.length})</h3>
                    <div className="w-100 pt-2 pb-5">
                        {selectedBadges && selectedBadges.map((roadmapBadge) => {
                            const badgeId = roadmapBadge.badge_id;
                            return <BadgeCardRowWithAddRemove key={badgeId} resourceId={resourceId} badgeId={badgeId}
                                                              selected={selected(badgeId)}
                                                              required={roadmapBadge.required}
                                                              toggle={toggle.bind(null, badgeId)}/>
                        })}
                        {selectedBadges && selectedBadges.length === 0 &&
                            <div className="w-100 p-3 ps-0 lead">
                                No badges selected for integration
                            </div>}
                    </div>
                </div>

                <div className="col-lg-12">
                    <h3 className="text-black">Recommended Skipped Badges ({notSelectedBadges.length})</h3>
                    <div className="w-100 pt-2 pb-5">
                        {notSelectedBadges && notSelectedBadges.map((badge) => {
                            const badgeId = badge.badge_id;
                            return <div className="w-100 pt-2" key={badgeId}>
                                <BadgeCardRowWithAddRemove resourceId={resourceId} roadmapId={roadmapId}
                                                           badgeId={badgeId}
                                                           selected={selected(badgeId)}
                                                           toggle={toggle.bind(null, badgeId)}/>
                            </div>
                        })}
                        {notSelectedBadges && notSelectedBadges.length === 0 &&
                            <div className="w-100 p-3 ps-0 lead">
                                All the recommended badges have been selected for integration
                            </div>}
                    </div>
                </div>
            </div>

            <BadgeSelectionActionsFooter resourceId={resourceId} roadmapId={roadmapId} selected={selected} next={next}
                                         prev={prev} showSave={true}/>
        </>
    } else {
        return <LoadingBlock/>
    }
}
