import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const ContactContext = createContext({
    fetchContacts: (
        {
            organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
            contactType = null, contactEmail = null
        } = {}
    ) => {
    },
    getContacts: (
        {
            organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
            contactType = null, contactEmail = null
        } = {}
    ) => {
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
        {
            organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
            contactType = null, contactEmail = null
        } = {}
    ) => {
        let url = '/resource_contacts?';

        if (organizationId) {
            if (!Array.isArray(organizationId)) organizationId = [organizationId];
            url += organizationId.map(i => `organization_id=${i}&`).join("");
        }

        if (resourceId) {
            if (!Array.isArray(resourceId)) resourceId = [resourceId];
            url += resourceId.map(i => `info_resourceid=${i}&`).join("");
        }

        if (roadmapId) {
            if (!Array.isArray(roadmapId)) roadmapId = [roadmapId];
            url += roadmapId.map(i => `roadmap_id=${i}&`).join("");
        }

        if (badgeId) {
            if (!Array.isArray(badgeId)) badgeId = [badgeId];
            url += badgeId.map(i => `badge_id=${i}&`).join("");
        }

        if (contactType) {
            if (!Array.isArray(contactType)) contactType = [contactType];
            url += contactType.map(i => `contact_type=${i}&`).join("");
        }

        if (contactEmail) {
            if (!Array.isArray(contactEmail)) contactEmail = [contactEmail];
            url += contactEmail.map(i => `contact_email=${i}&`).join("");
        }

        return url;
    }

    const fetchContacts = async (
        {
            organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
            contactType = null, contactEmail = null
        } = {}
    ) => {
        try {
            const url = getContactsEndpointUrl({
                organizationId, resourceId, roadmapId, badgeId, contactType, contactEmail
            });
            const response = await dashboardAxiosInstance.get(url);
            const _contacts = response.data.results;
            const contactsMap = {};
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
        {
            organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
            contactType = null, contactEmail = null
        } = {}
    ) => {
        const url = getContactsEndpointUrl({organizationId, resourceId, roadmapId, badgeId, contactType, contactEmail});

        return contactListMap[url];
    };


    return (
        <ContactContext.Provider value={{contactListMap, fetchContacts, getContacts}}>
            {children}
        </ContactContext.Provider>
    );
};
