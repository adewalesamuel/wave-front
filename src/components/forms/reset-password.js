import { Components } from ".."

export function ResetPassword({methods, state}) {
    return(
        <form name="reset-password" className={state.formDisabled ? "disabled" : ''} 
        onSubmit={methods.onHandleSubmit}>
            <input value={state.token} name="token" type="hidden"/>
            <div className="form-group">
                <label className="text-bold-600" htmlFor="password">New Password</label>
                <input disabled={state.formDisabled} type="password" className="form-control" 
                id="password" name="password" value={state.password} required minLength="8" 
                placeholder="Enter a new password" onChange={methods.onHandleChange} />
            </div>
            <div className="form-group mb-2">
                <label className="text-bold-600" htmlFor="password_confirmation">
                    Confirm New Password
                </label>
                <input disabled={state.formDisabled} type="password" className="form-control" 
                id="password_confirmation" name="password_confirmation" value={state.password_confirmation} 
                required minLength="8" placeholder="Confirm your new password" 
                onChange={methods.onHandleChange} />
                <Components.ErrorMessageText>
                    {state.passwordConfirmationError ?? ''}
                </Components.ErrorMessageText>
            </div>
            <button disabled={state.formDisabled} type="submit" 
            className="btn btn-primary glow position-relative w-100">
                {state.formDisabled ? "Loading..." : " Reset my password"}
                <i id="icon-arrow" className="bx bx-right-arrow-alt"></i>
            </button>
        </form>
    )
}