import ResourceCard from "./ResourceCard/ResourceCard";
import ResourceInstitutionSection from "./ResourceInstitutionSection";

const ANTON = {
    type: "Compute",
    name: "PSC Anton 2 Special-Purpose Supercomputer for Molecular Dynamics Simulation",
    institution: "Pittsburgh Supercomputing Center",
    description: "Anton is a special purpose supercomputer for biomolecular simulation designed and constructed " +
        "by D. E. Shaw Research (DESRES). PSC's current system is known as Anton 2 and is a successor to " +
        "the original Anton 1 machine hosted here.",
    status: "Active",
    badges: [{
        name: "ACCESS Resource Description",
        description: "If you have any questions or issue related to this resource like raise a support request " +
            "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
            "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
            "usage metrics, etc. ",
        status: "Verified",
        source: "PSC Anton 2 Special-Purpose Supercomputer for Molecular Dynamics Simulation",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }, {
        name: "Ticket Handling",
        description: "If you have any questions or issue related to this resource like raise a support request " +
            "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
            "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
            "usage metrics, etc. ",
        status: "Verified",
        source: "PSC Anton 2 Special-Purpose Supercomputer for Molecular Dynamics Simulation",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }, {
        name: "Badge ABC",
        description: "This is a badge description. This is a badge description. This is a badge description. " +
            "This is a badge description. This is a badge description. This is a badge description. ",
        status: "Verified",
        source: "PSC Anton 2 Special-Purpose Supercomputer for Molecular Dynamics Simulation",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }, {
        name: "Another Badge",
        description: "This is a badge description. This is a badge description. This is a badge description. " +
            "This is a badge description. This is a badge description. This is a badge description. ",
        status: "Verified",
        source: "PSC Anton 2 Special-Purpose Supercomputer for Molecular Dynamics Simulation",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }, {
        name: "Badge for XYX",
        description: "This is a badge description. This is a badge description. This is a badge description. " +
            "This is a badge description. This is a badge description. This is a badge description. ",
        status: "Verified",
        source: "PSC Anton 2 Special-Purpose Supercomputer for Molecular Dynamics Simulation",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }]}

const Indiana = {
    id: 1,
    institution: "Indiana University",
    count: 6,
    resources: [
        {
            id: 1,
            type: "Compute",
            name: "Indiana Jetstream2",
            institution: "Indiana University",
            description: "Jetstream2 is a hybrid-cloud platform that provides flexible, on-demand, " +
                "programmable cyberinfrastructure tools ranging from interactive virtual machine services to a " +
                "variety of infrastructure and orchestration services for research and education. The primary resource " +
                "is a state something something something something something something something something something.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge for XYX",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }]
        },
        {
            id: 2,
            type: "Compute",
            name: "Indiana Jetstream2 CPU",
            institution: "Indiana University",
            description: "Jetstream2 is a hybrid-cloud platform that provides flexible, on-demand, " +
                "programmable cyberinfrastructure tools ranging from interactive virtual machine services to a " +
                "variety of infrastructure and orchestration services for research and education. The primary resource " +
                "is a state something something something something something something something something something.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge for XYX",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }]
        },
        {
            id: 3,
            type: "Compute",
            name: "Indiana Jetstream2 GPU",
            institution: "Indiana University",
            description: "Jetstream2 is a hybrid-cloud platform that provides flexible, on-demand, " +
                "programmable cyberinfrastructure tools ranging from interactive virtual machine services to a " +
                "variety of infrastructure and orchestration services for research and education. The primary resource " +
                "is a state something something something something something something something something something.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge for XYX",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }]
        },
        {
            id: 4,
            type: "Compute",
            name: "Indiana Jetstream2 Large Language Model",
            institution: "Indiana University",
            description: "Jetstream2 is a hybrid-cloud platform that provides flexible, on-demand, " +
                "programmable cyberinfrastructure tools ranging from interactive virtual machine services to a " +
                "variety of infrastructure and orchestration services for research and education. The primary resource " +
                "is a state something something something something something something something something something.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge for XYX",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }]
        },
        {
            id: 5,
            type: "Compute",
            name: "Indiana Jetstream2 Large Language Model",
            institution: "Indiana University",
            description: "Jetstream2 is a hybrid-cloud platform that provides flexible, on-demand, " +
                "programmable cyberinfrastructure tools ranging from interactive virtual machine services to a " +
                "variety of infrastructure and orchestration services for research and education. The primary resource " +
                "is a state something something something something something something something something something.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge for XYX",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }]
        },
        {
            id: 6,
            type: "Compute",
            name: "Indiana Jetstream2 Large Language Model",
            institution: "Indiana University",
            description: "Jetstream2 is a hybrid-cloud platform that provides flexible, on-demand, " +
                "programmable cyberinfrastructure tools ranging from interactive virtual machine services to a " +
                "variety of infrastructure and orchestration services for research and education. The primary resource " +
                "is a state something something something something something something something something something.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Unverified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge for XYX",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "Indiana Jetstream2 CPU",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }]
        },
    ]
}

const NCSA = {
    id: 2,
    institution: "National Center for Supercomputing Applications",
    count: 3,
    resources: [
        {
            id: 1,
            type: "Compute",
            name: "NCSA Delta CPU (Delta CPU)",
            institution: "National Center for Supercomputing Applications",
            description: "The Delta Storage resource provides storage allocations for projects using the Delta CPU and " +
                "Delta GPU resources. It delivers 7PB of capacity to projects on Delta and will be augmented by a later " +
                "expansion of 3PB of flash capacity for high-performance storage.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge for XYX",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }]},
        {
            id: 2,
            type: "Storage",
            name: "NCSA Delta Storage (Delta Storage)",
            institution: "National Center for Supercomputing Applications",
            description: "The Delta Storage resource provides storage allocations for projects using the Delta CPU and " +
                "Delta GPU resources. It delivers 7PB of capacity to projects on Delta and will be augmented by a later " +
                "expansion of 3PB of flash capacity for high-performance storage.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge for XYX",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }]},
        {
            id: 3,
            type: "Storage",
            name: "NCSA Delta GPU (Delta GPU)",
            institution: "National Center for Supercomputing Applications",
            description: "The Delta Storage resource provides storage allocations for projects using the Delta CPU and " +
                "Delta GPU resources. It delivers 7PB of capacity to projects on Delta and will be augmented by a later " +
                "expansion of 3PB of flash capacity for high-performance storage.",
            status: "Active",
            count: 5,
            badges: [{
                name: "ACCESS Resource Description",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Verified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Ticket Handling",
                description: "If you have any questions or issue related to this resource like raise a support request " +
                    "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                    "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                    "usage metrics, etc. ",
                status: "Unverified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Badge ABC",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description. This is a badge description. ",
                status: "Unverified",
                source: "NCSA Delta Storage",
                actionUrl: "https://jetstream2.tacc.utexas.edu/",
                actionText: "Submit a Ticket"
            }, {
                name: "Another Badge",
                description: "This is a badge description. This is a badge description. This is a badge description. " +
                    "This is a badge description. This is a badge description.",
            }],
        }
    ]
}

const data = [Indiana, NCSA];

export function ResourceList() {
    return (
        <div className="container-fluid resource-list">
            {data.map((institution, index) => (
                <ResourceInstitutionSection key={index} data={institution}/>
            ))}
        </div>
    )
}