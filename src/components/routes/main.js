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
                <PrivateRoute exact path={`${path}/users`} component={Controllers.User} />
                <PrivateRoute exact path={`${path}/projects`} component={Controllers.Project} />
                <PrivateRoute exact path={`${path}`} component={Controllers.Home} />
                {/* <Redirect exact from={path + "/"} to={`${path}/`} /> */}
            </Switch>
        </Components.Layouts.Main>
    );
}