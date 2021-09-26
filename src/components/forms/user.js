import { Components } from ".."

export function User({state, methods}) {
    return (
        <form className={`form form-vertical ${state.roleFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleSubmit}>
            <Components.ErrorMessageText>
                {state.userErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="first-name-vertical">First Name</label>
                            <input disabled={state.formDisabled} type="text" id="first-name-vertical" 
                            className="form-control" name="firstname" placeholder="First Name" value={state.firstname ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="last-name-vertical">Last Name</label>
                            <input disabled={state.formDisabled} type="text" id="last-name-vertical" 
                            className="form-control" name="lastname" placeholder="Last Name" value={state.lastname ?? ""}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="tel-id-vertical">Tel</label>
                            <input disabled={state.formDisabled} type="text" id="tel-id-vertical" 
                            className="form-control" name="tel" placeholder="Tel" value={state.tel ?? ""}
                            onChange={methods.handleChange} /> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email-info-vertical">Email</label>
                            <input disabled={state.formDisabled} type="email" id="email-info-vertical" 
                            className="form-control" name="email" placeholder="Email" value={state.email ?? ""}
                            onChange={methods.handleChange} /> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password-id-vertical">Password</label>
                            <input disabled={state.formDisabled} type="text" id="password-id-vertical" 
                            className="form-control" name="password" placeholder="Password" value={state.password ?? ""}
                            onChange={methods.handleChange} /> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="role-vertical">
                                Role <span onClick={methods.handleCreateRoleClick} role="button" 
                                className="bx bxs-plus-circle" style={{transform: "translateY(3px)"}} 
                                title="Add new role"></span> 
                            </label>
                            <fieldset className="form-group">
                                <select className="custom-select" id="customSelect" value={state.role ?? ""}
                                onChange={methods.handleChange} name="role_id">
                                    {
                                        state.roleData.map(role => {
                                            return <option key={Math.random()} value={role.id ?? ""}>{role.name}</option>
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