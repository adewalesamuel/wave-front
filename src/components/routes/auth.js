import { Route, Switch,Redirect } from "react-router-dom";
import { Components } from "..";
import { Controllers } from "../../controllers";

export function Auth({ match: { path } }) {
    const document = window.document || window.document.documentElement;
    document.body.className = "horizontal-layout horizontal-menu navbar-sticky 1-column footer-static bg-full-screen-image blank-page blank-page pace-done";
    return(
        <Components.Layouts.Auth>
            <Switch>
                <Route exact path={`${path}/login`} component={Controllers.Auth.Login} />
                <Route exact path={`${path}/forgot-password`} component={Controllers.Auth.ForgotPassword} />
                <Route exact path={`${path}/reset-password`} component={Controllers.Auth.ResetPassword} />
                <Redirect exact from={path + "/"} to={`${path}/login`} />
            </Switch>
        </Components.Layouts.Auth>
    );
}