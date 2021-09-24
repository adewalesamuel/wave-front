import { Fragment } from "react";
import { Components } from "..";
import { Controllers } from "../../controllers";

export function Main(props) {
    return (
        <Fragment>
            <Controllers.Header {...props} />
            <Components.MainMenu {...props}/>
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        {props.children}
                    </div>
                </div>
            </div>
            <div className="sidenav-overlay"></div>
            <div className="drag-target"></div>
        
            <footer className="footer footer-static footer-light">
                <p className="clearfix mb-0">
                    <span className="float-left d-inline-block">2021 &copy; WAVE PLANTVILLAGE</span>
                    <span className="float-right d-sm-inline-block d-none">
                        Crafted with<i className="bx bxs-heart pink mx-50 font-small-3"></i>by
                        <a className="text-uppercase" href="https://epistrophe.ci" target="_blank"
                        rel="noreferrer">
                            Epistrophe
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