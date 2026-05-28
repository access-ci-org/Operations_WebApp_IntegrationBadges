export const BadgeWorkflowStatus = {
    NOT_PLANNED: "not-planned",
    PLANNED: "planned",
    TASK_COMPLETED: "tasks-completed",
    VERIFICATION_FAILED: "verification-failed",
    VERIFIED: "verified",
    DEPRECATED: "deprecated",
    EXEMPTION_REQUESTED: "exemption-requested",
    EXEMPTED: "exempted",
    EXEMPTION_REJECTED: "exemption-rejected",
}

export const BadgeWorkflowStatus_VIEW_ALL = "*";

export const BadgeWorkflowTransitionType = {
    BADGE_VERIFICATION: "badge-verification",
    BADGE_EXEMPTION: "badge-exemption",
}

export const IntegrationRoles = {
    CONCIERGE: "concierge",
    COORDINATOR: "coordinator",
    IMPLEMENTER: "implementer",
    ROADMAP_MAINTAINER: "roadmap.maintainer",
    BADGE_MAINTAINER: "badge.maintainer"
}

export const ResourceStatus = {
    ANNOUNCED: "coming soon",
    PRE_PRODUCTION: "pre-production",
    PRODUCTION: "production",
    POST_PRODUCTION: "post-production",
    RETIRED: "decommissioned"
}

export const ResourceIntegrationStatus = {
    NEW: "new",
    IN_PROGRESS: "pre-production",
    PRODUCTION: "production",
    POST_PRODUCTION: "post-production"
}

export const BadgeTaskWorkflowStatus = {
    COMPLETED: "completed",
    NOT_COMPLETED: "not-completed",
    NOT_APPLICABLE: "not-applicable",
    ACTION_NEEDED: "action-needed",
}