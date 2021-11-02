import { Components } from ".."

export function Disaggregation({state, methods}) {
    return (
        <form className={`form form-vertical ${state.isDisaggregationFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleDisaggregationSubmit}>
            <Components.ErrorMessageText>
                {state.disaggregationErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="type-vertical">Type</label>
                            <input disabled={state.isDisaggregationFormDisabled} type="text" id="type-vertical" 
                            className="form-control" name="type" placeholder="Name" value={state.type ?? ""}
                            onChange={methods.handleChange} required/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="availability">Availability</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required onChange={methods.handleChange} 
                                name="availability" value={state.availability}>
                                    {
                                        state.availabilityData.map(availability => {
                                            return (<option key={Math.random()} value={availability ?? ""}>
                                                    {`${availability[0].toUpperCase()}${availability.substring(1)}`}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group" id="fields">
                            <label htmlFor="fields">Fields</label>
                            {
                                state.fields.map((field, index) => {
                                    return (<div className="form-group" key={Math.random()}>
                                            <input disabled={state.isDisaggregationFormDisabled} type="text" 
                                            id="field-vertical" className="form-control" name={`field${index + 1}`} 
                                            placeholder={`Field ${index + 1}`} data-index={index} defaultValue={state.fields[index]}/>
                                        </div>)
                                })
                            }        
                        </div>
                        <div className="float-right">
                            <span className="btn btn-text primary p-0" role="button" style={{fontSize: "0.82rem", fontWeight: "bold"}}
                            onClick={methods.handleAddFieldClick}>
                                <span className="bx bx-plus" style={{transform: "translateY(+4px)"}}></span> Add a new field
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
