import Form from "react-bootstrap/Form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import ResourceBadgeIcon from "../resource/resource-badge/ResourceBadgeIcon.jsx";
import {DocumentationRouteUrls} from "../../pages/docs/DocumentationRoute.jsx";
import {HtmlToText} from "../util/text-editors.jsx";
import RoadmapName from "../roadmap/RoadmapName.jsx";

export function RoadmapCard({resourceId, roadmapId, selected, toggle}) {
    const navigate = useNavigate();

    const {getResource} = useResources();
    const {getRoadmap} = useRoadmaps();

    const resource = getResource({resourceId});
    const roadmap = getRoadmap({roadmapId});

    const navigateToRoadmap = () => {
        navigate(DocumentationRouteUrls.ROADMAPS + `?roadmapId=${roadmapId}`);
    };

    if (roadmap) {
        return <div className="w-100 h-100 p-4 pt-5">
            <div
                className="w-100 h-100 d-flex flex-column rounded-3 border-gray-200 border border-1 position-relative roadmap-card">
                <div className="w-100 position-absolute text-center roadmap-card-icon-row">
                    <div className="rounded-circle p-3 border d-inline-block bg-white">
                        <div className="background-image-center-no-repeat roadmap-card-icon"
                             style={{backgroundImage: `url(${roadmap.graphic})`}}>
                        </div>
                    </div>
                </div>
                <h3 className="w-100 ps-5 pe-5 pt-2 pb-2 text-center">
                    <RoadmapName  roadmapId={roadmapId} seperator=" "/>
                </h3>

                <p className="w-100 ps-5 pe-5 pt-2 pb-4 flex-fill">
                    <p className="w-100 text-break text-three-line-overflow-ellipsis">
                        <HtmlToText>{roadmap.executive_summary}</HtmlToText>
                    </p>
                </p>

                {resource && selected &&
                    <div className="w-100 p-3 text-center">
                        <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}`}
                              className="btn btn-link m-2">View</Link>
                        <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}/edit`}
                              className="btn btn-link m-2">Edit</Link>
                    </div>}

                <button
                    className={`btn btn-link w-100 p-3 text-center rounded-bottom-3 text-decoration-none ${selected ? 'bg-dark' : 'bg-light'}`}
                    role="button" onClick={!!resource ? toggle : navigateToRoadmap}>
                    {!!resource && !!selected && <span><i className="bi bi-check-circle-fill"></i>&nbsp;&nbsp;Selected</span>}
                    {!!resource && !selected && <span>Select the Roadmap</span>}
                    {!resource && <span>View</span>}
                </button>
            </div>
        </div>
    }
}

export function BadgeCardRow({
                                 resourceId,
                                 roadmapId,
                                 badgeId,
                                 selected,
                                 required,
                                 toggle,
                                 toggleComponent,
                                 actions,
                                 body
                             }) {
    const {getResource} = useResources();
    const {getRoadmap} = useRoadmaps();
    const {getBadge} = useBadges();

    const resource = getResource({resourceId});
    const badge = getBadge({badgeId});
    const roadmap = getRoadmap({roadmapId});

    if (badge) {
        return <div className="w-100 p-1">
            <div className="row rounded-3 border-gray-200 border border-1 badge-card-row">
                <div className="col ps-0 d-flex flex-row align-items-center">
                    {toggleComponent && toggleComponent}
                    <div className="pt-3 pb-3 ps-2 pe-2">
                        <ResourceBadgeIcon badgeId={badgeId}/>
                    </div>
                    <div className="flex-fill p-2 badge-card-row-header">
                        <h4 className="m-0 align-content-center fs-6">{badge.name}</h4>
                    </div>
                </div>

                {!!body ?
                    <div className="col-sm-3 pt-2 pb-2 badge-card-row-description align-content-center">{body}</div> :
                    <div className="col pt-2 pb-2 badge-card-row-description align-content-center">
                        <p className="m-0 align-content-center">
                            <HtmlToText>{badge.resource_provider_summary}</HtmlToText>
                        </p>
                    </div>}

                <div className="col-sm-3 pt-2 pb-2 align-content-center">
                    {!!actions ? actions :
                        <Link
                            to={`${DocumentationRouteUrls.BADGES}?badgeId=${badgeId}`} target="_blank"
                            className="w-100 btn btn-secondary rounded-1 btn-sm">
                            View Additional Badge Details
                        </Link>}
                </div>
            </div>
        </div>
    }
}


export function BadgeCardRowWithCheckboxes({resourceId, roadmapId, badgeId, selected, required, toggle}) {
    let toggleComponent = <RequiredBadgeTooltip required={!!required}>
        <div
            className={`p-3 h-100 rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center ${selected ? 'bg-light' : 'bg-gray-100'}`}
            role="button" onClick={!required ? toggle : null}>
            <Form.Check name="badges" type="checkbox" id={`badge-${badgeId}`} checked={!!selected}
                        onChange={toggle} disabled={!!required}/>
        </div>
    </RequiredBadgeTooltip>;

    return <BadgeCardRow resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId} selected={selected}
                         toggle={toggle} toggleComponent={toggleComponent}/>
}

export function BadgeCardRowWithAddRemove({resourceId, roadmapId, badgeId, selected, required, toggle}) {
    const toggleComponent = <RequiredBadgeTooltip required={!!required}>
        <div
            className={`p-3 h-100 rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center bg-gray-100 fs-4`}
            role="button" onClick={!required ? toggle : null}>
            {!!required ?
                <i className="bi bi-slash-circle text-gray-200"></i> :
                !!selected ?
                    <i className="bi bi-dash"></i> :
                    <i className="bi bi-plus"></i>}
        </div>
    </RequiredBadgeTooltip>

    return <BadgeCardRow resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId} selected={selected}
                         required={required} toggle={toggle} toggleComponent={toggleComponent}/>
}

export function BadgeCardRowWithRequiredLabel({resourceId, roadmapId, badgeId, selected, required, toggle}) {
    const toggleComponent = <div
        className="p-3 h-100 bg-gray-100 rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
        role="button">
    </div>

    const body = <div className="text-center">
        {!!required ? <small className="ps-2 pe-2 pt-1 pb-1 rounded-1 text-nowrap bg-dark-subtle text-black">
                Required</small> :
            <small className="ps-2 pe-2 pt-1 pb-1 rounded-1 text-nowrap bg-secondary-subtle text-white">
                Not Required</small>}
    </div>;

    return <BadgeCardRow resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId} selected={selected}
                         required={required} toggle={toggle} toggleComponent={toggleComponent} body={body}/>
}

export function RequiredBadgeTooltip({children, required}) {
    const tooltip = <Tooltip>
        <i className="bi bi-exclamation-triangle-fill text-yellow"></i>
        &nbsp;
        This is a required badge
    </Tooltip>

    if (required) {
        return <OverlayTrigger placement="right" overlay={tooltip}>
            {children}
        </OverlayTrigger>;
    } else {
        return children
    }
}
