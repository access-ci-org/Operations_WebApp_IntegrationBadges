import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {
    dashboardAxiosInstance, ciderAxiosInstance
} from "./auth/DashboardAuthenticator.js";


/** @type {React.Context<ReturnType<typeof useOrganizationsValues> | null>} */
const OrganizationsContext = createContext(null);

export const useOrganizations = () => useContext(OrganizationsContext);

function useOrganizationsValues() {
    const [organizationIds, setOrganizationIds] = useReducer(DefaultReducer, []);
    const [organizationMap, setOrganizationMap] = useReducer(DefaultReducer, {});
    const [organizationMapByName, setOrganizationMapByName] = useReducer(DefaultReducer, {});

    const fetchOrganization = async ({organizationId}) => {
        try {
            const response = await ciderAxiosInstance.get(`/organizations/organization_id/${organizationId}`);
            const organization = response.data.results;
            setOrganizationMap({
                ...organizationMap, [organizationId]: organization
            });

            setOrganizationMapByName({
                ...organizationMapByName, [organization.organization_name]: organization
            });

            setOrganizationMap({
                ...organizationMap, [organizationId]: {
                    ...organization
                }
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };
    const fetchOrganizations = async () => {
        try {
            const response = await dashboardAxiosInstance.get(`/organizations/`);
            const _organizations = response.data.results;

            const _organizationIds = [];
            const _organizationMap = {};
            const _organizationMapByName = {};
            for (let i = 0; i < _organizations.length; i++) {
                const _organization = _organizations[i];
                const organizationId = _organization.organization_id;

                _organizationIds.push(organizationId);
                _organizationMap[organizationId] = _organization;
                _organizationMapByName[_organization.organization_name] = _organization;
            }

            setOrganizationIds(_organizationIds);

            setOrganizationMap({
                ...organizationMap, ..._organizationMap
            });

            setOrganizationMapByName({
                ...organizationMapByName, ..._organizationMapByName
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getOrganization = ({organizationName = null, organizationId = null}) => {
        if (organizationMapByName[organizationName]) {
            return organizationMapByName[organizationName];
        } else if (organizationMap[organizationId]) {
            return organizationMap[organizationId];
        }
    };


    const getOrganizations = () => {
        return organizationIds.map(organizationId => getOrganization({organizationId}));
    };

    return {
        organizationIds,
        organizationMap,
        organizationMapByName,
        fetchOrganizations,
        fetchOrganization,
        getOrganization,
        getOrganizations
    };
}

export const OrganizationsProvider = ({children}) => {
    const values = useOrganizationsValues();

    return (<OrganizationsContext.Provider value={values}>
        {children}
    </OrganizationsContext.Provider>);
};
