import { Components } from ".."

export function Project({state, methods}) {
    return (
        <form className={`form form-vertical ${state.roleFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleProjectSubmit}>
            <Components.ErrorMessageText>
                {state.projectErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name-vertical">Name</label>
                            <input disabled={state.formDisabled} type="text" id="name-vertical" 
                            className="form-control" name="name" placeholder="Name" value={state.name ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="start_date">Start date</label>
                            <input disabled={state.formDisabled} type="date" id="start_date" lang="en"
                            className="form-control" name="start_date" placeholder="Start date" value={state.start_date ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="end_date">End date</label>
                            <input disabled={state.formDisabled} type="date" id="end_date" lang="en"
                            className="form-control" name="end_date" placeholder="Start date" value={state.end_date ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div  className="col-6">
                        <div className="form-group">
                            <label htmlFor="countries-vertical">Countries</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" multiple="multiple"
                                onChange={methods.handleSelectMultipleChange} name="countries" value={state.countries}>
                                    {
                                        state.countrieData.map(countrie => {
                                            return <option key={Math.random()} value={countrie.slug ?? ""}>{countrie.name}</option>
                                        })
                                    } 
                                </select>
                            </fieldset>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="status-id-vertical">Status</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required onChange={methods.handleChange} 
                                name="status" value={state.status}>
                                    {
                                        state.statusData.map(status => {
                                            return (<option key={Math.random()} value={status ?? ""}>
                                                    {`${status[0].toUpperCase()}${status.substring(1)}`}
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
                            onChange={methods.handleChange} value={state.description}>
                            </textarea> 
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
