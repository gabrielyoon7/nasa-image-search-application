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
    return (
        <>
            <Header />
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {images.map((image) => <ImageCard />)}
                </div>
            </div>
        </>
    )
}