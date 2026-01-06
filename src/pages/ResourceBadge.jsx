import {Link, useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {BadgeWorkflowStatus, useBadges} from "../contexts/BadgeContext";
import {useEffect, useState} from "react";
import {BadgeTaskWorkflowStatus} from "../contexts/TaskContext";
import {Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import ResourceBadgeStatus from "../components/status/ResourceBadgeStatus.jsx";
import ResourceBadgePrerequisites from "../components/resource/resource-badge/ResourceBadgePrerequisites.jsx";
import ResourceBadgeTasks from "../components/resource/resource-badge/ResourceBadgeTasks.jsx";
import ResourceBadgeIcon from "../components/resource/resource-badge/ResourceBadgeIcon.jsx";
import Form from "react-bootstrap/Form";
import ResourceBadgeLog from "../components/resource/resource-badge/ResourceBadgeLog.jsx";
import Concierge, {ConciergeSwitch} from "../components/staff/Concierge.jsx";
import {HtmlToReact} from "../components/util/text-editors.jsx";

export default function ResourceBadge() {
    let {resourceId, roadmapId, badgeId} = useParams();
    roadmapId = parseInt(roadmapId);
    badgeId = parseInt(badgeId);

    const {
        fetchResource,
        fetchResourceRoadmapBadges,
        fetchResourceRoadmapBadgeTasks,
        fetchResourceRoadmapBadgeLogs,
        getResource,
        getResourceRoadmapBadge,
        getResourceRoadmapBadgePrerequisites,
        getResourceOrganization,
        getResourceRoadmapBadgeTasks,
        setResourceRoadmapBadgeWorkflowStatus,
    } = useResources();
    const {fetchBadge} = useBadges();

    const [comment, setComment] = useState("");
    const [badgeActionStatusProcessing, setBadgeActionStatusProcessing] = useState(false);
    const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const resource = getResource({resourceId});
    const organization = getResourceOrganization({resourceId});
    let badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
    let tasks = getResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});
    let prerequisiteBadges = getResourceRoadmapBadgePrerequisites({resourceId, roadmapId, badgeId});

    useEffect(() => {
        fetchResource({resourceId});
        fetchResourceRoadmapBadges({resourceIds: [resourceId], roadmapId});
        fetchResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});
        fetchBadge({badgeId});
    }, [resourceId, badgeId]);

    const clickBadgeAction = async (status) => {
        setShowSaveConfirmationModal(false);
        setBadgeActionStatusProcessing(true);
        try {
            await setResourceRoadmapBadgeWorkflowStatus({resourceId, roadmapId, badgeId, status, comment})
            await fetchResourceRoadmapBadgeLogs({resourceId, roadmapId, badgeId});
            setComment("");

            if (status === BadgeWorkflowStatus.TASK_COMPLETED) setShowSavedModal(true);
        } catch (e) {
            setShowErrorModal(true);
        }
        setBadgeActionStatusProcessing(false);
    };

    if (resource && organization && badge && tasks && prerequisiteBadges) {
        const requiredTasks = tasks.filter(t => t.required);

        const isReadyToSubmit = requiredTasks
                .filter(t => [BadgeTaskWorkflowStatus.COMPLETED]
                    .indexOf(t.status) >= 0).length === requiredTasks.length
            && prerequisiteBadges.filter(pb => pb.status !== BadgeWorkflowStatus.VERIFIED).length === 0;

        const lastUpdatedAt = new Date(Date.parse(badge.status_updated_at));
        const lastUpdatedBy = badge.status_updated_by;

        return <div className="container">

            {badge.status === BadgeWorkflowStatus.VERIFICATION_FAILED &&
                <div className="w-100 d-flex flex-row pb-3 pt-3">
                    <div className="flex-fill bg-warning rounded-2 p-3 bg-opacity-10">
                        <h3>Badge Returned</h3>
                        <div
                            className="text-secondary pb-4 small">{lastUpdatedAt.toLocaleString()} by {lastUpdatedBy}</div>
                        <p className="pre-wrap-text text-break m-0">
                            {badge.comment}
                        </p>
                    </div>
                </div>}

            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <h1>{resource.resource_descriptive_name}</h1>
                        <div>
                            By&nbsp;&nbsp;
                            <Link to={`/organizations/${organization.organization_id}`}
                                  className="btn btn-link text-dark">
                                {organization.organization_name}
                            </Link>
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col-sm-2 mb-3"
                             style={{minHeight: 100}}>
                            <ResourceBadgeIcon resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}/>
                        </div>
                        <div className="col mb-3">
                            <h2>{badge.name}</h2>
                            <div className="row">
                                <label className="text-secondary">RP Roles</label>
                                <div>{getImplementorRoles(tasks).join(", ")}</div>
                            </div>
                        </div>
                        <div className="col-sm-3 ps-1 mb-3">
                            <ConciergeSwitch/>

                            <div className="border-2 border rounded-3 pt-4 pb-4 ps-2 pe-2 text-center">
                                <label className="text-black d-inline fw-bold">Badge Status : </label>
                                <div className="ps-2 d-inline">
                                    <ResourceBadgeStatus resourceId={resourceId} roadmapId={roadmapId}
                                                         badgeId={badgeId}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 pt-5 pb-3">
                        <HtmlToReact>{badge.resource_provider_summary}</HtmlToReact>
                    </div>
                </div>
            </div>

            <div className="w-100 d-flex flex-row pt-3 pb-4">
                <div className="ps-3 pe-3  text-yellow fs-3">
                    <i className="bi bi-megaphone-fill"></i>
                </div>
                <p className="text-medium flex-fill fs-5">
                    We recommend completing any prerequisite badges before starting the tasks for this badge. Please
                    note that some tasks may be informational—review the details, complete them as needed, and update
                    the status to 'Completed' or 'Not Applicable' based on your situation.</p>
            </div>

            <div className="row">

                <div className="w-100 text-start pb-2">
                    <h3 className="d-inline me-4 text-black">Pre-Requisite Badges</h3>
                    <OverlayTrigger placement="right" delayShow={300} delayHide={150}
                                    overlay={<Tooltip id="tooltip-tasks">
                                        Prerequisite badges must be completed before submitting this badge for concierge
                                        verification. Click badge details to view and complete the required tasks.
                                    </Tooltip>}>
                        <button className="btn btn-link text-yellow d-inline">
                            <i className="bi bi-question-square-fill"></i></button>
                    </OverlayTrigger>
                </div>
                <ResourceBadgePrerequisites resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}/>
            </div>

            <div className="row pt-4">
                <div className="w-100 text-start pb-2">
                    <h3 className="d-inline me-4 text-black">Key Tasks & Tips</h3>
                    <OverlayTrigger placement="right" delayShow={300} delayHide={150}
                                    overlay={<Tooltip id="tooltip-tasks">
                                        Some tasks are informational, while others require action. Review them, return
                                        here, and mark each as Complete or N/A.
                                    </Tooltip>}>
                        <button className="btn btn-link text-yellow d-inline">
                            <i className="bi bi-question-square-fill"></i></button>
                    </OverlayTrigger>
                </div>

                <ResourceBadgeTasks resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}/>

            </div>


            <Concierge>
                <div className="w-100 pt-4">
                    <h3 className="text-black">Reviewer Notes Section</h3>
                    <p>
                        Please review each task to see if it’s complete. If a task is complete, mark it as Approve. If
                        it’s not complete or needs corrections, mark it as Needs Action and send a message to the
                        resource provider for guidance.
                    </p>
                    <p className="pt-2 pb-2">
                        <strong className="text-medium">Verification Method : </strong> {badge.verification_method}
                    </p>
                    <p>
                        <strong className="text-medium">Verification Summary : </strong>
                        {badge.verification_summary}
                    </p>
                </div>
            </Concierge>

            <div className="w-100 pt-5 pb-5">
                <div className="w-100">
                    <Form.Group className="mb-3" controlId="resource.roadmap.badge.workflow.comment">
                        <Form.Label>Comment / Question</Form.Label>
                        <Form.Control as="textarea" rows={3} value={comment}
                                      onChange={(evt) => setComment(evt.target.value)}/>
                    </Form.Group>
                </div>
                <div className="w-100 d-flex flex-row">
                    <div className="flex-fill"></div>
                    {/*<div className="pe-3">*/}
                    {/*    <button className=" btn btn-outline-dark rounded-3" disabled={!comment || comment.length === 0}*/}
                    {/*            onClick={clickBadgeAction.bind(this, null)}>*/}
                    {/*        Add Comment*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div style={{maxWidth: 600}} className="text-end">
                        {(() => {
                            if (badgeActionStatusProcessing) {
                                return <button className="btn btn-dark rounded-3 ps-3 pe-3 m-1">
                                                <span className="spinner-border spinner-border-sm me-3" role="status"
                                                      aria-hidden="true"></span>
                                    Loading...
                                </button>
                            } else if (!badge.status || badge.status === BadgeWorkflowStatus.NOT_PLANNED) {
                                return <button className="btn btn-outline-dark rounded-3 ps-3 pe-3 m-1"
                                               onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.PLANNED)}>
                                    Add this badge to the resource
                                </button>
                            } else if (badge.status === BadgeWorkflowStatus.PLANNED ||
                                badge.status === BadgeWorkflowStatus.VERIFICATION_FAILED) {
                                return <button className="btn btn-outline-dark rounded-3 ps-3 pe-3 m-1"
                                               disabled={!isReadyToSubmit}
                                               onClick={setShowSaveConfirmationModal.bind(this, true)}>
                                    Submit for Verification
                                </button>
                            } else if (badge.status === BadgeWorkflowStatus.TASK_COMPLETED ||
                                badge.status === BadgeWorkflowStatus.VERIFIED) {
                                return <button className="btn btn-outline-dark rounded-3 ps-3 pe-3 m-1"
                                               onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.PLANNED)}>
                                    Reopen
                                </button>
                            }
                        })()}

                        {!badgeActionStatusProcessing && badge.status === BadgeWorkflowStatus.TASK_COMPLETED &&
                            <Concierge>
                                <button className="btn btn-outline-dark rounded-3 ps-3 pe-3 m-1"
                                        onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.VERIFIED)}>
                                    Mark as Verified
                                </button>
                                <button className="btn btn-outline-dark rounded-3 ps-3 pe-3 m-1"
                                        onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.VERIFICATION_FAILED)}>
                                    Mark as Verification Failed
                                </button>
                            </Concierge>
                        }


                        <Modal show={showSaveConfirmationModal} onHide={setShowSaveConfirmationModal.bind(this, false)}>
                            <Modal.Header closeButton className="bg-light">
                                <Modal.Title>
                                    <i className="bi bi-question-octagon-fill"></i>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure that you want to submit this badge for verification?
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-outline-dark rounded-1"
                                        onClick={setShowSaveConfirmationModal.bind(this, false)}>
                                    No
                                </button>
                                <button className="btn btn-dark rounded-1"
                                        onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.TASK_COMPLETED)}>
                                    Yes
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showSavedModal} onHide={setShowSavedModal.bind(this, false)}>
                            <Modal.Header closeButton className="bg-light">
                                <Modal.Title>
                                    <i className="bi bi-floppy-fill"></i>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Badge completion has been sent to a concierge for verification.
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-dark rounded-1"
                                        onClick={setShowSavedModal.bind(this, false)}>
                                    Exit
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showErrorModal} onHide={setShowErrorModal.bind(this, false)}>
                            <Modal.Header closeButton className="bg-danger-subtle">
                                <Modal.Title>
                                    <i className="bi bi-exclamation-triangle-fill"></i>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    You don't have permissions to make this change. If you should have it, please submit
                                    an
                                    ACCESS ticket requesting:</p>

                                <p>
                                    Integration Dashboard <strong>implementor</strong> permission for the
                                    resource <strong>{resourceId}</strong></p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-outline-dark rounded-1"
                                        onClick={setShowErrorModal.bind(this, false)}>
                                    Cancel
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <div className="pt-3 d-flex flex-row">
                            <div className="text-yellow fs-4 p-2">
                                <i className="bi bi-megaphone-fill"></i>
                            </div>
                            <p className="flex-fill ps-1 text-medium">
                                Once you’ve completed the tasks, please submit them for concierge approval. A concierge
                                will
                                review the completed tasks, and you’ll receive a follow-up email with next steps.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <Concierge>
                <ResourceBadgeLog resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}/>
            </Concierge>
        </div>
    }
}

function getImplementorRoles(tasks) {
    let implementorRoles = [];
    for (let i = 0; i < tasks.length; i++) {
        implementorRoles = [...implementorRoles, ...tasks[i].implementor_roles.split(/ *, */ig)]
    }

    return Array.from(new Set(implementorRoles))
}
