import { Components } from "../components"
export function IndicatorEdit(props) {
    return(
        <>
            <Components.Forms.Indicator {...props}/>
            <button disabled={props.indicatorFormDisabled ?? false} type="button" className="btn btn-primary my-2 float-right" 
            data-dismiss="modal" onClick={props.methods.handleIndicatorSubmit}>
                <i className="bx bx-check d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Update indicator</span>
            </button>
        </>
    )
}