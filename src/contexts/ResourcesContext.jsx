import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {useBadges} from "./BadgeContext";
import {BadgeTaskWorkflowStatus, BadgeWorkflowStatus, BadgeWorkflowStatus_VIEW_ALL} from "./constants.js"
import {useOrganizations} from "./OrganizationsContext";
import {useTasks} from "./TaskContext";
import {useRoadmaps} from "./RoadmapContext.jsx";
import {authorizedDashboardAxiosInstance, dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";
import {BADGE_WORKFLOW, getAvailableTransitions} from "./Workflows.js";
import {useRoles} from "./PermissionContext.jsx";

/** @type {React.Context<ReturnType<typeof useResourcesValues> | null>} */
const ResourcesContext = createContext(null);

export const useResources = () => useContext(ResourcesContext);

function useResourcesValues() {
    const {getAuthorizedRoles} = useRoles();
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
    const [resourceRoadmapBadgeTaskIds, setResourceRoadmapBadgeTaskIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeTaskMap, setResourceRoadmapBadgeTaskMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeStatusSummaryMap, setResourceRoadmapBadgeStatusSummaryMap] = useReducer(DefaultReducer, {});

    const fetchResource = async ({resourceId}) => {
        return fetchResources({resourceId, full: true});
    };

    /**
     * @param organizationId
     * @param resourceId
     * @param roadmapId
     * @param badgeId
     * @param {string | string[]} badgeWorkflowStatus
     * @param orderBy
     * @returns {string}
     */
    const getResourceRoadmapBadgesEndpointUrl = (
        {
            organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
            badgeWorkflowStatus = null, orderBy = null
        } = {}
    ) => {
        let url = `/resource_roadmap_badges/?`;

        if (organizationId) url += `organization_id=${organizationId}&`;
        if (resourceId) url += `info_resourceid=${resourceId}&`;
        if (roadmapId) url += `roadmap_id=${roadmapId}&`;
        if (badgeId) url += `badge_id=${badgeId}&`;
        if (badgeWorkflowStatus && badgeWorkflowStatus !== BadgeWorkflowStatus_VIEW_ALL) {
            if (!Array.isArray(badgeWorkflowStatus)) url += `badge_workflow_status=${badgeWorkflowStatus}&`;
            else url += badgeWorkflowStatus.map(s => `badge_workflow_status=${s}&`).join("");
        }
        if (orderBy) url += `order_by=${orderBy}`;

        return url;
    }

    const fetchResourceRoadmapBadges = async (
        {
            organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
            badgeWorkflowStatus = null, orderBy = null
        } = {}
    ) => {
        try {
            const url = getResourceRoadmapBadgesEndpointUrl(
                {organizationId, resourceId, roadmapId, badgeId, badgeWorkflowStatus, orderBy});
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

            if (resourceId) {
                url += `info_resourceid=${resourceId}&`
            }

            if (roadmapId) {
                url += `roadmap_id=${roadmapId}&`
            }

            if (badgeId) {
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
                if (_resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId]) {
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

    const getResourceRoadmapBadgeTasksEndpointUrl = ({resourceId, roadmapId, badgeId} = {}) => {
        let url = `/resource_roadmap_badge_tasks/?`;

        if (resourceId) url += `info_resourceid=${resourceId}&`;
        if (roadmapId) url += `roadmap_id=${roadmapId}&`;
        if (badgeId) url += `badge_id=${badgeId}&`;

        return url;
    }


    const fetchResourceRoadmapBadgeTasks = async ({resourceId, roadmapId, badgeId} = {}) => {
        try {
            const url = getResourceRoadmapBadgeTasksEndpointUrl({resourceId, roadmapId, badgeId});
            const response = await dashboardAxiosInstance.get(url);

            const taskStatusMap = {...resourceRoadmapBadgeTaskMap};
            const taskIds = [];
            for (let j = 0; j < response.data.results.length; j++) {
                const taskStatus = response.data.results[j];
                const _taskId = taskStatus.task_id;
                const _badgeId = taskStatus.badge_id;
                const _resourceId = taskStatus.info_resourceid;
                const _roadmapId = taskStatus.roadmap_id;

                taskIds.push({resourceId: _resourceId, roadmapId: _roadmapId, badgeId: _badgeId, taskId: _taskId});

                taskStatusMap[_resourceId] = {...taskStatusMap[_resourceId]};
                taskStatusMap[_resourceId][_roadmapId] = {...taskStatusMap[_resourceId][_roadmapId]};
                taskStatusMap[_resourceId][_roadmapId][_badgeId] = {...taskStatusMap[_resourceId][_roadmapId][_badgeId]};
                taskStatusMap[_resourceId][_roadmapId][_badgeId][_taskId] = taskStatus;
            }

            setResourceRoadmapBadgeTaskMap(taskStatusMap);
            setResourceRoadmapBadgeTaskIds({...resourceRoadmapBadgeTaskIds, [url]: taskIds});

            return response;
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

            const response = await dashboardAxiosInstance.get(url);
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
        {
            organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
            badgeWorkflowStatus = null, orderBy = null
        } = {}
    ) => {
        const url = getResourceRoadmapBadgesEndpointUrl(
            {organizationId, resourceId, roadmapId, badgeId, badgeWorkflowStatus, orderBy});

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

    const getResourceRoadmapBadgeTasks = ({resourceId, roadmapId, badgeId} = {}) => {
        console.log("####### getResourceRoadmapBadgeTasks")

        const url = getResourceRoadmapBadgeTasksEndpointUrl({resourceId, roadmapId, badgeId});

        if (resourceRoadmapBadgeTaskIds[url]) {
            return resourceRoadmapBadgeTaskIds[url].map(({resourceId, roadmapId, badgeId, taskId}) =>{

                const task = getTask({taskId});
                let resourceBadgeTaskWorkflow = null;

                if (resourceRoadmapBadgeTaskMap[resourceId] && resourceRoadmapBadgeTaskMap[resourceId][roadmapId]
                    && resourceRoadmapBadgeTaskMap[resourceId][roadmapId][badgeId]) {

                    resourceBadgeTaskWorkflow = resourceRoadmapBadgeTaskMap[resourceId][roadmapId][badgeId][taskId];
                }

                return {
                    ...task,
                    status: BadgeTaskWorkflowStatus.NOT_COMPLETED,
                    ...resourceBadgeTaskWorkflow
                }
            });
        }

        // let badge = getBadge({badgeId});
        //
        // if (badge.tasks) {
        //     return badge.tasks.map(({task_id, required}) => {
        //         const taskId = task_id;
        //         const task = getTask({taskId});
        //         let resourceBadgeTaskWorkflow = null;
        //         if (resourceRoadmapBadgeTaskMap[resourceId] && resourceRoadmapBadgeTaskMap[resourceId][roadmapId]
        //             && resourceRoadmapBadgeTaskMap[resourceId][roadmapId][badgeId]) {
        //
        //             resourceBadgeTaskWorkflow = resourceRoadmapBadgeTaskMap[resourceId][roadmapId][badgeId][taskId];
        //         }
        //
        //         return {
        //             ...task,
        //             required,
        //             status: BadgeTaskWorkflowStatus.NOT_COMPLETED,
        //             ...resourceBadgeTaskWorkflow
        //         }
        //     });
        // }
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

    const getAuthorizedBadgeTransitions = ({
                                               resourceId = null, roadmapId = null, badgeId = null,
                                               transitionType = null
                                           } = {}) => {
        const resourceRoadmapBadge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});

        return getAvailableTransitions(BADGE_WORKFLOW, resourceRoadmapBadge.status, {
            role: getAuthorizedRoles({resourceId}),
            required: resourceRoadmapBadge.required
        }, transitionType);
    };

    const setResourceRoadmapBadgeWorkflowStatus = async ({resourceId, roadmapId, badgeId, status, comment}) => {
        try {
            const response = await authorizedDashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/workflow/${status}/`, {comment});
            await fetchResourceRoadmapBadges({resourceIds: [resourceId], roadmapId, badgeId});

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const setResourceRoadmapBadgeTaskWorkflowStatus = async ({resourceId, roadmapId, badgeId, taskId, status}) => {
        try {
            const response = await authorizedDashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/task/${taskId}/workflow/${status}/`,);
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
            const response = await authorizedDashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/enrollments/`, {
                badge_ids: badgeIds
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    return {
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
    };
}


export const ResourcesProvider = ({children}) => {
    const values = useResourcesValues();

    return (<ResourcesContext.Provider value={values}>
        {children}
    </ResourcesContext.Provider>);
};
