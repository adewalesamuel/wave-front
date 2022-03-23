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
                {
                    props.state.projectInfo ?
                    <div className="row">
                        <div className="col-xl-3 col-md-4 col-sm-6 col-6">
                            <div className="card text-center">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="badge-circle badge-circle-lg badge-circle-light-primary mx-auto my-1">
                                            <i className="bx bx-money font-medium-5"></i>
                                        </div>
                                        <p className="text-muted mb-0 line-ellipsis">Budget</p>
                                        <h2 className="mb-0">{props.state.projectInfo.budget ?? 0}</h2>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="col-xl-3 col-md-4 col-sm-6 col-6">
                            <div className="card text-center">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="badge-circle badge-circle-lg bg-rgba-warning mx-auto my-1">
                                            <i className="bx bx-dollar text-warning font-medium-5"></i>
                                        </div>
                                        <p className="text-muted mb-0 line-ellipsis">Amount Spent</p>
                                        <h2 className="mb-0">{props.state.projectInfo.amount_spent ?? 0}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-4 col-sm-6 col-6">
                            <div className="card text-center">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="badge-circle badge-circle-lg bg-rgba-danger mx-auto my-1">
                                            <i className="bx bx-loader-circle text-danger font-medium-5"></i>
                                        </div>
                                        <p className="text-muted mb-0 line-ellipsis">Completed At</p>
                                        <h2 className="mb-0">
                                            { Math.ceil((100 * props.state.projectInfo.activities_closed) / 
                                            ((props.state.projectInfo.activities_all !== 0) ? props.state.projectInfo.activities_all : 1))} %
                                            </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
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