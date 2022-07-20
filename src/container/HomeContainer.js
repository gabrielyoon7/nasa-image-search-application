import axios from "axios"
import { useEffect, useState } from "react"
import ImageCard from "../component/ImageCard"
import LoadingSpinner from "../component/LoadingSpinner"
import Log from "../component/Log"
import { Link } from 'react-router-dom';
import ArticleModal from "./modal/ArticleModal"
import SearchModal from "./modal/SearchModal"

export default () => {

    const [isLoaded, setLoaded] = useState(false); //페이지 로딩 시도 시, spinner롤 보여주기 위함 + 무한 스크롤 시 불필요한 추가 요청을 방지하는 기능도 함
    const [data, setData] = useState([]); //받아온 데이터를 담을 리스트
    const [selectedData, setSelectedData] = useState(null); //사용자가 선택한 카드의 데이터를 담아줄 곳
    const [query, setQuery] = useState('america'); //쿼리
    const [page, setPage] = useState(1); //요청 페이지 관리용

    useEffect(() => {
        searchData(); //페이지 첫 로드 시 데이터 불러오기
    }, [])

    const searchData = async () => {
        setPage(1) //새로운 요청 때 마다 페이지를 1로 고정하는 역할
        await axios.get('https://images-api.nasa.gov/search?q=' + query)
            .then((response) => {
                setData(response.data.collection.items); //수신한 데이터를 담아줌
                setLoaded(true); //로드 됐음을 알림
            }).catch(function (error) {
                console.log(error.response.status)
                switch (error.response.status) { //오류 핸들링
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
                setQuery('america'); //이후, 초기 데이터로 돌아가기 위함
                setLoaded(true); //일단 로드 상태를 정상으로 복귀시킴
            });
    }

    const handleQuery = (state) => {
        setQuery(state.target.value); //키보드 입력할때마다 쿼리 상태 변경
    };

    const search = () => {
        setLoaded(false); //검색 버튼을 누르는 경우, 로드 중임을 알리기위해 false로 변경
        setData([]); //새 검색 결과에는 어차피 데이터를 비워야 하기 때문에 일단 삭제
        if (query === '') { //쿼리가 빈 상태로 검색하려는 경우 초기값으로 되돌려줌
            setQuery('america');
        }
        searchData(); //데이터 검색하기
        setQuery(''); //검색 끝났으니 쿼리 비우기
    }


    useEffect(() => {
        const moreImages = async () => {
            try {
                await axios.get('https://images-api.nasa.gov/search?q=' + query + '&page=' + page) //증가된 페이지 쿼리로 요청
                    .then((response) => {
                        setData([...data, ...response.data.collection.items]); //기존 데이터는 날리지 않고 이어붙이기
                        setLoaded(true); //로드를 true로 전환
                    }).catch(function (error) {

                    });
            } catch (e) {

            }
        }
        console.log('page' + page)
        moreImages()
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
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 align-items-stretch">
                        {data && data.map((image) => <ImageCard key={Math.random()} image={image} setSelectedData={setSelectedData} />)}
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
                    <SearchModal setData={setData} setLoaded={setLoaded} />
                </div>
            </div>
        </div>
    )
}