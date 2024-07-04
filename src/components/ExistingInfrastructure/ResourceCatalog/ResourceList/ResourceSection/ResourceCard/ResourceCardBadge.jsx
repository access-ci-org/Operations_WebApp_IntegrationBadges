import placeholderBadge from "../../../../../../assets/img/placeholder_badge.png";
import ResourceCardModal from "./ResourceCardModal";

export default function ResourceCardBadge({data, index}) {
    const handleBadgeClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-secondary resource-badge"
                    data-bs-toggle="modal" data-bs-target={`#ResourceCardBadgeModal${index}`} onClick={handleBadgeClick}>
                <img src={placeholderBadge} alt="badge" className="badge-icon"
                     style={{width: '32px', height: '32px'}}/>
            </button>
            <ResourceCardModal data={data} name={`ResourceCardBadgeModal${index}`} />
        </div>
    );
}