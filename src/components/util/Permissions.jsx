import {useLocation, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {IntegrationRoles} from "../../contexts/constants.js";
import {useRoles} from "../../contexts/PermissionContext.jsx";


export function Concierge({children}) {
    return <ShowIfAuthorized roles={[IntegrationRoles.CONCIERGE]}>{children}</ShowIfAuthorized>
}

export function RoadmapMaintainer({children}) {
    return <ShowIfAuthorized roles={[IntegrationRoles.ROADMAP_MAINTAINER]}>{children}</ShowIfAuthorized>
}

export function BadgeMaintainer({children}) {
    return <ShowIfAuthorized roles={[IntegrationRoles.BADGE_MAINTAINER]}>{children}</ShowIfAuthorized>
}

/**
 *
 * @param {import('react').ReactNode} children
 * @param {string []} roles
 * @param {string []} resourceIds
 * @returns {import('react').ReactNode}
 * @constructor
 */
export function ShowIfAuthorized({children, roles, resourceIds}) {
    const {hasPermission} = useRoles();

    if (hasPermission({roles, resourceIds})) {
        return children;
    }
}

/**
 *
 * @param {import('react').ReactNode} children
 * @param {string []} roles
 * @param {string []} resourceIds
 * @returns {import('react').ReactNode}
 * @constructor
 */
export function HideIfAuthorized({children, roles, resourceIds}) {
    const {hasPermission} = useRoles();

    if (!hasPermission({roles, resourceIds})) {
        return children;
    }
}

export function PermissionSwitch() {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const concierge = queryParams.get('concierge');
    //
    // const onSwitchClick = (evt) => {
    //     navigate(location.pathname + (concierge ? "" : "?concierge=true"), {replace: true})
    // }
    //
    // return <nav className="navbar fixed-bottom navbar-light bg-light border-top border-3 border-medium p-2 d-flex">
    //     <div className="flex-wrap"></div>
    //     <div className="ps-5 pe-5">
    //         <Form.Check type="switch" checked={!!concierge} id="concierge-switch"
    //                    label="Concierge Mode" onChange={onSwitchClick}/>
    //     </div>
    // </nav>
}
