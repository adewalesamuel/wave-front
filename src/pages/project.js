import { Components } from "../components";

export function Project(props) {
    return(
        <section className="projects-list-wrapper">
            <div className="projects-list-filter px-1">
                <div className="row border rounded py-2 mb-2 justify-content-between">
                    <form className="col-12 col-sm-6 col-lg-4">
                        <label htmlFor="countries-list-name">Select a project</label>
                        <fieldset className="form-group">
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
                    </form>
                    <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                        <button className="btn btn-primary btn-block glow activity-list-clear mb-0"
                            onClick={props.methods.handleCreateClick}>
                            Create an project
                        </button>
                    </div>
                </div>
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