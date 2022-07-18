export default (props) => {
    return(
        <div>
            <div>{JSON.stringify(props.image)}</div>
            <h4>href</h4>
            <div>{props.image.href}</div>
            <h4>data</h4>
            <div>{JSON.stringify(props.image.data)}</div>
        </div>
    )
}