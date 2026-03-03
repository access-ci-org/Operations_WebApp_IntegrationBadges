import {useLocation, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const ContactAvatarClasses = [
    "bg-orange text-white",
    "bg-success text-dark",
    "bg-yellow text-orange",
    "bg-danger-subtle text-danger",
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

export default function ContactsAndCollaboratorsSummary(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const concierge = queryParams.get('concierge');

    const contacts = [
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Dave Hancock",
            "contact_email": "dyhancoc@iu.edu",
            "contact_type": "Public relations and media"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Dave Hancock",
            "contact_email": "dyhancoc@iu.edu",
            "contact_type": "Resource PI"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Jeremy Fischer",
            "contact_email": "jeremy@iu.edu",
            "contact_type": "Integration coordinator"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Jeremy Fischer",
            "contact_email": "jeremy@iu.edu",
            "contact_type": "Resource news and outages"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Le Mai Weakley",
            "contact_email": "llnguyen@iu.edu",
            "contact_type": "Public documentation"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Le Mai Weakley",
            "contact_email": "llnguyen@iu.edu",
            "contact_type": "Researcher support and ticket handling"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Le Mai Weakley",
            "contact_email": "llnguyen@iu.edu",
            "contact_type": "Resource Co-PI"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Le Mai Weakley",
            "contact_email": "llnguyen@iu.edu",
            "contact_type": "Resource news and outages"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Jenn Taylor",
            "contact_email": "jlrobiso@iu.edu",
            "contact_type": "Public relations and media"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Jenn Taylor",
            "contact_email": "jlrobiso@iu.edu",
            "contact_type": "Allocations process"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Mike Lowe",
            "contact_email": "jomlowe@iu.edu",
            "contact_type": "AMIE technical"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Mike Lowe",
            "contact_email": "jomlowe@iu.edu",
            "contact_type": "Metrics and performance data"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Mike Lowe",
            "contact_email": "jomlowe@iu.edu",
            "contact_type": "System administrator"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Mike Lowe",
            "contact_email": "jomlowe@iu.edu",
            "contact_type": "Cybersecurity and incident response"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Mike Lowe",
            "contact_email": "jomlowe@iu.edu",
            "contact_type": "Resource Co-PI"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "IU NOC",
            "contact_email": "noc@iu.edu",
            "contact_type": "Data and networking"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Zach Graber",
            "contact_email": "zegraber@iu.edu",
            "contact_type": "AMIE technical"
        },
        {
            "info_resourceid": "jetstream2.indiana.access-ci.org",
            "project_affiliation": "ACCESS",
            "organization_id": 561,
            "organization_name": "Indiana University",
            "contact_name": "Danny Havert",
            "contact_email": "djhavert@iu.edu",
            "contact_type": "Metrics and performance data"
        }
    ];

    // ContactAvatarClasses.sort(() => Math.random() - Math.random());

    return <div className="w-100 p-2">
        <div className="w-100">
            <h4 className="fs-10 fw-bold mb-1 pe-2 text-medium d-inline">Contacts / Collaborators</h4>
            <button className="btn btn-link text-medium d-inline">
                <i className="bi bi-info-circle-fill fs-7"></i></button>
        </div>
        <div className="row p-2 bg-light rounded-5">
            {contacts.slice(0, NumberOfContactDisplayOnSummary).map((contact, contactIndex) =>
                <CollaboratorProfileAvatarButton key={contactIndex} contact={contact} contactIndex={contactIndex}/>)}
            <div className="col align-content-center ps-1">
                <button className="btn btn-link fs-8">
                    <span className="text-one-line-overflow-ellipsis text text-secondary">
                        +{contacts.length - NumberOfContactDisplayOnSummary}
                    </span>
                </button>
            </div>
            <AddNewCollaboratorButton/>
        </div>
    </div>
}

