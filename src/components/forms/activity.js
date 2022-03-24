import { Components } from ".."

export function Activity({state, methods}) {
    return (
        <form className={`form form-vertical ${state.activityFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleActivitySubmit}>
            <Components.ErrorMessageText>
                {state.activityErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name-vertical">Name</label>
                            <input disabled={state.activityFormDisabled} type="text" id="name-vertical" 
                            className="form-control" name="name" placeholder="Name" value={state.name ?? ""}
                            onChange={methods.handleChange} required/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="start_date">Start date</label>
                            <input disabled={state.activityFormDisabled} type="date" id="start_date" lang="en" required
                            className="form-control" name="start_date" placeholder="Start date" value={state.start_date ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="end_date">End date</label>
                            <input disabled={state.activityFormDisabled} type="date" id="end_date" lang="en" required
                            className="form-control" name="end_date" placeholder="Start date" value={state.end_date ?? ""}
                            onChange={methods.handleChange}  />
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
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="budget">Budget</label>
                            <input disabled={state.activityFormDisabled} type="number" id="budget"
                            className="form-control" name="budget" placeholder="Budget" value={state.budget ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="amount_spent">Amount spent</label>
                            <input disabled={state.activityFormDisabled} type="number" id="amount_spent"
                            className="form-control" name="amount_spent" placeholder="Amount spent" value={state.amount_spent ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="amount_spent">Parent Activity</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" onChange={methods.handleChange} 
                                name="activity_id" value={state.activity_id}>
                                    <option hidden>Select the parent activity</option>
                                    {
                                        state.activityData.map(activity => {
                                            if (activity.activity_id === "" || !activity.activity_id) {
                                                return (<option key={Math.random()} value={activity.id ?? ""}>
                                                        {activity.name}
                                                    </option>)
                                            }
                                            return null
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="amount_spent">Assigned user</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" onChange={methods.handleChange} 
                                name="user_id" value={state.user_id ?? ""}>
                                    <option hidden>Select the user</option>
                                    {
                                        state.userList.map(user => {
                                            return (<option key={Math.random()} value={user.id ?? ""}>
                                                    {`${user.firstname} ${user.lastname}`}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="outcome_id">Outcome</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" onChange={methods.handleChange} 
                                name="outcome_id" value={state.outcome_id ?? ""}>
                                    <option hidden>Select the outcome</option>
                                    {
                                        state.outcomeData.map(outcome => {
                                            return (<option key={Math.random()} value={outcome.id ?? ""}>
                                                    {outcome.name}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="indicator_id">Indicator</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" onChange={methods.handleChange} 
                                name="indicator_id" value={state.indicator_id ?? ""}>
                                    <option hidden>Select the indicator</option>
                                    {
                                        state.indicatorData.map(indicator => {
                                            return (<option key={Math.random()} value={indicator.id ?? ""}>
                                                    {indicator.name}
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
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="tel-id-vertical">Periods</label> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="periodYear">Year</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" onChange={methods.handleChange} 
                                name="periodYear" value={state.periodYear ?? ""}>
                                    <option hidden>Select a year</option>
                                    {
                                        state.yearList.map(year => {
                                            return (<option key={Math.random()} value={year ?? ""}>
                                                    {year}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="periodQuarters">Quarters</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" onChange={methods.handleSelectMultipleChange} 
                                name="periodQuarters" value={state.periodQuarters ?? ""} multiple={true}>
                                    <option hidden>Select quarters</option>
                                    {
                                        state.quarterList.map(quarter => {
                                            return (<option key={Math.random()} value={quarter ?? ""}>
                                                    {quarter.toUpperCase()}
                                                </option>)
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
