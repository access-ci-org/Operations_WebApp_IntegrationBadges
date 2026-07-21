export const AppRouteUrls = {
    ROOT: "/",
    ABOUT: "/about",
    ORGANIZATIONS: "/organizations",
    ORGANIZATION: "/organizations/:organizationId",
    ORGANIZATION_BADGE_REVIEW: "/organizations/:organizationId/badge-review/:badgeWorkflowStatus",
    RESOURCE: "/resources/:resourceId",
    RESOURCE_ROADMAP: "/resources/:resourceId/roadmaps/:roadmapId",
    RESOURCE_EDIT: "/resources/:resourceId/edit",
    RESOURCE_ROADMAP_EDIT: "/resources/:resourceId/roadmaps/:roadmapId/edit",
    RESOURCE_BADGE: "/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId",
};

export const StaffRouteUrls = {
    INDEX: "/staff/dashboard",
    ROADMAPS: "/staff/roadmaps",
    ROADMAP_NEW: "/staff/roadmaps/new",
    ROADMAP_EDIT: "/staff/roadmaps/:roadmapId/edit",
    BADGES: "/staff/badges",
    BADGE_NEW: "/staff/badges/new",
    BADGE_EDIT: "/staff/badges/:badgeId/edit",
    BADGE_STATUS: "/staff/badge-status",
    CONTACTS: "/staff/contacts",
};

export const DocumentationRouteUrls = {
    INDEX: "/docs",
    WHY_BECOME_AN_RP: "/docs/why-become-an-rp",
    HOW_TO_INTEGRATE_RESOURCE: "/docs/how-to-integrate-resource",
    HOW_TO_CHOOSE_ROADMAP: "/docs/how-to-choose-roadmap",
    WHY_INTEGRATE_RESOURCES: "/docs/why-should-i-integrate-resources",
    WHAT_IS_TICKETING_SYSTEM: "/docs/what-is-ticketing-system",
    ROADMAPS: "/docs/roadmaps",
    BADGES: "/docs/badges",
};

