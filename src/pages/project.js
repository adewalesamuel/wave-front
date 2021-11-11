import { Components } from "../components";

export function Project(props) {
    return(
        <section className="projects-list-wrapper">
            <div className="projects-list-filter px-1">
                <form>
                    <div className="row border rounded py-2 mb-2">
                        {/* <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="projects-list-verified">Verified</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="projects-list-verified">
                                    <option value="">Any</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="projects-list-role">Role</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="projects-list-role">
                                    <option value="">Any</option>
                                    <option value="project">project</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="projects-list-status">Status</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="projects-list-status">
                                    <option value="">Any</option>
                                    <option value="Active">Active</option>
                                    <option value="Close">Close</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </fieldset>
                        </div> */}
                        <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                            <button className="btn btn-primary btn-block glow projects-list-clear mb-0"
                                onClick={props.methods.handleCreateClick}>
                                Create a project
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="projects-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Components.Table
                                {...props}
                                tableHead={props.state.projectTableHead ?? null}
                                tableData={props.state.projectTableData ?? null} 
                                tableActions={props.state.projectTableActions ?? null}
                                cellDataAsLink={{name: null}}
                                cellDataClassNameByValue={{status: {
                                    'open': 'badge badge-pill badge-light-success',
                                    'pending': 'badge badge-pill badge-light-warning',
                                    'closed': 'badge badge-pill badge-light-secondary'
                                }}}
                                tableName="projects"
                                methods={props.methods} />
                        </div>
                    </div>
                </div>
            </div>
            <Components.Modal
                isHidden={props.state.isProjectModalHidden ?? true}
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.projectFormDisabled}
                confirmModal={props.methods.handleProjectSubmit}
                modalTitle="Create a project">
                <Components.Forms.Project {...props} />
            </Components.Modal>
        </section>
    )
}