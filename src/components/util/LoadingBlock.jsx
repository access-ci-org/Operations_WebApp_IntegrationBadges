export default function LoadingBlock(
    {title = "", data, processing, error, reload, children, className, minHeight = 40, noText = false}
) {
    if (!processing && !error) {
        return children
    }

    let loadingBlockContent;
    if (processing) {
        loadingBlockContent = <>
            {!noText && <span className="pe-2 ps-2">Loading {title} ...</span>}

            <div className="d-inline-block align-middle">
                    <span className="spinner-border spinner-border-sm ms-auto text-gray-600" role="status"
                          aria-hidden="true"></span>
            </div>

        </>
    } else if (error) {
        loadingBlockContent = <>
            {!noText && <i className="bi bi-exclamation-triangle-fill text-danger" aria-hidden="true"></i>}

            {!noText && <span className="pe-2 ps-2 text-gray-600">
                <span>Error fetching&nbsp;</span>
                <span>{title}</span>
            </span>}

            {reload &&
                <button className="btn btn-sm btn-link text-gray-600 lh-1" aria-label={`Reload ${title}`}
                        onClick={reload}>
                    <i className="bi bi-arrow-clockwise fs-4"></i>
                </button>}
        </>
    }

    return <div className={`fs-7 text-start text-gray-600 ${className}`}
                style={{minHeight}}>
        {loadingBlockContent}
    </div>
}
