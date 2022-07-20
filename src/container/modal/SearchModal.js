import axios from "axios"
import { useState } from "react"

export default (props) => {

    const handleQuery = (state) => {
        props.setAdvancedQuery({
            ...props.advancedQuery,
            [state.target.id]:state.target.value
        })
    }

    const advancedSearch = async () => {
        if(props.advancedQuery['page']!=='' && !(Number(props.advancedQuery['page'])>=1)){
            alert('페이지는 반드시 1 이상이어야 합니다.')
            return
        }
        else if(props.advancedQuery['year_start']!=='' && !((Number(props.advancedQuery['year_start'])>=1000 && (Number(props.advancedQuery['year_start'])<=9999)))){
            alert('YYYY 형태여야 합니다.')
            return
        }        
        else if(props.advancedQuery['year_end']!=='' && !((Number(props.advancedQuery['year_end'])>=1000 && (Number(props.advancedQuery['year_end'])<=9999)))){
            alert('YYYY 형태여야 합니다.')
            return
        }

        let query = ''
        Object.keys(props.advancedQuery).map((el)=>{props.advancedQuery[el]!=='' && (query+=('&'+el+'='+props.advancedQuery[el]))})
        console.log(query)
        if(query===''){
            alert('1개 항목 이상 입력해야 합니다.')
            return
        }
        if(query.includes('&page')&&query.split('&').length-1===1){
            alert('page를 제외한 1개 항목 이상 입력해야 합니다.')
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
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.q} id="q" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">center</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.center} id="center" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">description</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.description} id="description" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">description_508</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.description_508} id="description_508" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">keywords</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.keywords} id="keywords" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">location</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.location} id="location" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">media_type</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.media_type} id="media_type" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">nasa_id</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.nasa_id} id="nasa_id" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">page</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.page} id="page" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">photographer</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.photographer} id="photographer" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">secondary_creator</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.secondary_creator} id="secondary_creator" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">title</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with radio button" value={props.advancedQuery.title} id="title" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">year_start</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button"  value={props.advancedQuery.year_start} id="year_start" onChange={handleQuery}/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-text py-2">
                            <span className="my-0">year_end</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Text input with radio button"  value={props.advancedQuery.year_end} id="year_end" onChange={handleQuery}/>
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