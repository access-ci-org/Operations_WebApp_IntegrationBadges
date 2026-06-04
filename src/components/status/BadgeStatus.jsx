import Translate from "../../locales/Translate.jsx";
import {BadgeWorkflowStatus} from "../../contexts/constants.js";

// bg-${variant} bg-opacity-10 text-${variant} border-${variant} border-opacity-10
export const StaffBadgeStatusCssVariant = {
    [BadgeWorkflowStatus.NOT_PLANNED]: "secondary",
    [BadgeWorkflowStatus.TASK_COMPLETED]: "orange",
    [BadgeWorkflowStatus.VERIFICATION_FAILED]: "danger",
    [BadgeWorkflowStatus.PLANNED]: "blue",
    [BadgeWorkflowStatus.VERIFIED]: "green",
    [BadgeWorkflowStatus.DEPRECATED]: "secondary",
    [BadgeWorkflowStatus.EXEMPTED]: "green",
    [BadgeWorkflowStatus.EXEMPTION_REQUESTED]: "orange",
    [BadgeWorkflowStatus.EXEMPTION_REJECTED]: "danger"
}

export default function BadgeStatus({status}) {

    const variant = StaffBadgeStatusCssVariant[status];

    const badgeStatusClass = `bg-${variant} bg-opacity-10 text-${variant} border-${variant} border-opacity-10`

    return <small className={`ps-2 pe-2 pt-1 pb-1 rounded-1 text-nowrap ${badgeStatusClass}`}>
        <Translate>badgeWorkflowStatus.{status}</Translate>
    </small>
}
