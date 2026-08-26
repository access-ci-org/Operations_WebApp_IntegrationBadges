import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {useTasks} from "../../contexts/TaskContext.jsx";
import {useEffect} from "react";
import applicationRoutesConfig from "../application-routes-config.jsx";
import {AppRouteUrls, StaffRouteUrls} from "../pages-config.js";
import {BadgeWorkflowStatus, ResourceIntegrationStatus} from "../../contexts/constants.js";
import {sortJsonArrayAlphabetically, SortOrder} from "../../components/util/sort.jsx";
import BadgeStatus from "../../components/status/BadgeStatus.jsx";
import Translate from "../../locales/Translate.jsx";
import {useTranslation} from "react-i18next";

let fetchOncePromiseForResourcesBadgesTasks = false;
let fetchOncePromiseForOrgBadgeStatusSummary = false;

export default function ApplicationRoutePageCount(
    {
        route,
        renderComponent = (pageCount, examples) => null
    }) {

    const {t} = useTranslation();

    const {getOrganizations} = useOrganizations();
    const {
        fetchResources, fetchResourceRoadmapBadges, fetchResourceRoadmapBadgeTasks,
        fetchResourceRoadmapBadgeStatusSummary,
        getResourceRoadmapBadges, getResourceRoadmapBadgeTasks, getResourceRoadmapBadgeStatusSummary,
        getResources
    } = useResources();
    const {getRoadmaps} = useRoadmaps();
    const {getBadges} = useBadges();
    const {getTasks} = useTasks();
    const organizations = getOrganizations();
    const resources = getResources();
    const roadmaps = getRoadmaps();
    const badges = getBadges();
    const tasks = getTasks();

    const resourceRoadmapBadges = getResourceRoadmapBadges();
    const resourceRoadmapBadgeTasks = getResourceRoadmapBadgeTasks();

    // Replacing "verification-failed" because the webapp uses only that route
    const routePath = route.path.replace("verification-failed", ":badgeWorkflowStatus");

    useEffect(() => {
        if (!fetchOncePromiseForResourcesBadgesTasks) {
            fetchOncePromiseForResourcesBadgesTasks = true;

            fetchResources({full: true});
            fetchResourceRoadmapBadges();
            fetchResourceRoadmapBadgeTasks();
        }
    }, []);

    useEffect(() => {
        if (routePath === AppRouteUrls.ORGANIZATION_BADGE_REVIEW && !fetchOncePromiseForOrgBadgeStatusSummary) {
            fetchOncePromiseForOrgBadgeStatusSummary = true;

            for (let i = 0; i < organizations.length; i++) {
                const organization = organizations[i];
                fetchResourceRoadmapBadgeStatusSummary({organizationId: organization.organization_id});
            }
        }
    }, [routePath, organizations.length]);

    const routePagesMap = {

        [AppRouteUrls.ORGANIZATION]: () => {

            let orgPages = organizations
                .map(org => {
                    const resourceIntegrationStatusSummaryMap = getResources({organizationId: org.organization_id})
                        .reduce((obj, res) => {
                            if (res.resource_integration_status) {
                                obj[res.resource_integration_status] = (obj[res.resource_integration_status] || 0) + 1;
                            }
                            return obj;
                        }, {});


                    return {
                        "label": sortJsonArrayAlphabetically(Object.keys(resourceIntegrationStatusSummaryMap))
                            .map(s => `${t("resourceIntegrationStatus." + s)} (${resourceIntegrationStatusSummaryMap[s]})`).join(', '),
                        "href": AppRouteUrls.ORGANIZATION.replace(":organizationId", org.organization_id),
                        "count_of_available_resource_integration_statuses": Object.keys(resourceIntegrationStatusSummaryMap).length
                    }
                });

            orgPages = sortJsonArrayAlphabetically(orgPages, "label", SortOrder.Descending)
            return sortJsonArrayAlphabetically(orgPages, "count_of_available_resource_integration_statuses", SortOrder.Descending)
        },

        [AppRouteUrls.ORGANIZATION_BADGE_REVIEW]: () => {
            return organizations
                .filter(org => {
                    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary({
                        organizationId: org.organization_id
                    });

                    return resourceRoadmapBadgeStatusSummary &&
                        resourceRoadmapBadgeStatusSummary[BadgeWorkflowStatus.VERIFICATION_FAILED] > 0;
                }).map(org => {
                    return {
                        "href": AppRouteUrls.ORGANIZATION_BADGE_REVIEW
                            .replace(":organizationId", org.organization_id)
                            .replace(":badgeWorkflowStatus", "verification-failed")
                    }
                });
        },

        [AppRouteUrls.RESOURCE]: () => {
            const pageRoutes = resources
                .map(resource => {
                    return {
                        "label": <div className="d-inline">
                            <span>[</span>
                            <Translate>resourceIntegrationStatus.{resource.resource_integration_status}</Translate>
                            <span>]</span>
                        </div>,
                        "href": AppRouteUrls.RESOURCE.replace(":resourceId", resource.info_resourceid),
                        "resourceIntegrationStatus": resource.resource_integration_status
                    }
                });

            return sortJsonArrayAlphabetically(pageRoutes, "resourceIntegrationStatus");
        },

        [AppRouteUrls.RESOURCE_EDIT]: () => {
            return resources
                .filter(resource => !resource.roadmaps || resource.roadmaps.length === 0)
                .map(resource => {
                    return {"href": AppRouteUrls.RESOURCE_EDIT.replace(":resourceId", resource.info_resourceid)}
                })
        },

        [AppRouteUrls.RESOURCE_ROADMAP]: () => {
            const routePages = resources
                .filter(resource => resource.roadmaps && resource.roadmaps.length > 0)
                .map(resource => {
                    return {
                        "label": t("resourceIntegrationStatus." + resource.resource_integration_status),
                        "resourceIntegrationStatus": resource.resource_integration_status,
                        "href": AppRouteUrls.RESOURCE_ROADMAP
                            .replace(":resourceId", resource.info_resourceid)
                            .replace(":roadmapId", resource.roadmaps[0].roadmap_id)
                    }
                });

            return {
                "all": routePages,
                "examples": Object.values(ResourceIntegrationStatus)
                    .filter(resourceIntegrationStatus => resourceIntegrationStatus !== ResourceIntegrationStatus.NEW)
                    .map(resourceIntegrationStatus => {
                        const filteredRoutePages = routePages.filter(res => resourceIntegrationStatus === res.resourceIntegrationStatus);
                        return {
                            "label": t("resourceIntegrationStatus." + resourceIntegrationStatus),
                            "resourceRoadmapBadgeStatus": resourceIntegrationStatus,
                            "href": filteredRoutePages.length > 0 ? filteredRoutePages[0].href : null,
                        }
                    })
            }
        },

        [AppRouteUrls.RESOURCE_ROADMAP_EDIT]: () => {
            const routePages = resources
                .filter(resource => resource.roadmaps && resource.roadmaps.length > 0)
                .map(resource => {
                    return {
                        "label": t("resourceIntegrationStatus." + resource.resource_integration_status),
                        "resourceIntegrationStatus": resource.resource_integration_status,
                        "href": AppRouteUrls.RESOURCE_ROADMAP_EDIT
                            .replace(":resourceId", resource.info_resourceid)
                            .replace(":roadmapId", resource.roadmaps[0].roadmap_id)
                    }
                });

            return {
                "all": routePages,
                "examples": Object.values(ResourceIntegrationStatus)
                    .filter(resourceIntegrationStatus => resourceIntegrationStatus !== ResourceIntegrationStatus.NEW)
                    .map(resourceIntegrationStatus => {
                        const filteredRoutePages = routePages.filter(res => resourceIntegrationStatus === res.resourceIntegrationStatus);
                        return {
                            "label": t("resourceIntegrationStatus." + resourceIntegrationStatus),
                            "resourceRoadmapBadgeStatus": resourceIntegrationStatus,
                            "href": filteredRoutePages.length > 0 ? filteredRoutePages[0].href : null,
                        }
                    })
            }
        },

        [AppRouteUrls.RESOURCE_BADGE]: () => {
            if (resourceRoadmapBadges) {
                const routePages = resourceRoadmapBadges
                    .map(resourceRoadmapBadge => {
                        return {
                            "label": <BadgeStatus status={resourceRoadmapBadge.status}/>,
                            "resourceRoadmapBadgeStatus": resourceRoadmapBadge.status,
                            "href": AppRouteUrls.RESOURCE_BADGE
                                .replace(":resourceId", resourceRoadmapBadge.info_resourceid)
                                .replace(":roadmapId", resourceRoadmapBadge.roadmap_id)
                                .replace(":badgeId", resourceRoadmapBadge.badge_id)
                        }
                    });

                return {
                    "all": routePages,
                    "examples": Object.values(BadgeWorkflowStatus).map(badgeStatus => {
                        const filteredRoutePages = routePages.filter(({resourceRoadmapBadgeStatus}) => resourceRoadmapBadgeStatus === badgeStatus);
                        return {
                            "label": <BadgeStatus status={badgeStatus}/>,
                            "resourceRoadmapBadgeStatus": badgeStatus,
                            "href": filteredRoutePages.length > 0 ? filteredRoutePages[0].href : null,
                        }
                    })
                };
            }
        },

        [StaffRouteUrls.ROADMAP_EDIT]: () => {
            return roadmaps
                .map(roadmap => {
                    return {
                        "href": StaffRouteUrls.ROADMAP_EDIT
                            .replace(":roadmapId", roadmap.roadmap_id)
                    }
                });
        },

        [StaffRouteUrls.BADGE_EDIT]: () => {
            return badges
                .map(badge => {
                    return {
                        "href": StaffRouteUrls.BADGE_EDIT
                            .replace(":badgeId", badge.badge_id)
                    }
                });
        },
    };

    if (routePagesMap[routePath]) {
        const routePages = routePagesMap[routePath]();
        if (routePages) {
            if (Array.isArray(routePages)) {
                return renderComponent(routePages.length, routePages);
            } else {
                return renderComponent(routePages["all"].length, routePages["examples"]);
            }
        }
    } else {
        return renderComponent(1, [{"href": routePath}]);
    }
}
