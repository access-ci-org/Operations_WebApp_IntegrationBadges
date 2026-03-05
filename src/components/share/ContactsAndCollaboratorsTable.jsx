import {Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useContacts} from "../../contexts/ContactsContext.jsx";
import {useEffect, useState} from "react";
import LoadingBlock from "../util/LoadingBlock.jsx";
import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";
import {Link} from "react-router-dom";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {CollaboratorProfileAvatarButton} from "./ContactsAndCollaboratorsSummary.jsx";
import {sortJsonArrayAlphabetically} from "../util/sort.jsx";

const CopyStatus = {
    success: "Copied to clipboard",
    error: "Could not copy",
    inProgress: "Copying...",
}

export default function ContactsAndCollaboratorsTable(
    {organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}
) {
    const {getOrganization} = useOrganizations();
    const {getResource} = useResources();
    const {fetchContacts, getContacts} = useContacts();

    const [error, setError] = useState(false);
    const [copyStatus, setCopyStatus] = useState("");

    const organization = getOrganization({organizationId});
    let contacts = getContacts({organizationId, resourceId, contactType, contactEmail});

    // if (contacts) contacts = sortJsonArrayAlphabetically(contacts, "contact_name");

    useEffect(() => {
        fetchContacts({organizationId, resourceId, contactType, contactEmail})
            .catch(() => setError(true));
    }, [organizationId, resourceId, contactType, contactEmail]);

    const copyEmailAddresses = () => {
        setCopyStatus(CopyStatus.inProgress)
        if (contacts) {
            const emailAddresses = contacts.map(contact => `${contact.contact_name} <${contact.contact_email}>`).join(", ")
            navigator.clipboard.writeText(emailAddresses).then(function () {
                setCopyStatus(CopyStatus.success);
            }, function () {
                setCopyStatus(CopyStatus.error);
            });
            setTimeout(() => {
                setCopyStatus(null);
            }, 800)
        }
    }

    if (error) {
        return <div className="w-100 text-center">
            <i className="bi bi-exclamation-triangle-fill text-danger pe-2"></i>
            <span className="fw-bold">Error : </span>
            <span>Unauthorized</span>
        </div>
    } else if (contacts && contacts.length === 0) {
        return <div className="w-100 text-center">
            <i className="bi bi-exclamation-triangle-fill text-orange pe-2"></i>
            <span className="text-secondary">No contacts found.</span>
        </div>
    } else {
        return <div className="w-100">
            <div className="text-end pb-2">

                <span className="ps-2 pe-2 fs-8">{copyStatus}</span>
                {copyStatus === CopyStatus.success && <i className="pe-2 text-medium bi bi-check"></i>}
                {copyStatus === CopyStatus.error &&
                    <i className="pe-2 text-warning bi bi-exclamation-triangle-fill"></i>}

                <button className="btn btn-sm btn-gray-300 rounded-2" onClick={copyEmailAddresses}>
                    <i className="bi bi-copy pe-2"></i>
                    Copy Email Addresses
                </button>
            </div>
            <table className="table table-sm">
                <thead className="text-start">
                <tr>
                    <th scope="col">
                        User
                        {contacts && <span className="ps-3 text-secondary fs-9">({contacts.length} total)</span>}
                    </th>
                    <th scope="col">
                        <span>Affiliations / Collaborations</span>
                    </th>
                </tr>
                </thead>
                <tbody className="table-group-divider text-start">

                {contacts && contacts.map(contact =>
                    <tr>
                        <th scope="row">
                            <div className="d-flex flex-row pt-2">
                                <div className="pe-2">
                                    <CollaboratorProfileAvatarButton contact={contact}
                                                                     profileAvatarClass="bg-orange text-white"/>
                                </div>
                                <div className="flex-fill">
                                    <h5 className="fs-8 mb-0">{contact.contact_name}</h5>
                                    <div className="fs-9 fw-normal">{contact.contact_email}</div>
                                </div>
                            </div>
                        </th>
                        <td>
                            {contact.resource_contacts.map((resourceContact, resourceContactIndex) => {
                                const resourceContactOrg = getOrganization({organizationId: resourceContact.organization_id});
                                const resource = getResource({resourceId: resourceContact.info_resourceid});

                                return <div key={resourceContactIndex}>
                                    <div className="w-100 d-flex flex-row">
                                        {!organization &&
                                            <div className="p-2 ps-3"
                                                 style={{minWidth: 100, maxWidth: 100, minHeight: 60, maxHeight: 60}}>
                                                <div className="w-100 h-100 p-2" style={{
                                                    backgroundImage: `url(${resourceContactOrg.other_attributes.organization_logo_url})`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundSize: "contain",
                                                    backgroundPosition: "top left"
                                                }}/>
                                            </div>}
                                        <div className="flex-fill ps-3 pt-2 align-content-start">
                                            {!resourceId &&
                                                <h6 className="w-100 fs-9 m-0">{resource.resource_descriptive_name}</h6>}

                                            <ul className="w-100 p-0 mb-2 ps-4 fs-8 text-gray-800">
                                                {resourceContact.contact_types.map((contactType, contactTypeIndex) =>
                                                    <li key={contactTypeIndex}>{contactType}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    }

}

