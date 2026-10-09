import Translate from "../../locales/Translate.jsx";
import {BadgeWorkflowStatus} from "../../contexts/constants.js";

// bg-${variant} bg-opacity-10 text-${variant} border-${variant} border-opacity-10
export const BadgeStatusCssClass = {
    [BadgeWorkflowStatus.NOT_PLANNED]: "bg-gray-200 border-gray-500 text-gray-800",
    [BadgeWorkflowStatus.PLANNED]: "bg-blue bg-opacity-10 border-blue text-blue-800",
    [BadgeWorkflowStatus.TASK_COMPLETED]: "bg-warning bg-opacity-25 border-warning text-secondary-dark",
    [BadgeWorkflowStatus.VERIFICATION_FAILED]: "bg-danger bg-opacity-10 border-danger  text-secondary-dark",
    [BadgeWorkflowStatus.VERIFIED]: "bg-green-200 bg-opacity-25 border-success text-dark",
    [BadgeWorkflowStatus.DEPRECATED]: "bg-gray-700 border-gray-700 text-white",
    [BadgeWorkflowStatus.EXEMPTION_REQUESTED]: "bg-accent-secondary bg-opacity-10 border-accent-secondary  text-secondary-dark",
    [BadgeWorkflowStatus.EXEMPTED]: "bg-success border-success text-white",
    [BadgeWorkflowStatus.EXEMPTION_REJECTED]: "bg-danger border-danger text-white"
}

export const BadgeStatusHoverCssClass = {
    [BadgeWorkflowStatus.NOT_PLANNED]: "hover-bg-gray-300",
    [BadgeWorkflowStatus.PLANNED]: "hover-bg-opacity-25",
    [BadgeWorkflowStatus.TASK_COMPLETED]: "hover-bg-opacity-50",
    [BadgeWorkflowStatus.VERIFICATION_FAILED]: "hover-bg-opacity-25",
    [BadgeWorkflowStatus.VERIFIED]: "hover-bg-opacity-50",
    [BadgeWorkflowStatus.DEPRECATED]: "hover-bg-gray-800",
    [BadgeWorkflowStatus.EXEMPTION_REQUESTED]: "hover-bg-opacity-25",
    [BadgeWorkflowStatus.EXEMPTED]: "hover-border-secondary-dark",
    [BadgeWorkflowStatus.EXEMPTION_REJECTED]: "hover-border-secondary-dark"
}

export default function BadgeStatus({status}) {

    const variant = BadgeStatusCssClass[status]; // + " " + BadgeStatusHoverCssClass[status];

    const badgeStatusClass = variant; // `bg-${variant} bg-opacity-10 text-${variant} border-${variant} border-opacity-10`

    return <small className={`ps-3 pe-3 pt-1 pb-1 rounded-5 border border-1 text-nowrap fs-8 ${badgeStatusClass}`}>
        <Translate>badgeWorkflowStatus.{status}</Translate>
    </small>
}
