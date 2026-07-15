import Form from "react-bootstrap/Form";
import {useParams} from "react-router-dom";
import {fileToBase64} from "../../util/util.jsx";
import {useDropzone} from 'react-dropzone'
import {BasicFormattedTextEditor} from "../../util/text-editors.jsx";

function getRoadmapInputFields({roadmapData, setRoadmapData}) {

    const onInputValueChange = (fieldName) => (evt) => {
        setRoadmapData({...roadmapData, [fieldName]: evt.target.value});
    };

    const onFormattedTextInputValueChange = (fieldName) => (data) => {
        setRoadmapData({...roadmapData, [fieldName]: data});
    };

    const onGraphicInputValueChange = async (files) => {
        console.log("onGraphicInputValueChange", files);
        if (files && files.length > 0) setRoadmapData({...roadmapData, graphic: await fileToBase64(files[0])});
    };

    return {
        name: <Form.Control type="text" value={roadmapData.name} onChange={onInputValueChange("name")}/>,

        graphic: (then) => {
            const MAX_UPLOAD_SIZE = 5 * 1024 * 1024  // 5 MB
            const ALLOWED_MIME_TYPES = {
                'image/jpeg': ['.jpeg', '.jpg'],
                'image/png': ['.png'],
                'image/svg+xml': ['.svg']
            }

            const {getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open} = useDropzone({
                noClick: true,
                onDrop: onGraphicInputValueChange,
                accept: ALLOWED_MIME_TYPES,
                maxSize: MAX_UPLOAD_SIZE,
                multiple: false
            });

            return <div {...getRootProps()}>
                <input {...getInputProps()} />
                {then(open, isDragAccept)}
            </div>;
        },

        executive_summary: <BasicFormattedTextEditor data={roadmapData.executive_summary}
            onChange={onFormattedTextInputValueChange("executive_summary")}/>,

        infrastructure_types: <Form.Select aria-label="Default select example" value={roadmapData.infrastructure_types}
                                           onChange={onInputValueChange("infrastructure_types")}>
            <option value="" disabled={true}></option>
            <option value="Network">Network</option>
            <option value="Compute">Compute</option>
            <option value="Storage">Storage</option>
            <option value="Online Service">Online Service</option>
            <option value="Science Gateway">Science Gateway</option>
        </Form.Select>,

        integration_coordinators: <Form.Control type="text" value={roadmapData.integration_coordinators}
                                                onChange={onInputValueChange("integration_coordinators")}/>,

        status: <Form.Select aria-label="Default select example" value={roadmapData.status}
                             onChange={onInputValueChange("status")}>
            <option value="1">Draft</option>
            <option value="2">Production</option>
        </Form.Select>
    };
}

export default function StaffRoadmapEditDetails({roadmapData, setRoadmapData}) {
    return <StaffRoadmapEditDetailsV1 roadmapData={roadmapData} setRoadmapData={setRoadmapData}/>
}

export function StaffRoadmapEditDetailsV1({roadmapData, setRoadmapData}) {
    const roadmapInputFields = getRoadmapInputFields({roadmapData, setRoadmapData});

    return <div className="w-100 d-inline-block text-start">
        <div className="mb-3">
            <Form.Label>Name</Form.Label>
            {roadmapInputFields.name}
        </div>
        <div className="mb-3">
            <Form.Label>Roadmap Image</Form.Label>

            {roadmapInputFields.graphic((open, isDragAccept) => <div
                className={`w-100 border border-1 p-4 rounded text-center ${isDragAccept && "border-style-dashed bg-light"}`}>
                <div className="overflow-hidden d-inline-block" style={{width: "44px", height: "44px"}}>
                    {!roadmapData.graphic || roadmapData.graphic.length === 0 ?
                        <i className="bi bi-image fs-1"></i> :
                        <div className="w-100 h-100 border border-1 border-gray-200">
                            <img className="w-100" src={roadmapData.graphic} alt="Roadmap graphic preview"/>
                        </div>}
                </div>
                <p className="w-100 text-center">
                    Drag and Drop to Upload Image <br/><br/>
                    or<br/>
                </p>
                <button className="btn btn-gray-200">
                    Browse Device
                </button>
            </div>)}
        </div>
        <div className="mb-3">
            <Form.Label>Executive Summary</Form.Label>
            {roadmapInputFields.executive_summary}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Infrastructure Type</Form.Label>
            {roadmapInputFields.infrastructure_types}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Integration Coordinators</Form.Label>
            {roadmapInputFields.integration_coordinators}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Status</Form.Label>
            {roadmapInputFields.status}
        </div>
    </div>
}


export function StaffRoadmapEditDetailsV2({roadmapData, setRoadmapData}) {
    const {roadmapId} = useParams();

    const roadmapInputFields = getRoadmapInputFields({roadmapData, setRoadmapData});

    return <div className="w-100 d-inline-block text-start">
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Roadmap id</Form.Label>
            <div className="col-sm-7">
                <Form.Control type="text" value={roadmapId} disabled={true}/>
            </div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Name</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.name}</div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Executive Summary</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.executive_summary}</div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Image</Form.Label>
            <div className="col-sm-7 d-flex flex-row">
                {roadmapInputFields.graphic((open, isDragAccept) => <div
                    className={`w-100 d-flex flex-row p-2 rounded-2 border border-1 border-style-dashed ${isDragAccept ? "bg-light" : "border-white"}`}>
                    <div className="align-content-start pe-3">
                        <div className="overflow-hidden" style={{width: "100px", height: "100px"}}>
                            {!roadmapData.graphic || roadmapData.graphic.length === 0 ?
                                <i className="bi bi-image text-primary d-inline-flex" style={{fontSize: "90px"}}></i> :
                                <div className="w-100 h-100 border border-1 border-gray-200">
                                    <img className="w-100" src={roadmapData.graphic} alt="Roadmap graphic preview"/>
                                </div>}
                        </div>
                    </div>
                    <div className="flex-fill text-center" style={{maxWidth: "250px"}}>
                        <p className="w-100 text-center mb-0">
                            Drag and Drop to Upload Image <br/>
                            or
                        </p>
                        <button className="btn btn-gray-200 text-decoration-underline" onClick={open}>
                            Browse Device
                        </button>
                    </div>
                </div>)}
            </div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Infrastructure Type</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.infrastructure_types}</div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Integration Coordinators</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.integration_coordinators}</div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Status</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.status}</div>
        </div>
    </div>
}
