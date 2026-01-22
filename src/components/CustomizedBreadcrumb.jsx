import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {Link, useLocation} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {useOrganizations} from "../contexts/OrganizationsContext";
import LoadingBlock from "./util/LoadingBlock.jsx";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";
import {DocumentationRouteUrls} from "../pages/docs/DocumentationRoute.jsx";
import Translate from "../locales/Translate.jsx";

const defaultLinkProps = {className: "btn btn-link text-medium"}

function CustomizedBreadcrumb() {
    const location = useLocation();

    const pathname = location.pathname.replace(/\/$/, "");
    const search = location.search;
    const queryParams = new URLSearchParams(search);

    const pathSegments = pathname.split("/")
    const breadcrumbLinks = []
    const {organizationMap, organizationMapByName} = useOrganizations();
    const {getResource} = useResources();
    const {getRoadmap} = useRoadmaps();

    let key = 1;
    if (pathSegments[1] && pathSegments[1].length > 0) {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link} linkProps={{
            ...defaultLinkProps,
            to: "https://access-ci.org/get-started/for-resource-providers/"
        }}>
            RP Home
        </Breadcrumb.Item>)
    }

    if (pathSegments[1] === "about") {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link}
                                              linkProps={{...defaultLinkProps, to: "/organizations"}}>
            Dashboard
        </Breadcrumb.Item>)

        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link}
                                              linkProps={{...defaultLinkProps, to: "/about"}}>
            About
        </Breadcrumb.Item>)
    }

    if (pathSegments[1] === "docs") {
        const linkTitleMap = {
            [DocumentationRouteUrls.INDEX]: "Integration Process is Simple and Intuitive",
            [DocumentationRouteUrls.WHY_BECOME_AN_RP]: "How & Why Become an RP",
            [DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE]: "How Do I Integrate My Resource into ACCESS",
            [DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP]: "What is an Integration Roadmap and How do I Choose the Right One",
            [DocumentationRouteUrls.WHY_INTEGRATE_RESOURCES]: "Why Should I Integrate My Resource With ACCESS?",
            [DocumentationRouteUrls.WHAT_IS_TICKETING_SYSTEM]: "What is a Ticketing System & How do I Open a Jira/Atlassian Account?",
            [DocumentationRouteUrls.ROADMAPS]: "Available Roadmaps for Integration",
            [DocumentationRouteUrls.BADGES]: "Available Badges for Integration",
        }

        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link} linkProps={{...defaultLinkProps, to: pathname}}>
            {linkTitleMap[pathname]}
        </Breadcrumb.Item>);

    }

    if (pathSegments[1] === "organizations") {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link}
                                              linkProps={{...defaultLinkProps, to: "/organizations"}}>
            Dashboard
        </Breadcrumb.Item>)
        if (pathSegments[2]) {
            const organization = organizationMap[pathSegments[2]];
            breadcrumbLinks.push(<Breadcrumb.Item
                key={key++} linkAs={Link}
                linkProps={{
                    ...defaultLinkProps,
                    to: `/organizations/${pathSegments[2]}`
                }}
            >
                {organization ? organization.organization_name : <LoadingBlock processing={true}/>}
            </Breadcrumb.Item>)


            if (pathSegments[3] === "badge-review" && pathSegments[4]) {
                breadcrumbLinks.push(<Breadcrumb.Item
                    key={key++} linkAs={Link}
                    linkProps={{
                        ...defaultLinkProps,
                        to: `/organizations/${pathSegments[2]}/badge-review/${pathSegments[4]}`
                    }}
                >
                    Review <Translate>badgeWorkflowVerificationStatus.{pathSegments[4]}</Translate> Badges
                </Breadcrumb.Item>)
            }
        }
    }


    if (pathSegments[1] === "resources") {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link}
                                              linkProps={{...defaultLinkProps, to: "/organizations"}}>
            Dashboard
        </Breadcrumb.Item>)
        if (pathSegments[2]) {
            const resource = getResource({resourceId: pathSegments[2]});

            if (resource) {
                const organization = organizationMapByName[resource.organization_name];
                if (organization) {
                    breadcrumbLinks.push(<Breadcrumb.Item
                        key={key++} linkAs={Link}
                        linkProps={{
                            ...defaultLinkProps,
                            to: `/organizations/${organization.organization_id}`
                        }}
                    >
                        {organization.organization_name}
                    </Breadcrumb.Item>)
                }
            }

            breadcrumbLinks.push(<Breadcrumb.Item
                key={key++} linkAs={Link}
                linkProps={{
                    ...defaultLinkProps,
                    to: `/resources/${pathSegments[2]}`
                }}
            >
                {resource ? resource.resource_descriptive_name : <LoadingBlock processing={true}/>}
            </Breadcrumb.Item>)

            if (pathSegments[3] === "edit") {
                breadcrumbLinks.push(<Breadcrumb.Item
                    key={key++} linkAs={Link}
                    linkProps={{
                        ...defaultLinkProps,
                        to: `/resources/${pathSegments[2]}/edit`
                    }}
                >
                    Edit
                </Breadcrumb.Item>)
            }

            if (pathSegments[3] === "roadmaps" && pathSegments[4]) {
                const roadmap = getRoadmap({roadmapId: pathSegments[4]});

                breadcrumbLinks.push(<Breadcrumb.Item
                    key={key++} linkAs={Link}
                    linkProps={{
                        ...defaultLinkProps,
                        to: `/resources/${pathSegments[2]}/roadmaps/${pathSegments[4]}`
                    }}
                >
                    {roadmap ? roadmap.name : <LoadingBlock processing={true}/>}
                </Breadcrumb.Item>)

                if (pathSegments[5] === "edit") {
                    breadcrumbLinks.push(<Breadcrumb.Item
                        key={key++} linkAs={Link}
                        linkProps={{
                            ...defaultLinkProps,
                            to: `/resources/${pathSegments[2]}/roadmaps/${pathSegments[4]}/edit`
                        }}
                    >
                        Edit
                    </Breadcrumb.Item>)
                }
            }

        }
    }

    return (
        <Breadcrumb>
            {breadcrumbLinks}
        </Breadcrumb>
    );
}

export default CustomizedBreadcrumb;