import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { Modules } from "../modules";

export function PrivateRoute(props) {
    Modules.Auth.isLoggedIn()
    return(
        <Fragment>
             { !Modules.Auth.isLoggedIn() ?
            <Redirect to="/auth" />:
            <Route {...props} />
         }
        </Fragment>
    )
}