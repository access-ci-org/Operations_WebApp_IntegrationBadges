import placeholder from '../../../assets/img/placeholder_badge.png';
import ArrowUpRightIcon from '../../../assets/img/icons/arrow-up-right.svg';
import WarningIcon from '../../../assets/img/icons/alert-triangle.svg';
import BadgeEditingSection from "./BadgeEditingSection";
import StatusTag from "../../fragments/StatusTag";
import Stepper from "../../fragments/Stepper";
import React, {useEffect, useState} from "react";
import BadgeCommentModal from "./BadgeCommentModal";
import {workflow_states} from "../../../App";
import {Link} from "react-router-dom";

// The support contacts for the badge, static
const supportContacts=[
    {
        url: "https://access-ci.atlassian.net/servicedesk/customer/portal/2",
        text: "Open a Ticket"
    },
    {
        url: "https://operations.access-ci.org/help",
        text: "Support Resources"
    },
];

/**
 * A section that displays the implementor roles of the badge
 * @param {Object} implementorRoles - The implementor roles object created in BadgeDetailSideBar
 */
function ImplementorRoleSection({ implementorRoles }) {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // Flatten the roles, split by commas, and remove duplicates
        const allRoles = implementorRoles.flatMap(task => task.roles.split(',').map(role => role.trim()));
        const uniqueRoles = [...new Set(allRoles)];
        setRoles(uniqueRoles);
    }, [implementorRoles]);

    return (
        <div className="sidebar-section">
            <div className="sidebar-section-title-wrapper">
                <p className="sidebar-section-title">Implementor Roles</p>
            </div>
            <div className="sidebar-section-edit-wrapper">
                {roles.length === 0 ?
                    <p>No implementor roles available.</p>
                    : <p>{roles.join(', ')}</p>
                }
            </div>
        </div>
    );
}

/**
 * A general sidebar section that displays a title and a list of links.
 * @param {string} title - The title of the section
 * @param {Object} links - The list of links to display
 * @param {boolean} icon - Whether to show an icon next to each link
 * @param {boolean} justText - Whether to show only text without links
 */
function SidebarSection({title, links, icon, justText}) {
    return (
        <div className="sidebar-section">
            <div className="sidebar-section-title-wrapper">
                <p className="sidebar-section-title">{title}</p>
            </div>
            <div className="sidebar-section-links">
                {links.length === 0 ?
                    <p>{title} is currently unavailable for this badge.</p>
                    : links.map((link, index) => (
                    justText ?
                        <li key={index}>
                            {link.text}
                            {icon && <img src={ArrowUpRightIcon} className="sidebar-section-icon"/>}
                        </li>
                        : <Link path={link.url} key={index}>
                            {link.text}
                            {icon && <img src={ArrowUpRightIcon} className="sidebar-section-icon"/>}
                        </Link>

                        // <a key={index} href={link.url}>
                        //     {link.text}
                        //     {icon && <ArrowUpRightIcon className="sidebar-section-icon"/>}
                        // </a>
                ))}
            </div>
        </div>
    );
}

/**
 * The sidebar of the badge detail page. It shows the badge status,
 * roadmap links, implementor roles, and support contacts.
 * @param {Resource} resource - The current resource that associates with the badge
 * @param {Function} setResource - The function to update the resource
 * @param {CombinedBadge} badge - The badge object
 * @param {Array<Task>} tasks - The tasks related to the badge
 */
export default function BadgeDetailSideBar({resource, setResource, badge, tasks}) {
    const [roadmapLinks, setRoadmapLinks] = useState([]);
    const [implementorRoles, setImplementorRoles] = useState([]);
    const graphic = placeholder; // TODO: Replace with actual badge graphic

    useEffect(() => {
        const links = resource.roadmaps.map(roadmap => ({
            url: "#", // Placeholder URL
            text: roadmap.roadmap.name
        }));
        setRoadmapLinks(links);
    }, [resource]);

    useEffect(() => {
        const roles = tasks.map(task => ({
            name: task.task.name,
            roles: task.task.implementor_roles
        }));
        setImplementorRoles(roles);
    }, [tasks]);

    return (
        <div className="sidebar-wrapper">
        <img src={graphic} alt="badge"/>
            {
                badge.state !== workflow_states.NOT_PLANNED &&
                <div className="badge-status-wrapper">
                    <p className="badge-status-title">Badge Status</p>
                    <StatusTag title={badge.state} style={{marginBottom: '8px'}}/>
                    <Stepper state={badge.state}/>
                    {badge.state === workflow_states.VERIFICATION_FAILED &&
                        <button className="btn btn-medium planned-style badge-status-comment-btn" data-bs-toggle="modal"
                                data-bs-target={`#BadgeCommentModal${resource.cider_resource_id}${badge.badge_id}`}>
                            <span><img src={WarningIcon}/></span> View Comments
                        </button>
                    }
                </div>
            }
            <SidebarSection title="Roadmaps" links={roadmapLinks} justText/>
            <ImplementorRoleSection implementorRoles={implementorRoles}/>
            <SidebarSection title="Resource Integration Support" links={supportContacts} icon/>
            {(badge.state && badge.state !== workflow_states.NOT_PLANNED) &&
                <BadgeEditingSection label={badge.badge_access_url_label}
                                     url={badge.badge_access_url}
                                     resource_id={resource.cider_resource_id}
                                     badge_id={badge.badge_id}
                                     setResource={setResource}/>
            }
            <BadgeCommentModal id={`BadgeCommentModal${resource.cider_resource_id}${badge.badge_id}`} comment={badge.comment}/>
        </div>
    );
}