import axios from "axios"
import { useEffect, useState } from "react"
import ImageCard from "../component/ImageCard"
import LoadingSpinner from "../component/LoadingSpinner"
import Log from "../component/Log"
import { Link } from 'react-router-dom';
import ArticleModal from "./modal/ArticleModal"
import SearchModal from "./modal/SearchModal"

export default () => {
    const defaultQuery = {
        q: '',
        center: '',
        description: '',
        description_508: '',
        keywords: '',
        location: '',
        media_type: '',
        nasa_id: '',
        // page: '',
        photographer: '',
        secondary_creator: '',
        title: '',
        year_start: '',
        year_end: '',
    }

    const [isLoaded, setLoaded] = useState(false); //페이지 로딩 시도 시, spinner롤 보여주기 위함 + 무한 스크롤 시 불필요한 추가 요청을 방지하는 기능도 함
    const [data, setData] = useState([]); //받아온 데이터를 담을 리스트
    const [prevDataTemp, setPrevDataTemp] = useState([]); //마지막으로 받은 데이터의 임시 저장소
    const [query, setQuery] = useState(defaultQuery); //고급쿼리
    const [selectedData, setSelectedData] = useState(null); //사용자가 선택한 카드의 데이터를 담아줄 곳
    const [page, setPage] = useState(1); //요청 페이지 관리용

    useEffect(() => {
        initData();
    }, [])

    const initData = async () => {
        setQuery({
            ...defaultQuery,
            ['q']: 'america'
        })
        const tempData = await searchData({
            ...defaultQuery,
            ['q']: 'america'
        },1);
        await setData(tempData);
        setLoaded(true);
    }

    const searchData = async (query, page) => {
        // if (query['page'] !== '' && !(Number(query['page']) >= 1)) {
        //     alert('페이지는 반드시 1 이상이어야 합니다.')
        //     return data
        // }
        // else 
        if (query['year_start'] !== '' && !((Number(query['year_start']) >= 1000 && (Number(query['year_start']) <= 9999)))) {
            alert('YYYY 형태여야 합니다.')
            // console.log('YYYY 형태여야 합니다.')
            return data
        }
        else if (query['year_end'] !== '' && !((Number(query['year_end']) >= 1000 && (Number(query['year_end']) <= 9999)))) {
            alert('YYYY 형태여야 합니다.')
            console.log('YYYY 형태여/야 합니다.')
            return data
        }
        let queryForURL = ''
        // console.log(query)
        Object.keys(query).map((el) => { query[el] !== '' && (queryForURL += ('&' + el + '=' + query[el])) })
        // console.log('queryForURL : ' + queryForURL)
        if (queryForURL === '') {
            return data
        }
        // if (queryForURL.includes('&page') && queryForURL.split('&').length - 1 === 1) {
        //     alert('page를 제외한 1개 항목 이상 입력해야 합니다.')
        //     return data
        // }
        const url = 'https://images-api.nasa.gov/search?' + queryForURL + '&page='+page;
        let temp = [];
        await axios.get(url)
            .then((response) => {
                // console.log(response.data.collection.items)
                temp = (response.data.collection.items)
                setPrevDataTemp(temp);
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
            });
        return temp;
    }

    const handleQuery = (state) => {
        setQuery({
            ...query,
            ['q']: state.target.value
        }); //키보드 입력할때마다 쿼리 상태 변경
    };

    const search = async () => {
        setLoaded(false); //검색 버튼을 누르는 경우, 로드 중임을 알리기위해 false로 변경
        setPage(1);
        setData([]); //새 검색 결과에는 어차피 데이터를 비워야 하기 때문에 일단 삭제
        const tempData = await searchData(query, 1);
        await setData(tempData);
        setLoaded(true);
        setQuery(defaultQuery); //검색 끝났으니 쿼리 비우기
    }

    useEffect(() => {
        const moreImages = async () => {
            setLoaded(false); //검색 버튼을 누르는 경우, 로드 중임을 알리기위해 false로 변경
            const tempData = await searchData(query, page);
            await setData([...data, ...tempData]);
            setLoaded(true);    
        }

        // console.log('page' + page)
        // console.log('prevDataTemp' + prevDataTemp.length)
        if(prevDataTemp.length>0 && prevDataTemp.length<100){
            console.log('no more data')
            setLoaded(true);
        }
        else{
            moreImages()
        }
    }, [page]) //페이지가 변동(증가)하는 경우

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target
        if (isLoaded == true && (offsetHeight + scrollTop === scrollHeight)) { //스크롤이 바닥에 닿았을 때. (단, 로드 상태가 false 시 현재 이미 요청중이므로 true에만 요청을 허가한다.. )
            setLoaded(false);
            setPage(page + 1) // 다음 페이지로 변경
        }
    }

    return (
        <div style={{ "height": window.screen.height + "px", "overflowY": "scroll" }} onScroll={handleScroll}>
            <header className="py-3 mb-4">
                <div className="container d-flex flex-wrap justify-content-center">
                    <Link to="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none" onClick={() => window.location.reload()}>
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
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 align-items-stretch">
                        {data && data.map((image) =>
                            <ImageCard
                                key={Math.random()}
                                image={image}
                                setSelectedData={setSelectedData}
                            />)}
                    </div>
                </div>
                {
                    // 추가 리스트가 불러와짐을 여기서 보여주기 위함... 무한 스크롤 시 바닥에 spinner를 붙이는 효과도 있음
                    isLoaded ? <div></div> : <LoadingSpinner />
                }
                <div className="modal fade" id="article-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    {/* 기사 보여주는 모달 */}
                    <ArticleModal selectedData={selectedData} />
                </div>
                <div className="modal fade" id="search-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    {/* 상세 검색 모달 */}
                    <SearchModal
                        query={query}
                        setQuery={setQuery}
                        search={search}
                    />
                </div>
            </div>
        </div>
    )
}