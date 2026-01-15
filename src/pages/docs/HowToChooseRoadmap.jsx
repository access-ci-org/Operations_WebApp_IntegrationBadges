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

    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1 className="">
                What is an Integration Roadmap and How Do I Choose the Right One?
            </h1>
            <div className="w-100 fw-bold fst-italic fs-5 text-medium mb-5">
                Discover how to integrate your infrastructure into the ACCESS environment.
            </div>
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
                    <img src={roadmapsBanner} alt="Roadmaps Banner" className="w-100"/>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12">
                <h2 className="w-100 p-3 fs-6">
                    Currently, ACCESS supports integration for:
                </h2>
            </div>

            {roadmaps && roadmaps.map((roadmap, roadmapIndex) => <div className="col-sm-6" key={roadmapIndex}>
                <RoadmapCard roadmapId={roadmap.roadmap_id}/>
            </div>)}
            <div className="col-sm-6">
                <RoadmapCard roadmapId={null}/>
            </div>
        </div>

        <div className="w-100 p-3 pt-5">
            <p>
                <strong>Explore the Future of Infrastructure Integration:</strong>&nbsp;
                Interested in contributing to the development of new infrastructure roadmaps? We invite you to explore
                the possibilities of integrating new and novel infrastructure types. Open an&nbsp;
                <Link to="https://access-ci.atlassian.net/servicedesk/customer/portal/2/group/3/create/32"
                      className="btn btn-link">ACCESS Integration and Operation Support Request</Link>&nbsp;
                to start a conversation. Together, we can advance research and innovation in
                cyberinfrastructure.
            </p>
        </div>

        <div className="w-100 p-3 pt-5">
            <h2>Integration Roadmaps Framework Participation</h2>
            <p>
                ACCESS projects contribute to the Integration Roadmaps Framework by participating in the ACCESS
                Integration Roadmaps Working Group where they develop, document, review, and release tasks and emerging
                roadmaps.
            </p>
        </div>

    </div>
}