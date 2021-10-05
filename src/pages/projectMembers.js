import { Components } from "../components";

export function ProjectMembers(props) {
    return(
        <section className="project-members-list-wrapper">
            <div className="project-members-list-filter px-1">
                <form className={`${props.state.userFormDisabled ? "disabled" : ''}`}
                onSubmit={props.methods.handleProjectMembersSubmit}>
                    <div className="row border rounded py-2 mb-2">
                        {/* <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="project-members-list-verified">Verified</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="project-members-list-verified">
                                    <option value="">Any</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="project-members-list-role">Role</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="project-members-list-role">
                                    <option value="">Any</option>
                                    <option value="project">project</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </fieldset>
                        </div> */}
                        <div className="col-12 col-sm-6 col-lg-3">
                        <Components.ErrorMessageText>
                            {props.state.projectMembersErrorMessage ?? ''}
                        </Components.ErrorMessageText>
                            <label htmlFor="users-list">Users</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="users-list" name="userId"
                                required onChange={props.methods.handleProjectMembersChange ?? null} 
                                value={props.state.userId}>
                                    <option hidden>Select the new member</option>
                                    {
                                        props.state.userList.map(user => {
                                            return (<option key={Math.random()} value={user.id ?? ""}>
                                                    {`${user.firstname} ${user.lastname}`}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                            <button disabled={props.userFormDisabled ?? false} type="submit"
                            className="btn btn-primary btn-block glow users-list-clear mb-0">
                                Add a member
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="project-members-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Components.Table
                                {...props}
                                tableHead={props.state.projectMembersTableHead ?? null}
                                tableData={props.state.projectMembersTableData ?? null} 
                                tableActions={props.state.projectMembersTableActions ?? null}
                                tableName="project-members"
                                methods={props.methods} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}