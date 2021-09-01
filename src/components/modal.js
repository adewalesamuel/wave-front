export function Modal(props) {
    return(
        <div className="modal" id="userModal" tabIndex="-1" role="dialog" aria-labelledby="userModalTitle" 
            aria-hidden="true" style={{display: props.isHidden ? "none": "block" }} >
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="userModalTitle">Scrolling long Content</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={props.closeModal}>
                            <i className="bx bx-x"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button disabled={props.isDisabled ?? false} type="button" className="btn btn-light-secondary" 
                        data-dismiss="modal" onClick={props.closeModal}>
                            <i className="bx bx-x d-block d-sm-none"></i>
                            <span className="d-none d-sm-block">Close</span>
                        </button>
                        <button disabled={props.isDisabled ?? false} type="button" className="btn btn-primary ml-1" 
                        data-dismiss="modal" onClick={props.confirmModal ?? null}>
                            <i className="bx bx-check d-block d-sm-none"></i>
                            <span className="d-none d-sm-block">Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}