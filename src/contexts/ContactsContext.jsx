import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {unauthorizedCiderAxiosInstance} from "./auth/DashboardAuthenticator.js";

const ContactContext = createContext({
    fetchContacts: ({organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}) => {
    },
    getContacts: ({organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}) => {
    }
});

export const useContacts = () => useContext(ContactContext);

/**
 * Context provider for contacts
 * @param children
 */
export const ContactProvider = ({children}) => {
    const [contactListMap, setContactListMap] = useReducer(DefaultReducer, {});

    const getContactsEndpointUrl = (
        {organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}
    ) => {
        let url = '/contacts?';
        if (organizationId) url += `organization_id=${organizationId}&`;
        if (resourceId) url += `info_resourceid=${resourceId}&`;
        if (contactType) url += `contact_type=${contactType}&`;
        if (contactEmail) url += `contact_email=${contactEmail}&`;

        return url;
    }

    const fetchContacts = async (
        {organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}
    ) => {
        console.log("Hello");
        try {
            const url = getContactsEndpointUrl({organizationId, resourceId, contactType, contactEmail});
            const response = await unauthorizedCiderAxiosInstance.get(url);
            const _contacts = response.data.results;

            setContactListMap({
                ...contactListMap,
                [url]: _contacts
            });

            return response.data.results;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getContacts = (
        {organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}
    ) => {
        const url = getContactsEndpointUrl({organizationId, resourceId, contactType, contactEmail});

        return contactListMap[url];
    };


    return (
        <ContactContext.Provider value={{contactListMap, fetchContacts, getContacts}}>
            {children}
        </ContactContext.Provider>
    );
};
