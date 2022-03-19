import { Components } from ".."

export function Outcome({state, methods}) {
    return (
        <form className={`form form-vertical ${state.formDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleSubmit}>
            <Components.ErrorMessageText>
                {state.outcomeErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="fname-vertical">Name</label>
                            <input disabled={state.formDisabled} type="text" id="fname-vertical" 
                            className="form-control" name="name" placeholder="Outcome name" value={state.name ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="description-vertical">Description</label>
                            <textarea className="form-control" name="description" id="description-info-vertical" 
                            rows="4" onChange={methods.handleChange} value={state.description}>
                            </textarea> 
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}