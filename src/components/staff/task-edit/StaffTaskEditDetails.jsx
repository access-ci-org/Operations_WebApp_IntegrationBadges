import Form from "react-bootstrap/Form";
import {BasicFormattedTextEditor} from "../../util/text-editors.jsx";

const taskInputFieldLabelIds = {
    name: "staff-task-edit-form-name",
    technical_summary: "staff-task-edit-form-technical-summary",
    task_experts: "staff-task-edit-form-task-experts",
    implementor_roles: "staff-task-edit-form-implementor-roles",
    detailed_instructions_url: "staff-task-edit-form-detailed-instructions-url",
};

function getTaskInputFields({taskData, setTaskData}) {

    const onInputValueChange = (fieldName) => (evt) => {
        setTaskData({...taskData, [fieldName]: evt.target.value});
    };

    const onFormattedTextInputValueChange = (fieldName) => (data) => {
        setTaskData((taskData) => ({...taskData, [fieldName]: data}));
    };

    return {
        name: <Form.Control aria-labelledby={taskInputFieldLabelIds.name}
                            type="text" value={taskData.name} onChange={onInputValueChange("name")}/>,

        technical_summary: <BasicFormattedTextEditor
            aria-labelledby={taskInputFieldLabelIds.technical_summary} data={taskData.technical_summary}
            onChange={onFormattedTextInputValueChange("technical_summary")}/>,


        task_experts: <Form.Control
            aria-labelledby={taskInputFieldLabelIds.task_experts} type="text" value={taskData.task_experts}
            onChange={onInputValueChange("task_experts")}/>,

        implementor_roles: <Form.Control
            aria-labelledby={taskInputFieldLabelIds.implementor_roles} type="text" value={taskData.implementor_roles}
            onChange={onInputValueChange("implementor_roles")}/>,

        detailed_instructions_url: <Form.Control
            aria-labelledby={taskInputFieldLabelIds.detailed_instructions_url} type="text"
            value={taskData.detailed_instructions_url}
            onChange={onInputValueChange("detailed_instructions_url")}/>,
    };
}

export default function StaffTaskEditDetails({taskData, setTaskData}) {
    return <StaffTaskEditDetailsV1 taskData={taskData} setTaskData={setTaskData}/>
}

export function StaffTaskEditDetailsV1({taskData, setTaskData}) {
    const taskInputFields = getTaskInputFields({taskData, setTaskData});

    return <div className="w-100 row">
        <div className="col-sm-12">
            <Form.Label id={taskInputFieldLabelIds.name}>Task Name</Form.Label>
            {taskInputFields.name}
        </div>
        <div className="mb-3 col-sm-12">
            <Form.Label id={taskInputFieldLabelIds.technical_summary}>Technical Summary</Form.Label>
            {taskInputFields.technical_summary}
        </div>
        <div className="mb-3 col-sm-6">
            <Form.Label id={taskInputFieldLabelIds.task_experts}>Task Experts</Form.Label>
            {taskInputFields.task_experts}
        </div>
        <div className="mb-3 col-sm-6">
            <Form.Label id={taskInputFieldLabelIds.implementor_roles}>Implementor Roles</Form.Label>
            {taskInputFields.implementor_roles}
        </div>
        <div className="mb-3 col-sm-6">
            <Form.Label id={taskInputFieldLabelIds.detailed_instructions_url}>Instructions URL </Form.Label>
            {taskInputFields.detailed_instructions_url}
        </div>
    </div>
}
