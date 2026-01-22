import Accordion from 'react-bootstrap/Accordion';
import {Link} from "react-router-dom";
import {DocumentationRouteUrls} from "./DocumentationRoute.jsx";

export default function WhyBecomeAnRP() {

    const keyQuestions = [{
        "title": <>
            <strong>Why</strong> should I <br/>
            <strong>integrate my</strong> <br/>
            <strong>resource</strong> with <br/>
            ACCESS?
        </>,
        "icon": <i className="bi bi-rocket-takeoff-fill fs-1 text-medium"></i>,
        "description": "Learn how contributing your resource supports the national research community, expands your visibility, and opens opportunities for collaboration and program support.",
        "link": DocumentationRouteUrls.WHY_INTEGRATE_RESOURCES
    }, {
        "title": <>
            How do I <br/>
            <strong>integrate</strong> my <br/>
            resource <strong>into</strong> <br/>
            <strong>ACCESS?</strong>
        </>,
        "icon": <i className="bi bi-stack fs-1 text-medium"></i>,
        "description": "Understand the process, what’s expected, and how our team supports you every step of the way.",
        "link": DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE
    }, {
        "title": <>
            What is an <br/>
            <strong>Integration</strong> <br/>
            Roadmap and how <br/>
            do I <strong>choose the</strong> <br/>
            <strong>right one?</strong>
        </>,
        "icon": <i className="bi bi-gear fs-1 text-medium"></i>,
        "description": "Find out how roadmaps structure the integration process and help you select the path that fits your system.",
        "link": DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP
    }, {
        "title": <>
            What is a <strong>ticketing</strong> <br/>
            <strong>system</strong> and how do <br/>
            <strong>I open a Jira/</strong> <br/>
            <strong>Atlassian</strong> <br/>
            <strong>account?</strong>
        </>,
        "icon": <i className="bi bi-rocket-takeoff-fill fs-1 text-medium"></i>,
        "description": "Learn how to access the ticketing system and set up your account to submit requests and support national research efforts.",
        "link": "/docs/"
    }];

    const additionalQuestions = [
        {
            "title": "What are the requirements to become a Resource Provider?",
            "description": "To become an ACCESS Resource Provider, your resource must support research or education, meet baseline cybersecurity and reliability standards, and be capable of interoperating with ACCESS systems. You’ll follow an Integration Roadmap that outlines technical and operational milestones. If you’d like to speak with someone before getting started, submit a ticket here to connect with our team.",
        },
        {
            "title": "How long does the integration process take?",
            "description": "The timeline varies based on the complexity of your resource and the roadmap selected. Simple integrations may take a few weeks, while more advanced or customized resources could take longer.",
        },
        {
            "title": "Do I need a dedicated technical team to integrate my resource?",
            "description": "You don’t need a dedicated technical team to complete the integration process. While some tasks within certain badges may require technical expertise (such as system configuration or API integration), others may be administrative or operational and can be handled by different members of your team. Resource provider leadership have the flexibility to assign tasks based on your team’s capacity and areas of expertise. Many Resource Providers successfully integrate with ACCESS using small or part-time teams, and our onboarding support is available throughout the process to assist as needed.",
        },
        {
            "title": "Can I talk to someone before I start the integration process?",
            "description": "Yes, if you’re considering becoming a Resource Provider and have questions, we encourage you to reach out early. Our team is available to answer questions, help you understand the integration options, and guide you in selecting the roadmap and badges that make the most sense for your resource. To connect with us, simply submit a ticket here.",
        },
        {
            "title": "What kind of support will I receive during onboarding?",
            "description": "We provide hands-on support throughout the onboarding process. This includes access to detailed documentation, guidance on choosing and completing badges, and help from technical and programmatic staff familiar with ACCESS integration. Whether you're working through a technical task or need help planning your roadmap, we’re here to support you at every step.",
        },
        {
            "title": "What happens after I integrate my resource?",
            "description": "Once your resource is integrated, it becomes part of the national ACCESS ecosystem and is made available to researchers through standardized interfaces. You’ll continue to receive support as needed, including visibility into usage metrics, opportunities for collaboration, and access to future updates and community events. You’ll also be able to modify or add new badges later as your resource evolves.",
        },
        {
            "title": "Is there a cost or funding requirement to become an RP?",
            "description": "There is no fee to become a Resource Provider within ACCESS. The program is fully funded by the National Science Foundation (NSF), and integration is supported as part of this national effort to advance research cyberinfrastructure. In fact, joining ACCESS can increase your visibility, open doors to future funding opportunities, and foster partnerships across the research community. If you’re interested in how participation might align with your organization’s goals, we’re happy to discuss further. Just submit a ticket here.",
        },
        {
            "title": "What if my resource doesn’t fit neatly into one of the existing roadmaps?",
            "description": "That’s completely okay. We understand that not all resources are the same, and our existing roadmaps may not cover every use case. One of ACCESS’s goals is to expand the types of research infrastructure available to researchers. If your resource doesn’t align with one of the current integration pathways, we’ll work closely with you to adapt or co-develop a roadmap that fits your specific needs and goals. Our team is here to ensure your integration journey is both effective and meaningful, regardless of where you’re starting from.",
        }
    ];

    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1 className="mb-4">Become a Resource Provider (RP)</h1>
            <p className="mb-5">
                Resource Providers (RPs) are at the center of ACCESS, making research possible for the diverse community
                ACCESS serves. Our providers share cyberinfrastructure resources and their expertise with the
                researchers and scientists who request allocations. This symbiotic relationship, supported by other
                areas of the program, makes scientific discoveries happen.
            </p>
            <p className="fst-italic">
                This page will help you understand what it means to be an RP, why it matters, and how to get started.
            </p>
        </div>

        <div className="w-100 p-3">
            <h2>How Can We Assist You?</h2>
            <p>
                Explore clear, step-by-step answers to the most common questions new RPs have. If you don’t see what you
                need, we’re here and happy to help. Scroll down and open a help ticket!
            </p>
        </div>

        <div className="row p-3">
            <div className="w-100">
                <h3 className="text-black fw-normal fst-italic">Key Questions to Get Your Started</h3>
            </div>
            {keyQuestions.map((keyQuestion, keyQuestionIndex) =>
                <div className="col p-3" key={keyQuestionIndex} style={{minWidth: 270, maxWidth: 270}}>
                    <div className="w-100 h-100 border border-dark p-4 border-1 rounded-3 box-shadow-0-4-4-0">
                        {keyQuestion.icon}
                        <Link className="w-100 btn btn-link text-medium text-center text-decoration-none fs-5 fw-normal"
                              to={keyQuestion.link} style={{height: 170}}>
                            {keyQuestion.title}
                        </Link>
                        <p className="mb-0 text-gray-600 text-center small">{keyQuestion.description}</p>
                    </div>
                </div>)}
        </div>

        <div className="w-100 p-3 pt-5">
            <div className="w-100 mb-3">
                <h3 className="text-black fw-normal fst-italic">Additional Questions That Might Help</h3>
            </div>
            <Accordion defaultActiveKey={[]}>
                {additionalQuestions.map((additionalQuestion, additionalQuestionIndex) =>
                    <Accordion.Item eventKey={additionalQuestionIndex} key={additionalQuestionIndex}>
                        <Accordion.Header>{additionalQuestion.title}</Accordion.Header>
                        <Accordion.Body>
                            <p className="fs-6">{additionalQuestion.description}</p>
                        </Accordion.Body>
                    </Accordion.Item>)}
            </Accordion>
        </div>

        <div className="row p-3 pt-5 justify-content-center">
            <div className="col">
                <div className="h-100 p-5 rounded-2 border border-light box-shadow-0-4-4-0 d-flex flex-column">
                    <div className="flex-fill">
                        <div className="d-flex flex-row mb-4">
                            <i className="bi bi-chat-left fs-1 text-black"></i>
                            <h3 className="flex-fill text-start align-content-center ps-4">Still have questions?</h3>
                        </div>
                        <p className="mb-5 fs-6">
                            Can’t find the answer you’re looking for? Our support team is ready to help you with any
                            questions or concerns.
                        </p>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-primary btn-lg rounded-2 mt-2" to="/docs">Open Help Ticket</Link>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="h-100 p-5 rounded-2 border border-light box-shadow-0-4-4-0 d-flex flex-column">
                    <div className="flex-fill">
                        <div className="d-flex flex-row mb-4">
                            <i className="bi bi-rocket-takeoff fs-1 text-black"></i>
                            <h3 className="flex-fill text-start align-content-center ps-4">Ready to get started?</h3>
                        </div>
                        <p className="mb-5 fs-6">
                            Start integrating your resources and unlock the full potential of our platform.
                        </p>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-dark btn-lg rounded-2 mt-2" to="/docs">Start Integration</Link>
                    </div>
                </div>
            </div>
        </div>

    </div>
}
