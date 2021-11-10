import { Components } from ".."

export function Graph({state, methods}) {
    return (
        <form className={`form form-vertical ${state.graphFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleGraphSubmit}>
            <Components.ErrorMessageText>
                {state.graphErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name-vertical">Name</label>
                            <input disabled={state.graphFormDisabled} type="text" id="name-vertical" 
                            className="form-control" name="name" placeholder="Name" value={state.name ?? ""}
                            onChange={methods.handleChange} required/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="type-id-vertical">Type</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required onChange={methods.handleChange} 
                                name="type" value={state.type}>
                                    <option hidden>Select a type of graph</option>
                                    {
                                        state.typeList.map(type => {
                                            return (<option key={Math.random()} value={type.value ?? ""}>
                                                    {`${type.name}`}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="indicators-id-vertical">Indicator</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required onChange={methods.handleChange} 
                                name="indicators" value={state.indicators}>
                                    <option hidden>Select an indicator</option>
                                    {
                                        state.indicatorList.map(indicators => {
                                            return (<option key={Math.random()} value={indicators.id ?? ""}>
                                                    {`${indicators.name}`}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="description-info-vertical">Description</label>
                            <textarea className="form-control" name="description" id="description-info-vertical" 
                            rows="4" onChange={methods.handleChange} value={state.description ?? ""}>
                            </textarea> 
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
