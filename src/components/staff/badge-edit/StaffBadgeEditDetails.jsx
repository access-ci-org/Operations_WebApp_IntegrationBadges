import Form from "react-bootstrap/Form";
import {fileToBase64} from "../../util/util.jsx";
import {useDropzone} from "react-dropzone";
import {BasicFormattedTextEditor} from "../../util/text-editors.jsx";

function getBadgeInputFields({badgeData, setBadgeData}) {

    const onInputValueChange = (fieldName) => (evt) => {
        setBadgeData({...badgeData, [fieldName]: evt.target.value});
    };

    const onFormattedTextInputValueChange = (fieldName) => (data) => {
        setBadgeData({...badgeData, [fieldName]: data});
    };

    const onGraphicInputValueChange = async (files) => {
        console.log("onGraphicInputValueChange", files);
        if (files && files.length > 0) setBadgeData({...badgeData, graphic: await fileToBase64(files[0])});
    };

    return {
        name: <Form.Control type="text" value={badgeData.name} onChange={onInputValueChange("name")}/>,


        researcher_summary: <BasicFormattedTextEditor data={badgeData.researcher_summary}
            onChange={onFormattedTextInputValueChange("researcher_summary")}/>,

        resource_provider_summary: <BasicFormattedTextEditor data={badgeData.resource_provider_summary}
            onChange={onFormattedTextInputValueChange("resource_provider_summary")}/>,

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

        verification_method: <Form.Select aria-label="Default select example" value={badgeData.verification_method}
                                          onChange={onInputValueChange("verification_method")}>
            <option value="" disabled={true}></option>
            <option value="Automated">Automated</option>
            <option value="Manual">Manual</option>
        </Form.Select>,

        verification_summary: <BasicFormattedTextEditor data={badgeData.verification_summary}
            onChange={onFormattedTextInputValueChange("verification_summary")}/>,

        default_badge_access_url_label: <Form.Control type="text" value={badgeData.default_badge_access_url_label}
                                                      onChange={onInputValueChange("default_badge_access_url_label")}/>,

        default_badge_access_url: <Form.Control type="text" value={badgeData.default_badge_access_url}
                                                onChange={onInputValueChange("default_badge_access_url")}/>
    };
}

export default function StaffBadgeEditDetails({badgeData, setBadgeData}) {
    return <StaffBadgeEditDetailsV1 badgeData={badgeData} setBadgeData={setBadgeData}/>
}

export function StaffBadgeEditDetailsV1({badgeData, setBadgeData}) {
    const badgeInputFields = getBadgeInputFields({badgeData, setBadgeData});

    return <div className="w-100 d-inline-block text-start">
        <div className="mb-3">
            <Form.Label>Badge Name</Form.Label>
            {badgeInputFields.name}
        </div>
        <div className="mb-3">
            <Form.Label>Researcher Summary</Form.Label>
            {badgeInputFields.researcher_summary}
        </div>
        <div className="mb-3">
            <Form.Label>Resource Provider Summary</Form.Label>
            {badgeInputFields.resource_provider_summary}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Badge Image</Form.Label>
            {badgeInputFields.graphic((open, isDragAccept) => <div
                className={`w-100 border border-1 p-4 rounded text-center ${isDragAccept && "border-style-dashed bg-light"}`}>
                <div className="overflow-hidden d-inline-block" style={{width: "44px", height: "44px"}}>
                    {!badgeData.graphic || badgeData.graphic.length === 0 ?
                        <i className="bi bi-image fs-1"></i> :
                        <div className="w-100 h-100 border border-1 border-gray-200">
                            <img className="w-100" src={badgeData.graphic} alt="Roadmap graphic preview"/>
                        </div>}
                </div>
                <p className="w-100 text-center">
                    Drag and Drop to Upload Image <br/><br/>
                    or<br/>
                </p>
                <button className="btn btn-gray-200" onClick={open}>
                    Browse Device
                </button>
            </div>)}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Verification Method</Form.Label>
            {badgeInputFields.verification_method}
        </div>
        <div className="mb-3">
            <Form.Label>Verification Summary</Form.Label>
            {badgeInputFields.verification_summary}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Badge URL Label</Form.Label>
            {badgeInputFields.default_badge_access_url_label}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Badge URL</Form.Label>
            {badgeInputFields.default_badge_access_url}
        </div>
    </div>
}


export function StaffBadgeEditDetailsV2({badgeData, setBadgeData}) {
    const badgeInputFields = getBadgeInputFields({badgeData, setBadgeData});

    return <div className="w-100 d-inline-block text-start">
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Name</Form.Label>
            <div className="col-sm-7">{badgeInputFields.name}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Researcher Summary</Form.Label>
            <div className="col-sm-7">{badgeInputFields.researcher_summary}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Resource Provider Summary</Form.Label>
            <div className="col-sm-7">{badgeInputFields.resource_provider_summary}</div>
        </div>


        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Image</Form.Label>
            <div className="col-sm-7 d-flex flex-row">
                {badgeInputFields.graphic((open, isDragAccept) => <div
                    className={`w-100 d-flex flex-row p-2 rounded-2 border border-1 border-style-dashed ${isDragAccept ? "bg-light" : "border-white"}`}>
                    <div className="align-content-start pe-3">
                        <div className="overflow-hidden" style={{width: "100px", height: "100px"}}>
                            {!badgeData.graphic || badgeData.graphic.length === 0 ?
                                <i className="bi bi-image text-primary d-inline-flex" style={{fontSize: "90px"}}></i> :
                                <div className="w-100 h-100 border border-1 border-gray-200">
                                    <img className="w-100" src={badgeData.graphic} alt="Roadmap graphic preview"/>
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
            <Form.Label className="col-sm-5">Verification Method</Form.Label>
            <div className="col-sm-7">{badgeInputFields.verification_method}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Verification Summary</Form.Label>
            <div className="col-sm-7">{badgeInputFields.verification_summary}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Badge Label</Form.Label>
            <div className="col-sm-7">{badgeInputFields.default_badge_access_url_label}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Badge URL </Form.Label>
            <div className="col-sm-7">{badgeInputFields.default_badge_access_url}</div>
        </div>
    </div>
}
