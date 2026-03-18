import {IntegrationRoles, BadgeWorkflowStatus} from "./constants.js";

export const BADGE_WORKFLOW = {
    name: "Badge Lifecycle Workflow",
    statuses: [
        {name: BadgeWorkflowStatus.PLANNED, category: "TODO"},
        {name: BadgeWorkflowStatus.TASK_COMPLETED, category: "IN_PROGRESS"},
        {name: BadgeWorkflowStatus.VERIFIED, category: "DONE"},
        {name: BadgeWorkflowStatus.VERIFICATION_FAILED, category: "IN_PROGRESS"},
        {name: BadgeWorkflowStatus.DEPRECATED, category: "DONE"}
    ],
    transitions: [
        {
            name: "Start working on the badge",
            from: [],
            to: BadgeWorkflowStatus.PLANNED,
            type: "initial"
        },
        {
            name: "Submit for Verification",
            from: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.VERIFICATION_FAILED],
            to: BadgeWorkflowStatus.TASK_COMPLETED,
            conditions: [
                {role: IntegrationRoles.CONCIERGE},
                {role: IntegrationRoles.COORDINATOR},
                {role: IntegrationRoles.IMPLEMENTER}
            ]
        },
        {
            name: "Mark as Verified",
            from: [BadgeWorkflowStatus.TASK_COMPLETED],
            to: BadgeWorkflowStatus.VERIFIED,
            conditions: [
                {role: IntegrationRoles.CONCIERGE}
            ]
        },
        {
            name: "Mark as Verification Failed",
            from: [BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFIED],
            to: BadgeWorkflowStatus.VERIFICATION_FAILED,
            conditions: [
                {role: IntegrationRoles.CONCIERGE}
            ]
        },
        {
            name: "Deprecate",
            from: [
                BadgeWorkflowStatus.PLANNED,
                BadgeWorkflowStatus.TASK_COMPLETED,
                BadgeWorkflowStatus.VERIFIED,
                BadgeWorkflowStatus.VERIFICATION_FAILED
            ],
            to: BadgeWorkflowStatus.DEPRECATED,
            conditions: [
                {role: IntegrationRoles.CONCIERGE},
                {role: IntegrationRoles.COORDINATOR}
            ]
        },
        {
            name: "Reopen",
            from: [BadgeWorkflowStatus.TASK_COMPLETED],
            to: BadgeWorkflowStatus.PLANNED,
            conditions: [
                {role: IntegrationRoles.CONCIERGE},
                {role: IntegrationRoles.COORDINATOR},
                {role: IntegrationRoles.IMPLEMENTER}
            ]
        },
        {
            name: "Reopen",
            from: [
                BadgeWorkflowStatus.VERIFIED,
                BadgeWorkflowStatus.DEPRECATED
            ],
            to: BadgeWorkflowStatus.PLANNED,
            conditions: [
                {role: IntegrationRoles.CONCIERGE},
                {role: IntegrationRoles.COORDINATOR}
            ]
        }
    ]
};

//export default function getBadgeWorkflowActions()