export default (props) => {
    return(
        <div>
            <hr/>
            <h4>all</h4>
            <div>{JSON.stringify(props.image)}</div>
            <h4>href</h4>
            <div>{props.image.href}</div>
            {/* <h4>data</h4>
            <div>{JSON.stringify(props.image.data[0])}</div> */}
            <h4>data - center</h4>
            <div>{JSON.stringify(props.image.data[0].center)}</div>
            <h4>data - title</h4>
            <div>{JSON.stringify(props.image.data[0].title)}</div>
            <h4>data - nasa_id</h4>
            <div>{JSON.stringify(props.image.data[0].nasa_id)}</div>
            <h4>data - date_created</h4>
            <div>{JSON.stringify(props.image.data[0].date_created)}</div>
            <h4>data - media_type</h4>
            <div>{JSON.stringify(props.image.data[0].media_type)}</div>
            <h4>data - description</h4>
            <div>{JSON.stringify(props.image.data[0].description)}</div>
            <hr/>
        </div>
    )
}