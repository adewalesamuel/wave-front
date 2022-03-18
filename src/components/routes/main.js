import { Switch } from "react-router-dom";
import { Components } from "..";
import { Controllers } from "../../controllers";
import { PrivateRoute } from "../private-route";
export function Main({ match: { path } }) {
    const document = window.document;
    document.body.className = "horizontal-layout horizontal-menu navbar-sticky 2-columns footer-static";
    return(
        <Components.Layouts.Main>
            <Switch>
                <PrivateRoute path={`${path}/indicators/:id`} component={Controllers.IndicatorDetails.Index} />
                <PrivateRoute path={`${path}/activities/:id`} component={Controllers.ActivityDetails.Index} />
                <PrivateRoute path={`${path}/projects/:id`} component={Controllers.ProjectDetails.Index} />
                <PrivateRoute exact path={`${path}/indicators`} component={Controllers.Indicator} />
                <PrivateRoute exact path={`${path}/projects`} component={Controllers.Project} />
                <PrivateRoute exact path={`${path}/countries`} component={Controllers.Country} />
                <PrivateRoute exact path={`${path}/activities`} component={Controllers.Activity} />
                <PrivateRoute exact path={`${path}/users`} component={Controllers.User} />
                <PrivateRoute exact path={`${path}`} component={Controllers.Dashboard} />
                {/* <Redirect exact from={path + "/"} to={`${path}/`} /> */}
            </Switch>
        </Components.Layouts.Main>
    );
}