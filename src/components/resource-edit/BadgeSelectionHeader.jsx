import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Dropdown, DropdownButton} from "react-bootstrap";
import LoadingBlock from "../util/LoadingBlock.jsx";
import {useNavigate} from "react-router-dom";

export default function BadgeSelectionHeader({resourceId, roadmapId}) {
    const navigate = useNavigate();

    const {getResource, getResourceOrganization, getResourceRoadmaps, isResourceRoadmapSelected} = useResources();
    const {getRoadmap} = useRoadmaps();

    const resource = getResource({resourceId});
    const resourceRoadmaps = getResourceRoadmaps({resourceId});
    const organization = getResourceOrganization({resourceId});
    const roadmap = getRoadmap({roadmapId});
    const isRoadmapNew = !isResourceRoadmapSelected({resourceId, roadmapId});

    const handleResourceRoadmapSelect = (eventKey) => {
        navigate(`/resources/${resourceId}/roadmaps/${eventKey}/edit`);
    }

    return <>
        <div className="w-100 border-gray-200 border-top">
            <div className="row bg-gray-100 rounded-3 mt-4 p-2">
                <div className="col p-2">
                    <div><strong>{resource.resource_descriptive_name}</strong></div>
                    <div><strong className="text-medium">{organization.organization_name}</strong></div>
                </div>
                <div className="col p-2">
                    <label className="text-secondary">Resource Type</label>
                    <div>{resource.cider_type}</div>
                </div>
                <div className="col p-2">
                    <label className="text-secondary">Global Resource ID</label>
                    <div>{resource.info_resourceid}</div>
                </div>
                <div className="col p-2">
                    <label className="text-secondary">Latest Status</label>
                    <div>{resource.latest_status}</div>
                </div>
                {/*{isRoadmapNew ? <div className="col p-2">*/}
                {/*    <label className="text-secondary">Roadmap</label>*/}
                {/*    <div>{roadmap.name}</div>*/}
                {/*</div> : null}*/}
            </div>
        </div>

        <div className="w-100 pt-5">
            <h2>Selected Roadmap:</h2>
            <p>
                If you’d like to change your selection or associate your resource with a different roadmap, please
                visit the Roadmaps page and update it there. For any other questions or assistance, feel free to
                contact the concierge team.
            </p>

            {!!resourceRoadmaps ?
                <DropdownButton size="lg" title={roadmap.name}
                                bsPrefix="w-100 text-start btn btn-lg btn-outline-medium rounded-2 p-4"
                                onSelect={handleResourceRoadmapSelect}>
                    {resourceRoadmaps.map(resourceRoadmap => <Dropdown.Item key={resourceRoadmap.roadmap_id}
                                                                            eventKey={resourceRoadmap.roadmap_id}>
                        {resourceRoadmap.name}
                    </Dropdown.Item>)}

                    {!!isRoadmapNew && <Dropdown.Item key={roadmap.roadmap_id} eventKey={roadmap.roadmap_id}>
                        {roadmap.name}
                    </Dropdown.Item>}
                </DropdownButton> :
                <LoadingBlock/>}
        </div>

    </>
}
