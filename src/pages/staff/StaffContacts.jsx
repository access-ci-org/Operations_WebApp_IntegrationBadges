import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {StaffRoadmapCard} from "../../components/staff/StaffRoadmapCard.jsx";
import GridAndListSwitch from "../../components/util/GridAndListSwitch.jsx";
import ContactsAndCollaboratorsTable from "../../components/share/ContactsAndCollaboratorsTable.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";

export default function StaffContacts() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    let organizationId = queryParams.get('organizationId');
    const resourceId = queryParams.get('resourceId');

    const {getOrganization} = useOrganizations();
    const {getResource} = useResources();

    let resource = getResource({resourceId: resourceId});
    if (!organizationId && resource) organizationId = resource.organization_id;

    let organization = getOrganization({organizationId: organizationId});

    return <div className="container">
        <div className="row visually-hidden">
            <h1>Staff Dashboard - Contacts</h1>
        </div>

        <div className="row mt-2 p-3">

            <div className="col-12 p-0 pb-4">
                <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                    <div className="w-100 d-flex flex-row p-0" style={{borderBottom: "1px dashed"}}>
                        <h2 className="text-medium">Contacts / Collaborators</h2>
                        <div className="flex-fill">
                        </div>
                        <div className="p-2">
                            <button className="btn btn-link rounded-2 btn-sm">
                                <i className="bi bi-gear-fill"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        {organization && <div className="w-100 d-flex flex-row pt-3">
                            <div className="p-2 ps-3" style={{minWidth: 100, minHeight: 100}}>
                                <div className="w-100 h-100 p-2" style={{
                                    backgroundImage: `url(${organization.other_attributes.organization_logo_url})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain",
                                    backgroundPosition: "center"
                                }}/>
                            </div>
                            <div className="flex-fill align-content-center text-start p-2">
                                <h5 className="fs-4 m-0">{organization.organization_name}</h5>
                                {resource &&
                                    <h6 className="fs-6 m-0 mt-2 text-secondary">{resource.resource_descriptive_name}</h6>}
                            </div>
                        </div>}
                        <div className="pt-4">
                            <ContactsAndCollaboratorsTable organizationId={organizationId} resourceId={resourceId}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
