import { Link } from 'react-router-dom';
import { Components } from '../components';
import forgotPasswordImg from './../app-assets/images/pages/forgot-password.png';

export function ForgotPassword(props) {
    return(
        <section className="row flexbox-container">
            <div className="col-xl-7 col-md-9 col-10  px-0">
                <div className="card bg-authentication mb-0">
                    <div className="row m-0">
                        <div className="col-md-6 col-12 px-0">
                            <div className="card disable-rounded-right mb-0 p-2">
                                <div className="card-header pb-1">
                                    <div className="card-title">
                                        <h4 className="text-center mb-2">Forgot Password?</h4>
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <div className="text-left">
                                        <div className="ml-3 ml-md-2 mr-1">
                                            <Link to="/auth/login" 
                                            className="card-link btn btn-outline-primary text-nowrap w-100">
                                                Sign in
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="text-muted text-center mb-2">
                                            <small>
                                                Enter the email or phone number you used when you joined and 
                                                we will send you a link to resset your password
                                            </small>
                                        </div>
                                        <Components.ErrorMessageText>
                                            {props.state.forgotPasswordError ?? ''}
                                        </Components.ErrorMessageText>
                                        <Components.SuccessMessageText>
                                            {props.state.forgotPasswordSuccess ?? ''}
                                        </Components.SuccessMessageText>
                                        <Components.Forms.ForgotPassword {...props} />
                                        <div className="text-center mb-2">
                                            <Link to="/auth/login">
                                                <small className="text-muted">I remembered my password</small>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-md-block d-none text-center align-self-center">
                            <img className="img-fluid" src={forgotPasswordImg} alt="branding logo" width="300" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}