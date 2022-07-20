import axios from "axios"
import { useState } from "react"

export default (props) => {

    const advancedQuery = props.advancedQuery;
    const setAdvancedQuery = props.setAdvancedQuery;

    const handleQuery = (state) => {
        setAdvancedQuery({
            ...advancedQuery,
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
                            <span className="my-0">q</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.q} id="q" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">center</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.center} id="center" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">description</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.description} id="description" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">description_508</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.description_508} id="description_508" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">keywords</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.keywords} id="keywords" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">location</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.location} id="location" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">media_type</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.media_type} id="media_type" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">nasa_id</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.nasa_id} id="nasa_id" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">page</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button" value={advancedQuery.page} id="page" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">photographer</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.photographer} id="photographer" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">secondary_creator</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.secondary_creator} id="secondary_creator" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">title</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.title} id="title" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">year_start</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button" value={advancedQuery.year_start} id="year_start" onChange={handleQuery} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">year_end</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button" value={advancedQuery.year_end} id="year_end" onChange={handleQuery} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => props.advancedSearch()}>Search</button>
                </div>
            </div>
        </div>
    )
}