export default (props) => {
    return (
        <>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content super-rounded shadow">
                    <div className="modal-header border-bottom-0">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-0">
                        <p>{JSON.stringify(props.selectedData)}</p>
                    </div>
                    <div className="modal-footer flex-column border-top-0">
                        <button type="button" className="btn btn-lg btn-primary w-100 mx-0 mb-2">Save changes</button>
                        <button type="button" className="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}