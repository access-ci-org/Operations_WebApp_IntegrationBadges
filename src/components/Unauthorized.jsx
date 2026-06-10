import {Link} from "react-router-dom";


/**
 *
 * @param {string []} roles
 * @param {string []} resourceIds
 * @returns {import('react').ReactNode}
 */
export default function Unauthorized({roles, resourceIds}) {

    const rolesJsx = roles.map((role, roleIndex) =>
        <span key={roleIndex}>
            {roleIndex > 0 ? <span> or </span> : null}
            <strong className="bg-warning-subtle">{role}</strong>
        </span>);

    const resourcesJsx = resourceIds.map((resourceId, resourceIdIndex) => {
        return <li key={resourceIdIndex}>
            <Link className="btn btn-link" to={`/resources/${resourceId}`}>{resourceId}</Link>
        </li>;
    })

    return <div className="container">
        <div className="w-100 p-5 mt-5 rounded-2 bg-white">
            <div className="w-100 d-flex flex-row align-items-center">
                <div className="fs-1 p-3 text-warning"><i className="bi bi-exclamation-triangle-fill"></i></div>
                <h1 className="ps-4 mb-0 flex-fill">[401] Unauthorized</h1>
            </div>
            <p className="lead p-3 border-start border-5">
                You don't have permissions to view this content.
                If you should have it, please submit an ACCESS ticket requesting:</p>
            <div className="ps-5 pe-5">
                <p>
                    Integration Dashboard {rolesJsx} permission
                    {resourceIds.length > 0 && " for the following resource(s)"}
                </p>
                <ul>
                    {resourcesJsx}
                </ul>
            </div>
        </div>
    </div>
}