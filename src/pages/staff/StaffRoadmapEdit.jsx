import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {StaffRouteUrls} from "../pages-config.js";
import {useEffect, useState} from "react";
import StaffRoadmapEditDetails from "../../components/staff/roadmap-edit/StaffRoadmapEditDetails.jsx";
import StaffRoadmapEditAssociateBadges
    from "../../components/staff/roadmap-edit/StaffRoadmapEditAssociateBadges.jsx";
import StaffRoadmapEditReviewAndEdit
    from "../../components/staff/roadmap-edit/StaffRoadmapEditReviewAndEdit.jsx";
import {scrollToTop} from "../../components/util/scroll.jsx";
import EditProgressMarker from "../../components/staff/EditProgressMarker.jsx";
import {useDialogs} from "../../contexts/DialogContext.jsx";
import {IntegrationRoles} from "../../contexts/constants.js";
import {useEffectWithErrorHandling} from "../../components/util/useEffectWithErrorHandling.js";
import StaffMultiStepForm from "../../components/staff/StaffMultiStepForm.jsx";

export default function StaffRoadmapEdit() {
    const {roadmapId} = useParams();

    const navigate = useNavigate();
    const {fetchRoadmap, getRoadmap} = useRoadmaps();
    const roadmap = getRoadmap({roadmapId});

    let initialData;
    if (roadmap) initialData = JSON.parse(JSON.stringify(roadmap));

    const {processing, error, reload} = useEffectWithErrorHandling(async () => {
        !!roadmapId && await fetchRoadmap({roadmapId})
            .catch((e) => {
                navigate(StaffRouteUrls.INDEX);
                throw e;
            });
    }, [roadmapId]);

    return <LoadingBlock processing={processing} error={error} reload={reload} className="w-100 p-5 text-center">
        <StaffRoadmapEditForm key={roadmapId} initialData={initialData}/>
    </LoadingBlock>
}

const StaffRoadmapEditFormStep = {
    DESCRIBE_ROADMAP: "describe-roadmap",
    ASSOCIATE_BADGES: "associate-badges",
    REVIEW: "review"
};

function StaffRoadmapEditForm({initialData}) {
    const navigate = useNavigate();

    const {roadmapId} = useParams();

    const {setRoadmap} = useRoadmaps();
    const {showDialog, showErrorDialog} = useDialogs();

    const [activeStep, setActiveStep] = useState(
        roadmapId ?
            StaffRoadmapEditFormStep.REVIEW :
            StaffRoadmapEditFormStep.DESCRIBE_ROADMAP);

    const [roadmapData, setRoadmapData] = useState({
        "name": "",
        "executive_summary": "",
        "infrastructure_types": "",
        "integration_coordinators": "",
        "status": "Draft",
        "graphic": "",
        "badges": [
            // {
            //     "sequence_no": 0,
            //     "required": true,
            //     "badge_id": 1
            // }
        ],
        ...initialData
    });

    const areRoadmapDetailsValid = roadmapData.name.trim().length > 0
        && roadmapData.executive_summary.trim().length > 0
        && roadmapData.infrastructure_types.trim().length > 0
        && roadmapData.integration_coordinators.trim().length > 0
        && roadmapData.status.trim().length > 0;

    useEffect(() => {
        scrollToTop();
    }, [activeStep]);


    let stepDetailsMap = {
        [StaffRoadmapEditFormStep.DESCRIBE_ROADMAP]: {
            label: "Describe the Roadmap",
            isValid: areRoadmapDetailsValid,
            component: <StaffRoadmapEditDetails roadmapData={roadmapData} setRoadmapData={setRoadmapData}/>
        },
        [StaffRoadmapEditFormStep.ASSOCIATE_BADGES]: {
            label: "Associate Badges",
            isValid: areRoadmapDetailsValid,
            component: <StaffRoadmapEditAssociateBadges roadmapData={roadmapData} setRoadmapData={setRoadmapData}/>
        },
        [StaffRoadmapEditFormStep.REVIEW]: {
            label: "Review & Edit",
            isValid: areRoadmapDetailsValid,
            component: <StaffRoadmapEditReviewAndEdit
                roadmapData={roadmapData} setRoadmapData={setRoadmapData}
                onClickEditBadges={setActiveStep.bind(this, StaffRoadmapEditFormStep.ASSOCIATE_BADGES)}/>
        }
    };

    let steps;
    if (!roadmapId) {
        steps = [StaffRoadmapEditFormStep.DESCRIBE_ROADMAP];
    } else {
        steps = [];
    }

    steps = [
        ...steps,
        StaffRoadmapEditFormStep.ASSOCIATE_BADGES,
        StaffRoadmapEditFormStep.REVIEW
    ];

    const publishRoadmap = async () => {
        try {
            const newRoadmap = await setRoadmap({roadmapId, roadmapData});

            navigate(StaffRouteUrls.ROADMAP_EDIT.replace(":roadmapId", newRoadmap.roadmap_id));

            await showDialog({
                variant: 'primary',
                title: "",
                icon: "bi-check-circle",
                message: <div>The Roadmap “{newRoadmap.name}” is Successfully Published.</div>,
                buttons: [
                    {
                        label: "Go to Home Page",
                        answer: false,
                        className: "btn btn-outline-primary",
                        to: StaffRouteUrls.INDEX
                    },
                    {label: "Go to Roadmaps", answer: false, className: "btn btn-primary", to: StaffRouteUrls.ROADMAPS},
                ]
            });
        } catch (error) {
            await showErrorDialog({
                error: error,
                roles: [IntegrationRoles.ROADMAP_MAINTAINER]
            });
        }
    };

    return <div className="container">
        <div className="row mt-2 p-3">
            <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                <StaffMultiStepForm steps={steps} onPublish={publishRoadmap}
                                    onExit={() => navigate(StaffRouteUrls.ROADMAPS)}
                                    activeStep={activeStep} setActiveStep={setActiveStep}
                                    getStepDetails={(step) => stepDetailsMap[step]}/>
            </div>
        </div>
    </div>
}

