export default (props) => {
    return (
        <>
            {
                props.image &&
                <a href="#" className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">{props.image.data[0].title}</strong>
                        <small className="text-muted">Mon</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
            }
        </>
    )
}