export default function WhyIntegrateResources() {

    const benefits = [
        {
            "title": "Reach a National Research Community",
            "description": <p>
                Integrating your resource immediately increases its visibility. Researchers across the U.S. discover,
                request, and use your system through a unified national platform, creating more opportunities for
                collaboration and scientific contribution.
            </p>,
            "explanations": [
                <span>Higher utilization and impact of your resource</span>,
                <span>Broader recognition of your center or institution</span>,
                <span>Increased engagement with new disciplines and scientific domains</span>
            ]
        },
        {
            "title": "Join a Connected, Collaborative Ecosystem",
            "description": <p>
                ACCESS is designed to bring RPs together. By integrating, you become part of a network that shares best
                practices, expertise, and collective problem-solving.
            </p>,
            "explanations": [
                <span>Access to a community of technical and operational peers</span>,
                <span>Opportunities to contribute to national CI innovation</span>,
                <span>Shared learning across diverse resource types</span>
            ]
        },
        {
            "title": "Benefit from Standardized Interfaces & Common Services",
            "description": <p>
                ACCESS roadmaps and integration tools reduce the complexity of supporting nationwide users. You
                integrate once, then rely on shared services for allocations, identity management, accounting, metrics,
                user support, and more.
            </p>,
            "explanations": [
                <span>Less time building custom workflows</span>,
                <span>Fewer administrative burdens</span>,
                <span>More consistency and reliability for your users</span>
            ]
        },
        {
            "title": "Receive Dedicated Support Throughout the Process",
            "description": <p>
                The ACCESS Concierge Team works directly with you during onboarding and beyond. You’ll have access to
                guidance, documentation, training, and personalized help whenever you need it.
            </p>,
            "explanations": [
                <span>A clear, guided integration experience</span>,
                <span>Troubleshooting support at any stage</span>,
                <span>Confidence that your resource meets requirements</span>
            ]
        },
        {
            "title": "Potential Funding Opportunities",
            "description": <p>
                RPs may have access to funding opportunities connected to program participation, evaluation, or new
                initiatives within ACCESS.
            </p>,
            "explanations": [
                <span>Possibility of offsetting operational or integration costs</span>,
                <span>Opportunities to grow your resource or expand capacity</span>
            ]
        }
    ];

    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1>
                Why Should I Integrate My Resource With ACCESS?
            </h1>
            <div className="w-100 fw-bold fst-italic fs-5 text-medium mb-5">
                Empower Your Resource. Expand Your Impact. Join the ACCESS Community.
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <p>
                        Integrating your resource with ACCESS connects you to a national ecosystem of researchers,
                        educators, cyberinfrastructure experts, and program partners. As a Resource Provider (RP), you
                        play a central role in supporting cutting-edge science while enhancing the reach, visibility,
                        and value of your own infrastructure.
                        Whether you operate a compute cluster, cloud platform, storage environment, or domain-specific
                        service, ACCESS helps ensure your resource has real impact in the research community.
                    </p>
                </div>
            </div>
        </div>

        <div className="w-100 p-3 mt-3">
            <h4 className="fst-italic fw-bold text-medium fs-5 mb-5">
                Benefits of Becoming an ACCESS Resource Provider
            </h4>

            {benefits.map((benefit, benefitIndex) => {
                const explanationBlockClass = benefitIndex % 2 === 0 ? "bg-dark text-white" : "bg-light";

                return <div className="w-100 p-2 pb-5" key={benefitIndex}>
                    <div className="w-100 border border-1 rounded-3 p-5">
                        <div className="w-100 d-flex flex-row mb-4">
                            <div>
                                <div
                                    className="border border-black border-1 text-center align-content-center coming-soon-regular"
                                    style={{width: 40, height: 40, borderRadius: "50%"}}>
                                    {benefitIndex + 1}</div>
                            </div>
                            <h5 className="flex-fill text-medium align-content-center ps-3 m-0">{benefit.title}</h5>
                        </div>
                        <div className="text-medium">{benefit.description}</div>
                        <div
                            className={"w-100 p-3 mt-4 rounded-3 border border-1 " + explanationBlockClass}>
                            <h6 className={"fw-bold " + explanationBlockClass}>What this means for you:</h6>
                            <ul>
                                {benefit.explanations.map((explanation, explanationIndex) =>
                                    <li key={explanationIndex}>{explanation}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            })}
        </div>


        <div className="w-100 p-3 mt-3">
            <div className="border-bottom border-medium border-1 ms-5 me-5 mb-5"></div>
            <h4 className="fst-italic fw-bold text-medium fs-5 mb-3">
                Examples of Visibility & Engagement Opportunities
            </h4>
            <div className="w-100 lh-lg">
                <ul>
                    <li>Highlighted placement in the ACCESS Resource Catalog</li>
                    <li>Opportunities to be featured in ACCESS communications or community events</li>
                    <li>Exposure to educators developing classroom and training experiences</li>
                </ul>
            </div>
            <div className="border-bottom border-medium border-1 ms-5 me-5 mt-5 mb-5"></div>
        </div>

    </div>
}
