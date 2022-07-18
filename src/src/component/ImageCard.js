export default (props) => {
    const href = props.image.href
    const data = props.image.data[0];
    const links = props.image.links[0];
    return (
        <>
            <div className="col">
                <div className="card shadow-sm">
                    <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={links.href}/>

                    <div className="card-body">
                        <p className="card-text">{data.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>console.log(JSON.stringify(props.image))}>View</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>alert(props.image.data[0].description)}>Edit</button>
                            </div>
                            <small className="text-muted">9 mins</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}