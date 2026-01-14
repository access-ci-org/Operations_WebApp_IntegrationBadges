import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";

export default function RoadmapName({roadmapId, seperator = <br/>}) {
    const {getRoadmap} = useRoadmaps();

    const roadmap = getRoadmap({roadmapId});

    const roadmapNameSegments = /(ACCESS Allocated|ACCESS Affiliated|ACCESS)? *(.*)/.exec(roadmap.name);

    return <span>
        <span className="text-black">{roadmapNameSegments[1]}</span>
        {seperator}
        <span className="text-medium">
            {roadmapNameSegments[2]}
        </span>
    </span>
}