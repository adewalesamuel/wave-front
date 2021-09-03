import "../app-assets/css-rtl/pages/page-users.css";
import { Components } from "../components";

import { Table } from "../components/table";
export function User(props) {
    return (
        <section className="users-list-wrapper">
            <div className="users-list-filter px-1">
                <form>
                    <div className="row border rounded py-2 mb-2">
                        {/* <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="users-list-verified">Verified</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="users-list-verified">
                                    <option value="">Any</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="users-list-role">Role</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="users-list-role">
                                    <option value="">Any</option>
                                    <option value="User">User</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="users-list-status">Status</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="users-list-status">
                                    <option value="">Any</option>
                                    <option value="Active">Active</option>
                                    <option value="Close">Close</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </fieldset>
                        </div> */}
                        <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                            <button className="btn btn-primary btn-block glow users-list-clear mb-0"
                                onClick={props.methods.onHandleCreateClick}>
                                Create user
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="users-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Table 
                                {...props}
                                tableHead={props.state.userTableHead ?? null}
                                tableData={props.state.userTableData ?? null} 
                                tableActions={props.state.userTableActions ?? null}
                                tableName="users"
                                methods={props.methods} />
                        </div>
                    </div>
                </div>
            </div>
            <Components.Modal
                isHidden={props.state.isUserModalHidden ?? true}
                closeModal={props.methods.onHandleModalCloseClick}
                isDisabled={props.state.formDisabled}
                confirmModal={props.methods.onHandleSubmit}
                modalTitle={props.state.userModalTitle}>
                <Components.Forms.User {...props} />
                <Components.Modal
                    isHidden={props.state.isRoleModalHidden ?? true}
                    closeModal={props.methods.onHandleRoleModalCloseClick}
                    isDisabled={props.state.roleFormDisabled}
                    confirmModal={props.methods.onHandleRoleSubmit}
                    modalTitle="Add role"
                    modalSize="modal-sm">
                    <Components.Forms.Role {...props} />
                </Components.Modal>
            </Components.Modal>
        </section>
    )
}