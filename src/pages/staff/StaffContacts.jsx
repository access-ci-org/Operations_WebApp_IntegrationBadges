import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {StaffRoadmapCard} from "../../components/staff/StaffRoadmapCard.jsx";
import GridAndListSwitch from "../../components/util/GridAndListSwitch.jsx";
import ContactsAndCollaboratorsTable from "../../components/share/ContactsAndCollaboratorsTable.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import ContactsAndCollaboratorsFilterView from "../../components/share/ContactsAndCollaboratorsFilterView.jsx";

export default function StaffContacts() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    let organizationId = queryParams.get('organizationId');
    const resourceId = queryParams.get('resourceId');

    const {getResource} = useResources();

    let resource = getResource({resourceId: resourceId});
    if (!organizationId && resource) organizationId = resource.organization_id;

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
                    <div className="w-100 pt-4">
                        <ContactsAndCollaboratorsFilterView organizationId={organizationId} resourceId={resourceId}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
