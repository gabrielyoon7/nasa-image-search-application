import axios from "axios"
import { useEffect, useState } from "react"
import ImageCard from "../component/ImageCard"
import LoadingSpinner from "../component/LoadingSpinner"
import Log from "../component/Log"
import Header from "./Header"

export default () => {

    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('seoul');

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await axios.get('https://images-api.nasa.gov/search?q=' + query)
            .then((response) => {
                setData(response.data.collection.items);
                setLoaded(true);
                // console.log(JSON.stringify(response))
            }).catch(function (error) {
                console.log(error);
            });
    }

    const handleQuery = (state) => {
        setQuery(state.target.value);
    };

    const search = () => {
        setLoaded(false);
        getData();
        setQuery('');
    }

    return (
        <>
            <header className="py-3 mb-4">
                <div className="container d-flex flex-wrap justify-content-center">
                    <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                        <span className="fs-4">🚀 nasa-image-search-application</span>
                    </a>
                    <div className="col-12 col-lg-auto mb-3 mb-lg-0">
                        <div className="input-group mb-3">
                            <input onChange={handleQuery} type="text" className="form-control" placeholder="검색어를 입력하세요" aria-label="검색어를 입력하세요" aria-describedby="button-addon2" />
                            <button onClick={() => search()} className="btn btn-outline-secondary" type="button" id="button-addon2">🔎</button>
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={handleQuery} type="text" className="form-control" placeholder="페이지 내에서 검색하기" aria-label="페이지 내에서 검색하기" aria-describedby="button-addon2" />
                        </div>
                    </div>
                </div>
            </header>
            <div className="bg-light">
                <div className="container">
                    {
                        isLoaded
                            ?
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 align-items-stretch">
                                {data && data.map((image) => <ImageCard key={Math.random()} image={image} />)}
                            </div>
                            // <div>
                            //     {data && data.map((image) => <Log key={Math.random()} image={image} />)}
                            // </div>
                            :
                            <LoadingSpinner />
                    }
                </div>

            </div>
        </>
    )
}