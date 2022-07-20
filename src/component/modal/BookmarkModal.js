import ListCard from "../card/ListCard";

export default (props) => {
    const localStorage = window.localStorage;
    const bookmarks = JSON.parse(localStorage.getItem("bookmark"))
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
                                    {
                                        bookmarks &&
                                        bookmarks.map((image) => (
                                            <ListCard
                                                key={Math.random()}
                                                image={image}
                                                setSelectedData={props.setSelectedData}
                                            />
                                        )
                                        )
                                    }
                                </div>
                            </div>
                            <div className="modal-footer border-top-0 d-flex justify-content-between">
                                <button type="button" className="col btn btn-lg btn-outline-danger w-100 mx-1" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="col btn btn-lg btn-warning w-100 mx-1" onClick={() => localStorage.clear()}>Clear</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}