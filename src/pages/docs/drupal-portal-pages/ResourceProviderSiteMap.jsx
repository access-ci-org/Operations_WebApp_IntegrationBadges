import {useState} from "react";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function ResourceProviderSiteMap() {

    const siteMapSections = [
        {
            "title": "Resource Providers",
            "links": [
                {
                    "name": "About",
                    "url": "https://access-ci.org/get-started/for-resource-providers/"
                },
                {
                    "name": "Become a Resource Provider",
                    "url": "https://dashboard.operations.access-ci.org/IntegrationBadgesUI/docs/why-become-an-rp"
                }
            ]
        },
        {
            "title": "News",
            "links": [
                {
                    "name": "Resource Provider News",
                    "url": "https://access-ci.org/tag/resource-providers/"
                },
                {
                    "name": "Integration News",
                    "url": "https://operations.access-ci.org/integration_news"
                },
                {
                    "name": "Systems Status News",
                    "url": "https://operations.access-ci.org/infrastructure_news_view"
                }
            ]
        },
        {
            "title": "Resource Integration",
            "links": [
                {
                    "name": "Why Integrate Resources",
                    "url": "https://dashboard.operations.access-ci.org/dashboard/integration/docs/why-should-i-integrate-resources"
                },
                {
                    "name": "Start a New Integration",
                    "url": "https://dashboard.operations.access-ci.org/IntegrationBadgesUI/docs"
                },
                {
                    "name": "Step-by-Step Integration Process",
                    "url": "https://dashboard.operations.access-ci.org/dashboard/integration/docs/how-to-integrate-resource"
                },
                {
                    "name": "Available Integration Roadmaps",
                    "url": "https://dashboard.operations.access-ci.org/dashboard/integration/docs/how-to-choose-roadmap"
                },
                {
                    "name": "Integration Dashboard",
                    "url": "https://dashboard.operations.access-ci.org/IntegrationBadgesUI/organizations"
                }
            ]
        },
        {
            "title": "Registry",
            "links": [
                {
                    "name": "CyberInfrastructure Description Repository (CiDER)",
                    "url": "https://operations.access-ci.org/node/519"
                },
                {
                    "name": "Information Publishing Framework (IPF)",
                    "url": "https://github.com/access-ci-org/ipf"
                },
                {
                    "name": "Resource Provider Software Discovery",
                    "url": "https://operations.access-ci.org/software_discovery"
                }
            ]
        },
        {
            "title": "Contact",
            "links": [
                {
                    "name": "Help Ticket",
                    "url": "https://operations.access-ci.org/open-operations-request/"
                },
                {
                    "name": "Security Ticket",
                    "url": "https://operations.access-ci.org/report-security-incident/"
                },
                {
                    "name": "Ticket System FAQ",
                    "url": "https://operations.access-ci.org/faqs"
                },
                {
                    "name": "About Ticketing System",
                    "url": "https://dashboard.operations.access-ci.org/dashboard/integration/docs/what-is-ticketing-system"
                },
                {
                    "name": "Concierge Integration Experts (CIE)",
                    "url": "https://operations.access-ci.org/pub/concierge_integration_experts"
                }
            ]
        },
        {
            "title": "Engagement",
            "links": [
                {
                    "name": "Events & Training",
                    "url": "https://support.access-ci.org/events"
                },
                {
                    "name": "Affinity Groups",
                    "url": "https://support.access-ci.org/affinity-groups"
                },
                {
                    "name": "Resource Provider Forum",
                    "url": "https://access-ci.atlassian.net/wiki/spaces/ACP/pages/27066393/ACCESS+Resource+Provider+Forum"
                },
                {
                    "name": "Get Involved",
                    "url": "https://access-ci.org/about/get-involved/"
                },
                {
                    "name": "Slack",
                    "url": "https://rpaccesscommu-wyz4369.slack.com/"
                }
            ]
        },
        {
            "title": "Monitoring",
            "links": [
                {
                    "name": "Nagios",
                    "url": "https://operations.access-ci.org/online_services/monitoring_service"
                },
                {
                    "name": "Syslogs",
                    "url": "https://operations.access-ci.org/online_services/central_logging"
                },
                {
                    "name": "Service Index",
                    "url": "https://operations.access-ci.org/online_services/service_index"
                },
                {
                    "name": "Usage Tracking",
                    "url": "https://operations.access-ci.org/online_services/usage_tracking"
                }
            ]
        },
        {
            "title": "Documentation",
            "links": [
                {
                    "name": "Source Code Repository",
                    "url": "https://operations.access-ci.org/online_services/source_repository"
                },
                {
                    "name": "Get ReadTheDocs",
                    "url": "https://readthedocs.access-ci.org/en/latest/"
                },
                {
                    "name": "Use Toolkits",
                    "url": "https://readthedocs.access-ci.org/projects/toolkits/en/latest/"
                },
                {
                    "name": "ACCESS Documentation",
                    "url": "https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation"
                },
                {
                    "name": "ACCESS Knowledge Base",
                    "url": "https://support.access-ci.org/knowledge-base/resources"
                }
            ]
        },
        {
            "title": "More",
            "links": [
                {
                    "name": "ACCESS Wide Researcher Site Map",
                    "url": "https://access-ci.org/site-map/"
                }
            ]
        }
    ]

    return (<div className="container">
        <div className="w-100 pb-5 mb-5">
            <h1 className="w-100 pt-5 text-dark">
                Resource Provider Site Map
            </h1>
        </div>
        <div className="row">
            {siteMapSections.map((siteMapSection, siteMapSectionIndex) => {
                return <div className="col-lg-3 col-md-4 col-sm-6 pb-3" key={siteMapSectionIndex}>
                    <h4>{siteMapSection.title}</h4>
                    <ul className="list-unstyled ms-0">
                        {siteMapSection.links.map((link, linkIndex) => {
                            return <li key={linkIndex}>
                                <Link to={link.url} className="btn btn-link fw-normal text-medium text-decoration-none mb-2">{link.name}</Link>
                            </li>
                        })}
                    </ul>
                </div>
            })}
        </div>
    </div>);
}