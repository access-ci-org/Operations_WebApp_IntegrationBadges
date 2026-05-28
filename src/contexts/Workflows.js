import {
    IntegrationRoles,
    BadgeWorkflowStatus,
    BadgeWorkflowTransitionType,
    BadgeTaskWorkflowStatus
} from "./constants.js";
import {toArrayOrNull} from "../components/util/util.jsx";

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
            transitionType: BadgeWorkflowTransitionType.BADGE_VERIFICATION,
            from: [],
            to: BadgeWorkflowStatus.PLANNED,
            type: "initial"
        },
        {
            name: "Submit for Verification",
            transitionType: BadgeWorkflowTransitionType.BADGE_VERIFICATION,
            from: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.VERIFICATION_FAILED,
                BadgeWorkflowStatus.EXEMPTION_REJECTED],
            to: BadgeWorkflowStatus.TASK_COMPLETED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER]
            }
        },
        {
            name: "Mark as Verified",
            transitionType: BadgeWorkflowTransitionType.BADGE_VERIFICATION,
            from: [BadgeWorkflowStatus.TASK_COMPLETED],
            to: BadgeWorkflowStatus.VERIFIED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE]
            }
        },
        {
            name: "Mark as Verification Failed",
            transitionType: BadgeWorkflowTransitionType.BADGE_VERIFICATION,
            from: [BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFIED],
            to: BadgeWorkflowStatus.VERIFICATION_FAILED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE]
            }
        },
        {
            name: "Reopen",
            transitionType: BadgeWorkflowTransitionType.BADGE_VERIFICATION,
            from: [BadgeWorkflowStatus.TASK_COMPLETED],
            to: BadgeWorkflowStatus.PLANNED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR, IntegrationRoles.IMPLEMENTER]
            }
        },
        {
            name: "Reopen",
            transitionType: BadgeWorkflowTransitionType.BADGE_VERIFICATION,
            from: [BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.DEPRECATED],
            to: BadgeWorkflowStatus.PLANNED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR]
            }
        },

        {
            name: "Deprecate",
            transitionType: BadgeWorkflowTransitionType.BADGE_VERIFICATION,
            from: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFIED,
                BadgeWorkflowStatus.VERIFICATION_FAILED, BadgeWorkflowStatus.EXEMPTED,
                BadgeWorkflowStatus.EXEMPTION_REQUESTED, BadgeWorkflowStatus.EXEMPTION_REJECTED],
            to: BadgeWorkflowStatus.DEPRECATED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR]
            }
        },
        {
            name: "Request Exemption",
            transitionType: BadgeWorkflowTransitionType.BADGE_EXEMPTION,
            from: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.TASK_COMPLETED,
                BadgeWorkflowStatus.VERIFICATION_FAILED, BadgeWorkflowStatus.EXEMPTION_REJECTED],
            to: BadgeWorkflowStatus.EXEMPTION_REQUESTED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR]
            }
        },
        {
            name: "Exempt",
            transitionType: BadgeWorkflowTransitionType.BADGE_EXEMPTION,
            from: [BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFIED,
                BadgeWorkflowStatus.VERIFICATION_FAILED,
                BadgeWorkflowStatus.EXEMPTION_REQUESTED, BadgeWorkflowStatus.EXEMPTION_REJECTED],
            to: BadgeWorkflowStatus.EXEMPTED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE]
            }
        },
        {
            name: "Approve Exemption",
            transitionType: BadgeWorkflowTransitionType.BADGE_EXEMPTION,
            from: [BadgeWorkflowStatus.EXEMPTION_REQUESTED],
            to: BadgeWorkflowStatus.EXEMPTED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE]
            }
        },
        {
            name: "Reject Exemption",
            transitionType: BadgeWorkflowTransitionType.BADGE_EXEMPTION,
            from: [BadgeWorkflowStatus.EXEMPTION_REQUESTED, BadgeWorkflowStatus.EXEMPTED],
            to: BadgeWorkflowStatus.EXEMPTION_REJECTED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE]
            }
        },
        {
            name: "Cancel Exemption Request",
            transitionType: BadgeWorkflowTransitionType.BADGE_EXEMPTION,
            from: [BadgeWorkflowStatus.EXEMPTION_REQUESTED],
            to: BadgeWorkflowStatus.PLANNED,
            conditions: {
                role: [IntegrationRoles.CONCIERGE, IntegrationRoles.COORDINATOR]
            }
        },
        {
            name: "Cancel Exemption",
            transitionType: BadgeWorkflowTransitionType.BADGE_EXEMPTION,
            from: [BadgeWorkflowStatus.EXEMPTED],
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

/**
 * @param workflow
 * @param from
 * @param conditions
 * @param {string[]|Set<string>|string} transitionType
 * @returns {object[]}
 */
export function getAvailableTransitions(workflow, from, conditions, transitionType = null) {

    if (transitionType) transitionType = new Set(toArrayOrNull(transitionType));

    return workflow.transitions.filter(transition => {
        if (isEqualOrContains(transition.from, from)) {
            if (!!transitionType && !!transition.transitionType && !transitionType.has(transition.transitionType)) {
                return false;
            }

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
