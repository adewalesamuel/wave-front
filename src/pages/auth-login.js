    import { Components } from "../components";
    import loginImg from './../app-assets/images/pages/login.png';

    export function Login(props) {
        return(
            <section id="auth-login" className="row flexbox-container">
                <div className="col-xl-8 col-11">
                    <div className="card bg-authentication mb-0">
                        <div className="row m-0">
                            <div className="col-md-6 col-12 px-0">
                                <div className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
                                    <div className="card-header pb-1">
                                        <div className="card-title">
                                            <h4 className="text-center mb-2">Welcome Back</h4>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <Components.ErrorMessageText>
                                                {props.state.loginError ?? ''}
                                            </Components.ErrorMessageText>
                                            <Components.Forms.Login {...props} />
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-md-block d-none text-center align-self-center p-3">
                                <div className="card-content">
                                    <img className="img-fluid" src={loginImg} alt="branding logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }