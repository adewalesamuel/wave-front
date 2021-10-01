import { Components } from "../components"
export function ProjectEdit(props) {
    return(
        <>
            <Components.Forms.Project {...props}/>
            <button disabled={props.projectFormDisabled ?? false} type="button" className="btn btn-primary my-2 float-right" 
            data-dismiss="modal" onClick={props.methods.handleProjectSubmit}>
                <i className="bx bx-check d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Update project</span>
            </button>
        </>
    )
}