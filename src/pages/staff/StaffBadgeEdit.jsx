import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {StaffRouteUrls} from "./StaffRoute.jsx";
import EditProgressMarker from "../../components/staff/EditProgressMarker.jsx";
import {useEffect, useState} from "react";
import StaffBadgeEditDetails from "../../components/staff/badge-edit/StaffBadgeEditDetails.jsx";
import StaffBadgeEditAssociatePrerequisiteBadges
    from "../../components/staff/badge-edit/StaffBadgeEditAssociatePrerequisiteBadges.jsx";
import StaffBadgeEditReviewAndEdit
    from "../../components/staff/badge-edit/StaffBadgeEditReviewAndEdit.jsx";
import {Modal} from "react-bootstrap";
import {scrollToTop} from "../../components/util/scroll.jsx";
import StaffBadgeEditAssociateTasks
    from "../../components/staff/badge-edit/StaffBadgeEditAssociateTasks.jsx";

export default function StaffBadgeEdit() {
    const {badgeId} = useParams();

    const navigate = useNavigate();
    const {fetchBadge, setBadge, getBadge} = useBadges();

    const badge = getBadge({badgeId});

    const [activeSectionIndex, seActiveSectionIndex] = useState(badgeId ? 3 : 0);
    const [badgeData, setBadgeData] = useState({
        "badge_id": null,
        "name": "",
        "researcher_summary": "",
        "resource_provider_summary": "",
        "verification_summary": "",
        "verification_method": "Manual",
        "default_badge_access_url": "",
        "default_badge_access_url_label": "",
        "graphic": "",
        "prerequisites": [
            // {
            //     "sequence_no": 0,
            //     "badge_id": 1
            // },
        ],
        "tasks": [
            // {
            //     "sequence_no": 0,
            //     "task_id": 1
            //     "required": false
            // },
        ]
    });

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const areBadgeDetailsValid = badgeData.name.trim().length > 0
        && badgeData.researcher_summary.trim().length > 0
        && badgeData.resource_provider_summary.trim().length > 0
        && badgeData.default_badge_access_url.trim().length > 0
        && badgeData.default_badge_access_url_label.trim().length > 0;

    useEffect(() => {
        scrollToTop();
    }, [activeSectionIndex]);

    useEffect(() => {
        setBadgeData({
            ...badgeData,
            ...badge
        })
    }, [badgeId, !!badge]);

    useEffect(() => {
        !!badgeId && fetchBadge({badgeId});
    }, [badgeId]);

    const sections = [
        {
            title: "Describe A New Badge",
            component: <StaffBadgeEditDetails badgeData={badgeData} setBadgeData={setBadgeData}/>
        },
        {
            title: "Associate Tasks",
            component: <StaffBadgeEditAssociateTasks badgeData={badgeData} setBadgeData={setBadgeData}/>
        },
        {
            title: "Select Prerequisite Badges",
            component: <StaffBadgeEditAssociatePrerequisiteBadges badgeData={badgeData}
                                                                      setBadgeData={setBadgeData}/>
        },
        {
            title: "Review & Edit",
            component: <StaffBadgeEditReviewAndEdit
                badgeData={badgeData} setBadgeData={setBadgeData}
                onClickEditTasks={seActiveSectionIndex.bind(this, 1)}
                onClickEditPrerequisiteBadges={seActiveSectionIndex.bind(this, 2)}/>
        },
    ];

    const activeSection = sections[activeSectionIndex];

    const publishBadge = async () => {
        try {
            await setBadge({badgeId, badgeData});
            // navigate(StaffRouteUrls.BADGES);
            setShowSavedModal(true);
        } catch (error) {
            setShowErrorModal(true);
        }
    };

    if (!badge || !!badge) {
        return <div className="container">
            <div className="row mt-2 p-3">
                <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                    <h1 className="w-100 text-center text-dark fw-normal pt-5 pb-3">{activeSection.title}</h1>

                    <div className="w-100 text-center position-relative pt-5 pb-5">
                        <div className="d-inline-block w-100" style={{maxWidth: 500, minWidth: 300}}>
                            <EditProgressMarker steps={sections} current={activeSectionIndex}/>
                        </div>
                        <Link to={StaffRouteUrls.BADGES} className="btn btn-outline-secondary position-absolute"
                              style={{right: 0}}>Cancel/Discard
                        </Link>
                    </div>

                    <div className="w-100 text-center">
                        <div className="w-100 d-inline-block text-start" style={{maxWidth: 900, minWidth: 300}}>
                            {activeSection.component}
                        </div>
                    </div>

                    <div className="w-100 text-end pt-5 pb-5">
                        {activeSectionIndex === 0 ?
                            <Link className="btn btn-outline-medium ps-3 pe-3 m-1" to={StaffRouteUrls.ROADMAPS}>
                                Back
                            </Link> :
                            <button className="btn btn-outline-medium ps-3 pe-3 m-1"
                                    onClick={seActiveSectionIndex.bind(this, activeSectionIndex - 1)}>
                                Back
                            </button>}

                        {activeSectionIndex === sections.length - 1 ?
                            <button className="btn btn-medium ps-3 pe-3 m-1"
                                    onClick={publishBadge}
                                    disabled={!areBadgeDetailsValid}>
                                Publish
                            </button> :
                            <button className="btn btn-medium ps-3 pe-3 m-1"
                                    onClick={seActiveSectionIndex.bind(this, activeSectionIndex + 1)}
                                    disabled={!areBadgeDetailsValid}>
                                Continue
                            </button>}

                    </div>

                </div>
            </div>

            <Modal show={showSavedModal}>
                <Modal.Header className="bg-light">
                    <Modal.Title>
                        <i className="bi bi-check-circle text-medium"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The Badge “{badgeData.name}” is Successfully Published.
                </Modal.Body>
                <Modal.Footer>
                    <Link className="btn btn-outline-medium rounded-1" to={StaffRouteUrls.INDEX}>
                        Go to Home Page
                    </Link>
                    <Link className="btn btn-medium rounded-1" to={StaffRouteUrls.BADGES}>
                        Go to Badges
                    </Link>
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
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
