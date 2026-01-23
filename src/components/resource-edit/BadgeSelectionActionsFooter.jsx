import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import LoadingBlock from "../util/LoadingBlock.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";

export default function BadgeSelectionActionsFooter({resourceId, roadmapId, selected, next, prev, showSave}) {
    const navigate = useNavigate();

    const {getResource, setResourceRoadmap} = useResources();
    const {getRoadmapBadges} = useRoadmaps();

    const [saveProcessing, setSaveProcessing] = useState(false);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const resource = getResource({resourceId});
    const roadmapBadges = getRoadmapBadges({roadmapId});

    const selectedBadgeIds = [];

    const handleSave = async () => {
        setSaveProcessing(true);

        try {
            await setResourceRoadmap({resourceId, roadmapId: roadmapId, badgeIds: selectedBadgeIds});
            setShowSavedModal(true);
        } catch (e) {
            setShowErrorModal(true);
        }

        setSaveProcessing(false);
    };

    const navigateToResourcePage = () => {
        navigate(`/resources/${resourceId}/roadmaps/${roadmapId}`);
    };

    const navigateToDashboard = () => {
        navigate("/organizations");
    };

    if (!!resource && !!roadmapBadges) {

        for (let i = 0; i < roadmapBadges.length; i++) {
            const badge = roadmapBadges[i];
            const badgeId = badge.badge_id;

            if (!!selected(badgeId)) {
                selectedBadgeIds.push(badgeId);
            }
        }

        return <div className="w-100 text-end pt-3 pb-5">
            <button className="btn btn-outline-medium rounded-1 m-1" onClick={prev}>
                Cancel
            </button>

            {!showSave ?
                <button className="btn btn-medium rounded-1 m-1 ${}" disabled={selectedBadgeIds.length === 0}
                        onClick={next}>
                    Continue with {selectedBadgeIds.length} Selected Badges
                </button> :
                saveProcessing ?
                    <button className="btn btn-medium rounded-1 m-1">
                        <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                        Loading...
                    </button> : <button className="btn btn-medium rounded-1 m-1" disabled={selectedBadgeIds.length === 0}
                                        onClick={handleSave}>
                        Save Selection
                    </button>}

            <Modal show={showSavedModal} onHide={setShowSavedModal.bind(this, false)}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>
                        <i className="bi bi-floppy-fill text-medium"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Changes Have Been Successfully Saved
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-medium rounded-1"
                            onClick={navigateToDashboard}>
                        Go to Dashboard
                    </button>
                    <button className="btn btn-medium rounded-1"
                            onClick={navigateToResourcePage}>
                        Resource Overview
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
                        You don't have permissions to make this change. If you should have it, please submit an ACCESS
                        ticket requesting:</p>

                    <p>
                        Integration Dashboard <strong>coordinator</strong> permission for the
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
    } else {
        return <LoadingBlock/>
    }
}
