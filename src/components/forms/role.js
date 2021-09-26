import { Components } from ".."

export function Role({state, methods}) {
    return (
        <form className={`form form-vertical ${state.roleFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleRoleSubmit ?? null}>
            <Components.ErrorMessageText>
                {state.roleErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="roleName">Name</label>
                            <input disabled={state.roleFormDisabled} type="text" required className="form-control" 
                            id="roleName" name="roleName" placeholder="Name" value={state.roleName ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="role-vertical">Permissions</label>
                            <fieldset className="form-group">
                                <select className="select2 form-control" required multiple="multiple"
                                onChange={methods.handleSelectMultipleChange} name="rolePermissions" value={state.rolePermissions}>
                                    {
                                        state.permissionData.map(permission => {
                                            return <option key={Math.random()} value={permission.slug ?? ""}>{permission.name}</option>
                                        })
                                    } 
                                </select>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}