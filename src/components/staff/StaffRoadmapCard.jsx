import {Link} from "react-router-dom";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {StaffRouteUrls} from "../../pages/staff/StaffRoute.jsx";
import RoadmapName from "../roadmap/RoadmapName.jsx";

export function StaffRoadmapCard({roadmapId}) {
    const {getRoadmap} = useRoadmaps();

    if (roadmapId === null) {
        return <div className="w-100 h-100 p-2 pt-4">
            <div className="w-100 h-100 rounded-4 p-2 d-flex flex-column bg-gray-200 border-black border border-1">
                <Link to={StaffRouteUrls.ROADMAP_NEW}
                      className="btn btn-link w-100 h-100 text-center align-content-center fw-normal text-secondary">
                    + Create New
                </Link>
            </div>
        </div>
    }

    const roadmap = getRoadmap({roadmapId});

    if (roadmap) {
        return <div className="w-100 h-100 p-2 pt-4">
            <div
                className="w-100 h-100 d-flex flex-column rounded-3 border-black border border-1 position-relative staff-roadmap-card bg-white">
                <div className="w-100 position-absolute text-center roadmap-card-icon-row">
                    <div className="rounded-circle p-3 border d-inline-block bg-white">
                        <div className="background-image-center-no-repeat roadmap-card-icon"
                             style={{backgroundImage: `url(${roadmap.graphic})`}}>
                        </div>
                    </div>
                </div>
                <div className="w-100 p-2 text-center">
                    <div className="w-100 text-end" style={{height: "70px"}}>
                        {roadmap.status && roadmap.status.toLowerCase() === "draft" &&
                            <span className="bg-gray-300 p-1 rounded-1 fs-9 coming-soon-regular">Draft</span>}
                    </div>
                    <h3 className="w-100 text-center fs-6"><RoadmapName roadmapId={roadmapId}/></h3>
                </div>
                <div className="w-100 text-end p-1">
                    <Link className="btn btn-link p-2"
                          to={StaffRouteUrls.ROADMAP_EDIT.replace(":roadmapId", roadmapId)}><i
                        className="bi bi-pencil-fill"></i></Link>
                    <Link className="btn btn-link p-2" to=""><i className="bi bi-trash-fill"></i></Link>
                </div>
            </div>
        </div>
    }
}
