import {Link} from "react-router-dom";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {RoadmapCard} from "../../components/resource-edit/resource-edit-page-cards.jsx";
import {useEffect} from "react";
import roadmapsBanner from "../../assets/roadmaps-banner.jpeg"

export default function HowToChooseRoadmap() {
    const {fetchRoadmaps, getRoadmaps} = useRoadmaps();

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    const roadmaps = getRoadmaps();

    console.log("roadmaps", roadmaps);

    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1 className="mb-4">
                What is an Integration Roadmap and How Do I Choose the Right One?
            </h1>
            <div className="row">
                <div className="col-sm-6">
                    <p className="fs-6">
                        ACCESS uses an Integration Roadmaps Framework to define how operators can integrate classes of
                        infrastructure into the ACCESS environment to achieve a defined operational status. This
                        framework defines, for example, how HPC compute clusters can achieve the ACCESS allocated
                        operational status, and is used to define how many new classes of emerging infrastructure can be
                        integrated to achieve ACCESS allocated, un-allocated, discoverable, or other statuses.
                    </p>
                </div>
                <div className="col-sm-6">
                    <img src={roadmapsBanner} alt="Roadmaps Banner" className="w-100" />
                </div>
            </div>
            <p className="fs-6">
                Currently, ACCESS supports integration for:
            </p>
        </div>

        <div className="row">
            {roadmaps && roadmaps.map((roadmap, roadmapIndex) => <div className="col-sm-6" key={roadmapIndex}>
                <RoadmapCard roadmapId={roadmap.roadmap_id}/>
            </div>)}
        </div>

        <div className="w-100 p-3 pt-5">
            <h2>Ready to integrate a new resource?</h2>
            <Link className="btn btn-dark btn-lg rounded-2 mt-2" to="/docs">Start Integration</Link>
        </div>

    </div>
}