export default (props) => {
    const href = props.image.href
    const data = props.image.data.length>0?props.image.data[0]:null; //잠재적인 문제 발생 가능
    const links = props.image.links.length>0?props.image.links[0]:null; //잠재적인 문제 발생 가능
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
                (data != null && links != null) &&
                <div className="col">
                    <div className="card shadow-sm super-rounded h-100">
                        <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={links.href} />
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <span className="badge bg-success">{data.center}</span>
                                </div>
                                <div>
                                    <span className="badge bg-blue">{yymmdd(data.date_created)}</span>
                                </div>
                            </div>
                            <div className="text-wrap"><h3>{data.title}</h3></div>
                            <p className="card-text text-wrap">{data.description}</p>
                            {/* <h5>{data.keywords}</h5> */}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}