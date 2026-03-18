import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {StaffRoadmapCard} from "../../components/staff/StaffRoadmapCard.jsx";
import GridAndListSwitch from "../../components/util/GridAndListSwitch.jsx";
import {RoadmapMaintainer} from "../../components/util/Permissions.jsx";

export default function StaffRoadmaps() {
    const {getRoadmaps} = useRoadmaps();

    const roadmaps = getRoadmaps();

    if (roadmaps) {
        return <div className="container">
            <div className="row visually-hidden">
                <h1>Staff Dashboard - Roadmaps</h1>
            </div>

            <div className="row mt-2 p-3">

                <div className="col-12 p-0 pb-4">
                    <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                        <div className="w-100 d-flex flex-row p-0" style={{borderBottom: "1px dashed"}}>
                            <h2 className="text-medium">Roadmaps</h2>
                            <div className="flex-fill">
                            </div>
                            <GridAndListSwitch/>
                        </div>
                        <div className="w-100 text-end pt-4">
                            Sort By:
                            <button className="btn btn-link ms-3 me-3 fw-light">
                                <span className="text-black">Roadmap Name</span>
                            </button>
                        </div>
                        <div className="row">
                            <RoadmapMaintainer>
                                <div className="col-lg-3 col-md-4 col-sm-6 p-2">
                                    <StaffRoadmapCard roadmapId={null}/>
                                </div>
                            </RoadmapMaintainer>
                            {roadmaps && roadmaps.map((roadmap, roadmapIndex) => {
                                return <div key={roadmapIndex} className={`col-lg-3 col-md-4 col-sm-6 p-2`}>
                                    <StaffRoadmapCard roadmapId={roadmap.roadmap_id}/>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
