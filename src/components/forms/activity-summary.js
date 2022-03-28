import { Components } from ".."

export function ActivitySummary({state, methods}) {
    return (
        <form className={`form form-vertical ${state.isActivitySummaryFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleAcivitySummarySubmit ?? null}>
            <Components.ErrorMessageText>
                {state.activitySummaryErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="activitySummary-vertical">Start year</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required onChange={methods.handleChange} 
                                name="startYear" value={state.startYear}>
                                    <option hidden>Select a year</option>
                                    {
                                        state.yearList.map(year => {
                                            return <option key={Math.random()} value={year ?? ""}>{year}</option>
                                        })
                                    } 
                                </select>
                            </fieldset>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="activitySummary-vertical">End year</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required onChange={methods.handleChange} 
                                name="endYear" value={state.endYear}>
                                    <option hidden>Select a year</option>
                                    {
                                        state.yearList.map(year => {
                                            return <option key={Math.random()} value={year ?? ""}>{year}</option>
                                        })
                                    } 
                                </select>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}