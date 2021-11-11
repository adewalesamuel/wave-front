import { Components } from "../components";

export function Indicator(props) {
    return(
        <section className="indicator-list-wrapper">
            <div className="indicator-list-filter px-1">
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
                        <button className="btn btn-primary btn-block glow indicator-list-clear mb-0"
                            onClick={props.methods.handleCreateClick}>
                            Create an indicator
                        </button>
                    </div>
                </div>
            </div>
            <div className="indicator-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Components.Table
                                {...props}
                                tableHead={props.state.indicatorTableHead ?? null}
                                tableData={props.state.indicatorTableData ?? null} 
                                tableActions={props.state.indicatorTableActions ?? null}
                                cellDataAsLink={{name: null}}
                                tableName="indicator"
                                methods={props.methods} />
                        </div>
                    </div>
                </div>
            </div>
            <Components.Modal
                isHidden={props.state.isIndicatorModalHidden ?? true}
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.indicatorFormDisabled}
                confirmModal={props.methods.handleIndicatorSubmit}
                modalTitle={props.state.indicatorModalTitle}>
                    <Components.Forms.Indicator {...props} />
            </Components.Modal>
        </section>
    )
}