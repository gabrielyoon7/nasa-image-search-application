import axios from "axios"
import { useState } from "react"

export default (props) => {

    const query = props.query;
    const setQuery = props.setQuery;

    const handleQuery = (state) => {
        setQuery({
            ...query,
            [state.target.id]: state.target.value
        })
    }

    return (
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Advanced Search</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">q</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.q} id="q" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">center</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.center} id="center" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">description</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.description} id="description" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">description_508</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.description_508} id="description_508" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">keywords</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.keywords} id="keywords" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">location</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.location} id="location" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">media_type</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.media_type} id="media_type" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">nasa_id</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.nasa_id} id="nasa_id" onChange={handleQuery} />
                    </div>
                    {/* <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">page</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button" value={query.page} id="page" onChange={handleQuery} />
                    </div> */}
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">photographer</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.photographer} id="photographer" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">secondary_creator</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.secondary_creator} id="secondary_creator" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">title</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={query.title} id="title" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">year_start</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button" value={query.year_start} id="year_start" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0 caption-width">year_end</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button" value={query.year_end} id="year_end" onChange={handleQuery} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => props.search()}>Search</button>
                </div>
            </div>
        </div>
    )
}