import { Link } from "react-router-dom";

export function Login({methods, state}) {
    return (
        <form name="login" className={state.formDisabled ? "disabled" : ''} 
        onSubmit={methods.onHandleSubmit}>
            <div className="form-group mb-50">
                <label className="text-bold-600" htmlFor="email">Email address</label>
                <input  disabled={state.formDisabled} type="email" className="form-control" 
                id="email" name="email" value={state.email} required placeholder="Email address" 
                onChange={methods.onHandleChange}/>
            </div>
            <div className="form-group">
                <label className="text-bold-600" htmlFor="password">Password</label>
                <input disabled={state.formDisabled} type="password" className="form-control" 
                id="password" name="password" value={state.password} required minLength="8" 
                placeholder="Password" onChange={methods.onHandleChange}/>
            </div>
            <div className="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
                <div className="text-left">
                    <div className="checkbox checkbox-sm">
                        <input disabled={state.formDisabled} type="checkbox" 
                        className="form-check-input" id="exampleCheck1" />
                        <label className="checkboxsmall" htmlFor="exampleCheck1">
                            <small>Keep me logged in</small>
                        </label>
                    </div>
                </div>
                <div className="text-right">
                    <Link to="/auth/forgot-password" className="card-link">
                        <small>Forgot Password?</small>
                    </Link>
                </div>
            </div>
            <button disabled={state.formDisabled} type="submit" 
            className="btn btn-primary glow w-100 position-relative">
                {state.formDisabled ? "Loading..." : "Login"}
                <i id="icon-arrow" className="bx bx-right-arrow-alt"></i>
            </button>
        </form>
    )
}