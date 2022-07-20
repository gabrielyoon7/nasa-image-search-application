import axios from "axios"
import { useEffect, useRef, useState } from "react"
import ImageCard from "../component/card/ImageCard"
import LoadingSpinner from "../component/common/LoadingSpinner"
import Log from "../component/common/Log"
import { Link } from 'react-router-dom';
import ArticleModal from "../component/modal/ArticleModal"
import SearchModal from "../component/modal/SearchModal"
import BookmarkModal from "../component/modal/BookmarkModal"

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
    const [prevDataSize, setPrevDataSize] = useState(0); //마지막으로 받은 데이터의 크기를 저장해줌 (무한 스크롤 방지를 위함)
    const [query, setQuery] = useState(defaultQuery); //고급쿼리
    const [selectedData, setSelectedData] = useState(null); //사용자가 선택한 카드의 데이터를 담아줄 곳
    const [page, setPage] = useState(1); //요청 페이지 관리용
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        findBookMarks(); //초기 북마크 찾기
        initData(); //초기데이터 수신
    }, [])

    const findBookMarks=  () => {
        const items = localStorage.getItem("bookmark");
        if(items==null){
            setBookmarks([]);
        }
        else{
            setBookmarks(JSON.parse(items));
        }
    }

    const initData = async () => {
        setQuery({ //초기 쿼리로 q를 지정해줌 (바로 사용하는 것은 아니고, 나중 검색을 위한 작업)
            ...defaultQuery,
            ['q']: 'america'
        })
        const tempData = await searchData({  //초기 쿼리 q를 지정한 후, searchData로 부터 데이터를 받아옴
            ...defaultQuery,
            ['q']: 'america'
        }, 1);
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
        Object.keys(query).map((el) => { query[el] !== '' && (queryForURL += ('&' + el + '=' + query[el])) }) //여기에서 쿼리 스트링을 제작해준다
        // console.log('queryForURL : ' + queryForURL)
        if (queryForURL === '') {
            return data
        }
        // if (queryForURL.includes('&page') && queryForURL.split('&').length - 1 === 1) {
        //     alert('page를 제외한 1개 항목 이상 입력해야 합니다.')
        //     return data
        // }
        const url = 'https://images-api.nasa.gov/search?' + queryForURL + '&page=' + page; //앞서 만든 쿼리 스트링과 현재 지정된 page을 함께 검색해줌
        let temp = [];
        await axios.get(url)
            .then((response) => {
                temp = (response.data.collection.items)
                setPrevDataSize(temp.length); //마지막으로 받은 데이터의 크기를 저장하기 위함 (1~100개 사이라면 더이상 스크롤 받아올 수 없다고 간주함)
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
        setPage(1); //검색 시, page를 1로 초기화 해줘야 함
        setData([]); //새 검색 결과에는 어차피 데이터를 비워야 하기 때문에 일단 삭제
        const tempData = await searchData(query, 1); //데이터 받아오기
        setData(tempData); //받아온 데이터를 상태로 관리
        setLoaded(true); //로드가 완료됐음을 알림
        setQuery(defaultQuery); //검색 끝났으니 쿼리 비우기
    }


    // 무한 스크롤 요청 관련 코드 시작
    useEffect(() => {
        const moreImages = async () => {
            setLoaded(false); //검색 버튼을 누르는 경우, 로드 중임을 알리기위해 false로 변경
            const tempData = await searchData(query, page);
            await setData([...data, ...tempData]); //기존 데이터를 버리지 않고 연결해줌
            setLoaded(true);
        }
        if (prevDataSize > 0 && prevDataSize < 100) { //이미 리스트의 마지막 요청을 한 경우
            console.log('no more data')
            setLoaded(true);
        }
        else {
            moreImages()
        }
    }, [page]) //페이지가 변동(증가)하는 경우

    const handleScroll = (e) => {
        handleResize();
        const { offsetHeight, scrollTop, scrollHeight } = e.target
        if (isLoaded == true && (offsetHeight + scrollTop === scrollHeight)) { //스크롤이 바닥에 닿았을 때. (단, 로드 상태가 false 시 현재 이미 요청중이므로 true에만 요청을 허가한다.. )
            setLoaded(false);
            setPage(page + 1) // 다음 페이지로 변경
        }
    }
    // 무한 스크롤 요청 관련 코드 끝

    // 무한 스크롤의 스크롤 관련 코드 시작 (화면 크기 변경 시에도 안정적으로 스크롤이 가능 하게 도와줌)
    let headerElementRef = useRef(null);

    const [windowHeight, setWindowSize] = useState(window.innerHeight);
    const [scrollHeight, setScrollHeight] = useState(window.innerHeight - headerElementRef.current?.clientHeight);
    const handleResize = () => {
        setWindowSize(window.innerHeight)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    useEffect(() => {
        setScrollHeight(windowHeight - headerElementRef.current?.clientHeight);
    }, [windowHeight])
    // 무한 스크롤의 스크롤 관련 코드 끝  (화면 크기 변경 시에도 안정적으로 스크롤이 가능 하게 도와줌)


    return (
        <>
            {/* 헤더 시작 */}
            <header className="py-3 shadow-sm " ref={headerElementRef}>
                <div className="container d-flex flex-wrap justify-content-center">
                    <Link to="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none" onClick={() => window.location.reload()}>
                        <span className="fs-4">🚀 NASA Image Search Application</span>
                    </Link>
                    <div className="col-12 col-lg-auto mb-lg-0">
                        <div className="input-group my-2">
                            <input onChange={handleQuery} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                            <button onClick={() => search()} className="btn btn-outline-dark" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                            <button data-bs-toggle="modal" data-bs-target="#search-modal" className="btn btn-outline-dark" type="button" id="button-addon2"><i className="bi bi-funnel-fill"></i></button>
                            <button data-bs-toggle="modal" data-bs-target="#bookmark-modal" className="btn btn-outline-dark" type="button" id="button-addon2"><i className="bi bi-bookmark-star"></i></button>
                        </div>
                    </div>
                </div>
            </header>
            {/* 헤더 끝 */}
            {/* 스크롤 시작 */}
            <div style={{ "height": scrollHeight + "px", "overflowY": "scroll" }} onScroll={handleScroll}>
                <div className="mt-2">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 align-items-stretch mb-5">
                            {
                                data && data.map((image) =>
                                    <ImageCard
                                        key={Math.random()}
                                        image={image}
                                        setSelectedData={setSelectedData}
                                    />)
                            }
                        </div>
                    </div>
                    {
                        // 추가 리스트가 불러와짐을 여기서 보여주기 위함... 무한 스크롤 시 바닥에 spinner를 붙이는 효과도 있음
                        isLoaded ? <div></div> : <LoadingSpinner />
                    }
                    <div className="modal fade" id="article-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        {/* 기사 보여주는 모달 */}
                        <ArticleModal
                            selectedData={selectedData}
                            setBookmarks={setBookmarks}
                        />
                    </div>
                    <div className="modal fade" id="search-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        {/* 상세 검색 모달 */}
                        <SearchModal
                            query={query}
                            setQuery={setQuery}
                            search={search}
                        />
                    </div>
                    <div className="modal fade" id="bookmark-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        {/* 북마크 모달 */}
                        <BookmarkModal
                            bookmarks={bookmarks}
                            setBookmarks={setBookmarks}
                            setSelectedData={setSelectedData}
                        />
                    </div>
                </div>
            </div>
            {/* 스크롤 끝 */}
        </>
    )
}