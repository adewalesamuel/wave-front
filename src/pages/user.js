import "../app-assets/css-rtl/pages/page-users.css";
import { Components } from "../components";

export function User(props) {
    return (
        <section className="users-list-wrapper">
            <div className="users-list-filter px-1">
                <div className="row border rounded py-2 mb-2 justify-content-between">
                    <form className="col-12 col-sm-6 col-lg-4">
                        <label htmlFor="countries-list-name">Select a country</label>
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
                            Create a user
                        </button>
                    </div>
                </div>
            </div>
            <div className="users-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Components.Table 
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
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.formDisabled}
                confirmModal={props.methods.handleSubmit}
                modalTitle={props.state.userModalTitle}>
                <Components.Forms.User {...props} />
                <Components.Modal
                    isHidden={props.state.isRoleModalHidden ?? true}
                    closeModal={props.methods.handleRoleModalCloseClick}
                    isDisabled={props.state.roleFormDisabled}
                    confirmModal={props.methods.handleRoleSubmit}
                    modalTitle={props.state.roleModalTitle}
                    modalSize="modal-sm">
                    <Components.Forms.Role {...props} />
                </Components.Modal>
            </Components.Modal>
        </section>
    )
}