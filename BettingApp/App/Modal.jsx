const Modal = ({ title, body, okText, okAction }) => {
    return (
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{body}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" id="modalCancelButton" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" id="modalOKButton" onClick={okAction}>{okText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}