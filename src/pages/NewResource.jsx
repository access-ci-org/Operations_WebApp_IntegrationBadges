import fiveStepsForNewResourceIntegrationImage from './docs/assets/five-steps-for-new-resource-integration.png'

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function NewResource() {

    return <div class="container">
        <div class="row">
            <h1>Integration Process is Simple and Intuitive!</h1>
        </div>
        <div class="row pt-5">
            <div class="col-sm-6">
                <h2>Five Simple Stages</h2>
                <p>
                    The process kicks off with a registration. From there, you’ll choose the roadmaps you want to
                    integrate with and specify the badges your team plans to work on. You will then finalize the process
                    by submitting the completed badges for concierge verification. Don’t worry—we’ve got you covered
                    every step of the way! Our concierge team is here to guide you and ensure everything runs smoothly.
                </p>
            </div>
            <div class="col-sm-6 ps-5 pe-5 pt-3">
                <img class="w-100" alt="Five steps for new resource integraiton"
                     src={fiveStepsForNewResourceIntegrationImage}/>
            </div>
        </div>
        <div class="w-100 pt-5">
            <strong class="text-black d-block">Ready to start the process? </strong>
            <a href="#" class="btn btn-medium rounded-2 mt-2">Register Your Resource in CiDeR</a>
        </div>
        <div class="w-100 pt-5">
            <div>
                <h3 class="d-inline">REMINDER </h3>
                <div class="d-inline ps-3 pe-3  text-yellow fs-3">
                    <i class="bi bi-megaphone-fill"></i>
                </div>
            </div>
            <p class="ps-5 pt-3 text-medium">
                CiDeR is an external system where you will register your resource. Once registration is complete, be
                sure to return to your integration dashboard in ACCESS to continue the process. Once your resource is
                registered in CiDeR, it will appear in your integration dashboard, where you'll find guidance on the
                next steps.
            </p>
        </div>
    </div>
}