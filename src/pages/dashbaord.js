import { Components } from "../components"

export function Dashboard(props) {
    return(
        <section className="graph-list-wrapper">
            <div className="graph-list-filter px-1">
                <div className="row border rounded py-2 mb-2 justify-content-between">
                    <form className="col-12 col-sm-6 col-lg-4">
                        <label htmlFor="projects-list-name">Select a project</label>
                        <fieldset className="form-group">
                            <select className="form-control" id="projects-list-status" 
                            onChange={props.methods.handleProjectChange ?? null} name="projectId" 
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
                        <button className="btn btn-primary btn-block glow graph-list-clear mb-0"
                            onClick={props.methods.handleCreateClick}>
                            Create a graph
                        </button>
                    </div>
                </div>
            </div>
            <div className="graph-list-card">
                <div className="row">
                    {
                    props.state.graphData.map((graph, index) => {
                        return (
                            <div className="graph-item col-lg-6 col-12" key={index}>
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body"> 
                                            {props.methods.renderGraphItem(graph)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <Components.Modal
                isHidden={props.state.isGraphModalHidden ?? true}
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.isGraphFormDisabled}
                confirmModal={props.methods.handleGraphSubmit}
                modalTitle="Create a graph">
                    <Components.Forms.Graph {...props} />
            </Components.Modal>
        </section>
    )
}