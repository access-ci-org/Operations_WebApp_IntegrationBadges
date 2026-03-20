import {IntegrationRoles, BadgeWorkflowStatus, BadgeTaskWorkflowStatus} from "./constants.js";

export const BADGE_WORKFLOW = {
    name: "Badge Lifecycle Workflow",
    statuses: [
        BadgeWorkflowStatus.PLANNED,
        BadgeWorkflowStatus.TASK_COMPLETED,
        BadgeWorkflowStatus.VERIFIED,
        BadgeWorkflowStatus.VERIFICATION_FAILED,
        BadgeWorkflowStatus.DEPRECATED
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
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER]
            }
        },
        {
            name: "Mark as Verified",
            from: [BadgeWorkflowStatus.TASK_COMPLETED],
            to: BadgeWorkflowStatus.VERIFIED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE]
            }
        },
        {
            name: "Mark as Verification Failed",
            from: [BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFIED],
            to: BadgeWorkflowStatus.VERIFICATION_FAILED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE]
            }
        },
        {
            name: "Deprecate",
            from: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFIED,
                BadgeWorkflowStatus.VERIFICATION_FAILED],
            to: BadgeWorkflowStatus.DEPRECATED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR]
            }
        },
        {
            name: "Reopen",
            from: [BadgeWorkflowStatus.TASK_COMPLETED],
            to: BadgeWorkflowStatus.PLANNED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER]
            }
        },
        {
            name: "Reopen",
            from: [ BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.DEPRECATED],
            to: BadgeWorkflowStatus.PLANNED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR]
            }
        }
    ]
};

export const TASK_WORKFLOW = {
    name: "Badge Task Lifecycle Workflow",
    statuses: [
        BadgeTaskWorkflowStatus.NOT_COMPLETED,
        BadgeTaskWorkflowStatus.NOT_APPLICABLE,
        BadgeTaskWorkflowStatus.COMPLETED,
        BadgeTaskWorkflowStatus.ACTION_NEEDED
    ],
    transitions: [
        {
            name: "Start working on the task",
            from: [],
            to: BadgeTaskWorkflowStatus.NOT_COMPLETED,
            type: "initial"
        },
        {
            name: "Completed",
            from: [BadgeTaskWorkflowStatus.NOT_COMPLETED, BadgeTaskWorkflowStatus.NOT_APPLICABLE, BadgeTaskWorkflowStatus.ACTION_NEEDED],
            to: BadgeTaskWorkflowStatus.COMPLETED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER],
                badgeStatus: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.VERIFICATION_FAILED]
            }
        },
        {
            name: "Completed",
            from: [BadgeTaskWorkflowStatus.NOT_COMPLETED, BadgeTaskWorkflowStatus.NOT_APPLICABLE, BadgeTaskWorkflowStatus.ACTION_NEEDED],
            to: BadgeTaskWorkflowStatus.COMPLETED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE],
                badgeStatus: [BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.DEPRECATED]
            }
        },
        {
            name: "Incomplete",
            from: [BadgeTaskWorkflowStatus.NOT_APPLICABLE, BadgeTaskWorkflowStatus.COMPLETED, BadgeTaskWorkflowStatus.ACTION_NEEDED],
            to: BadgeTaskWorkflowStatus.NOT_COMPLETED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER],
                badgeStatus: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.VERIFICATION_FAILED]
            }
        },
        {
            name: "Incomplete",
            from: [BadgeTaskWorkflowStatus.NOT_APPLICABLE, BadgeTaskWorkflowStatus.COMPLETED, BadgeTaskWorkflowStatus.ACTION_NEEDED],
            to: BadgeTaskWorkflowStatus.NOT_COMPLETED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE],
                badgeStatus: [BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.DEPRECATED]
            }
        },
        {
            name: "Not Applicable",
            from: [BadgeTaskWorkflowStatus.NOT_COMPLETED, BadgeTaskWorkflowStatus.COMPLETED, BadgeTaskWorkflowStatus.ACTION_NEEDED],
            to: BadgeTaskWorkflowStatus.NOT_APPLICABLE,
            conditions: {
                required: false,
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER],
                badgeStatus: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.VERIFICATION_FAILED]
            }
        },
        {
            name: "Not Applicable",
            from: [BadgeTaskWorkflowStatus.NOT_COMPLETED, BadgeTaskWorkflowStatus.COMPLETED, BadgeTaskWorkflowStatus.ACTION_NEEDED],
            to: BadgeTaskWorkflowStatus.NOT_APPLICABLE,
            conditions: {
                required: false,
                role: [IntegrationRoles.CONCIERGE],
                badgeStatus: [BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.DEPRECATED]
            }
        },
        {
            name: "Action Needed",
            from: [BadgeTaskWorkflowStatus.NOT_COMPLETED, BadgeTaskWorkflowStatus.NOT_APPLICABLE, BadgeTaskWorkflowStatus.COMPLETED],
            to: BadgeTaskWorkflowStatus.ACTION_NEEDED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE]
            }
        }
    ]
};

console.log("BADGE_WORKFLOW : ", JSON.stringify(BADGE_WORKFLOW))
console.log("TASK_WORKFLOW : ", JSON.stringify(TASK_WORKFLOW))

function isEqualOrContains(source, value) {
    if (source === value) {
        return true;
    }

    if (!Array.isArray(source)) {
        source = [source];
    }
    source = new Set(source);

    if (!Array.isArray(value)) {
        value = [value]
    }

    return value.some(v => source.has(v));
}

export function getAvailableTransitions(workflow, from, conditions) {
    return workflow.transitions.filter(transition => {
        if (isEqualOrContains(transition.from, from)) {
            if (transition.conditions) {
                for (let conditionKey in transition.conditions) {
                    if (!isEqualOrContains(transition.conditions[conditionKey], conditions[conditionKey])) {
                        return false;
                    }
                }
            }

            return true;
        } else {
            return false;
        }
    });
}
