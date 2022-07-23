import { Fragment } from "react"
import { Components } from "../components"
import { Modules } from "../modules"

export function Dashboard(props) {
    return(
        <section className="graph-list-wrapper">
            <div className="graph-list-filter px-1">
                <div className="row border rounded py-2 mb-2 justify-content-between">
                    <Components.FilterForm {...props} methods={props.methods} state={props.state} isDashboard={true}/>
                    <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                        <button className="btn btn-primary btn-block glow graph-list-clear mb-0"
                            onClick={props.methods.handleCreateClick}>
                            Create a graph
                        </button>  
                    </div>
                    {Modules.Auth.getUser().isAdmin() ? 
                        <div className="w-100 pr-2" style={{textAlign: 'right'}}>
                            <button className="btn btn-secondary glow graph-list-clear mb-0"
                                onClick={props.methods.handleCreateSummaryClick}>
                                Create a summary
                            </button> 
                        </div>
                    : null}
                </div>
            </div>
            <div className="graph-list-card">
                {props.state.projectId ?
                    <>
                        {props.state.projectIds.length < 1 ? 
                            <Components.ProjectInfo projectInfo={props.state.projectInfo}/>
                        : null}
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
                    </>
                    :
                    <>
                    {props.state.projectIds.length > 0 ? 
                        <Components.ProjectInfo projectInfo={props.state.projectInfo}/>
                    :
                    <>
                    {props.state.countryProjectInfoData.map((projectInfo, index) => {
                        return (
                            <Fragment key={Math.random()}>
                                <h2>{props.state.projectList[index + 1] ? props.state.projectList[index + 1].name : ""}</h2>
                                <Components.ProjectInfo projectInfo={projectInfo} key={index}/>
                            </Fragment>
                        )
                    })}
                    </> 
                    }
                    </> 
                     }
            </div>
            <Components.Modal
                isHidden={props.state.isGraphModalHidden ?? true}
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.isGraphFormDisabled}
                confirmModal={props.methods.handleGraphSubmit}
                modalTitle="Create a graph">
                    <Components.Forms.Graph {...props} />
            </Components.Modal>
            <Components.Modal
                isHidden={props.state.isActivitySummaryModalHidden ?? true}
                closeModal={props.methods.handleActivitySummaryModalCloseClick}
                isDisabled={props.state.isActivitySummaryFormDisabled}
                confirmModal={props.methods.handleActivitySummarySubmit}
                modalTitle={"Create a summary"}
                modalSize="modal-sm">
                <Components.Forms.ActivitySummary {...props} />
            </Components.Modal>
            <Components.Modal
                    isHidden={props.state.isCountryProjectListModalHidden ?? true}
                    closeModal={props.methods.handleCountryProjectListModalCloseClick}
                    isDisabled={props.state.isMultipleProjectInfoDisabled}
                    confirmModal={props.methods.handleMultipleProjectInfoSubmit}
                    modalTitle="Select projects by country"
                    modalSize="modal-sm">
                    <Components.CountryProjectList {...props} />
            </Components.Modal>
        </section>
    )
}