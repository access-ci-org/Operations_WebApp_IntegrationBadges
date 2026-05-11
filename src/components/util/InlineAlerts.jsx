export function InlineAlert({variant="", showIcon=true, title=null, description=null}) {
    return <p className={`small bg-${variant} bg-opacity-10 border-start border-4 border-${variant} ps-2`}>
        {!!showIcon && <i className={`bi bi-exclamation-triangle-fill pe-2 text-${variant}`}></i>}
        <strong className={`text-black`}>{!!title && title}</strong>
        {title && description && <span> : </span>}
        <span className={`text-black`}>{description}</span>
    </p>
}