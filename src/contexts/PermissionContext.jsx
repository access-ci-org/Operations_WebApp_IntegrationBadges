import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const RolesContext = createContext({
    // permissionMap: {},
    fetchRoles: () => {
    },
    hasPermission: ({roles = [], resourceIds = []} = {}) => {
    },
    getAuthorizedRoles: ({resourceId = null}) => {
    },
});

export const useRoles = () => useContext(RolesContext);

/**
 * Context provider for roles
 * @param children
 */
export const RolesProvider = ({children}) => {
    const [roleMap, setRoleMap] = useReducer(DefaultReducer, {});

    const fetchRoles = async () => {
        try {
            const response = await dashboardAxiosInstance.get('/roles');
            // const response = {
            //     "data": {
            //         "results": {
            //             "roles": [
            //                 {
            //                     "role": "coordinator",
            //                     "info_groupids": [
            //                         "cloudbank.access-ci.org",
            //                         "osg.access-ci.org",
            //                         "repacss.ttu.access-ci.org"
            //                     ],
            //                     "info_resourceids": [
            //                         "cloudbank.access-ci.org",
            //                         "cloudbank-classroom.access-ci.org",
            //                         "grid1.osg.access-ci.org",
            //                         "repacss-cpu.ttu.access-ci.org",
            //                         "repacss-gpu.ttu.access-ci.org",
            //                         "repacss-storage.ttu.access-ci.org"
            //                     ],
            //                     "roles": [
            //                         "coordinator_cloudbank.access-ci.org",
            //                         "coordinator_osg.access-ci.org",
            //                         "coordinator_repacss.ttu.access-ci.org"
            //                     ]
            //                 },
            //                 {
            //                     "role": "implementer",
            //                     "info_groupids": [
            //                         "cloudbank.access-ci.org",
            //                         "sage.northwestern.edu"
            //                     ],
            //                     "info_resourceids": [
            //                         "cloudbank.access-ci.org",
            //                         "cloudbank-classroom.access-ci.org",
            //                         "sage.northwestern.edu"
            //                     ],
            //                     "roles": [
            //                         "implementer_cloudbank.access-ci.org",
            //                         "implementer_sage.northwestern.edu"
            //                     ]
            //                 },
            //                 {
            //                     "role": "roadmap",
            //                     "info_groupids": [
            //                         "maintainer"
            //                     ],
            //                     "info_resourceids": [],
            //                     "roles": [
            //                         "roadmap_maintainer"
            //                     ]
            //                 }
            //             ]
            //         },
            //         "status_code": 200
            //     }
            // };

            const _rolesMap = {};

            for (let i = 0; i < response.data.results.roles.length; i++) {
                const roleObj = response.data.results.roles[i];
                const role = roleObj.role;
                const resourceIds = roleObj.info_resourceids;

                if (!_rolesMap[role]) _rolesMap[role] = {};

                if (resourceIds) {
                    for (let j = 0; j < resourceIds.length; j++) {
                        const resourceId = resourceIds[j];
                        _rolesMap[role][resourceId] = true;
                    }
                } else {
                    _rolesMap[role] = true;
                }
            }

            setRoleMap(_rolesMap);

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
                const authorizedResourceIdsMap = roleMap[role];

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


    /**
     * @param {string} resourceId
     * @returns {string []}
     */
    const getAuthorizedRoles = ({resourceId = null}) => {
        const authorizedRoles = [];
        for (let role in roleMap) {
            if (roleMap[role] === true || roleMap[role][resourceId] === true) {
                authorizedRoles.push(role);
            }
        }

        return authorizedRoles;
    };


    return (
        <RolesContext.Provider
            value={{roleMap, fetchRoles: fetchRoles, hasPermission, getAuthorizedRoles}}>
            {children}
        </RolesContext.Provider>
    );
};
