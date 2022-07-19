import axios from "axios"
import { useState } from "react"

export default (props) => {

    const defaultQuery = {
        q: '',
        center: '',
        description: '',
        description_508: '',
        keywords: '',
        location: '',
        media_type: '',
        nasa_id: '',
        page: '',
        photographer: '',
        secondary_creator: '',
        title: '',
        year_start: '',
        year_end: '',
    }

    const [advancedQuery, setAdvancedQuery] = useState(defaultQuery)

    const handleQuery = (state) => {
        setAdvancedQuery({
            ...advancedQuery,
            [state.target.id]:state.target.value
        })
    }

    const advancedSearch = async () => {
        if(advancedQuery['page']!=='' && !(Number(advancedQuery['page'])>=1)){
            alert('페이지는 반드시 1 이상이어야 합니다.')
            return
        }
        else if(advancedQuery['year_start']!=='' && !((Number(advancedQuery['year_start'])>=1000 && (Number(advancedQuery['year_start'])<=9999)))){
            alert('YYYY 형태여야 합니다.')
            return
        }        
        else if(advancedQuery['year_end']!=='' && !((Number(advancedQuery['year_end'])>=1000 && (Number(advancedQuery['year_end'])<=9999)))){
            alert('YYYY 형태여야 합니다.')
            return
        }

        let query = ''
        Object.keys(advancedQuery).map((el)=>{advancedQuery[el]!=='' && (query+=('&'+el+'='+advancedQuery[el]))})
        console.log(query)
        if(query===''){
            alert('1개 항목 이상 입력해야 합니다.')
            return
        }
        props.setLoaded(false);
        props.setData([]);
        const url = 'https://images-api.nasa.gov/search?'+query;
        await axios.get(url)
            .then((response) => {
                props.setData(response.data.collection.items);
                props.setLoaded(true);
            }).catch(function (error) {
                console.log(error.response.status)
                switch (error.response.status) {
                    case 400:
                        alert('Bad Request! The request was unacceptable, often due to missing a required parameter.');
                        break;
                    case 404:
                        alert('The requested resource doesn’t exist.')
                        break
                    case 500:
                        alert('Something went wrong on the API’s end. (These are rare.)')
                        break
                    case 502:
                        alert('Something went wrong on the API’s end. (These are rare.)')
                        break
                    case 503:
                        alert('Something went wrong on the API’s end. (These are rare.)')
                        break
                    case 504:
                        alert('Something went wrong on the API’s end. (These are rare.)')
                        break
                    default:
                        alert('etc');
                        break;
                }
                props.setLoaded(true);
            });
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
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.q} id="q" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">center</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.center} id="center" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">description</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.description} id="description" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">description_508</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.description_508} id="description_508" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">keywords</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.keywords} id="keywords" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">location</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.location} id="location" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">media_type</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.media_type} id="media_type" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">nasa_id</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.nasa_id} id="nasa_id" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">page</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button" value={advancedQuery.page} id="page" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">photographer</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.photographer} id="photographer" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">secondary_creator</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.secondary_creator} id="secondary_creator" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">title</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={advancedQuery.title} id="title" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">year_start</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button"  value={advancedQuery.year_start} id="year_start" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">year_end</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button"  value={advancedQuery.year_end} id="year_end" onChange={handleQuery}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>advancedSearch()}>Search</button>
                </div>
            </div>
        </div>
    )
}