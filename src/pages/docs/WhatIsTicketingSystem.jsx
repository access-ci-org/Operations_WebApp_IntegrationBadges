import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useEffect} from "react";
import {DocumentationRouteUrls} from "./DocumentationRoute.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import BadgeIcon from "../../components/badge/BadgeIcon.jsx";
import {WhyBecomeAnRPFooter} from "./WhyBecomeAnRP.jsx";

export default function WhatIsTicketingSystem() {

    const questions = [
        {
            "title": "I already have a Jira/Atlassian account—what should I do?",
            "description": <p>
                If you already have an Atlassian account, you can use the email associated with that account for ACCESS.
                Provide that email, and we'll link it to the project so you can start submitting tickets.
            </p>,
            "icon": <i className="bi bi-check-circle text-success"></i>
        },
        {
            "title": "I don't have an Atlassian account—what should I do?",
            "description": <p>
                If you don't have an account, we will create one for you and add you to the project. This will give you
                access to the ticketing system so you can submit and track requests.
            </p>,
            "icon": <i className="bi bi-person-plus text-success"></i>
        },
        {
            "title": "How do I submit a ticket?",
            "description": <p>
                Once your account is set up, you can submit requests through the&nbsp;
                <Link className="btn btn-link fw-normal" to="">ACCESS Help Desk</Link>
                . You must be logged
                into Atlassian/Jira Service Management to access the RP form. This system allows the ACCESS team to
                manage your requests efficiently and provide updates as needed.
            </p>,
            "icon": <i className="bi bi-send text-success"></i>
        },
        {
            "title": "How can I learn more about ACCESS or Jira Service Management?",
            "description": <p>
                Detailed guides and documentation are available on Confluence. You will need to be logged into
                Atlassian/Confluence to view them. These resources cover everything from navigation to ticket submission
                and workflow details.
            </p>,
            "icon": <i className="bi bi-book text-success"></i>
        },
        {
            "title": "When will I get access as a new Resource Provider?",
            "description": <p>
                Access is granted during the integration process. You can track your progress via the Integration
                Dashboard, and once your account is active, you'll be ready to submit tickets and manage your resources.
            </p>,
            "icon": <i className="bi bi-clock text-success"></i>
        }
    ];

    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1>
                What is a Ticketing System & How do I Open a Jira/Atlassian Account?
            </h1>
            <div className="w-100 fw-bold fst-italic fs-5 text-medium mb-5">
                Get Connected. Stay Supported. Manage Your Resources with Ease
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <p>
                        A ticketing system is a tool used to submit, track, and manage requests or issues related to
                        your resources in ACCESS. It ensures that questions, requests, and updates are handled
                        efficiently by the ACCESS team. In ACCESS, the ticketing system is part of&nbsp;
                        <strong>Jira Service Management (an Atlassian product).</strong>
                    </p>
                </div>
            </div>
        </div>

        <div className="w-100 p-3 mt-3">
            <h4 className="fst-italic fw-bold text-medium fs-5 mb-5">
                Ticketing-Related Questions
            </h4>

            {questions.map((question, questionIndex) => {
                return <div className="w-100 pb-4" key={questionIndex}>
                    <div className="w-100 border border-1 rounded-3 p-3">
                        <div className="w-100 d-flex flex-row mb-4">
                            <div className="p-1">
                                <div
                                    className="text-center bg-light rounded-2 align-content-center"
                                    style={{width: 35, height: 35}}>
                                    {question.icon}
                                </div>
                            </div>
                            <div className="p-1">
                                <div
                                    className="text-center bg-medium align-content-center small"
                                    style={{width: 25, height: 25, borderRadius: "50%"}}>
                                    {questionIndex + 1}</div>
                            </div>
                            <div className="flex-fill ps-2">
                                <h5 className="align-content-center">{question.title}</h5>
                                <div>{question.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>

        <WhyBecomeAnRPFooter/>

    </div>
}