import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {RpDashboardResourceStatus, BadgeWorkflowStatus, IntegrationRoles} from "../contexts/constants.js";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import ResourceCard from "../components/resource/ResourceCard.jsx";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import OrgBadgeVerificationStatus from "../components/status/OrgBadgeVerificationStatus.jsx";
import {sortJsonArrayAlphabetically} from "../components/util/sort.jsx";
import ContactsAndCollaboratorsSummary from "../components/share/ContactsAndCollaboratorsSummary.jsx";
import {PermissionSwitch, ShowIfAuthorized} from "../components/util/Permissions.jsx";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function Organization() {
    const {organizationId} = useParams();
    const {organizationMap, fetchOrganization} = useOrganizations();
    const {
        fetchResources,
        getResources, getResourceRoadmaps
    } = useResources();

    const [searchText, setSearchText] = useState("");

    const organization = organizationMap[organizationId];
    let resources = getResources({organizationId, full: true});

    if (resources) {
        resources = sortJsonArrayAlphabetically(resources, "short_name");
    }

    useEffect(() => {
        fetchOrganization({organizationId});
        fetchResources({organizationId, full: true});
    }, [organizationId]);

    // If conditions in the order
    let sections = [
        {
            title: "New",
            description: "Defined in CiDeR; no roadmap or badges selected",
            showContinueSetup: true,
            resources: [],
            rpDashboardResourceStatus: RpDashboardResourceStatus.NEW
        },
        {
            title: "In-Progress",
            description: "Roadmap selected; currently earning required badges OR awaiting production start date. Optional badges do not affect this status",
            showContinueSetup: false,
            resources: [],
            rpDashboardResourceStatus: RpDashboardResourceStatus.IN_PROGRESS
        },
        {
            title: "Production",
            description: "Production start date reached; all required badges completed. Optional badges can be managed dynamically",
            showContinueSetup: false,
            resources: [],
            rpDashboardResourceStatus: RpDashboardResourceStatus.PRODUCTION
        },
        {
            title: "Post-Production",
            description: "Resources that have passed their production end date, but continue to offer some service and may be partially available for post production use",
            showContinueSetup: false,
            resources: [],
            rpDashboardResourceStatus: RpDashboardResourceStatus.POST_PRODUCTION
        }
    ];

    let resourcesProcessing = resources && resources.length > 0; // Set it to processing if there are resources.
    const resourceIds = [];
    for (let i = 0; resources && i < resources.length; i++) {
        let resource = resources[i];
        let resourceId = resource.info_resourceid;
        let resourceRoadmaps = getResourceRoadmaps({resourceId});

        resourceIds.push(resourceId);

        for (let j = 0; j < sections.length; j++) {
            const section = sections[j];

            if (resource && resourceRoadmaps) {
                resourcesProcessing = false;

                if (hasSearchCriteria(organization, resource, searchText) &&
                    section.rpDashboardResourceStatus === resource.rp_dashboard_resource_status) {

                    section.resources.push(resource);
                    break;
                }
            }
        }
    }

    // Add new resource card is enabled for "null"
    sections[0].resources.push(null);

    sections = sections.filter(section => section.resources.length > 0);

    return <div className="container">
        <PermissionSwitch/>
        <div className="row">
            <div className="col-sm-3 p-3 align-content-center" style={{maxWidth: 300}}>
                {organization && <div className="w-100 bg-white" style={{
                    backgroundImage: `url(${organization.other_attributes.organization_logo_url})`,
                    backgroundRepeat: "no-repeat", backgroundSize: "contain",
                    backgroundPosition: "center", height: 200
                }}/>}
            </div>
            <div className="col align-content-center">
                <h1 className="p-3">{organization.organization_name}</h1>
            </div>
            <ShowIfAuthorized
                resourceIds={resourceIds}
                roles={[IntegrationRoles.IMPLEMENTER, IntegrationRoles.COORDINATOR, IntegrationRoles.CONCIERGE]}>
                <div className="col-sm-3 pt-3 align-content-start d-flex flex-column" style={{minWidth: 280}}>
                    <div>
                        <ContactsAndCollaboratorsSummary organizationId={organizationId}/>
                    </div>
                    <div className="flex-fill align-content-end pe-3 mt-2 mb-2">
                        <h2 className="fs-6 text-gray-700">Badge Verification <br/>Status</h2>
                        <OrgBadgeVerificationStatus organizationId={organizationId}
                                                    badgeWorkflowStatus={BadgeWorkflowStatus.VERIFICATION_FAILED}/>
                    </div>
                </div>
            </ShowIfAuthorized>
        </div>

        <div className="row">
            <div className="col-12">
                <div className="input-group mb-3 search-input">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                    <input type="text" className="form-control"
                           placeholder="Search Resource by Name, Type, ResourceBadge, etc"
                           aria-label="Search keywords" onChange={(e) => setSearchText(e.target.value)}/>
                </div>
            </div>

            <div className="w-100">
                {resourcesProcessing && <LoadingBlock/>}

                {!resourcesProcessing && sections.length === 0 &&
                    <div className="w-100 p-3 text-center lead">
                        There are no resource in this organization
                    </div>}

                {!resourcesProcessing && sections.map((section, sectionIndex) => {
                    const tooltip = <Tooltip id="tooltip">
                        {section.description}
                    </Tooltip>;

                    return <div className="w-100 pt-5 pb-2" key={sectionIndex}>
                        <div className="w-100 text-start pb-2">
                            <h2 className="d-inline me-4">
                                {section.title} ({section.resources.filter(r => !!r).length})</h2>
                            <OverlayTrigger overlay={tooltip} placement="right" delayShow={300} delayHide={150}>
                                <button className="btn btn-link text-yellow d-inline"><i
                                    className="bi bi-question-square-fill"></i></button>
                            </OverlayTrigger>
                        </div>

                        <div className="w-100 row row-cols-lg-3 row-cols-md-2 row-cols-1">
                            {section.resources.map((resource, resourceIndex) => {
                                if (resource === null) {
                                    return <ShowIfAuthorized resourceIds={resourceIds}
                                                             roles={[IntegrationRoles.COORDINATOR, IntegrationRoles.CONCIERGE]}>
                                        <div className="col p-3">
                                            <ResourceCard organization={organization} resource={null}/>
                                        </div>
                                    </ShowIfAuthorized>
                                }

                                return <div className="col p-3" key={resourceIndex}>
                                    <ResourceCard organization={organization} resource={resource}
                                                  inProgress={section.showContinueSetup}/>
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}

function hasSearchCriteria(organization, resource, searchText) {
    searchText = searchText.toLowerCase();

    let answer = false;

    if (resource) {
        // Resource name
        answer = answer || resource.resource_descriptive_name.toLowerCase().indexOf(searchText) >= 0;

        // Resource Description
        answer = answer || (resource.resource_description && resource.resource_description.toLowerCase().indexOf(searchText) >= 0);

        // Resource type
        answer = answer || resource.cider_type.toLowerCase().indexOf(searchText) >= 0;
    }

    return answer;
}
