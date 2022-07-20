export default (props) => {
    const yymmdd = (t) => {
        const date = new Date(Date.parse(t))
        const year = date.getFullYear()
        const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
        const day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay()
        return year + '-' + month + '-' + day
    }
    return (
        <>
            {
                props.image &&
                <a href="#" className="list-group-item list-group-item-action py-3 lh-sm"  data-bs-toggle="modal" data-bs-target="#article-modal" onClick={()=>props.setSelectedData(props.image)}>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">{props.image.data[0].title}</strong>
                        <small className="text-muted">{yymmdd(props.image.data[0].date_created)}</small>
                    </div>
                    <div className="col-10 mb-1 small">{props.image.data[0].description}</div>
                </a>
            }
        </>
    )
}