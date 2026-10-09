export default function RequiredStatus({required=true, hideIfNotRequired = true}) {
    if (required) {
        return <span className="bg-secondary-light text-gray-800 ps-2 pe-2 pt-2 pb-2 rounded-1 fs-8 fw-medium">Required</span>;
    } else if (!hideIfNotRequired) {
        return <span className="bg-secondary-light text-gray-800 ps-2 pe-2 pt-1 pb-1 rounded-1 fs-8">Not Required</span>;
    }
}
