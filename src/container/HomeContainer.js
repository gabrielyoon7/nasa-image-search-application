import axios from "axios"
import { useEffect, useState } from "react"
import ImageCard from "../component/ImageCard"
import LoadingSpinner from "../component/LoadingSpinner"
import Log from "../component/Log"
import Header from "./Header"
import { Link } from 'react-router-dom';
import ArticleModal from "../component/ArticleModal"

export default () => {

    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [query, setQuery] = useState('america');


    useEffect(() => {
        searchData();
    }, [])

    const searchData = async () => {
        await axios.get('https://images-api.nasa.gov/search?q=' + query)
            .then((response) => {
                setData(response.data.collection.items);
                setLoaded(true);
                // console.log(JSON.stringify(response))
            }).catch(function (error) {
                // console.log(error);
                // console.log('핸들링')
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
            });
    }

    const handleQuery = (state) => {
        setQuery(state.target.value);
    };

    const search = () => {
        setLoaded(false);
        setData([]);
        searchData();
        setQuery('');
    }

    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchTodos = async () => {
            setLoaded(false);
            try {
                await axios.get('https://images-api.nasa.gov/search?q=' + query + '&page=' + page)
                    .then((response) => {
                        setData([...data, ...response.data.collection.items]);
                        setLoaded(true);
                        // console.log(JSON.stringify(response))
                    }).catch(function (error) {

                    });
            } catch (e) {

            }
        }
        console.log(page)
        fetchTodos()
    }, [page])

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target
        console.log(e.target);
        console.log(offsetHeight);
        console.log(scrollTop);
        console.log(scrollHeight);
        if (offsetHeight + scrollTop === scrollHeight) {
            setPage(data.length+1)
        }
    }

    return (
        <>
            <header className="py-3 mb-4">
                <div className="container d-flex flex-wrap justify-content-center">
                    <Link to="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                        <span className="fs-4">🚀 nasa-image-search-application</span>
                    </Link>
                    <div className="col-12 col-lg-auto mb-3 mb-lg-0">
                        <div className="input-group mb-3">
                            <input onChange={handleQuery} type="text" className="form-control" placeholder="검색어를 입력하세요" aria-label="검색어를 입력하세요" aria-describedby="button-addon2" />
                            <button onClick={() => search()} className="btn btn-outline-secondary" type="button" id="button-addon2">🔎</button>
                        </div>
                        {/* <div className="input-group mb-3">
                            <input onChange={handleQuery} type="text" className="form-control" placeholder="페이지 내에서 검색하기" aria-label="페이지 내에서 검색하기" aria-describedby="button-addon2" />
                        </div> */}
                    </div>
                </div>
            </header>
            <div className="bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 align-items-stretch" onScroll={handleScroll}>
                        {data && data.map((image) => <ImageCard key={Math.random()} image={image} setSelectedData={setSelectedData} />)}
                    </div>
                    {/* <div>
                        {data && data.map((image) => <Log key={Math.random()} image={image} />)}
                    </div> */}
                    {
                        // 추가 리스트가 불러와짐을 여기서 보여주기 위함
                        isLoaded
                            ?
                            <div></div>
                            :
                            <LoadingSpinner />
                    }
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    {
                        <ArticleModal selectedData={selectedData} />
                    }
                </div>
            </div>
        </>
    )
}