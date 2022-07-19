export default (props) => {
    return (
        <>
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content super-rounded shadow">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body py-0">
                        <p>{JSON.stringify(props.selectedData)}</p>
                    </div>
                    <div class="modal-footer flex-column border-top-0">
                        <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2">Save changes</button>
                        <button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}