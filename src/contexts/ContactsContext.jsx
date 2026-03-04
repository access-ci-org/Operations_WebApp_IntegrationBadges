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
        try {
            const url = getContactsEndpointUrl({organizationId, resourceId, contactType, contactEmail});
            const response = await unauthorizedCiderAxiosInstance.get(url);
            const _contacts = response.data.results;
            const contactsMap = {}
            const contactEmails = [];

            for (const contacts of _contacts) {
                if (!contactsMap[contacts.contact_email]) {
                    contactEmails.push(contacts.contact_email);
                    contactsMap[contacts.contact_email] = {
                        contact_email: contacts.contact_email,
                        contact_name: contacts.contact_name,
                        resource_contacts: []
                    };
                }

                contactsMap[contacts.contact_email].resource_contacts.push({
                    project_affiliation: contacts.project_affiliation,
                    organization_id: contacts.organization_id,
                    organization_name: contacts.organization_name,
                    info_resourceid: contacts.info_resourceid,
                    contact_types: contacts.contact_types
                })
            }

            setContactListMap({
                ...contactListMap,
                [url]: contactEmails.map(contactEmail => contactsMap[contactEmail])
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
