import { Components } from "../components";

export function Activity(props) {
    return(
        <section className="activity-list-wrapper">
            <div className="activity-list-filter px-1">
                <div className="row border rounded py-2 mb-2 justify-content-between">
                   <Components.FilterForm {...props} methods={props.methods} state={props.state}/>
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
                    <button className="btn btn-info w-100 mt-2" 
                    onClick={props.methods.handleCountryProjectAddClick}>
                        <span className="bx bx-plus" style={{transform: "translateY(+4px)"}}></span> 
                        Add activity to projects
                        </button>
                <Components.Modal
                    isHidden={props.state.isCountryProjectListModalHidden ?? true}
                    closeModal={props.methods.handleCountryProjectListModalCloseClick}
                    isDisabled={null}
                    confirmModal={props.methods.handleCountryProjectListSubmit}
                    modalTitle="Add activity to projects"
                    modalSize="modal-sm">
                    <Components.CountryProjectList {...props} />
                </Components.Modal>
            </Components.Modal>
        </section>
    )
}