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
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content super-rounded shadow">
                    {
                        props.selectedData &&
                        <>
                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title"></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-0">
                                <img className="bd-placeholder-img card-img-top" width="100%" height="100%" src={props.selectedData.links[0].href} />
                                {/* <p>{JSON.stringify(props.selectedData)}</p> */}
                                <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="badge bg-success">{props.selectedData.data[0].center}</span>
                                    </div>
                                    <div>
                                        <span className="badge bg-blue">{yymmdd(props.selectedData.data[0].date_created)}</span>
                                    </div>
                                </div>
                                <div className=""><h3>{props.selectedData.data[0].title}</h3></div>
                                <p className="card-text">{props.selectedData.data[0].description}</p>
                            </div>
                            </div>
                            <div className="modal-footer flex-column border-top-0">
                                <button type="button" className="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Close</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}