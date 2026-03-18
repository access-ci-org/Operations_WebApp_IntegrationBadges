import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {useBadges} from "./BadgeContext";
import {BadgeTaskWorkflowStatus, BadgeWorkflowStatus, ResourceStatus, RpDashboardResourceStatus} from "./constants.js"
import {useOrganizations} from "./OrganizationsContext";
import {useTasks} from "./TaskContext";
import {useRoadmaps} from "./RoadmapContext.jsx";
import {dashboardAxiosInstance, unauthorizedDashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";
import {BADGE_WORKFLOW, getAvailableTransitions} from "./Workflows.js";
import {usePermissions} from "./PermissionContext.jsx";

const ResourcesContext = createContext({
    fetchResources: ({organizationId = null, resourceId = null, full = false} = {}) => {
    },
    fetchResource: ({resourceId}) => {
    },
    fetchResourceRoadmapBadges: ({
                                     organizationId = null,
                                     resourceId = null,
                                     roadmapId = null,
                                     badgeId = null,
                                     badgeWorkflowStatus = null
                                 } = {}) => {
    },
    fetchResourceRoadmapBadgeLogs: ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
    },
    fetchResourceRoadmapBadgeTasks: ({resourceId, roadmapId, badgeId}) => {
    },
    fetchResourceRoadmapBadgeStatusSummary: ({resourceId = null, roadmapId = null, badgeId = null} = null) => {
    },
    getResource: ({resourceId}) => {
    },
    getResources: (organizationId = null, resourceId = null, full = false) => {
    },
    getResourceRoadmaps: ({resourceId}) => {
    },
    isResourceRoadmapSelected: ({resourceId, roadmapId}) => {
    },
    getResourceRoadmapBadges: ({
                                   organizationId = null,
                                   resourceId = null,
                                   roadmapId = null,
                                   badgeId = null,
                                   badgeWorkflowStatus = null
                               } = {}) => {
    },
    getResourceRoadmapBadge: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgeLogs: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgePrerequisites: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgeTasks: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgeStatusSummary: ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
    },
    getResourceOrganization: ({resourceId}) => {
    },
    getOrganizationResourceIds: ({organizationName}) => {
    },
    getAuthorizedBadgeTransitions: ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
    },
    setResourceRoadmapBadgeWorkflowStatus: ({resourceId, roadmapId, badgeId, status, comment}) => {
    },
    setResourceRoadmapBadgeTaskWorkflowStatus: ({resourceId, roadmapId, badgeId, taskId, status}) => {
    },
    setResourceRoadmap: ({resourceId, roadmapIds, badgeIds}) => {
    }
});

export const useResources = () => useContext(ResourcesContext);


/**
 * Context provider for resources
 * @param children
 */
export const ResourcesProvider = ({children}) => {
    const {hasPermission, getAuthorizedRoles} = usePermissions();
    const {getBadge} = useBadges();
    const {getTask} = useTasks();
    const {getOrganization} = useOrganizations();
    const {getRoadmap} = useRoadmaps();

    const [resourceIds, setResourceIds] = useReducer(DefaultReducer, {});
    const [resourceMap, setResourceMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapIds, setResourceRoadmapIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeIds, setResourceRoadmapBadgeIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeMap, setResourceRoadmapBadgeMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeLogIds, setResourceRoadmapBadgeLogIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeLogMap, setResourceRoadmapBadgeLogMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeTaskMap, setResourceRoadmapBadgeTaskMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeStatusSummaryMap, setResourceRoadmapBadgeStatusSummaryMap] = useReducer(DefaultReducer, {});

    const fetchResource = async ({resourceId}) => {
        return fetchResources({resourceId, full: true});
    };

    const getResourceRoadmapBadgesEndpointUrl = (
        {organizationId = null, resourceId = null, roadmapId = null, badgeId = null, badgeWorkflowStatus = null} = {}
    ) => {
        let url = `/resource_roadmap_badges/?`;

        if (!!organizationId) url += `organization_id=${organizationId}&`;
        if (!!resourceId) url += `info_resourceid=${resourceId}&`;
        if (!!roadmapId) url += `roadmap_id=${roadmapId}&`;
        if (!!badgeId) url += `badge_id=${badgeId}&`;
        if (!!badgeWorkflowStatus) url += `badge_workflow_status=${badgeWorkflowStatus}`;

        return url;
    }

    const fetchResourceRoadmapBadges = async (
        {organizationId = null, resourceId = null, roadmapId = null, badgeId = null, badgeWorkflowStatus = null} = {}
    ) => {
        try {
            const url = getResourceRoadmapBadgesEndpointUrl(
                {organizationId, resourceId, roadmapId, badgeId, badgeWorkflowStatus});
            const response = await dashboardAxiosInstance.get(url);

            const badgeStatusMap = {...resourceRoadmapBadgeMap};
            const badgeIds = [];
            for (let j = 0; j < response.data.results.length; j++) {
                const badgeStatus = response.data.results[j];
                const _badgeId = badgeStatus.badge_id;
                const _resourceId = badgeStatus.info_resourceid;
                const _roadmapId = badgeStatus.roadmap_id;

                badgeIds.push({resourceId: _resourceId, roadmapId: _roadmapId, badgeId: _badgeId});

                badgeStatusMap[_resourceId] = {...badgeStatusMap[_resourceId]};
                badgeStatusMap[_resourceId][_roadmapId] = {...badgeStatusMap[_resourceId][_roadmapId]};
                badgeStatusMap[_resourceId][_roadmapId][_badgeId] = badgeStatus;
            }

            setResourceRoadmapBadgeMap(badgeStatusMap);
            setResourceRoadmapBadgeIds({...resourceRoadmapBadgeIds, [url]: badgeIds});

            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const fetchResourceRoadmapBadgeLogs = async ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
        try {
            let url = `/resource_roadmap_badge_logs/?`;

            if (!!resourceId) {
                url += `info_resourceid=${resourceId}&`
            }

            if (!!roadmapId) {
                url += `roadmap_id=${roadmapId}&`
            }

            if (!!badgeId) {
                url += `badge_id=${badgeId}`
            }

            let resourceRoadmapBadgeLogs = await dashboardAxiosInstance.get(url);
            const _resourceRoadmapBadgeLogMap = {...resourceRoadmapBadgeLogMap};
            const _resourceRoadmapBadgeLogIds = {};
            for (let j = 0; j < resourceRoadmapBadgeLogs.data.results.length; j++) {
                const badgeLog = resourceRoadmapBadgeLogs.data.results[j];
                const _logId = badgeLog.id;
                const _badgeId = badgeLog.badge_id;
                const _resourceId = badgeLog.info_resourceid;
                const _roadmapId = badgeLog.roadmap_id;

                _resourceRoadmapBadgeLogIds[_resourceId] = {..._resourceRoadmapBadgeLogIds[_resourceId]};
                _resourceRoadmapBadgeLogIds[_resourceId][_roadmapId] = {..._resourceRoadmapBadgeLogIds[_resourceId][_roadmapId]};
                if (!!_resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId]) {
                    _resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId] = [..._resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId], _logId];
                } else {
                    _resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId] = [_logId];
                }

                _resourceRoadmapBadgeLogMap[_logId] = badgeLog;
            }

            setResourceRoadmapBadgeLogMap(_resourceRoadmapBadgeLogMap);
            setResourceRoadmapBadgeLogIds(_resourceRoadmapBadgeLogIds)

            return resourceRoadmapBadgeLogs;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const fetchResourceRoadmapBadgeTasks = async ({resourceId, roadmapId, badgeId}) => {
        try {
            let res = await dashboardAxiosInstance.get(`/resource_roadmap_badge_tasks/?info_resourceid=${resourceId}&roadmap_id=${roadmapId}&badge_id=${badgeId}`);

            const taskWorkflowMap = {};
            const taskIds = [];
            for (let j = 0; j < res.data.results.length; j++) {
                const taskWorkflow = res.data.results[j];
                const taskId = taskWorkflow.task_id;
                taskIds.push(taskId);
                taskWorkflowMap[taskId] = taskWorkflow;
            }

            const _resourceRoadmapBadgeTaskMap = {
                ...resourceRoadmapBadgeTaskMap,
                [resourceId]: {
                    ...resourceRoadmapBadgeTaskMap[resourceId],
                    [roadmapId]: {
                        ...(!!resourceRoadmapBadgeTaskMap[resourceId] ? resourceRoadmapBadgeTaskMap[resourceId][roadmapId] : null),
                        [badgeId]: taskWorkflowMap
                    }
                }
            }

            setResourceRoadmapBadgeTaskMap(_resourceRoadmapBadgeTaskMap);

            return res;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getResourceRoadmapBadgeStatusSummaryEndpointUrl = (
        {organizationId = null, resourceId = null, roadmapId = null, badgeId = null} = {}
    ) => {
        let url = "/resource_roadmap_badge_summary/?";

        if (organizationId) url += `organization_id=${organizationId}`;
        if (resourceId) url += `info_resourceid=${resourceId}`;
        if (roadmapId) url += `roadmap_id=${roadmapId}`;
        if (badgeId) url += `badge_id=${badgeId}`;

        return url;
    }

    const fetchResourceRoadmapBadgeStatusSummary = async (
        {organizationId = null, resourceId = null, roadmapId = null, badgeId = null} = {}
    ) => {
        try {
            let url = getResourceRoadmapBadgeStatusSummaryEndpointUrl({organizationId, resourceId, roadmapId, badgeId});
            let res = await dashboardAxiosInstance.get(url);

            let _resourceRoadmapBadgeStatusSummaryMap = {...resourceRoadmapBadgeStatusSummaryMap};
            _resourceRoadmapBadgeStatusSummaryMap[url] = res.data.results;

            setResourceRoadmapBadgeStatusSummaryMap(_resourceRoadmapBadgeStatusSummaryMap);

            return res;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const getResourcesEndpointUrl = ({organizationId = null, resourceId = null, full = false} = {}) => {
        let url = '/resources?';
        if (full) url = '/resources_full?';
        if (organizationId) url += `organization_id=${organizationId}&`;
        if (resourceId) url += `info_resourceid=${resourceId}`;

        return url;
    }

    const fetchResources = async ({organizationId = null, resourceId = null, full = false} = {}) => {
        try {
            let url = getResourcesEndpointUrl({organizationId, resourceId, full});

            const response = await unauthorizedDashboardAxiosInstance.get(url);
            const _resources = response.data.results;
            const _resourceIds = [];
            const _resourceMap = {...resourceMap};
            const _resourceRoadmapIds = {...resourceRoadmapIds};
            for (let i = 0; i < _resources.length; i++) {
                let resource = _resources[i];
                let resourceId = resource.info_resourceid;

                _resourceIds.push(resourceId);

                _resourceMap[resourceId] = {
                    ..._resourceMap[resourceId],
                    ...resource
                };

                if (resource.roadmaps) {
                    _resourceMap[resourceId]["rp_dashboard_resource_status"] = _getRpDashboardResourceStatus(resource);
                    _resourceRoadmapIds[resourceId] = resource.roadmaps.map(r => r.roadmap_id);
                }
            }

            setResourceIds({...resourceIds, [url]: _resourceIds});
            setResourceMap(_resourceMap);
            setResourceRoadmapIds(_resourceRoadmapIds);

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };


    const _getRpDashboardResourceStatus = (resource) => {
        if (resource.roadmaps.length === 0) {
            return RpDashboardResourceStatus.NEW;
        } else if ([ResourceStatus.ANNOUNCEMENT, ResourceStatus.PRE_PRODUCTION].indexOf(resource.latest_status) >= 0) {
            return RpDashboardResourceStatus.IN_PROGRESS;
        } else if (resource.latest_status === ResourceStatus.PRODUCTION) {
            if (resource.badge_status_summary.required.verified === resource.badge_status_summary.required.total) {
                return RpDashboardResourceStatus.PRODUCTION;
            } else {
                return RpDashboardResourceStatus.IN_PROGRESS;
            }
        } else if (resource.latest_status === ResourceStatus.POST_PRODUCTION) {
            return RpDashboardResourceStatus.POST_PRODUCTION;
        }
    }

    const getResource = ({resourceId}) => {
        return resourceMap[resourceId];
    }

    const getResources = ({organizationId = null, resourceId = null, full = false} = {}) => {
        let url = getResourcesEndpointUrl({organizationId, resourceId, full});
        if (resourceIds[url]) {
            return resourceIds[url].map(resourceId => getResource({resourceId}));
        }
    }

    const getResourceRoadmaps = ({resourceId}) => {
        if (resourceRoadmapIds[resourceId]) {
            return resourceRoadmapIds[resourceId].map(roadmapId => getRoadmap({roadmapId}))
        }
    }

    const isResourceRoadmapSelected = ({resourceId, roadmapId}) => {
        return resourceRoadmapIds[resourceId] && resourceRoadmapIds[resourceId].indexOf(roadmapId) >= 0
    }

    const getResourceRoadmapBadges = (
        {organizationId = null, resourceId = null, roadmapId = null, badgeId = null, badgeWorkflowStatus = null} = {}
    ) => {
        const url = getResourceRoadmapBadgesEndpointUrl(
            {organizationId, resourceId, roadmapId, badgeId, badgeWorkflowStatus});

        if (resourceRoadmapBadgeIds[url]) {
            return resourceRoadmapBadgeIds[url].map(({resourceId, roadmapId, badgeId}) =>
                _getBadgesWithWorkflow({resourceId, roadmapId, badgeId}));
        }
    }

    const getResourceRoadmapBadge = ({resourceId, roadmapId, badgeId}) => {
        return _getBadgesWithWorkflow({resourceId, roadmapId, badgeId})
    }

    const getResourceRoadmapBadgeLogs = ({resourceId, roadmapId, badgeId}) => {
        if (resourceRoadmapBadgeLogIds[resourceId] && resourceRoadmapBadgeLogIds[resourceId][roadmapId] && resourceRoadmapBadgeLogIds[resourceId][roadmapId][badgeId]) {
            return resourceRoadmapBadgeLogIds[resourceId][roadmapId][badgeId].map(logId => resourceRoadmapBadgeLogMap[logId]);
        }
    }

    const getResourceRoadmapBadgePrerequisites = ({resourceId, roadmapId, badgeId}) => {
        const badge = getBadge({badgeId});
        if (badge && badge.prerequisites) {
            return badge.prerequisites.map((prerequisite_badge) =>
                _getBadgesWithWorkflow({resourceId, roadmapId, badgeId: prerequisite_badge.badge_id}));
        }
    }

    const _getBadgesWithWorkflow = ({resourceId, roadmapId, badgeId}) => {
        let badgeWorkflow = null;
        if (resourceRoadmapBadgeMap[resourceId] && resourceRoadmapBadgeMap[resourceId][roadmapId] && resourceRoadmapBadgeMap[resourceId][roadmapId][badgeId]) {
            badgeWorkflow = resourceRoadmapBadgeMap[resourceId][roadmapId][badgeId];
        }

        const badge = getBadge({badgeId});
        if (badge) {
            return {...badge, ...badgeWorkflow};
        }
    }

    const getResourceRoadmapBadgeTasks = ({resourceId, roadmapId, badgeId}) => {
        let badge = getBadge({badgeId});

        if (badge.tasks) {
            return badge.tasks.map(({task_id, required, sequence_no}) => {
                const taskId = task_id;
                const task = getTask({taskId});
                let resourceBadgeTaskWorkflow = null;
                if (resourceRoadmapBadgeTaskMap[resourceId] && resourceRoadmapBadgeTaskMap[resourceId][roadmapId]
                    && resourceRoadmapBadgeTaskMap[resourceId][roadmapId][badgeId]) {

                    resourceBadgeTaskWorkflow = resourceRoadmapBadgeTaskMap[resourceId][roadmapId][badgeId][taskId];
                }

                return {
                    ...task,
                    required,
                    status: BadgeTaskWorkflowStatus.NOT_COMPLETED,
                    ...resourceBadgeTaskWorkflow
                }
            });
        }
    };

    const getResourceRoadmapBadgeStatusSummary = (
        {organizationId = null, resourceId = null, roadmapId = null, badgeId = null} = {}
    ) => {
        let url = getResourceRoadmapBadgeStatusSummaryEndpointUrl({organizationId, resourceId, roadmapId, badgeId});

        if (resourceRoadmapBadgeStatusSummaryMap[url]) {
            return resourceRoadmapBadgeStatusSummaryMap[url];
        }
    }

    const getResourceOrganization = ({resourceId}) => {
        const resource = getResource({resourceId});
        if (resource) {
            return getOrganization({organizationName: resource.organization_name})
        }
    }

    const getOrganizationResourceIds = ({organizationName}) => {
        const orgResourceIds = [];
        const resources = getResources();

        for (let i = 0; i < resources.length; i++) {
            let resource = resources[i];
            if (resource.organization_name === organizationName) {
                orgResourceIds.push(resource.info_resourceid);
            }
        }

        return orgResourceIds;
    }

    const getAuthorizedBadgeTransitions = ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
        const resourceRoadmapBadge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});

        return getAvailableTransitions(BADGE_WORKFLOW, resourceRoadmapBadge.status, {role: getAuthorizedRoles({resourceId})});
    };

    const setResourceRoadmapBadgeWorkflowStatus = async ({resourceId, roadmapId, badgeId, status, comment}) => {
        try {
            const response = await dashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/workflow/${status}/`, {comment});
            await fetchResourceRoadmapBadges({resourceIds: [resourceId], roadmapId, badgeId});

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const setResourceRoadmapBadgeTaskWorkflowStatus = async ({resourceId, roadmapId, badgeId, taskId, status}) => {
        try {
            const response = await dashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/task/${taskId}/workflow/${status}/`,);
            await fetchResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});

            let resourceRoadmapBadge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
            if ([BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.TASK_COMPLETED].indexOf(resourceRoadmapBadge.status) >= 0) {
                await fetchResourceRoadmapBadges({resourceIds: [resourceId], roadmapId, badgeId})
            }

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const setResourceRoadmap = async ({resourceId, roadmapId, badgeIds}) => {
        try {
            const response = await dashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/enrollments/`, {
                badge_ids: badgeIds
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    return (<ResourcesContext.Provider
        value={{
            resourceIds,
            resourceMap,
            resourceRoadmapBadgeMap,
            resourceRoadmapBadgeTaskMap,
            fetchResources,
            fetchResource,
            fetchResourceRoadmapBadges,
            fetchResourceRoadmapBadgeLogs,
            fetchResourceRoadmapBadgeTasks,
            fetchResourceRoadmapBadgeStatusSummary,
            getResource,
            getResources,
            isResourceRoadmapSelected,
            getResourceRoadmaps,
            getResourceRoadmapBadges,
            getResourceRoadmapBadge,
            getResourceRoadmapBadgeLogs,
            getResourceRoadmapBadgePrerequisites,
            getResourceRoadmapBadgeTasks,
            getResourceRoadmapBadgeStatusSummary,
            getResourceOrganization,
            getOrganizationResourceIds,
            getAuthorizedBadgeTransitions,
            setResourceRoadmapBadgeWorkflowStatus,
            setResourceRoadmapBadgeTaskWorkflowStatus,
            setResourceRoadmap
        }}>
        {children}
    </ResourcesContext.Provider>);
};
