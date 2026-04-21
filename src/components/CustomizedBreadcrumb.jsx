import {useLocation} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";
import {DocumentationRouteUrls} from "../pages/docs/DocumentationRoute.jsx";
import {useBadges} from "../contexts/BadgeContext.jsx";
import {useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";

const loadingIndicator = " - "; // <LoadingBlock processing={true}/>;

function CustomizedBreadcrumb() {
    const location = useLocation();
    const {t} = useTranslation();

    const pathname = location.pathname.replace(/\/$/, "");
    const search = location.search;
    const queryParams = new URLSearchParams(search);

    const pathSegments = pathname.split("/")
    const breadcrumbLinks = []
    const {organizationMap, organizationMapByName} = useOrganizations();
    const {getResource} = useResources();
    const {getRoadmap} = useRoadmaps();
    const {getBadge} = useBadges();

    const breadcrumbsRef = useRef(null);

    let key = 1;
    if (pathSegments[1] && pathSegments[1].length > 0) {
        breadcrumbLinks.push({name: "RP Home", href: "https://access-ci.org/get-started/for-resource-providers/"});
    }

    if (pathSegments[1] === "about") {
        breadcrumbLinks.push({name: "Dashboard", href: "/organizations"});
        breadcrumbLinks.push({name: "About", href: "/about"});
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

        breadcrumbLinks.push({name: linkTitleMap[pathname], href: pathname});
    }

    if (pathSegments[1] === "organizations") {
        breadcrumbLinks.push({name: "Dashboard", href: "/organizations"});

        if (pathSegments[2]) {
            const organization = organizationMap[pathSegments[2]];

            breadcrumbLinks.push({
                name: organization ? organization.organization_name : loadingIndicator,
                href: `/organizations/${pathSegments[2]}`
            });

            if (pathSegments[3] === "badge-review" && pathSegments[4]) {
                breadcrumbLinks.push({
                    name: `Review ${t(`badgeWorkflowVerificationStatus.${pathSegments[4]}`)} Badges`,
                    href: `/organizations/${pathSegments[2]}/badge-review/${pathSegments[4]}`
                });
            }
        }
    }


    if (pathSegments[1] === "resources") {
        breadcrumbLinks.push({name: "Dashboard", href: `/organizations`});

        if (pathSegments[2]) {
            const resource = getResource({resourceId: pathSegments[2]});

            if (resource) {
                const organization = organizationMapByName[resource.organization_name];
                if (organization) {
                    breadcrumbLinks.push({
                        name: organization.organization_name,
                        href: `/organizations/${organization.organization_id}`
                    });
                }
            }

            breadcrumbLinks.push({
                name: resource ? resource.resource_descriptive_name : loadingIndicator,
                href: `/resources/${pathSegments[2]}`
            });

            if (pathSegments[3] === "edit") {
                breadcrumbLinks.push({
                    name: "Edit",
                    href: `/resources/${pathSegments[2]}/edit`
                });
            }

            if (pathSegments[3] === "roadmaps" && pathSegments[4]) {
                const roadmap = getRoadmap({roadmapId: pathSegments[4]});

                breadcrumbLinks.push({
                    name: roadmap ? roadmap.name : loadingIndicator,
                    href: `/resources/${pathSegments[2]}/roadmaps/${pathSegments[4]}`
                });

                if (pathSegments[5] === "edit") {
                    breadcrumbLinks.push({
                        name: "Edit",
                        href: `/resources/${pathSegments[2]}/roadmaps/${pathSegments[4]}/edit`
                    });
                } else if (pathSegments[5] === "badges" && !!pathSegments[6]) {
                    const badge = getBadge({badgeId: pathSegments[6]});

                    breadcrumbLinks.push({
                        name: badge ? badge.name : loadingIndicator,
                        href: `/resources/${pathSegments[2]}/roadmaps/${pathSegments[4]}/badges/${pathSegments[6]}`
                    });
                }
            }

        }
    }

    useEffect(() => {
        if (breadcrumbsRef.current) {
            // Wipe out previous breadcrumb
            breadcrumbsRef.current.innerHTML = '';

            // Create a new host for the breadcrumb
            const host = document.createElement('div');
            breadcrumbsRef.current.appendChild(host);

            // Create the new breadcrumb on the new host
            window.ACCESS_CI_UI.breadcrumbs({
                items: breadcrumbLinks,
                target: host // document.getElementById("breadcrumbs")
            });
        }
    }, [breadcrumbLinks]);

    return <div id="my-breadcrumb" className="w-100" ref={breadcrumbsRef}></div>;
}

export default CustomizedBreadcrumb;