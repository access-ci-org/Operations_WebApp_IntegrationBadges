import {useRoles} from "../../contexts/PermissionContext.jsx";
import pkg from "../../../package.json";

export default function ApplicationConfigsOverview() {
    const {roleMap} = useRoles();

    return <div className="container">
        <div className="row">
            <h2>Application Configs</h2>
        </div>

        <div className="w-100 pt-3 pb-3">
            <h3>Operations API Settings</h3>
            <pre>{JSON.stringify(window.SETTINGS, null, 2)}</pre>
        </div>

        <div className="w-100 pt-3 pb-3">
            <h3>Your Authorized Roles</h3>
            <pre>{JSON.stringify(roleMap, null, 2)}</pre>
        </div>

        <div className="w-100 pt-3 pb-3">
            <h3>package.json</h3>
            <pre>{JSON.stringify(pkg, null, 2)}</pre>
        </div>
    </div>;
}
