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
import {useContacts} from "../contexts/ContactsContext.jsx";


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
        fetchResourceRoadmapBadges, fetchResourceRoadmapBadgeTasks,
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
        fetchResourceRoadmapBadges()
        fetchResourceRoadmapBadgeTasks();
    }, []);

    const getRouteListItemsBFSList = (config, listOfRouteListItems = []) => {
        for (let route of Object.values(config)) {
            if (route.index) continue;

            let urlCount = 1;

            const organizationId = route.path.indexOf(":organizationId") >= 0;
            const resourceId = route.path.indexOf(":resourceId") >= 0;
            const roadmapId = route.path.indexOf(":roadmapId") >= 0;
            const badgeId = route.path.indexOf(":badgeId") >= 0;
            const taskId = route.path.indexOf(":taskId") >= 0;

            try {
                if (organizationId) {
                    urlCount = organizations.length;
                } else if (resourceId) {
                    if (roadmapId) {
                        if (badgeId) {
                            if (taskId) {
                                urlCount = resourceRoadmapBadgeTasks.length;
                            } else {
                                urlCount = resourceRoadmapBadges.length;
                            }
                        } else {
                            urlCount = `Ideally ${resources.length}, Max ${resources.length * roadmaps.length}`;
                        }
                    } else {
                        urlCount = resources.length;
                    }
                } else if (roadmapId) {
                    if (badgeId) {
                        if (taskId) { /* empty */
                        }
                    } else {
                        urlCount = roadmaps.length;
                    }
                } else if (badgeId) {
                    if (taskId) { /* empty */
                    } else {
                        urlCount = badges.length;
                    }
                } else if (taskId) {
                    urlCount = tasks.length;
                }
            } catch { /* empty */
            }

            if (route.name) {
                listOfRouteListItems.push({
                    name: route.name,
                    description: route.description,
                    path: route.path,
                    urlCount: urlCount
                });
            }

            if (route.children) getRouteListItemsBFSList(route.children, listOfRouteListItems);
        }

        return listOfRouteListItems;
    };

    const data = getRouteListItemsBFSList(ApplicationRoutesConfig)

    return (
        <div className="w-100">
            <table className="table table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Route</th>
                    <th scope="col">Path</th>
                    <th scope="col">Count</th>
                </tr>
                </thead>
                <tbody>
                {data.map(({name, description, path, urlCount}, routeIndex) =>
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
                        </td>
                        <td>{urlCount}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}