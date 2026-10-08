import {useNavigate, useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import RoadmapSelection from "../components/resource-edit/RoadmapSelection.jsx";
import BadgeSelectionConfirmation from "../components/resource-edit/BadgeSelectionConfirmation.jsx";
import RoadmapSelectionConfirmation from "../components/resource-edit/RoadmapSelectionConfirmation.jsx";
import {useEffectWithErrorHandling} from "../components/util/useEffectWithErrorHandling.js";
import {AppRouteUrls} from "./pages-config.js";

export default function ResourceEdit() {
    const navigate = useNavigate();

    let {resourceId, roadmapId} = useParams();
    roadmapId = parseInt(roadmapId);

    const {
        fetchResource, fetchResourceRoadmapBadges,
        getResource, getResourceRoadmapBadges, getResourceOrganization,
        isResourceRoadmapSelected
    } = useResources();
    const {getRoadmap, getRoadmapBadges} = useRoadmaps();

    const [selectedBadgeIdMap, setSelectedBadgeIdMap] = useState({});
    const [wizardIndex, setWizardIndex] = useState(0);

    const resource = getResource({resourceId});
    const roadmap = getRoadmap({roadmapId});
    const roadmapBadges = getRoadmapBadges({roadmapId});
    const resourceRoadmapBadges = getResourceRoadmapBadges({resourceId, roadmapId});
    const isRoadmapNew = !isResourceRoadmapSelected({resourceId, roadmapId})


    useEffect(() => {
        if (!!resource && !!resource.roadmaps && !roadmapId) {
            if (resource.roadmaps.length > 0) {
                navigate(`/resources/${resourceId}/roadmaps/${resource.roadmaps[0].roadmap.roadmap_id}/edit`, {replace: true});
            } else {
                navigate(`/resources/${resource.info_resourceid}/edit`, {replace: true})
            }
        }
    }, [resource, roadmapId]);

    const resourceRoadmapBadgesLoading = useEffectWithErrorHandling(async () => {
        await fetchResource({resourceId});

        if (resourceId && roadmapId && !isRoadmapNew) {
            await fetchResourceRoadmapBadges({resourceId, roadmapId});
        }
    }, [resourceId, roadmapId, isRoadmapNew]);

    useEffectWithErrorHandling(async () => {
        if (!!resourceId && !!roadmapId) {
            if (isRoadmapNew) {
                setWizardIndex(1);
            } else {
                setWizardIndex(2);
            }
        } else {
            setWizardIndex(0);
        }
    }, [resourceId, roadmapId, isRoadmapNew]);

    useEffectWithErrorHandling(async () => {
        const _selectedBadgeIdMap = {};

        if (resourceRoadmapBadges) {
            for (let i = 0; i < resourceRoadmapBadges.length; i++) {
                _selectedBadgeIdMap[resourceRoadmapBadges[i].badge_id] = true;
            }
        }

        if (roadmapBadges) {
            for (let i = 0; i < roadmapBadges.length; i++) {
                if (roadmapBadges[i].required) {
                    _selectedBadgeIdMap[roadmapBadges[i].badge_id] = true;
                }
            }
        }

        setSelectedBadgeIdMap(_selectedBadgeIdMap);
    }, [roadmapId, resourceId, !!resourceRoadmapBadges, !!roadmapBadges]);

    const toggleBadgeSelection = ({badgeId}) => {
        setSelectedBadgeIdMap({
            ...selectedBadgeIdMap,
            [badgeId]: !selectedBadgeIdMap[badgeId]
        });
    };

    const handlePrev = () => {
        if (isRoadmapNew) {
            setWizardIndex(wizardIndex - 1);
        } else {
            navigate("/organizations");
        }
    };
    const handleNext = async () => {
        if (wizardIndex < 2) {
            setWizardIndex(wizardIndex + 1);
        }
    };

    return <div className="container">
        <LoadingBlock processing={resourceRoadmapBadgesLoading.processing} error={resourceRoadmapBadgesLoading.error}
                      reload={resourceRoadmapBadgesLoading.reload} className="w-100 p-5 text-center">
            {wizardIndex === 0 &&
                <RoadmapSelection resourceId={resourceId} prev={handlePrev} next={handleNext}/>}

            {wizardIndex === 1 &&
                <RoadmapSelectionConfirmation resourceId={resourceId} roadmapId={roadmapId} prev={handlePrev}
                                              next={handleNext}/>}

            {/*{wizardIndex === 2 &&*/}
            {/*    <BadgeSelection resourceId={resourceId} roadmapId={roadmapId}*/}
            {/*                    selected={(badgeId) => selectedBadgeIdMap[badgeId]}*/}
            {/*                    toggle={(badgeId) => toggleBadgeSelection({badgeId})}*/}
            {/*                    prev={handlePrev} next={handleNext}/>}*/}

            {wizardIndex === 2 &&
                <BadgeSelectionConfirmation resourceId={resourceId} roadmapId={roadmapId}
                                            selected={(badgeId) => selectedBadgeIdMap[badgeId]}
                                            toggle={(badgeId) => toggleBadgeSelection({badgeId})}
                                            prev={handlePrev} next={handleNext}/>}
        </LoadingBlock>
    </div>
}
