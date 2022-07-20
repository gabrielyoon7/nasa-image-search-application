import React from "react";

const ImageCard = (props) => {
    const data = props.image.data[0]; //잠재적인 문제 발생 가능
    let links = '#'; //잠재적인 문제 발생 가능
    if (data.media_type == 'image') {
        links = props.image.links[0]
    }
    const yymmdd = (t) => {
        const date = new Date(Date.parse(t))
        const year = date.getFullYear()
        const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
        const day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay()
        return year + '-' + month + '-' + day
    }
    return (
        <>
            {
                data.media_type == 'image' &&
                <div className="col">
                    <div className="card shadow-sm super-rounded h-100">
                        <a href="#" className="text-decoration-none text-dark" data-bs-toggle="modal" data-bs-target="#article-modal" onClick={()=>props.setSelectedData(props.image)}>
                            <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={links.href && links.href} />
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="badge bg-success">{data.center && data.center}</span>
                                    </div>
                                    <div>
                                        <span className="badge bg-blue">{data.date_created && yymmdd(data.date_created)}</span>
                                    </div>
                                </div>
                                <div className="text-wrap"><h3>{data.title && data.title}</h3></div>
                                <p className="card-text text-wrap">{data.description && data.description}</p>
                            </div>
                        </a>
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(ImageCard);