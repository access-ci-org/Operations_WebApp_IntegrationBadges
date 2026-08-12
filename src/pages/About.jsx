import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import JSONGrid from '@redheadphone/react-json-grid'
import pkg from '../../package.json';
import {Nav} from "react-bootstrap";
import {useRoles} from "../contexts/PermissionContext.jsx";
import ApplicationRoutesConfig from "./application-routes-config.jsx";
import {useResources} from "../contexts/ResourcesContext.jsx";
import {useOrganizations} from "../contexts/OrganizationsContext.jsx";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";
import {useBadges} from "../contexts/BadgeContext.jsx";
import {useTasks} from "../contexts/TaskContext.jsx";
import {ProtectedRouteElement} from "../components/util/Permissions.jsx";
import {AppRouteUrls} from "./pages-config.js";


/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function About() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let format = queryParams.get('display-format');

    const {roleMap} = useRoles();

    const [theme] = useState("remedy");

    // const availableThemes = ["default", "dracula", "monokai", "oceanicPark", "panda", "gruvboxMaterial", "tokyoNight", "remedy", "atlanticNight", "defaultLight", "defaultLight2", "slime", "spacegray", "blueberryDark", "nord", "nightOwl", "oneMonokai", "cobaltNext", "shadesOfPurple", "codeBlue", "softEra", "atomMaterial", "evaDark", "moonLight"];

    if (format) format = format.toLowerCase();
    if (["json", "html"].indexOf(format) < 0) {
        format = "html";
    }

    const activeTabKey = "/about" + (format ? `?display-format=${format}` : "")

    const data = {
        "Settings Variables": window.SETTINGS,
        "Roles": roleMap,
        "Webapp NPM Package": pkg
    }

    const tabs = [
        {"title": "HTML", link: "/about?display-format=html"},
        {"title": "JSON", link: "/about?display-format=json"},
    ]

    return <div className="container">
        <div className="row">
            <h1>About</h1>
        </div>
        <div className="row">
            <div className="w-100 d-flex flex-row pt-2 pb-4">

                <div className="flex-fill">
                    <Nav variant="underline" activeKey={activeTabKey}
                         className="pe-3 border-bottom border-1 border-gray-200">
                        {tabs.map((tab, tabIndex) => <Nav.Item key={tabIndex}>
                            <Nav.Link eventKey={tab.link} to={tab.link} as={Link}>
                                {tab.title}
                            </Nav.Link>
                        </Nav.Item>)}
                    </Nav>
                </div>

                {/*<div>*/}
                {/*    <Form.Select size="sm" aria-label="Table theme dropdown"*/}
                {/*                 onChange={(event) => setTheme(event.target.value)}>*/}
                {/*        {availableThemes.map((t, i) =>*/}
                {/*            (<option key={i} value={t}>{t}</option>))}*/}
                {/*    </Form.Select>*/}
                {/*</div>*/}
            </div>

            {format === "html" && <JSONGrid data={data} defaultExpandDepth={100} theme={theme}/>}

            {format === "json" && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
        <div className="w-100 pt-5">
            <h2>Application Route Summary</h2>
            <ApplicationRouteSummary/>
        </div>
    </div>
        ;
}

function ApplicationRouteSummary() {

    const {getOrganizations} = useOrganizations();
    const {
        fetchResources, fetchResourceRoadmapBadges, fetchResourceRoadmapBadgeTasks,
        getResourceRoadmapBadges, getResourceRoadmapBadgeTasks,
        getResources
    } = useResources();
    const {getRoadmaps} = useRoadmaps();
    const {getBadges} = useBadges();
    const {getTasks} = useTasks();

    const organizations = getOrganizations();
    const resources = getResources();
    const roadmaps = getRoadmaps();
    const badges = getBadges();
    const tasks = getTasks();

    const resourceRoadmapBadges = getResourceRoadmapBadges();
    const resourceRoadmapBadgeTasks = getResourceRoadmapBadgeTasks();

    useEffect(() => {
        fetchResources({full: true});
        fetchResourceRoadmapBadges();
        fetchResourceRoadmapBadgeTasks();
    }, []);

    const getRouteListItemsBFSList = (config, listOfRouteListItems = []) => {
        for (let route of Object.values(config)) {
            if (route.index) continue;

            let urlCount = 1;

            // Replacing to "verification-failed" because the webapp uses only that route
            route.path = route.path.replace(":badgeWorkflowStatus", "verification-failed")

            const organizationId = route.path.indexOf(":organizationId") >= 0;
            const resourceId = route.path.indexOf(":resourceId") >= 0;
            const roadmapId = route.path.indexOf(":roadmapId") >= 0;
            const badgeId = route.path.indexOf(":badgeId") >= 0;
            const taskId = route.path.indexOf(":taskId") >= 0;

            let example;
            let exampleUrl = route.path;

            try {
                if (organizationId) {
                    urlCount = organizations.length;
                    if (urlCount) example = organizations[0];
                } else if (resourceId) {
                    if (roadmapId) {
                        if (badgeId) {
                            if (taskId) {
                                urlCount = resourceRoadmapBadgeTasks.length;
                                if (urlCount) example = resourceRoadmapBadgeTasks[0];
                            } else {
                                urlCount = resourceRoadmapBadges.length;
                                if (urlCount) example = resourceRoadmapBadges[0];
                            }
                        } else {
                            const roadmapEnrolledResources = resources.filter(r => r.roadmaps && r.roadmaps.length > 0);
                            urlCount = Math.sumPrecise(roadmapEnrolledResources.map(r => r.roadmaps.length));
                            if (urlCount) example = {
                                info_resourceid: resources[0].info_resourceid,
                                roadmap_id: resources[0].roadmaps[0].roadmap_id
                            };
                        }
                    } else {
                        if (route.path === AppRouteUrls.RESOURCE_EDIT) {
                            const newResources = resources.filter(r => r.roadmaps && r.roadmaps.length === 0);
                            urlCount = newResources.length;
                            if (urlCount) example = newResources[0];
                        } else {
                            urlCount = resources.length;
                            if (urlCount) example = resources[0];
                        }
                    }
                } else if (roadmapId) {
                    if (badgeId) {
                        if (taskId) { /* empty */
                        }
                    } else {
                        urlCount = roadmaps.length;
                        if (urlCount) example = roadmaps[0];
                    }
                } else if (badgeId) {
                    if (taskId) { /* empty */
                    } else {
                        urlCount = badges.length;
                        if (urlCount) example = badges[0];
                    }
                } else if (taskId) {
                    urlCount = tasks.length;
                    if (urlCount) example = tasks[0];
                }

                if (urlCount) {
                    exampleUrl = exampleUrl
                        .replace(":organizationId", example.organization_id)
                        .replace(":resourceId", example.info_resourceid)
                        .replace(":roadmapId", example.roadmap_id)
                        .replace(":badgeId", example.badge_id)
                        .replace(":resourceId", example.task_id);
                }
            } catch { /* empty */
            }

            if (route.name) {
                listOfRouteListItems.push({
                    name: route.name,
                    description: route.description,
                    path: route.path,
                    authenticationRequired: route.element.type === ProtectedRouteElement,
                    authorizedRoles: route.element.props.roles,
                    urlCount: urlCount,
                    example: <Link to={exampleUrl}>{exampleUrl}</Link>
                });
            }

            if (route.children) getRouteListItemsBFSList(route.children, listOfRouteListItems);
        }

        return listOfRouteListItems;
    };

    const data = getRouteListItemsBFSList(ApplicationRoutesConfig);

    return (
        <div className="w-100">
            <table className="table table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Route</th>
                    <th scope="col">Path</th>
                    <th scope="col">Page Count</th>
                </tr>
                </thead>
                <tbody>
                {data.map((
                    {name, description, path, authenticationRequired, authorizedRoles, urlCount, example},
                    routeIndex) =>

                    <tr key={routeIndex}>
                        <th scope="row">{routeIndex + 1}</th>
                        <td>
                            <div style={{maxWidth: "250px"}}>
                                <h3 className="fs-7">{name}</h3>
                                <p>{description}</p>
                            </div>
                        </td>
                        <td>
                            <code dangerouslySetInnerHTML={{
                                __html: path.replaceAll(/:[a-zA-Z0-9_]*/ig, (v) =>
                                    `<span class="ms-1 me-1 badge bg-light">${v}</span>`)
                            }}>
                            </code>

                            <div className="fs-7 mt-3">
                                <strong>Eg: </strong>
                                {example}
                            </div>

                            {authenticationRequired &&
                                <div className="fs-7 mt-3 text-secondary">
                                    <div>
                                        <strong>Authentication:</strong> Required
                                        <i className="ps-1 bi bi-lock-fill"></i>
                                    </div>
                                    {authorizedRoles && authorizedRoles.length > 0 &&
                                        <div className="mt-2">
                                            <strong>Authorized Roles:</strong> {authorizedRoles.join(" ,")}
                                        </div>}
                                </div>}

                        </td>
                        <td>{urlCount}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}