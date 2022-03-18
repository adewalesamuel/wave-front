import "../app-assets/css-rtl/pages/page-users.css";
import { Components } from "../components";

export function Country(props) {
    return (
        <section className="countries-list-wrapper">
            <div className="countries-list-filter px-1">
                <form>
                    <div className="row border rounded py-2 mb-2">
                        {/* <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="countries-list-verified">Verified</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="countries-list-verified">
                                    <option value="">Any</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="countries-list-role">Role</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="countries-list-role">
                                    <option value="">Any</option>
                                    <option value="Country">Country</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="countries-list-status">Status</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="countries-list-status">
                                    <option value="">Any</option>
                                    <option value="Active">Active</option>
                                    <option value="Close">Close</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </fieldset>
                        </div> */}
                        <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                            <button className="btn btn-primary btn-block glow countries-list-clear mb-0"
                                onClick={props.methods.handleCreateClick}>
                                Create a country
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="countries-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Components.Table 
                                {...props}
                                tableHead={props.state.countryTableHead ?? null}
                                tableData={props.state.countryTableData ?? null} 
                                tableActions={props.state.countryTableActions ?? null}
                                tableName="countries"
                                methods={props.methods} />
                        </div>
                    </div>
                </div>
            </div>
            <Components.Modal
                isHidden={props.state.isCountryModalHidden ?? true}
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.formDisabled}
                confirmModal={props.methods.handleSubmit}
                modalTitle={props.state.countryModalTitle}
                modalSize="modal-sm">
                <Components.Forms.Country {...props} />
            </Components.Modal>
        </section>
    )
}