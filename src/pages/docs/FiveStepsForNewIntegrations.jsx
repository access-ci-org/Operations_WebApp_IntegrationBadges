import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"

export default function FiveStepsForNewIntegrations() {
    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1>
                Integration Process is <br/>
                Simple and Intuitive!
            </h1>
        </div>
        <div className="row pt-5 p-3">
            <div className="col-md-4">
                <h2 className="pb-3">
                    Five Simple Stages
                </h2>
                <p className="">
                    The process kicks off with a registration. From there, you’ll choose the roadmaps you want to
                    integrate with and specify the badges your team plans to work on. You will then finalize the process
                    by submitting the completed badges for concierge verification. Don’t worry—we’ve got you covered
                    every step of the way! Our concierge team is here to guide you and ensure everything runs smoothly.
                </p>
            </div>
            <div className="col-md-8 ps-5 pe-5 pt-3">
                <img className="w-100" alt="Five steps for new resource integraiton"
                     src={fiveStepsForNewIntegrationsPng}/>
            </div>
        </div>
        <div className="w-100 p-3 pt-5">
            <strong className="text-black d-block">Ready to start the process? </strong>
            <Link className="btn btn-dark rounded-2 mt-2"
                  to="https://operations.access-ci.org/open-new-integration-request">
                Register Your Resource</Link>
        </div>
        <div className="w-100 p-3 pt-5">
            <div className="w-100">
                <h3 className="d-inline">REMINDER</h3>
                <i className="d-inline ps-3 pe-3  text-yellow fs-3 bi bi-megaphone-fill"></i>
            </div>
            <p className="ps-5 pt-3 text-medium">
                Once registration is complete, be sure to return to your integration dashboard in ACCESS to continue the
                process. Once your resource is registered, it will appear in your integration dashboard, where you'll
                find guidance on the next steps.
            </p>
        </div>

    </div>
}