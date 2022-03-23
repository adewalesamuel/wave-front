import { Fragment } from "react"
import { Components } from "../components"

export function Dashboard(props) {
    return(
        <section className="graph-list-wrapper">
            <div className="graph-list-filter px-1">
                <div className="row border rounded py-2 mb-2 justify-content-between">
                    <Components.FilterForm {...props} methods={props.methods} state={props.state}/>
                    <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                        <button className="btn btn-primary btn-block glow graph-list-clear mb-0"
                            onClick={props.methods.handleCreateClick}>
                            Create a graph
                        </button>
                    </div>
                </div>
            </div>
            <div className="graph-list-card">
                {props.state.projectId ?
                    <>
                        <Components.ProjectInfo projectInfo={props.state.projectInfo}/>
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
                        {
                        props.state.countryProjectInfoData.map((projectInfo, index) => {
                            return (
                                <Fragment key={Math.random()}>
                                    <h2>{props.state.projectList[index + 1] ? props.state.projectList[index + 1].name : ""}</h2>
                                    <Components.ProjectInfo projectInfo={projectInfo} key={index}/>
                                </Fragment>
                            )
                        })
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
        </section>
    )
}