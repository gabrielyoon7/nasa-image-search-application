export default (props) => {
    const yymmdd = (t) => {
        const date = new Date(Date.parse(t))
        const year = date.getFullYear()
        const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
        const day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay()
        return year + '-' + month + '-' + day
    }
    const data = props.selectedData;
    return (
        <>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content super-rounded shadow">
                    {
                        data &&
                        <>
                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title"></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-0">
                                <img className="bd-placeholder-img card-img-top" width="100%" height="100%" src={data.links[0].href && data.links[0].href} />
                                <div className="card-body">
                                    <span className="badge bg-blue mx-1">{data.data[0].center && data.data[0].center}</span>
                                    <span className="badge bg-blue mx-1">{data.data[0].nasa_id && data.data[0].nasa_id}</span>
                                    <div className=""><h1>{data.data[0].title && data.data[0].title}</h1></div>
                                    <div className=""><h5>{data.data[0].photographer && 'By ' + data.data[0].photographer}</h5></div>
                                    <div className=""><h6>{data.data[0].location && 'At ' + data.data[0].location}</h6></div>
                                    <div className=""><h6>{data.data[0].date_created && yymmdd(data.data[0].date_created)}</h6></div>
                                    <hr/>
                                    <p className="card-text" style={{"minHeight":"500px"}}>{data.data[0].description}</p>
                                    <hr/>
                                    <div>
                                        {
                                            data.data[0].keywords &&
                                            data.data[0].keywords.map((keyword) => <span key={Math.random()} className="badge bg-light text-dark mx-1">{'# ' + keyword}</span>)
                                        }
                                    </div>
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