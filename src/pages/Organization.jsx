import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ResourceStatus, useResources} from "../contexts/ResourcesContext";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import ResourceCard from "../components/resource/ResourceCard.jsx";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import OrgBadgeVerificationStatus from "../components/status/OrgBadgeVerificationStatus.jsx";
import {BadgeWorkflowStatus} from "../contexts/BadgeContext.jsx";
import {sortJsonArrayAlphabetically} from "../components/util/sort.jsx";

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

    if (!!resources) {
        resources = sortJsonArrayAlphabetically(resources, "short_name");
    }

    useEffect(() => {
        fetchOrganization({organizationId});
        fetchResources({organizationId, full: true});
    }, [organizationId]);

    // If conditions in the order
    let sections = [
        {
            title: "New Resources",
            description: "Defined in CiDeR; no roadmap or badges selected",
            showContinueSetup: true,
            condition: (resource, resourceRoadmaps) => resourceRoadmaps.length === 0,
            resources: [],
        },
        {
            title: "In-Progress Resources",
            description: "Roadmap selected; currently earning required badges OR awaiting production start date. Optional badges do not affect this status",
            showContinueSetup: false,
            condition: (resource, resourceRoadmaps) => resource.latest_status === ResourceStatus.ANNOUNCEMENT ||
                resource.latest_status === ResourceStatus.PRE_PRODUCTION ||
                (resource.latest_status === ResourceStatus.PRODUCTION &&
                    resource.badge_status_summary.required.verified < resource.badge_status_summary.required.total),
            resources: [],
        },
        {
            title: "Production",
            description: "Production start date reached; all required badges completed. Optional badges can be managed dynamically",
            showContinueSetup: false,
            condition: (resource, resourceRoadmaps) => resource.latest_status === ResourceStatus.PRODUCTION &&
                resource.badge_status_summary.required.verified === resource.badge_status_summary.required.total,
            resources: [],
        },
        {
            title: "Post-Production Integrations",
            description: "Resources that have passed their production end date, but continue to offer some service and may be partially available for post production use",
            showContinueSetup: false,
            condition: (resource, resourceRoadmaps) => resource.latest_status === ResourceStatus.POST_PRODUCTION,
            resources: [],
        }
    ];

    let resourcesProcessing = resources && resources.length > 0; // Set it to processing if there are resources.
    for (let i = 0; resources && i < resources.length; i++) {
        let resource = resources[i];
        let resourceId = resource.info_resourceid;
        let resourceRoadmaps = getResourceRoadmaps({resourceId});

        for (let j = 0; j < sections.length; j++) {
            const section = sections[j];

            if (resource && resourceRoadmaps) {
                resourcesProcessing = false;

                if (hasSearchCriteria(organization, resource, searchText) && section.condition(resource, resourceRoadmaps)) {
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
        <div className="row">
            <div className="col-sm-2 col-m-3 col-lg-4 p-3">
                {organization && <div className="w-100 bg-white" style={{
                    backgroundImage: `url(${organization.other_attributes.organization_logo_url})`,
                    backgroundRepeat: "no-repeat", backgroundSize: "contain",
                    backgroundPosition: "center", height: "200px"
                }}/>}
            </div>
            <div className="col d-flex flex-row">
                <div className="flex-fill align-content-center">
                    {organization && <h1 style={{margin: "0px", textAlign: "start"}}>
                        {organization.organization_name}
                    </h1>}
                </div>
                <div className="align-content-center">
                    <div className="border-start ps-5 pe-3">
                        <h2>Badge Verification <br/>Status</h2>
                        <OrgBadgeVerificationStatus organizationId={organizationId}
                                                    badgeWorkflowStatus={BadgeWorkflowStatus.VERIFICATION_FAILED}/>
                    </div>
                </div>
            </div>
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
