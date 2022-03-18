import { Components } from ".."

export function Country({state, methods}) {
    return (
        <form className={`form form-vertical ${state.formDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleSubmit}>
            <Components.ErrorMessageText>
                {state.countryErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="first-name-vertical">Name</label>
                            <input disabled={state.formDisabled} type="text" id="first-name-vertical" 
                            className="form-control" name="name" placeholder="Country name" value={state.name ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="last-name-vertical">Code</label>
                            <input disabled={state.formDisabled} type="text" id="last-name-vertical" 
                            className="form-control" name="code" placeholder="Country code" value={state.code ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}