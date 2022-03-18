import { Components } from "../components";

export function Activity(props) {
    return(
        <section className="activity-list-wrapper">
            <div className="activity-list-filter px-1">
                <div className="row border rounded py-2 mb-2 justify-content-between">
                    <div className="col-12 col-sm-6 col-lg-6">       
                        <form className="d-flex justify-content-beetween flex-column flex-lg-row">
                            <fieldset className="form-group w-100 w-lg-50 pr-sm-1">
                                <label htmlFor="countries-list-name">Select a country</label>
                                <select className="form-control" id="countries-list-status" 
                                onChange={props.methods.handleCountryChange ?? null} name="countryData" 
                                value={props.state.countryId}>
                                    {
                                        props.state.countryData.map(country => {
                                            return (<option key={Math.random()} value={country.id ?? ""}>
                                                    {country.name}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset>
                            <fieldset className="form-group w-100 w-lg-50 pr-sm-1">
                                <label htmlFor="projects-list-name">Select a project</label>
                                <select className="form-control" id="projects-list-status" 
                                onChange={props.methods.handleProjectChange ?? null} name="projectList" 
                                value={props.state.projectId}>
                                    {
                                        props.state.projectList.map(project => {
                                            return (<option key={Math.random()} value={project.id ?? ""}>
                                                    {project.name}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset>
                        </form>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                        <button className="btn btn-primary btn-block glow activity-list-clear mb-0"
                            onClick={props.methods.handleCreateClick}>
                            Create an activity
                        </button>
                    </div>
                </div>
            </div>
            <div className="activity-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Components.Table
                                {...props}
                                tableHead={props.state.activityTableHead ?? null}
                                tableData={props.state.activityTableData ?? null} 
                                tableActions={props.state.activityTableActions ?? null}
                                cellDataAsLink={{name: null}}
                                cellDataClassNameByValue={{status: {
                                    'open': 'badge badge-pill badge-light-success',
                                    'pending': 'badge badge-pill badge-light-warning',
                                    'closed': 'badge badge-pill badge-light-secondary'
                                }}}
                                tableName="activity"
                                methods={props.methods} />
                        </div>
                    </div>
                </div>
            </div>
            <Components.Modal
                isHidden={props.state.isActivityModalHidden ?? true}
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.activityFormDisabled}
                confirmModal={props.methods.handleActivitySubmit}
                modalTitle="Create an activity">
                    <Components.Forms.Activity {...props} />
            </Components.Modal>
        </section>
    )
}