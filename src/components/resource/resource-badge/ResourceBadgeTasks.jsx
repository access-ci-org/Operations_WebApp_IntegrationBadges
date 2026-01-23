import {AccordionContext, Dropdown, Modal, useAccordionButton} from "react-bootstrap";
import {BadgeTaskWorkflowStatus} from "../../../contexts/TaskContext.jsx";
import {BadgeWorkflowStatus} from "../../../contexts/BadgeContext.jsx";
import {useResources} from "../../../contexts/ResourcesContext.jsx";
import Translate from "../../../locales/Translate.jsx";
import {useContext, useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import Concierge from "../../staff/Concierge.jsx";
import {HtmlToReact} from "../../util/text-editors.jsx";

function TaskAccordionHeader({resourceId, roadmapId, badgeId, badge, task, eventKey}) {
    const {activeEventKey} = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey);

    const {setResourceRoadmapBadgeTaskWorkflowStatus} = useResources();

    const [taskActionStatusProcessing, setTaskActionStatusProcessing] = useState({});
    const [showTaskReopenModal, setShowTaskReopenModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const taskId = task.task_id;


    const clickTaskAction = async (taskId, status, confirmationReceived = false) => {
        if (status !== BadgeTaskWorkflowStatus.ACTION_NEEDED && (badge.status === BadgeWorkflowStatus.VERIFIED || badge.status === BadgeWorkflowStatus.TASK_COMPLETED) && !confirmationReceived) {
            setShowTaskReopenModal({taskId, status});
        } else {
            setShowTaskReopenModal(false);

            setTaskActionStatusProcessing({
                ...taskActionStatusProcessing, [taskId]: true
            });

            try {
                await setResourceRoadmapBadgeTaskWorkflowStatus({resourceId, roadmapId, badgeId, taskId, status})
            } catch (e) {
                setShowErrorModal(true);
            }

            setTaskActionStatusProcessing({
                ...taskActionStatusProcessing, [taskId]: false
            });
        }
    };

    const isCurrentEventKey = activeEventKey.indexOf(eventKey) >= 0;

    const taskStatusIcon = {
        undefined: "bi bi-layers",
        [BadgeTaskWorkflowStatus.NOT_COMPLETED]: "bi bi-layers",
        [BadgeTaskWorkflowStatus.NOT_APPLICABLE]: "bi bi-eye-slash-fill",
        [BadgeTaskWorkflowStatus.COMPLETED]: "bi bi-check-circle-fill",
        [BadgeTaskWorkflowStatus.ACTION_NEEDED]: "bi bi-exclamation-triangle-fill"
    };

    let toggleButtonVariant = "medium";
    if (task.status === BadgeTaskWorkflowStatus.ACTION_NEEDED) toggleButtonVariant = "danger";
    if (!!task.status && task.status !== BadgeTaskWorkflowStatus.NOT_COMPLETED) toggleButtonVariant = "outline-medium";

    return <div className={`row border-gray-200 border border-1 ${isCurrentEventKey ? 'rounded-top-3' : 'rounded-3'}`}>
        <div className="col ps-0 d-flex flex-row align-items-center">
            <div
                className="p-4 ps-3 pe-3 h-100 bg-gray-100 rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
                role="button" onClick={decoratedOnClick}>
                {isCurrentEventKey ? <i className="bi bi-caret-down-fill"></i> :
                    <i className="bi bi-caret-right-fill"></i>}
            </div>
            <h4 className="flex-fill p-2 ps-3 m-0 fs-6">{task.name}</h4>
        </div>

        <div className="col-sm-3 align-content-center text-center">
            {task.required ? <small className="ps-2 pe-2 pt-1 pb-1 rounded-1 text-nowrap bg-medium-subtle text-black">
                    Required</small> :
                <small className="ps-2 pe-2 pt-1 pb-1 rounded-1 text-nowrap bg-secondary-subtle text-white">
                    Not Required</small>}
        </div>


        {badge.status ?
            <div className="col-sm-3 pt-2 pb-2 align-content-center">
                <Dropdown>
                    <Dropdown.Toggle variant={toggleButtonVariant} id="dropdown-basic"
                                     bsPrefix="w-100 btn-sm rounded-3 d-flex flex-row">
                        <span className="flex-fill text-start">
                            <i className={taskStatusIcon[task.status]}></i>
                            <span className="ps-3 pe-3">
                                <Translate>badgeTaskWorkflowStatus.{task.status}</Translate>
                            </span>
                        </span>
                        <span>
                            <i className="bi bi-chevron-down"></i>
                        </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={clickTaskAction.bind(this, taskId, BadgeTaskWorkflowStatus.COMPLETED, false)}>
                            Completed</Dropdown.Item>
                        <Dropdown.Item
                            onClick={clickTaskAction.bind(this, taskId, BadgeTaskWorkflowStatus.NOT_COMPLETED, false)}>
                            Incomplete</Dropdown.Item>
                        {!task.required && <Dropdown.Item
                            onClick={clickTaskAction.bind(this, taskId, BadgeTaskWorkflowStatus.NOT_APPLICABLE, false)}>
                            Not Applicable</Dropdown.Item>}
                        <Concierge>
                            <Dropdown.Item className="bg-danger-subtle"
                                           onClick={clickTaskAction.bind(this, taskId, BadgeTaskWorkflowStatus.ACTION_NEEDED, false)}>
                                Action Needed</Dropdown.Item>
                        </Concierge>
                    </Dropdown.Menu>
                </Dropdown>
            </div> :
            null}


        <Modal show={showTaskReopenModal} onHide={setShowTaskReopenModal.bind(this, false)}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>
                    <i className="bi bi-question-octagon-fill text-medium"></i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You're about to make changes to a
                "<Translate>badgeWorkflowStatus.{badge.status}</Translate>" badge.
                These changes may require the badge to be re-verified by a concierge.
                Do you want to continue?
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-medium rounded-1"
                        onClick={setShowTaskReopenModal.bind(this, false)}>
                    No
                </button>
                <button className="btn btn-medium rounded-1"
                        onClick={clickTaskAction.bind(this, showTaskReopenModal.taskId, showTaskReopenModal.status, true)}>
                    Yes
                </button>
            </Modal.Footer>
        </Modal>

        <Modal show={showErrorModal} onHide={setShowErrorModal.bind(this, false)}>
            <Modal.Header closeButton className="bg-danger-subtle">
                <Modal.Title>
                    <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You don't have permissions to make this change. If you should have it, please submit an
                    ACCESS ticket requesting:</p>

                <p>
                    Integration Dashboard <strong>implementor</strong> permission for the
                    resource <strong>{resourceId}</strong></p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-medium rounded-1"
                        onClick={setShowErrorModal.bind(this, false)}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    </div>
}


export default function ResourceBadgeTasks({resourceId, roadmapId, badgeId}) {
    const {getResourceRoadmapBadgeTasks, getResourceRoadmapBadge} = useResources();

    const badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
    let tasks = getResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});


    if (badge && tasks) {
        return <div className="w-100">
            {tasks && tasks.length === 0 && <div className="w-100 p-3 text-center lead">
                No Tasks Available
            </div>}
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                {tasks && tasks.map((task, taskIndex) => {
                    return <div key={taskIndex} className="w-100 p-1">
                        <TaskAccordionHeader resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}
                                             eventKey={taskIndex} badge={badge}
                                             task={task}>{task.name}</TaskAccordionHeader>
                        <Accordion.Collapse eventKey={taskIndex} bsPrefix="row">
                            <div
                                className="p-3 rounded-bottom-3 border-gray-200 border-start border-end border-bottom border-1 small">
                                <HtmlToReact>{task.technical_summary}</HtmlToReact>&nbsp;
                                <a className="btn btn-link" href={task.detailed_instructions_url} target="_blank">
                                    View Details</a>
                            </div>
                        </Accordion.Collapse>
                    </div>
                })}
            </Accordion>
        </div>
    }
}