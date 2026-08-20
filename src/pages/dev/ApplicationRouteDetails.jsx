import ReadmeRenderer from "./ReadmeRenderer.jsx";
import {useParams} from "react-router-dom";
import {getRouteFromDetailsPath} from "./application-routes-util.jsx";

export default function ApplicationRouteDetails() {

    const {routeDetailsPath} = useParams();

    const route = getRouteFromDetailsPath(routeDetailsPath);

    return <div className="w-100">
        <div className="w-100 mb-5">
            <ReadmeRenderer>{route.detailedMarkdown}</ReadmeRenderer>
        </div>
        <div className="w-100 mb-3">
            <h6 className="d-inline">Total page count : </h6>
            {route.urlCount}
        </div>
        <div className="w-100 mb-3">
            <h6>Examples:</h6>
            <ul>
                <li>{route.example}</li>
            </ul>
        </div>
    </div>;
}