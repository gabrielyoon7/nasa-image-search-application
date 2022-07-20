export default (props) => {
    const localStorage = window.localStorage;

    return (
        <>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content super-rounded shadow">
                    {
                        <>
                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title">Bookmark</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-0">
                                <div className="card-body">
                                    {JSON.parse(localStorage.getItem("bookmark")).map((star)=><div key={Math.random()}>{star.href}</div>)}
                                    <a href="#" className="list-group-item list-group-item-action py-3 lh-sm">
                                        <div className="d-flex w-100 align-items-center justify-content-between">
                                            <strong className="mb-1">List group item heading</strong>
                                            <small className="text-muted">Mon</small>
                                        </div>
                                        <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                                    </a>
                                </div>
                            </div>
                            <div className="modal-footer border-top-0 d-flex justify-content-between">
                                <button type="button" className="col btn btn-lg btn-danger w-100 mx-1" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="col btn btn-lg btn-success w-100 mx-1" onClick={()=>localStorage.clear()}>Clear</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}