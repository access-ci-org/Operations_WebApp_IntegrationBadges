import {useResources} from "../../../contexts/ResourcesContext.jsx";
import {useEffect} from "react";
import BadgeStatus from "../../status/BadgeStatus.jsx";

export default function ResourceBadgeLog({resourceId, roadmapId, badgeId}) {
    const {
        fetchResourceRoadmapBadgeLogs,
        getResourceRoadmapBadgeLogs
    } = useResources();

    let logs = getResourceRoadmapBadgeLogs({resourceId, roadmapId, badgeId});

    useEffect(() => {
        fetchResourceRoadmapBadgeLogs({resourceId, roadmapId, badgeId});
    }, [resourceId, badgeId]);

    return <div className="w-100">

        {logs && logs.map((log, logIndex) => {
            const logId = log.id;
            const comment = log.comment;
            const status = log.status;
            const lastUpdatedAt = new Date(Date.parse(log.status_updated_at));
            const lastUpdatedBy = log.status_updated_by;

            return <div className="d-flex flex-row pb-5" key={logIndex}>
                <div className="text-end pe-3" style={{minWidth: 200, maxWidth: 200}}>
                    <BadgeStatus status={status}/>
                </div>
                <div className="flex-fill border-start border-gray-200">
                    <div
                        className="w-100 mt-1 ps-3 fs-9 text-start text-gray-600">{lastUpdatedAt.toLocaleString()} by {lastUpdatedBy}</div>
                    <div className="w-100 border-2 ps-3">
                        {comment && <div className="w-100 pt-2 fs-7 d-flex flex-row">
                            <i className="bi bi-chat-right-text-fill pe-2 text-gray-500"></i>
                            <div>
                                <span
                                    className="pre-wrap-text text-break ps-2 pe-2 pt-1 pb-1 d-inline-block bg-gray-100 rounded rounded-2">
                                    {comment}</span>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        })}
    </div>
}