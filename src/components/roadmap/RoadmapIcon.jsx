import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";

export default function RoadmapIcon({roadmapId}) {
    const {getRoadmap} = useRoadmaps();

    let roadmap = getRoadmap({roadmapId});

    return <div className={`w-100 h-100 background-image-center-no-repeat badge-icon-border`}
        style={{backgroundImage: `url(${roadmap.graphic})`}}>
    </div>
}
