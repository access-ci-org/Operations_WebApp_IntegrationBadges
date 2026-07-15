import {RoadmapCard} from "./resource-edit-page-cards.jsx";
import {useNavigate} from "react-router-dom";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";

export default function RoadmapSelection({resourceId, selected, toggle, prev, next}) {
    const navigate = useNavigate();

    const {getResource, isResourceRoadmapSelected} = useResources();
    const {getRoadmaps} = useRoadmaps();

    let resource = getResource({resourceId});
    let roadmaps = getRoadmaps().filter(({infrastructure_types}) => infrastructure_types === resource.cider_type);

    const handleRoadmapSelect = (roadmapId) => {
        navigate(`/resources/${resourceId}/roadmaps/${roadmapId}/edit`, {replace: true});
    };

    if (!!resource && !!roadmaps) {
        return <>
            <div className="row pt-4">
                <h1>Welcome to the ACCESS Integration Roadmaps.</h1>
                <p>
                    <em>Discover how to integrate your infrastructure into the ACCESS environment.</em>
                </p>
                <p>
                    Select the roadmap that best aligns with your operational goals under the infrastructure class you
                    wish to integrate. Let’s help you achieve the ACCESS allocated status and beyond.
                </p>
            </div>
            <div className="row pt-5">
                <h2 className="visually-hidden">Select the appropriate Roadmap</h2>
                <div className="row pt-2 pb-5 row-cols-2">
                    {roadmaps && roadmaps.map((roadmap) => {
                        const roadmapId = roadmap.roadmap_id;
                        return <div className="col pt-2" key={roadmapId}>
                            <RoadmapCard resourceId={resourceId} roadmapId={roadmapId}
                                         selected={isResourceRoadmapSelected({resourceId, roadmapId})}
                                         toggle={handleRoadmapSelect.bind(this, roadmapId)}/>
                        </div>
                    })}
                    {roadmaps && roadmaps.length === 0 && <div className="w-100 p-3 text-center lead">
                        No roadmaps available for the infrastructure type "{resource.cider_type}"
                    </div>}
                </div>
            </div>
            <div className="row pt-5">
                <p>
                    <strong>Explore the Future of Infrastructure Integration: </strong>
                    Interested in contributing to the development of new
                    infrastructure roadmaps? We invite you to explore the possibilities of integrating new and novel
                    infrastructure types. Open an ACCESS Integration and Operation Support Request to start a
                    conversation.
                    Together, we can advance research and innovation in cyberinfrastructure.
                </p>
            </div>
            <div className="row pt-5">
                <h5>Integration Roadmaps Framework Participation</h5>
                <p>
                    ACCESS projects contribute to the Integration Roadmaps Framework by participating in the ACCESS
                    Integration Roadmaps Working Group where they develop, document, review, and release tasks and
                    emerging
                    roadmaps.
                </p>
            </div>
        </>
    }
}
