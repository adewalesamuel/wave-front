import { Components } from '../components';
import resetPasswordImg from './../app-assets/images/pages/reset-password.png';

export function ResetPassword(props) {
    return(
        <section className="row flexbox-container">
            <div className="col-xl-7 col-10">
                <div className="card bg-authentication mb-0">
                    <div className="row m-0">
                        <div className="col-md-6 col-12 px-0">
                            <div className="card disable-rounded-right d-flex justify-content-center mb-0 p-2 h-100">
                                <div className="card-header pb-1">
                                    <div className="card-title">
                                        <h4 className="text-center mb-2">Reset your Password</h4>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <Components.ErrorMessageText>
                                            {props.state.resetPasswordError ?? ''}
                                        </Components.ErrorMessageText>
                                       <Components.Forms.ResetPassword {...props} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-md-block d-none text-center align-self-center p-3">
                            <img className="img-fluid" src={resetPasswordImg} alt="branding logo" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}