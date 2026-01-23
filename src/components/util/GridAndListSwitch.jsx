export default function GridAndListSwitch({state= "grid"}) {
    return <div className="d-flex flex-row">
        <div className="p-1">
            <button type="button" className={`btn btn-sm rounded-1 ${state=== "grid" ? "btn-light" : "btn-medium"}`}>
                <i className="bi bi-list"></i>
            </button>
        </div>
        <div className="p-1 ps-0">
            <button type="button" className={`btn btn-sm rounded-1 ${state=== "list" ? "btn-light" : "btn-medium"}`}>
                <i className="bi bi-grid-3x3-gap-fill"></i>
            </button>
        </div>
    </div>
}
