import { Fragment } from "react";
import { Components } from "..";
import { Controllers } from "../../controllers";
import { useHistory } from 'react-router-dom';

export function Main(props) {
    const history = useHistory();

    return (
        <Fragment>
            <Controllers.Header {...props} />
            <Components.MainMenu {...props}/>
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    {history.location.pathname.length > 1 ? 
                        <div className="py-1">
                            <button className="btn" onClick={e => history.goBack()}
                            style={{backgroundColor: 'lightgrey', color: 'black'}}>Go back</button>
                        </div>
                    : null}
                    <div className="content-body">
                        {props.children}
                    </div>
                </div>
            </div>
            <div className="sidenav-overlay"></div>
            <div className="drag-target"></div>
        
            <footer className="footer footer-static footer-light">
                <p className="clearfix mb-0">
                    <span className="float-left d-inline-block">2022 &copy; WAVE MONITORING AND EVALUATION</span>
                    <span className="float-right d-sm-inline-block d-none">
                        Designed with<i className="bx bxs-heart pink mx-50 font-small-3"></i>by
                        <a className="text-uppercase" href="@" target="_blank"
                        rel="noreferrer">
                            WAVE Cre
                        </a>
                    </span>
                    <button className="btn btn-primary btn-icon scroll-top" type="button">
                        <i className="bx bx-up-arrow-alt"></i>
                    </button>
                </p>
            </footer>
        </Fragment>
    )
}