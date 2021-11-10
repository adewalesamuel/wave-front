import { Components } from "../components";

export function CollectedData(props) {
    return (
        <section className="collected_data-list-wrapper">
            <div className="collected_data-list-filter px-1">
                <form>
                    <div className="row border rounded py-2 mb-2">
                        {/* <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="collected_data-list-verified">Verified</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="collected_data-list-verified">
                                    <option value="">Any</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="collected_data-list-role">Role</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="collected_data-list-role">
                                    <option value="">Any</option>
                                    <option value="CollectedData">CollectedData</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="collected_data-list-status">Status</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="collected_data-list-status">
                                    <option value="">Any</option>
                                    <option value="Active">Active</option>
                                    <option value="Close">Close</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </fieldset>
                        </div> */}
                        <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                            <button className="btn btn-primary btn-block glow collected_data-list-clear mb-0"
                                onClick={props.methods.handleCreateClick}>
                                Add collected data
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="collected_data-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Components.Table 
                                {...props}
                                tableHead={props.state.collectedDataTableHead ?? null}
                                tableData={props.state.collectedDataTableData ?? null} 
                                tableActions={props.state.collectedDataTableActions ?? null}
                                tableName="collected_data"
                                methods={props.methods} />
                        </div>
                    </div>
                </div>
            </div>
            <Components.Modal
                isHidden={props.state.isCollectedDataModalHidden ?? true}
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.formDisabled}
                confirmModal={props.methods.handleSubmit}
                modalTitle={props.state.collectedDataModalTitle}>
                <Components.Forms.CollectedData {...props} />
            </Components.Modal>
        </section>
    )
}