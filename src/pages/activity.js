import { Components } from "../components";

export function Activity(props) {
    return(
        <section className="activity-list-wrapper">
            <div className="activity-list-filter px-1">
                <div className="row border rounded py-2 mb-2 justify-content-between">
                    <form className="col-12 col-sm-6 col-lg-4">
                        <label htmlFor="projects-list-name">Select a project</label>
                        <fieldset className="form-group">
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