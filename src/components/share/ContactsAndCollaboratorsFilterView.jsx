import {Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useEffect, useState} from "react";
import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import ContactsAndCollaboratorsTable from "./ContactsAndCollaboratorsTable.jsx";
import Select from 'react-select';
import LoadingBlock from "../util/LoadingBlock.jsx";


const CopyStatus = {
    success: "Copied to clipboard",
    error: "Could not copy",
    inProgress: "Copying...",
}

export default function ContactsAndCollaboratorsFilterView(
    {
        organizationId = null, resourceId = null, roadmapId = null, badgeId = null,
        contactType = null, contactEmail = null
    } = {}
) {
    const {getOrganizations, getOrganization} = useOrganizations();
    const {getResources, getResource} = useResources();
    const {getRoadmaps, getRoadmap} = useRoadmaps();
    const {getBadges, getBadge} = useBadges();

    const organizations = getOrganizations();
    const resources = getResources();
    const roadmaps = getRoadmaps();
    const badges = getBadges();

    const [selectedOrganizationIds, setSelectedOrganizationIds] = useState([]);
    const [selectedResourceIds, setSelectedResourceIds] = useState([]);
    const [selectedResourceStatuses, setSelectedResourceStatuses] = useState([]);
    const [selectedRoadmapIds, setSelectedRoadmapIds] = useState([]);
    const [selectedBadgeIds, setSelectedBadgeIds] = useState([]);
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        setProcessing(true);

        const organization = getOrganization({organizationId});
        const resource = getResource({resourceId});
        const roadmap = getRoadmap({roadmapId});
        const badge = getBadge({badgeId});

        organization && setSelectedOrganizationIds([{value: organizationId, label: organization.organization_name}]);
        resource && setSelectedResourceIds([{value: resourceId, label: resource.resource_descriptive_name}]);
        roadmap && setSelectedRoadmapIds([{value: roadmapId, label: roadmap.name}]);
        badge && setSelectedBadgeIds([{value: badgeId, label: badge.name}]);

        setProcessing(false);
    }, [organizationId, resourceId, roadmapId, badgeId, contactType, contactEmail]);

    const contactFilters = [
        {
            "title": "Organization (s)",
            "options": organizations.map(organization => ({
                label: organization.organization_name,
                value: organization.organization_id
            })),
            state: selectedOrganizationIds,
            set: setSelectedOrganizationIds
        },
        {
            "title": "Resource (s)",
            "options": resources.map(resource => ({
                label: resource.resource_descriptive_name,
                value: resource.info_resourceid
            })),
            state: selectedResourceIds,
            set: setSelectedResourceIds
        },
        // {
        //     "title": "Resource Status (s)",
        //     "options": ["In-Progress", "Production", "Post-Production"],
        //     get: () => selectedResourceStatuses,
        //     set: setSelectedResourceStatuses
        // },
        {
            "title": "Roadmaps (s)",
            "options": roadmaps.map(roadmap => ({label: roadmap.name, value: roadmap.roadmap_id})),
            state: selectedRoadmapIds,
            set: setSelectedRoadmapIds
        },
        {
            "title": "Badge (s)",
            "options": badges.map(badge => ({label: badge.name, value: badge.badge_id})),
            state: selectedBadgeIds,
            set: setSelectedBadgeIds
        }
    ];

    return <div className="w-100">
        <div className="w-100">
            <div className="row pb-3 ps-3 pe-3">
                {contactFilters.map((contactFilter, contactFilterIndex) => {
                    return <div className="col-lg-3 col-md-6 col-sm-6 p-2 d-flex flex-column" key={contactFilterIndex}>
                        <h4 className="fs-8">{contactFilter.title}</h4>
                        <div className="flex-fill">
                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                name="colors"
                                options={contactFilter.options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={contactFilter.set}
                                value={contactFilter.state}
                            />
                        </div>
                    </div>
                })}

            </div>
            <div className="col-sm-12">
                <LoadingBlock processing={processing}/>
                {!processing && <ContactsAndCollaboratorsTable
                    organizationId={selectedOrganizationIds.map(({value}) => value)}
                    resourceId={selectedResourceIds.map(({value}) => value)}
                    roadmapId={selectedRoadmapIds.map(({value}) => value)}
                    badgeId={selectedBadgeIds.map(({value}) => value)}/>}
            </div>
        </div>
    </div>

}

