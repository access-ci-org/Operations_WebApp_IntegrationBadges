import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {StaffRouteUrls} from "../pages-config.js";
import EditProgressMarker from "../../components/staff/EditProgressMarker.jsx";
import {useEffect, useState} from "react";
import StaffBadgeEditDetails from "../../components/staff/badge-edit/StaffBadgeEditDetails.jsx";
import StaffBadgeEditAssociatePrerequisiteBadges
    from "../../components/staff/badge-edit/StaffBadgeEditAssociatePrerequisiteBadges.jsx";
import StaffBadgeEditReviewAndEdit
    from "../../components/staff/badge-edit/StaffBadgeEditReviewAndEdit.jsx";
import {scrollToTop} from "../../components/util/scroll.jsx";
import StaffBadgeEditAssociateTasks
    from "../../components/staff/badge-edit/StaffBadgeEditAssociateTasks.jsx";
import {useDialogs} from "../../contexts/DialogContext.jsx";
import {IntegrationRoles} from "../../contexts/constants.js";
import {useEffectWithErrorHandling} from "../../components/util/useEffectWithErrorHandling.js";
import StaffMultiStepForm from "../../components/staff/StaffMultiStepForm.jsx";


export default function StaffBadgeEdit() {
    const {badgeId} = useParams();

    const navigate = useNavigate();
    const {fetchBadge, getBadge} = useBadges();

    const badge = getBadge({badgeId});

    let initialData;
    if (badge) initialData = JSON.parse(JSON.stringify(badge));

    const {processing, error, reload} = useEffectWithErrorHandling(async () => {
        !!badgeId && await fetchBadge({badgeId})
            .catch((e) => {
                navigate(StaffRouteUrls.INDEX);
                throw e;
            });
    }, [badgeId]);

    return <LoadingBlock processing={processing} error={error} reload={reload} className="w-100 p-5 text-center">
        <StaffBadgeEditForm key={badgeId} initialData={initialData}/>
    </LoadingBlock>
}

const StaffBadgeEditFormStep = {
    DESCRIBE_BADGE: "describe-badge",
    ASSOCIATE_TASKS: "associate-tasks",
    PREREQUISITE_BADGES: "prerequisite-badges",
    REVIEW: "review"
};

function StaffBadgeEditForm({initialData}) {
    const navigate = useNavigate();

    const {badgeId} = useParams();

    const {setBadge} = useBadges();
    const {showDialog, showErrorDialog} = useDialogs();

    const [activeStep, setActiveStep] = useState(
        badgeId ?
            StaffBadgeEditFormStep.REVIEW :
            StaffBadgeEditFormStep.DESCRIBE_BADGE);

    const [badgeData, setBadgeData] = useState({
        "badge_id": null,
        "name": "",
        "researcher_summary": "",
        "resource_provider_summary": "",
        "verification_summary": "",
        "verification_method": "Manual",
        "default_badge_access_url": "",
        "default_badge_access_url_label": "",
        "graphic": "",
        "prerequisites": [
            // {
            //     "sequence_no": 0,
            //     "badge_id": 1
            // },
        ],
        "tasks": [
            // {
            //     "sequence_no": 0,
            //     "task_id": 1
            //     "required": false
            // },
        ],
        ...initialData
    });

    const areBadgeDetailsValid = badgeData.name.trim().length > 0
        && badgeData.researcher_summary.trim().length > 0
        && badgeData.resource_provider_summary.trim().length > 0
        && badgeData.default_badge_access_url.trim().length > 0
        && badgeData.default_badge_access_url_label.trim().length > 0;

    useEffect(() => {
        scrollToTop();
    }, [activeStep]);

    const stepDetailsMap = {
        [StaffBadgeEditFormStep.DESCRIBE_BADGE]: {
            label: "Describe the Badge",
            isValid: areBadgeDetailsValid,
            component: <StaffBadgeEditDetails badgeData={badgeData} setBadgeData={setBadgeData}/>
        },
        [StaffBadgeEditFormStep.ASSOCIATE_TASKS]: {
            label: "Associate Tasks",
            isValid: areBadgeDetailsValid,
            component: <StaffBadgeEditAssociateTasks badgeData={badgeData} setBadgeData={setBadgeData}/>
        },
        [StaffBadgeEditFormStep.PREREQUISITE_BADGES]: {
            label: "Select Prerequisite Badges",
            isValid: areBadgeDetailsValid,
            component: <StaffBadgeEditAssociatePrerequisiteBadges badgeData={badgeData}
                                                                  setBadgeData={setBadgeData}/>
        },
        [StaffBadgeEditFormStep.REVIEW]: {
            label: "Review & Edit",
            isValid: areBadgeDetailsValid,
            component: <StaffBadgeEditReviewAndEdit
                badgeData={badgeData} setBadgeData={setBadgeData}
                onClickEditTasks={setActiveStep.bind(this, StaffBadgeEditFormStep.ASSOCIATE_TASKS)}
                onClickEditPrerequisiteBadges={setActiveStep.bind(this, StaffBadgeEditFormStep.PREREQUISITE_BADGES)}/>
        }
    };

    let steps;
    if (!badgeId) {
        steps = [StaffBadgeEditFormStep.DESCRIBE_BADGE];
    } else {
        steps = [];
    }

    steps = [
        ...steps,
        StaffBadgeEditFormStep.ASSOCIATE_TASKS,
        StaffBadgeEditFormStep.PREREQUISITE_BADGES,
        StaffBadgeEditFormStep.REVIEW
    ];

    const publishBadge = async () => {
        try {
            const newBadge = await setBadge({badgeId, badgeData});

            navigate(StaffRouteUrls.BADGE_EDIT.replace(":badgeId", newBadge.badge_id));

            await showDialog({
                variant: 'primary',
                title: "",
                icon: "bi-check-circle",
                message: <div>The Badge “{newBadge.name}” is Successfully Published.</div>,
                buttons: [
                    {
                        label: "Go to Home Page",
                        answer: false,
                        className: "btn btn-outline-primary",
                        to: StaffRouteUrls.INDEX
                    },
                    {label: "Go to Badges", answer: false, className: "btn btn-primary", to: StaffRouteUrls.BADGES},
                ]
            });
        } catch (error) {
            await showErrorDialog({
                error: error,
                roles: [IntegrationRoles.BADGE_MAINTAINER]
            });
        }
    };

    return <div className="container">
        <div className="row mt-2 p-3">
            <div className="w-100 bg-white rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                <StaffMultiStepForm steps={steps} onPublish={publishBadge}
                                    onExit={() => navigate(StaffRouteUrls.BADGES)}
                                    activeStep={activeStep} setActiveStep={setActiveStep}
                                    getStepDetails={(step) => stepDetailsMap[step]}/>
            </div>
        </div>
    </div>
}
