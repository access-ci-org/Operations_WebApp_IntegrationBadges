import EditProgressMarker from "./EditProgressMarker.jsx";

export default function StaffMultiStepForm({steps, activeStep, setActiveStep, onExit, onPublish, getStepDetails}) {
    const activeStepIndex = steps.indexOf(activeStep);
    const stepDetails = getStepDetails(activeStep);

    const firstStep = steps[0];
    const lastStep = steps[steps.length - 1];

    const isFirstStep = activeStep === firstStep;
    const isLastStep = activeStep === lastStep;

    const handleBack = () => {
        if (isFirstStep) {
            if (onExit) onExit();
        } else {
            setActiveStep(steps[activeStepIndex - 1]);
        }
    };

    const handleNext = () => {
        if (isLastStep) {
            if (onPublish) onPublish();
        } else {
            setActiveStep(steps[activeStepIndex + 1]);
        }
    };

    return <div className="w-100 p-5">

        <h1 className="w-100 text-center text-dark fw-normal pt-5 pb-3">{stepDetails.label}</h1>

        <div className="row pt-5 pb-5">
            <div className="col-lg-3 col-md-1 col-sm-12"></div>
            <div className="col pb-2">
                <EditProgressMarker steps={steps} current={activeStepIndex}/>
            </div>
            <div className="text-end col-lg-3 col-md-2 col-sm-3">
                <button className="btn btn-outline-secondary">Cancel/Discard</button>
            </div>
        </div>

        <div className="w-100 text-center">
            <div className="w-100 d-inline-block text-start" style={{maxWidth: 800, minWidth: 300}}>
                {stepDetails.component}
            </div>
        </div>

        <div className="w-100 text-end pt-5 pb-5">
            <button className="btn btn-outline-primary ps-3 pe-3 m-1"
                    onClick={handleBack}>
                Back
            </button>

            <button className="btn btn-primary ps-3 pe-3 m-1"
                    onClick={handleNext}
                    disabled={!stepDetails.isValid}>
                {isLastStep ? "Publish" : "Continue"}
            </button>
        </div>
    </div>
}
