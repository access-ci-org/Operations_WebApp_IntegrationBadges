import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function BadgeDetailHeader({ resource, badges, currentBadge }) {
    const [roadmapBadges, setRoadmapBadges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const badgeMap = new Map();

        resource.roadmaps.forEach(roadmap => {
            roadmap.roadmap.badges.forEach(badgeContainer => {
                const badgeId = badgeContainer.badge.badge_id;
                if (!badgeMap.has(badgeId)) {
                    const fullBadgeInfo = badges.find(badge => badge.badge_id === badgeId)
                        || {...badgeContainer.badge, name: 'Unknown Badge'};
                    badgeMap.set(badgeId, fullBadgeInfo);
                }
            });
        });

        setRoadmapBadges([...badgeMap.values()]);
    }, [resource, badges]);


    // Handle badge selection and navigate
    const handleSelectBadge = (badge) => {
        navigate(`/resourceBadge/${resource.cider_resource_id}/${badge.badge_id}`);
    };

    // Handle title selection and navigate
    const handleSelectTitle = () => {
        navigate(`/resourceDetail/${resource.cider_resource_id}`);
    }

    return (
        <div className="header-wrapper">
            <div className="title-wrapper">
                <h1 onClick={() => handleSelectTitle()}>{resource.resource_descriptive_name}</h1>
                <a href={resource.organization_url}>{resource.cider_type} Resource</a>
            </div>
            <div className="btn-group">
                <p>All Badges: </p>
                <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {currentBadge ? currentBadge.name : 'Select a Badge'}
                </button>
                <ul className="dropdown-menu">
                    {roadmapBadges.map((badge, index) => (
                        <li key={index}>
                            <a className="dropdown-item" onClick={() => handleSelectBadge(badge)}>
                                {badge.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
