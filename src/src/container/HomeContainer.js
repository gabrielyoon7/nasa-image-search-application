import axios from "axios"
import { useEffect, useState } from "react"
import ImageCard from "../component/ImageCard"
import Header from "./Header"

export default () => {
    const images = [
        {
            title: 'ㅇㅇ',
            center: 'ㅇㅇ',
            date_created: 'ㅇㅇ',
            description: 'ㅇㅇ',
            keywords: 'ㅇㅇ',
        },
        {
            title: 'ㅇㅇ',
            center: 'ㅇㅇ',
            date_created: 'ㅇㅇ',
            description: 'ㅇㅇ',
            keywords: 'ㅇㅇ',
        },
        {
            title: 'ㅇㅇ',
            center: 'ㅇㅇ',
            date_created: 'ㅇㅇ',
            description: 'ㅇㅇ',
            keywords: 'ㅇㅇ',
        },
        {
            title: 'ㅇㅇ',
            center: 'ㅇㅇ',
            date_created: 'ㅇㅇ',
            description: 'ㅇㅇ',
            keywords: 'ㅇㅇ',
        },
        {
            title: 'ㅇㅇ',
            center: 'ㅇㅇ',
            date_created: 'ㅇㅇ',
            description: 'ㅇㅇ',
            keywords: 'ㅇㅇ',
        },
        {
            title: 'ㅇㅇ',
            center: 'ㅇㅇ',
            date_created: 'ㅇㅇ',
            description: 'ㅇㅇ',
            keywords: 'ㅇㅇ',
        },
        {
            title: 'ㅇㅇ',
            center: 'ㅇㅇ',
            date_created: 'ㅇㅇ',
            description: 'ㅇㅇ',
            keywords: 'ㅇㅇ',
        },
    ]

    const [data,setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await axios.get('https://images-api.nasa.gov/search?q=seoul')
        .then((response) => {
            setData(response.data.collection.items);
            console.log(JSON.stringify(response.data.collection.items))
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <header className="py-3 mb-4 border-bottom">
                <div className="container d-flex flex-wrap justify-content-center">
                    <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                        <span className="fs-4">🚀 nasa-image-search-application</span>
                    </a>
                    <div className="col-12 col-lg-auto mb-3 mb-lg-0">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="검색어를 입력하세요" aria-label="검색어를 입력하세요" aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">🔎</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {data&&data.map((image) => <ImageCard image={image} />)}
                </div>
            </div>
        </>
    )
}