export function ForgotPassword({methods, state}) {
    return (
        <form className={state.formDisabled ? "disabled" : ''} 
        onSubmit={methods.onHandleSubmit}>
            <div className="form-group mb-2">
                <label className="text-bold-600" htmlFor="email">Email</label>
                <input disabled={state.formDisabled} type="email" 
                className="form-control" id="email" name="email"
                value={state.email} required placeholder="Email" onChange={methods.onHandleChange} />
            </div>
            <button disabled={state.formDisabled} type="submit" 
            className="btn btn-primary glow position-relative w-100">
                {state.formDisabled ? "Loading..." : "SEND PASSWORD"}
                <i id="icon-arrow" className="bx bx-right-arrow-alt"></i>
            </button>
        </form>
    )
}