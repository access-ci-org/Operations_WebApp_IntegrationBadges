import {useNavigate, useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import RoadmapSelection from "../components/resource-edit/RoadmapSelection.jsx";
import BadgeSelection from "../components/resource-edit/BadgeSelection.jsx";
import BadgeSelectionConfirmation from "../components/resource-edit/BadgeSelectionConfirmation.jsx";
import RoadmapSelectionConfirmation from "../components/resource-edit/RoadmapSelectionConfirmation.jsx";

export default function ResourceEdit() {
    const navigate = useNavigate();

    let {resourceId, roadmapId} = useParams();
    roadmapId = parseInt(roadmapId);

    const {
        fetchResource, fetchResourceRoadmapBadges,
        getResource, getResourceRoadmapBadges, getResourceOrganization,
        isResourceRoadmapSelected
    } = useResources();
    const {fetchRoadmap, getRoadmapBadges} = useRoadmaps();

    const [selectedBadgeIdMap, setSelectedBadgeIdMap] = useState({});
    const [wizardIndex, setWizardIndex] = useState(0);

    const resource = getResource({resourceId});
    const organization = getResourceOrganization({resourceId});
    const roadmapBadges = getRoadmapBadges({roadmapId});
    const resourceRoadmapBadges = getResourceRoadmapBadges({resourceId, roadmapId});
    const isRoadmapNew = !isResourceRoadmapSelected({resourceId, roadmapId})

    useEffect(() => {
        fetchResource({resourceId});
    }, [resourceId]);

    useEffect(() => {
        if (resourceId && roadmapId && !isRoadmapNew) {
            fetchResourceRoadmapBadges({resourceId, roadmapId});
        }
    }, [resourceId, roadmapId, isRoadmapNew]);

    useEffect(() => {
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

    useEffect(() => {
        !!roadmapId && fetchRoadmap({roadmapId});
    }, [roadmapId]);

    useEffect(() => {
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

    useEffect(() => {
        if (!!resource && !!resource.roadmaps && !roadmapId) {
            if (resource.roadmaps.length > 0) {
                navigate(`/resources/${resourceId}/roadmaps/${resource.roadmaps[0].roadmap.roadmap_id}/edit`, {replace: true});
            } else {
                navigate(`/resources/${resource.info_resourceid}/edit`, {replace: true})
            }
        }
    }, [resource, roadmapId]);

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
        if (wizardIndex === 2) {
            await handleSave();
        } else {
            setWizardIndex(wizardIndex + 1);
        }
    };

    if (resource && organization) {

        return <div className="container">
            {wizardIndex === 0 &&
                <RoadmapSelection resourceId={resourceId}
                                  prev={handlePrev} next={handleNext}/>}

            {wizardIndex === 1 &&
                <RoadmapSelectionConfirmation resourceId={resourceId}
                                              roadmapId={roadmapId} prev={handlePrev} next={handleNext}/>}

            {/*{wizardIndex === 2 &&*/}
            {/*    <BadgeSelection resourceId={resourceId} roadmapId={roadmapId}*/}
            {/*                    selected={(badgeId) => selectedBadgeIdMap[badgeId]}*/}
            {/*                    toggle={(badgeId) => toggleBadgeSelection({badgeId})}*/}
            {/*                    prev={handlePrev} next={handleNext}/>}*/}

            {wizardIndex === 2 &&
                <BadgeSelectionConfirmation resourceId={resourceId}
                                            roadmapId={roadmapId}
                                            selected={(badgeId) => selectedBadgeIdMap[badgeId]}
                                            toggle={(badgeId) => toggleBadgeSelection({badgeId})}
                                            prev={handlePrev} next={handleNext}/>}
        </div>
    } else {
        return <LoadingBlock processing={true}/>
    }
}
