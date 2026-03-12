import {Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useContacts} from "../../contexts/ContactsContext.jsx";
import {useEffect, useState} from "react";
import LoadingBlock from "../util/LoadingBlock.jsx";
import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import ContactsAndCollaboratorsTable from "./ContactsAndCollaboratorsTable.jsx";
import {StaffRouteUrls} from "../../pages/staff/StaffRoute.jsx";
import Concierge from "../staff/Concierge.jsx";
import ContactsAndCollaboratorsFilterView from "./ContactsAndCollaboratorsFilterView.jsx";

const ContactAvatarClasses = [
    "bg-orange text-white",
    "bg-success text-dark",
    "bg-yellow text-light",
    "bg-info-subtle text-danger",
    "bg-info text-black",
];

const NumberOfContactDisplayOnSummary = 5;

function getContactNameInitials(contactName) {
    let nameInitials = "";
    let nameSplit = /\s*([a-zA-Z0-9])?[^\s]*\s*([a-zA-Z0-9])?/.exec(contactName);
    if (nameSplit[1]) nameInitials += nameSplit[1];
    if (nameSplit[2]) nameInitials += nameSplit[2];

    return nameInitials.toUpperCase();
}

export function CollaboratorProfileAvatarButton({contact, contactIndex, profileAvatarClass}) {
    if (!profileAvatarClass) {
        profileAvatarClass = ContactAvatarClasses[contactIndex % ContactAvatarClasses.length];
    }
    let style = {maxWidth: 28, minWidth: 28, maxHeight: 28, minHeight: 28};

    const tooltip = <Tooltip id="tooltip">
        {contact.contact_name}<br/>
        <small>{contact.contact_email}</small>
    </Tooltip>;

    return <div className="col p-0 me-1" style={style}>
        <OverlayTrigger overlay={tooltip} placement="bottom" delayShow={300} delayHide={150}>
            <button className={"btn fs-9 w-100 h-100 rounded-circle p-1 " + profileAvatarClass}>
                {getContactNameInitials(contact.contact_name)}
            </button>
        </OverlayTrigger>
    </div>
}

function AddNewCollaboratorButton(
    {organizationId = null, resourceId = null, contactType = null, contactEmail = null, onClick = null} = {}
) {
    const navigate = useNavigate();

    let style = {maxWidth: 28, minWidth: 28, maxHeight: 28, minHeight: 28};

    let link = StaffRouteUrls.CONTACTS + "?";
    if (organizationId) link += `organizationId=${organizationId}&`;
    if (resourceId) link += `resourceId=${resourceId}&`;

    return <div className="col p-0 me-1" style={style}>
        <Link className="btn btn-gray-400 fs-8 w-100 h-100 rounded-circle p-1" to={link}>
            <i className="bi bi-person-plus"></i>
        </Link>
    </div>
}


function ShowMoreCollaboratorDetailsButton(
    {organizationId = null, resourceId = null, contactType = null, contactEmail = null, onClick = null} = {}
) {
    const {getContacts} = useContacts();

    const contacts = getContacts({organizationId, resourceId, contactType, contactEmail});

    if (contacts) {
        return <div className="col align-content-center ps-1">
            {contacts && contacts.length > NumberOfContactDisplayOnSummary &&
                <button className="btn btn-link fs-8" onClick={() => onClick && onClick()}>
                    <span className="text-one-line-overflow-ellipsis text text-secondary">
                        +{contacts.length - NumberOfContactDisplayOnSummary}
                    </span>
                </button>}
        </div>
    }
}


export default function ContactsAndCollaboratorsSummary(
    {organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}
) {
    const {getOrganization} = useOrganizations();
    const {fetchContacts, getContacts} = useContacts();

    const [showContactsAndCollaboratorsModal, setShowContactsAndCollaboratorsModal] = useState(false);
    const [error, setError] = useState(false);

    const organization = getOrganization({organizationId});
    const contacts = getContacts({organizationId, resourceId, contactType, contactEmail});

    useEffect(() => {
        fetchContacts({organizationId, resourceId, contactType, contactEmail})
            .catch(() => setError(true));
    }, [organizationId, resourceId, contactType, contactEmail]);

    // ContactAvatarClasses.sort(() => Math.random() - Math.random());

    return <div className="w-100 p-2">
        <div className="w-100">
            <h4 className="fs-10 fw-bold mb-1 pe-2 text-medium d-inline">Contacts / Collaborators</h4>
            <button className="btn btn-link text-medium d-inline">
                <i className="bi bi-info-circle-fill fs-7"></i></button>
        </div>

        <LoadingBlock processing={!error && !contacts} className="row fs-8 p-2 rounded-5 bg-light"/>

        <div className="row p-2 rounded-5 bg-gray-100">
            {contacts && contacts.slice(0, NumberOfContactDisplayOnSummary).map((contact, contactIndex) =>
                <CollaboratorProfileAvatarButton key={contactIndex} contact={contact}
                                                 contactIndex={contactIndex}/>)}


            {error && <div className="col align-content-center ps-1">
                <div className="w-100 fs-8">
                    <i className="bi bi-exclamation-triangle-fill text-danger pe-2"></i>
                    <span className="fw-bold">Error : </span>
                    <span>Unauthorized</span>
                </div>
            </div>}

            {!error && contacts && contacts.length === 0 &&
                <div className="col align-content-center ps-1">
                    <div className="w-100 fs-8">
                        <i className="bi bi-exclamation-triangle-fill text-orange pe-2"></i>
                        <span className="text-secondary">No contacts found.</span>
                    </div>
                </div>}


            {!error && contacts && contacts.length > 0 &&
                <ShowMoreCollaboratorDetailsButton organizationId={organizationId} resourceId={resourceId}
                                                   contactEmail={contactEmail} contactType={contactType}
                                                   onClick={setShowContactsAndCollaboratorsModal.bind(this, true)}/>}

            <AddNewCollaboratorButton organizationId={organizationId} resourceId={resourceId}
                                      contactEmail={contactEmail} contactType={contactType}
                                      onClick={setShowContactsAndCollaboratorsModal.bind(this, true)}/>
        </div>

        <Modal size="xl" show={showContactsAndCollaboratorsModal}
               onHide={setShowContactsAndCollaboratorsModal.bind(this, false)}>
            <Modal.Header closeButton className="bg-medium">
                <Modal.Title className="text-white">
                    Contacts / Collaborators
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 fs-8">
                <div className="w-100 pt-4 pb-5 ps-2 pe-2">
                    <ContactsAndCollaboratorsFilterView organizationId={organizationId} resourceId={resourceId}
                                                   contactEmail={contactEmail} contactType={contactType}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-medium rounded-1"
                        onClick={setShowContactsAndCollaboratorsModal.bind(this, false)}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    </div>
}

