import { Components } from ".."

export function Indicator({state, methods}) {
    return (
        <form className={`form form-vertical ${state.indicatorFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleActivitySubmit}>
            <Components.ErrorMessageText>
                {state.indicatorErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name-vertical">Name</label>
                            <input disabled={state.indicatorFormDisabled} type="text" id="name-vertical" 
                            className="form-control" name="name" placeholder="Name" value={state.name ?? ""}
                            onChange={methods.handleChange} required/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required onChange={methods.handleChange} 
                                name="type" value={state.type}>
                                    {
                                        state.typeData.map(type => {
                                            return (<option key={Math.random()} value={type ?? ""}>
                                                    {`${type[0].toUpperCase()}${type.substring(1)}`}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="direciton">Direction</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required onChange={methods.handleChange} 
                                name="direction" value={state.direction}>
                                    {
                                        state.directionData.map(direction => {
                                            return (<option key={Math.random()} value={direction ?? ""}>
                                                    {`${direction[0].toUpperCase()}${direction.substring(1)}`}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="baseine">Baseline</label>
                            <input disabled={state.indicatorFormDisabled} type="number" id="baseline"
                            className="form-control" name="baseline" placeholder="Baseline" value={state.baseline ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="target">Target</label>
                            <input disabled={state.indicatorFormDisabled} type="number" id="target"
                            className="form-control" name="target" placeholder="Target" value={state.target ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="unit">Unit</label>
                            <input disabled={state.indicatorFormDisabled} type="text" id="unit"
                            className="form-control" name="unit" placeholder="Unit" value={state.unit ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="description-info-vertical">Description</label>
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
