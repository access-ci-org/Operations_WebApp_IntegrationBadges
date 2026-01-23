import MultiSelectControlTwoLists from "../../util/MultiSelectControlTwoLists.jsx";
import {useTasks} from "../../../contexts/TaskContext.jsx";
import taskAddIcon from "../../../assets/tdesign_task-add.png"
import React, {useState} from "react";
import StaffTaskEditDetails from "../task-edit/StaffTaskEditDetails.jsx";
import {Modal} from "react-bootstrap";

export default function StaffBadgeEditAssociateTasks({badgeData, setBadgeData}) {
    const {setTask, getTasks, getTask} = useTasks();

    const [taskData, setTaskData] = useState({
        "task_id": null,
        "name": "",
        "technical_summary": "",
        "implementor_roles": "",
        "task_experts": "",
        "detailed_instructions_url": ""
    });
    const [showErrorModal, setShowErrorModal] = useState(false);

    const items = getTasks().map(task => ({id: task.task_id, label: task.name}));
    const value = badgeData.tasks.map(({task_id, required}) => {
        const task = getTask({taskId: task_id});
        return {id: task.task_id, required: required};
    });

    const resetTaskData = () => setTaskData({
        "task_id": null,
        "name": "",
        "technical_summary": "",
        "implementor_roles": "",
        "task_experts": "",
        "detailed_instructions_url": ""
    });

    const isTaskFormValid = taskData.name && taskData.name.trim().length > 0
        && taskData.technical_summary && taskData.technical_summary.trim().length > 0
        && taskData.implementor_roles && taskData.implementor_roles.trim().length > 0
        && taskData.task_experts && taskData.task_experts.trim().length > 0
        && taskData.detailed_instructions_url && taskData.detailed_instructions_url.trim().length > 0;

    const saveTask = async () => {
        try {
            const newTask = await setTask({taskId: taskData.task_id, taskData});
            resetTaskData();

            // Appending the task only if it's a new task
            if (!taskData.task_id) {
                setBadgeData({
                    ...badgeData,
                    tasks: [
                        ...badgeData.tasks,
                        {
                            task_id: newTask.task_id,
                            required: false,
                            sequence_no: badgeData.tasks.length
                        }
                    ]
                });
            }
        } catch (error) {
            setShowErrorModal(true);
        }
    }

    return <div className="w-100 d-inline-block text-start">
        <MultiSelectControlTwoLists
            items={items}
            value={value}
            onChange={(items) => {
                const nextState = {
                    ...badgeData,
                    tasks: items.map((item, sequenceNo) => ({
                        task_id: item.id,
                        required: item.required,
                        sequence_no: sequenceNo
                    })),
                };
                setBadgeData(nextState);
            }}
            filterLabel="Filter tasks"
            addedItemsLabel="Added Tasks"
            icon={<img src={taskAddIcon} alt={"Add task Icon"} className="h-100 m-1"/>}
            rightPanelStyles={{paddingTop: "60px"}}
            showRightPanelIcon={false}
            allowEdit={true}
            enableOrdering={true}
            enableViewMoreDetails={true}
            onEditClick={(item) => {
                const task = getTask({taskId: item.id});

                setTaskData(task);
            }}
            getMoreDetailsComponent={(item) => {
                const task = getTask({taskId: item.id});

                return <div className="row d-flex">
                    <div className="col-sm-6 ps-3 pe-3 pt-3">
                        <div className="mb-2 fs-7">Technical Summary</div>
                        <p className="mb-0 fs-8 word-break-break-all">
                            {task.technical_summary}
                        </p>
                    </div>
                    <div className="col-sm-6 ps-3 pe-3 pt-3">
                        <div className="mb-2 fs-7">Implementer Roles</div>
                        <p className="mb-0 fs-8 word-break-break-all">
                            {task.implementor_roles}
                        </p>
                    </div>
                    <div className="col-sm-6 ps-3 pe-3 pt-3">
                        <div className="mb-2 fs-7">Task Experts</div>
                        <p className="mb-0 fs-8 word-break-break-all">
                            {task.task_experts}
                        </p>
                    </div>
                    <div className="col-sm-6 ps-3 pe-3 pt-3">
                        <div className="mb-2 fs-7">Instructions URL</div>
                        <p className="w-100 mb-0 fs-8 word-break-break-all">
                            {task.detailed_instructions_url}
                        </p>
                    </div>
                </div>
            }}
        />

        <div className="w-100 border border-black border-1 rounded-2 p-3">
            <div className="w-100 d-flex flex-row p-3 border-bottom border-1">
                <div className="flex-fill align-content-center p-3">
                    {!!taskData.task_id ? "EDIT " : "NEW "}
                    TASK for {badgeData.name}
                </div>
                <div>
                    <button className="btn btn-secondary ps-3 pe-3 m-1" onClick={resetTaskData}>
                        Cancel
                    </button>
                    <button className="btn btn-medium ps-3 pe-3 m-1" onClick={saveTask} disabled={!isTaskFormValid}>
                        Save
                    </button>
                </div>
            </div>
            <div className="w-100 p-3">
                <StaffTaskEditDetails taskData={taskData} setTaskData={setTaskData}/>
            </div>
        </div>


        <Modal show={showErrorModal} onHide={setShowErrorModal.bind(this, false)}>
            <Modal.Header closeButton className="bg-danger-subtle">
                <Modal.Title>
                    <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You don't have permissions to make this change. If you should have it,
                    please submit an ACCESS ticket requesting:</p>

                <p>Integration Dashboard <strong>badge.maintainer</strong> permission</p>
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
