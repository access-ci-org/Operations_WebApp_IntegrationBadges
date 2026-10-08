import {Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useContacts} from "../../contexts/ContactsContext.jsx";
import {useEffect, useState} from "react";
import LoadingBlock from "../util/LoadingBlock.jsx";
import {Link} from "react-router-dom";
import {StaffRouteUrls} from "../../pages/pages-config.js";
import ContactsAndCollaboratorsFilterView from "./ContactsAndCollaboratorsFilterView.jsx";
import {IntegrationRoles} from "../../contexts/constants.js";
import {ShowIfAuthorized} from "../util/Permissions.jsx";
import {useEffectWithErrorHandling} from "../util/useEffectWithErrorHandling.js";

const ContactAvatarClasses = [
    "bg-accent-secondary text-white",
    "bg-green-200 text-dark",
    "bg-accent-primary text-light",
    "bg-info-subtle text-danger",
    "bg-info text-black",
];

const NumberOfContactDisplayOnSummary = 0;

function getContactNameInitials(contactName) {
    let nameInitials = "";
    let nameSplit = /\s*([a-zA-Z0-9])?[^\s]*\s*([a-zA-Z0-9])?/.exec(contactName);
    if (nameSplit[1]) nameInitials += nameSplit[1];
    if (nameSplit[2]) nameInitials += nameSplit[2];

    return nameInitials.toUpperCase();
}

export function CollaboratorProfileAvatarButton({contact, profileAvatarClass}) {
    if (!profileAvatarClass) {
        profileAvatarClass = ContactAvatarClasses[0];
    }

    let style = {maxWidth: 28, minWidth: 28, maxHeight: 28, minHeight: 28};

    const tooltip = <Tooltip id="tooltip">
        {contact.contact_name}<br/>
        <small>{contact.contact_email}</small>
    </Tooltip>;

    return <div className="col p-0 me-1" style={style}>
        <OverlayTrigger overlay={tooltip} placement="bottom" delayShow={300} delayHide={150}>
            <div role="img" aria-label={`View contact ${contact.contact_name}`}
                 className={"btn fs-10 w-100 h-100 rounded-circle p-1 " + profileAvatarClass}>
                <span>{getContactNameInitials(contact.contact_name)}</span>
            </div>
        </OverlayTrigger>
    </div>
}

function ShowMoreCollaboratorDetailsButton(
    {organizationId = null, resourceId = null, contactType = null, contactEmail = null, onClick = null} = {}
) {
    const {getContacts} = useContacts();

    const contacts = getContacts({organizationId, resourceId, contactType, contactEmail});

    if (contacts) {
       return  <button className="btn btn-light rounded-3 border-0 fs-8" onClick={() => onClick && onClick()}>
            <span className="small text-primary fw-bold"> Contacts / Collaborators</span>
            <span className="ps-1 pe-1 ms-2 bg-primary text-white fw-bold rounded rounded-3">
                            {contacts.length - NumberOfContactDisplayOnSummary}</span>
        </button>
    }
}


export default function ContactsAndCollaboratorsSummary(
    {organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}
) {
    const {fetchContacts} = useContacts();

    const [showContactsAndCollaboratorsModal, setShowContactsAndCollaboratorsModal] = useState(false);

    const {processing, error, reload} = useEffectWithErrorHandling(async () => {
        await fetchContacts({organizationId, resourceId, contactType, contactEmail});
    }, [organizationId, resourceId, contactType, contactEmail]);

    // ContactAvatarClasses.sort(() => Math.random() - Math.random());

    let externalLink = StaffRouteUrls.CONTACTS + "?";
    if (organizationId) externalLink += `organizationId=${organizationId}&`;
    if (resourceId) externalLink += `resourceId=${resourceId}&`;

    return <ShowIfAuthorized
        roles={[IntegrationRoles.IMPLEMENTER, IntegrationRoles.COORDINATOR, IntegrationRoles.CONCIERGE,
            IntegrationRoles.ROADMAP_MAINTAINER, IntegrationRoles.BADGE_MAINTAINER]}>
        <div className="w-100 p-2">
            {/*<div className="w-100">*/}
            {/*    <h4 className="fs-10 fw-bold mb-1 pe-2 text-primary d-inline">Contacts / Collaborators</h4>*/}
            {/*    <button className="btn btn-link text-primary d-inline">*/}
            {/*        <i className="bi bi-info-circle-fill fs-7"></i></button>*/}
            {/*</div>*/}

            <div className="row p-2">
                <div className="col align-content-center text-end ps-2">
                    <LoadingBlock title="contacts" processing={processing} error={error} reload={reload} minHeight={0}
                                  className="ps-2 pe-2 pt-1 pb-1 d-inline-block rounded-3 border border-1 border-light width-fit-content">
                        <ShowMoreCollaboratorDetailsButton
                            organizationId={organizationId} resourceId={resourceId}
                            contactEmail={contactEmail} contactType={contactType}
                            onClick={setShowContactsAndCollaboratorsModal.bind(this, true)}/>
                    </LoadingBlock>
                </div>
            </div>


            <Modal className="modal-light" size="xl" show={showContactsAndCollaboratorsModal}
                   aria-label="Contacts and Collaborators"
                   onHide={setShowContactsAndCollaboratorsModal.bind(this, false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Contacts / Collaborators

                        <Link className="btn btn-link ps-3" to={externalLink} target="_blank"
                              aria-label="Open Contacts and Collaborators in a new Window">
                            <i className="bi bi-box-arrow-up-right"></i>
                        </Link>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ContactsAndCollaboratorsFilterView organizationId={organizationId} resourceId={resourceId}
                                                            contactEmail={contactEmail} contactType={contactType}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-primary rounded-1"
                            onClick={setShowContactsAndCollaboratorsModal.bind(this, false)}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    </ShowIfAuthorized>
}

