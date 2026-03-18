import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";

const PermissionContext = createContext({
    // permissionMap: {},
    fetchPermissions: () => {
    },
    hasPermission: ({roles = [], resourceIds = []} = {}) => {
    }
});

export const usePermissions = () => useContext(PermissionContext);

/**
 * Context provider for permissions
 * @param children
 */
export const PermissionProvider = ({children}) => {
    const [permissionMap, setPermissionMap] = useReducer(DefaultReducer, {});

    const fetchPermissions = async () => {
        try {
            const response = await dashboardAxiosInstance.get('/permissions');
            // const response = {
            //     "data": {
            //         "results": {
            //             "permissions": [
            //                 // {
            //                 //     "permission": "concierge"
            //                 // },
            //                 {
            //                     "permission": "coordinator",
            //                     "info_resourceids": [
            //                         "cloudbank-classroom.access-ci.org",
            //                         "expanse.sdsc.access-ci.org",
            //                         "expanse-gpu.sdsc.access-ci.org",
            //                         "expanse-ps.sdsc.access-ci.org",
            //                         "jetstream2-lm.indiana.access-ci.org",
            //                     ]
            //                 },
            //                 {
            //                     "permission": "implementer",
            //                     "info_resourceids": [
            //                         "cloudbank.access-ci.org",
            //                         "cloudbank-classroom.access-ci.org",
            //                         "expanse.sdsc.access-ci.org",
            //                         "expanse-gpu.sdsc.access-ci.org",
            //                         "expanse-ps.sdsc.access-ci.org",
            //                         "expanse-air.sdsc.access-ci.org",
            //                         "hive.gatech.access-ci.org"
            //                     ]
            //                 },
            //                 {
            //                     "permission": "roadmap.maintainer"
            //                 },
            //                 {
            //                     "permission": "badge.maintainer"
            //                 }
            //             ]
            //         },
            //         "status_code": 200
            //     }
            // };

            const _permissionsMap = {};

            for (let i = 0; i < response.data.results.permissions.length; i++) {
                const permission = response.data.results.permissions[i];
                const role = permission.permission;
                const resourceIds = permission.info_resourceids

                if (!_permissionsMap[role]) _permissionsMap[role] = {};

                if (resourceIds) {
                    for (let j = 0; j < resourceIds.length; j++) {
                        const resourceId = resourceIds[j];
                        _permissionsMap[role][resourceId] = true;
                    }
                } else {
                    _permissionsMap[role] = true;
                }
            }

            setPermissionMap(_permissionsMap);

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    /**
     * @param {string[]} roles
     * @param {string[]} resourceIds
     * @returns {boolean}
     */
    const hasPermission = ({roles = null, resourceIds = null} = {}) => {
        if (roles) {
            for (let i = 0; i < roles.length; i++) {
                const role = roles[i];
                const authorizedResourceIdsMap = permissionMap[role];

                if (authorizedResourceIdsMap === true) {
                    return true;
                } else if (authorizedResourceIdsMap && !resourceIds) {
                    return true;
                } else if (authorizedResourceIdsMap) {
                    for (let j = 0; j < resourceIds.length; j++) {
                        const groupId = resourceIds[0];
                        if (authorizedResourceIdsMap === true || authorizedResourceIdsMap[groupId]) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    };


    return (
        <PermissionContext.Provider
            value={{permissionMap, fetchPermissions, hasPermission}}>
            {children}
        </PermissionContext.Provider>
    );
};
