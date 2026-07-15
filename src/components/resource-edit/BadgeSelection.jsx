import {BadgeCardRowWithCheckboxes} from "./resource-edit-page-cards.jsx";
import BadgeSelectionHeader from "./BadgeSelectionHeader.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import LoadingBlock from "../util/LoadingBlock.jsx";
import BadgeSelectionActionsFooter from "./BadgeSelectionActionsFooter.jsx";

export default function BadgeSelection({resourceId, roadmapId, selected, toggle, prev, next}) {
    const {getResource, isResourceRoadmapSelected} = useResources();
    const {getRoadmapBadges} = useRoadmaps();

    const resource = getResource({resourceId});
    const roadmapBadges = getRoadmapBadges({roadmapId});
    const isRoadmapNew = !isResourceRoadmapSelected({resourceId, roadmapId});

    if (!!resource && !!roadmapBadges) {
        return <>
            <div className="row pt-5">
                {isRoadmapNew ? <>
                        <h1>Step 1 of 2: Select Resource-Specific Badges</h1>
                        <p>
                            Choose the integration badges for your team to complete. Each badge represents a key integration
                            step, and some badges will have multiple tasks that may need different team members to
                            accomplish.
                        </p>
                    </> :
                    <>
                        <h1>{resource.resource_descriptive_name}: Edit Your Resource</h1>
                        <p>
                            Use the form below to review and update your existing resource integration. You can view
                            your current roadmap and badges, make adjustments, and save your changes. Any modifications
                            you make will be reviewed by the staff team as part of the validation process.
                        </p>
                    </>}
            </div>
            <BadgeSelectionHeader resourceId={resourceId} roadmapId={roadmapId}/>
            <div className="row pt-5">
                <h2>Recommended badges for your resource</h2>
                <div className="w-100 pt-2 pb-5">
                    {roadmapBadges && roadmapBadges.map((roadmapBadge) => {
                        const badgeId = roadmapBadge.badge_id;
                        return <BadgeCardRowWithCheckboxes
                            key={badgeId} resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}
                            selected={selected(badgeId)} required={roadmapBadge.required}
                            toggle={toggle.bind(null, badgeId)}/>
                    })}
                    {roadmapBadges && roadmapBadges.length === 0 && <div className="w-100 p-3 text-center lead">
                        No badges available
                    </div>}
                </div>
            </div>

            <BadgeSelectionActionsFooter resourceId={resourceId} roadmapId={roadmapId} selected={selected} next={next}
                                         prev={prev} showSave={!isRoadmapNew}/>
        </>
    } else {
        return <LoadingBlock/>
    }
}
