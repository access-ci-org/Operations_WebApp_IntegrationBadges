import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";

export default function RoadmapName({roadmapId, seperator = <br/>, showStatus=false}) {
    const {getRoadmap} = useRoadmaps();

    const roadmap = getRoadmap({roadmapId});

    const roadmapNameSegments = /(ACCESS Allocated|ACCESS Enabled|ACCESS Aligned|ACCESS)? *(.*)/.exec(roadmap.name);

    return <span>
        <span className="text-black">{roadmapNameSegments[1]}</span>
        {seperator}
        <span className="text-medium">
            {roadmapNameSegments[2]}
        </span>

        {!!showStatus && roadmap.status && roadmap.status.toLowerCase() === "draft" &&
            <span className="ms-2 bg-gray-300 ps-1 pe-1 rounded-1 fs-9 coming-soon-regular">Draft</span>}
    </span>
}