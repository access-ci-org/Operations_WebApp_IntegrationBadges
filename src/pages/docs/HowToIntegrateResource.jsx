import {Link} from "react-router-dom";
import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useEffect} from "react";
import {DocumentationRouteUrls} from "./DocumentationRoute.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import BadgeIcon from "../../components/badge/BadgeIcon.jsx";
import {WhyBecomeAnRPFooter} from "./WhyBecomeAnRP.jsx";

export default function HowToIntegrateResource() {

    const {fetchRoadmaps, getRoadmaps} = useRoadmaps();
    const {fetchBadges, getBadges} = useBadges();

    useEffect(() => {
        fetchRoadmaps();
        fetchBadges();
    }, []);

    const roadmaps = getRoadmaps();
    const badges = getBadges();

    const highlightedFeatures = [
        {
            "title": <>
                <span className="text-primary">Secure</span><br/>
                <span className="text-medium">Verified Process</span>
            </>,
            "icon": <i className="bi bi-shield"></i>
        },
        {
            "title": <>
                <span className="text-primary">Supported</span><br/>
                <span className="text-medium">Concierge Team</span>
            </>,
            "icon": <i className="bi bi-people"></i>
        },
        {
            "title": <>
                <span className="text-primary">Efficient</span><br/>
                <span className="text-medium">Streamlined Workflow</span>
            </>,
            "icon": <i className="bi bi-lightning-charge"></i>
        }
    ];

    const gettingStartedSections = [
        {
            "title": "Start a New Integration",
            "icon": <i className="bi bi-stars"></i>,
            "body": <p>
                Click "Start Integration" on the home page to get started immediately.
            </p>
        },
        {
            "title": "Integration Dashboard",
            "icon": <i className="bi bi-bar-chart-line"></i>,
            "body": <p>
                Navigate to the “Integration Dashboard” to access full control and manage your institution’s resources.
                Select your institution name, then go to the “New Integrations” tab to create a new integration.
            </p>
        }
    ];

    const workflowSteps = [
        {
            "title": "Register Your Organization and Resource",
            "body": <p>
                If your organization is new to ACCESS, start by registering it, then register the
                resource you plan to integrate. If your organization is already in the system, simply
                register the new resource. The registration process is quick and requires only essential
                information, which you’ll provide via a short Jira ticket.
                <br/><br/>
                Once submitted, the ACCESS Concierge Team will review your entry and get back to you
                with the details. After approval, your new resource will automatically appear on your
                Integration Dashboard, where you can proceed to the next step.
            </p>
        },
        {
            "title": "Choose an Integration Roadmap",
            "body": <div>
                <p>
                    Once your resource appears on your dashboard, you’ll see a list of roadmaps compatible with your
                    resource type. Select the roadmap that matches your system to begin the process and proceed to Step
                    3. Each roadmap breaks the process into a clear sequence of badges, grouped sets of tasks that guide
                    your team through integration.&nbsp;
                    <strong>Current Roadmaps</strong> include:
                </p>
                <div className="row">
                    {roadmaps.slice(0, 6).map((roadmap, roadmapIndex) =>
                        <div className="col-sm-6 p-2" key={roadmapIndex}>
                            <Link to={`${DocumentationRouteUrls.ROADMAPS}?roadmapId=${roadmap.roadmap_id}`}
                                  className="w-100 btn btn-dark rounded-2">{roadmap.name}</Link>
                        </div>)}
                </div>
            </div>
        },
        {
            "title": "Select Your Resource-Specific Badges",
            "body": <div>
                <p>
                    Within your chosen roadmap, you’ll see a set of badges related to technical setup, security, user
                    onboarding, documentation, operations, and more. Some badges are required and some are recommended.
                    Required badges are pre-selected by default, and you can choose additional badges based on your
                    resource’s specific needs.
                    <br/><br/>
                    Each badge includes clear instructions, links, and examples to guide you.
                </p>
                <div className="w-100">
                    {badges.slice(0, 2).map((badge, badgeIndex) =>
                        <div className="d-inline-block p-2" key={badgeIndex}>
                            <Link to={`${DocumentationRouteUrls.BADGES}?badgeId=${badge.badge_id}`}>
                                <BadgeIcon badgeId={badge.badge_id}/>
                            </Link>
                        </div>)}
                </div>
            </div>
        },
        {
            "title": "Complete Your Badges",
            "body": <div>
                <p>Each badge represents a focused, achievable milestone. As you work through your badges:</p>
                <div className="w-100 pb-2 pt-2">
                    <div className="bg-dark p-2 rounded-2 d-flex flex-row width-fit-content">
                        <i className="bi bi-check-circle me-2 text-info"></i>
                        <span className="flex-fill">Follow the step-by-step tasks</span>
                    </div>
                </div>
                <div className="w-100 pb-4">
                    <div className="bg-dark p-2 rounded-2 d-flex flex-row width-fit-content">
                        <i className="bi bi-check-circle me-2 text-info"></i>
                        <span className="flex-fill">Mark badges as complete in the dashboard</span>
                    </div>
                </div>
                <p> Your progress is visible both to your internal team and the ACCESS Concierge Team.</p>
            </div>
        },
        {
            "title": "Submit Badges for Verification",
            "body": <div>
                <p>
                    When a badge is ready, submit it for verification. The ACCESS team will review your work to ensure
                    everything is set up correctly. Once badges are verified, your resource is fully integrated into
                    ACCESS.
                </p>
                <div className="w-100 pb-4">
                    <div className="bg-dark p-2 rounded-2 text-start d-flex flex-row width-fit-content">
                        <i className="bi bi-chat me-2 text-info"></i>
                        <span className="flex-fill">You are never alone during this step. The concierge team is
                            available to answer questions and provide guidance for a successful integration.</span>
                    </div>
                </div>
            </div>
        }
    ];

    const outcomes = [
        "It becomes discoverable to the national research community",
        "You receive support for ongoing operations",
        "You gain access to usage metrics, user activity insights, and support workflows",
        "You participate in the broader RP community"
    ];

    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1>
                How Do I Integrate My Resource into ACCESS?
            </h1>
            <div className="w-100 fw-bold fst-italic fs-5 text-medium mb-5">
                A Guided Step-by-Step Path to Integration
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <p className="">
                        Integrating your resource with ACCESS is designed to be clear, structured, and supported at
                        every stage. You don’t need to figure it out alone, our Integration Roadmaps, badges, and
                        concierge support make the process manageable for teams of all sizes. The integration process
                        includes only&nbsp;
                        <strong>five simple steps!</strong>
                    </p>
                </div>
                <div className="col-sm-6 text-center">
                    <div className="h-100 bg-white background-image-center-no-repeat"
                         style={{backgroundImage: `url(${fiveStepsForNewIntegrationsPng})`, minHeight: 100}}>
                    </div>
                </div>
            </div>

            <div className="row pt-5">
                {highlightedFeatures.map((highlightedFeature, highlightedFeatureIndex) =>
                    <div className="col d-flex flex-row" style={{minWidth: 240, maxWidth: 240}}>
                        <div className="p-1">
                            <div className="bg-dark text-center align-content-center rounded-3"
                                 style={{width: 35, height: 35}}>
                                {highlightedFeature.icon}
                            </div>
                        </div>
                        <p className="flex-fill ps-2 pe-2">
                            {highlightedFeature.title}
                        </p>
                    </div>)}
            </div>
        </div>

        <div className="w-100 p-3 mt-5">
            <div className="w-100 d-flex flex-row">
                <hr className="flex-fill"/>
                <h3 className="text-uppercase fs-5 ps-2 pe-2 m-0 align-content-center">Getting Started</h3>
                <hr className="flex-fill"/>
            </div>
            <p className="w-100 pt-5 pb-5">
                Visit the&nbsp;
                <Link className="btn btn-link" to="https://access-ci.org/get-started/for-resource-providers/">RP home
                    page</Link>
                , where you’ll have two paths to choose from to start the integration process:
            </p>

            <div className="row">
                {gettingStartedSections.map((gettingStartedSection, gettingStartedSectionIndex) =>
                    <div className="col-sm-6" key={gettingStartedSectionIndex}>
                        <div className="h-100 p-4 rounded-3 border border-1 border-black">
                            <div className="d-flex flex-row">
                                <div className="bg-dark text-center align-content-center rounded-3"
                                     style={{width: 35, height: 35}}>
                                    {gettingStartedSection.icon}
                                </div>
                                <h4 className="flex-fill align-content-center m-0 ps-3">
                                    {gettingStartedSection.title}
                                </h4>
                            </div>
                            <div className="pt-4 pb-4">
                                {gettingStartedSection.body}
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>

        <div className="w-100 p-3 mt-5">
            <h4 className="fst-italic fw-light fs-2 text-center mb-5">
                Both paths guide you into the same streamlined workflow.
            </h4>

            {workflowSteps.map((workflowStep, workflowStepIndex) =>
                <div className="w-100 ps-5 pe-5 d-flex flex-row" key={workflowStepIndex}>
                    <div className="d-flex flex-column">
                        <div>
                            <div className="bg-dark text-center align-content-center rounded-3"
                                 style={{width: 35, height: 35}}>
                                {workflowStepIndex + 1}
                            </div>
                        </div>
                        <div className="flex-fill text-center">
                            <div className="h-100 bg-dark d-inline-block" style={{width: 2}}></div>
                        </div>
                    </div>
                    <div className="flex-fill ps-4 pb-4">
                        <div className="w-100 bg-light border border-1 border-black rounded-3 p-4">
                            <h5 className="mb-4">{workflowStep.title}</h5>
                            {workflowStep.body}
                        </div>
                    </div>
                </div>)}
        </div>

        <div className="w-100 p-3">
            <div className="w-100 p-4 text-start d-flex flex-row bg-dark rounded-3">
                <div>
                    <div className="bg-white bg-opacity-10 text-white text-center align-content-center rounded-3 me-2"
                         style={{width: 35, height: 35}}>
                        <i className="bi bi-stars"></i>
                    </div>
                </div>
                <div className="flex-fill">
                    <h4 className="text-white mt-1 mb-4 fw-normal align-content-center">Once your resource is integrated:</h4>

                    <div className="row">
                        {outcomes.map((outcome, outcomeIndex) =>
                            <div className="col-sm-6 p-2" key={outcomeIndex}>
                                <div
                                    className="w-100 h-100 text-start d-flex flex-row p-3 rounded-2 bg-white bg-opacity-10">
                                    <i className="bi bi-check-circle me-2 text-success"></i>
                                    <span className="flex-fill lh-sm">{outcome}</span>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>

        <WhyBecomeAnRPFooter/>
    </div>
}
