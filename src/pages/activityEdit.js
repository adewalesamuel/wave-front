import { Components } from "../components"
export function ActivityEdit(props) {
    return(
        <>
            <Components.Forms.Activity {...props}/>
            <button disabled={props.activityFormDisabled ?? false} type="button" className="btn btn-primary my-2 float-right" 
            data-dismiss="modal" onClick={props.methods.handleActivitySubmit}>
                <i className="bx bx-check d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Update activity</span>
            </button>
        </>
    )
}