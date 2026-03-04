import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useContacts} from "../../contexts/ContactsContext.jsx";
import {useEffect} from "react";
import LoadingBlock from "../util/LoadingBlock.jsx";

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
    const nameSplit = /(.)?.*\s+(.)?.*/.exec(contactName);
    console.log("nameSplit ", nameSplit)
    if (nameSplit[1]) nameInitials += nameSplit[1];
    if (nameSplit[2]) nameInitials += nameSplit[2];

    return nameInitials;
}

function CollaboratorProfileAvatarButton({contact, contactIndex, profileAvatarClass}) {
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

function AddNewCollaboratorButton() {
    let style = {maxWidth: 28, minWidth: 28, maxHeight: 28, minHeight: 28};

    return <div className="col p-0 me-1" style={style}>
        <button className="btn btn-gray-400 fs-8 w-100 h-100 rounded-circle p-1">
            <i className="bi bi-person-plus"></i>
        </button>
    </div>
}

export default function ContactsAndCollaboratorsSummary(
    {organizationId = null, resourceId = null, contactType = null, contactEmail = null} = {}
) {
    const {fetchContacts, getContacts} = useContacts();
    const contacts = getContacts({organizationId, resourceId, contactType, contactEmail});

    useEffect(() => {
        fetchContacts({organizationId, resourceId, contactType, contactEmail});
    }, [organizationId, resourceId, contactType, contactEmail]);

    // ContactAvatarClasses.sort(() => Math.random() - Math.random());

    return <div className="w-100 p-2">
        <div className="w-100">
            <h4 className="fs-10 fw-bold mb-1 pe-2 text-medium d-inline">Contacts / Collaborators</h4>
            <button className="btn btn-link text-medium d-inline">
                <i className="bi bi-info-circle-fill fs-7"></i></button>
        </div>

        <LoadingBlock processing={!contacts} className="row fs-8 p-2 rounded-5 bg-light"/>
        {contacts && <div className="row p-2 rounded-5 bg-gray-100">
            {contacts.slice(0, NumberOfContactDisplayOnSummary).map((contact, contactIndex) =>
                <CollaboratorProfileAvatarButton key={contactIndex} contact={contact}
                                                 contactIndex={contactIndex}/>)}
            <div className="col align-content-center ps-1">
                <button className="btn btn-link fs-8">
                    <span className="text-one-line-overflow-ellipsis text text-secondary">
                        +{contacts.length - NumberOfContactDisplayOnSummary}
                    </span>
                </button>
            </div>
            {/*<Concierge>*/}
                <AddNewCollaboratorButton/>
            {/*</Concierge>*/}
        </div>}
    </div>
}

