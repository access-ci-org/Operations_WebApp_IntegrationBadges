import Translate from "../../locales/Translate.jsx";

export default function BadgeStatus({status}) {

    const badgeWorkflowStatusClass = {
        "undefined": "bg-secondary-subtle",
        "not-planned": "bg-secondary-subtle",
        "planned": "bg-warning-subtle",
        "tasks-completed": "bg-warning-subtle",
        "verification-failed": "bg-danger-subtle",
        "verified": "bg-light",
        "deprecated": "bg-secondary-subtle"
    };

    return <small className={`ps-2 pe-2 pt-1 pb-1 rounded-1 text-nowrap ${badgeWorkflowStatusClass[status]}`}>
        <Translate>badgeWorkflowStatus.{status}</Translate>
    </small>
}
