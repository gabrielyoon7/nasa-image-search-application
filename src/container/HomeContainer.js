import axios from "axios"
import { useEffect, useState } from "react"
import ImageCard from "../component/ImageCard"
import LoadingSpinner from "../component/LoadingSpinner"
import Log from "../component/Log"
import { Link } from 'react-router-dom';
import ArticleModal from "./modal/ArticleModal"
import SearchModal from "./modal/SearchModal"

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
                setQuery('america');
                setLoaded(true);
            });
    }

    const handleQuery = (state) => {
        setQuery(state.target.value);
    };

    const search = () => {
        setLoaded(false);
        setData([]);
        if (query === '') {
            setQuery('america');
        }
        searchData();
        setQuery('');
    }

    // const [page, setPage] = useState(1)

    // useEffect(() => {
    //     const fetchTodos = async () => {
    //         setLoaded(false);
    //         try {
    //             await axios.get('https://images-api.nasa.gov/search?q=' + query + '&page=' + page)
    //                 .then((response) => {
    //                     setData([...data, ...response.data.collection.items]);
    //                     setLoaded(true);
    //                     // console.log(JSON.stringify(response))
    //                 }).catch(function (error) {

    //                 });
    //         } catch (e) {

    //         }
    //     }
    //     console.log(page)
    //     fetchTodos()
    // }, [page])

    const handleScroll = (e) => {
        // const { offsetHeight, scrollTop, scrollHeight } = e.target
        // console.log(e.target);
        // console.log(offsetHeight);
        // console.log(scrollTop);
        // console.log(scrollHeight);
        // if (offsetHeight + scrollTop === scrollHeight) {
        //     setPage(data.length + 1)
        // }
    }

    return (
        <>
            <header className="py-3 mb-4">
                <div className="container d-flex flex-wrap justify-content-center">
                    <Link to="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                        <span className="fs-4">🚀 NASA Image Search Application</span>
                    </Link>
                    <div className="col-12 col-lg-auto mb-3 mb-lg-0">
                        <div className="input-group my-2">
                            <input onChange={handleQuery} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                            <button onClick={() => search()} className="btn btn-outline-dark" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                            <button data-bs-toggle="modal" data-bs-target="#search-modal" className="btn btn-outline-dark" type="button" id="button-addon2"><i className="bi bi-filter"></i></button>
                        </div>
                    </div>
                </div>
                <hr />
            </header>
            <div className="">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 align-items-stretch" onScroll={handleScroll}>
                        {data && data.map((image) => <ImageCard key={Math.random()} image={image} setSelectedData={setSelectedData} />)}
                    </div>
                    {/* <div>
                        {data && data.map((image) => <Log key={Math.random()} image={image} />)}
                    </div> */}
                </div>
                {
                    // 추가 리스트가 불러와짐을 여기서 보여주기 위함
                    isLoaded
                        ?
                        <div></div>
                        :
                        <LoadingSpinner />
                }
                <div className="modal fade" id="article-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <ArticleModal selectedData={selectedData} />
                </div>
                <div className="modal fade" id="search-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <SearchModal setData={setData} setLoaded={setLoaded}/>
                </div>
            </div>
        </>
    )
}