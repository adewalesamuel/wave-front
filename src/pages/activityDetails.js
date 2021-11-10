import { NavLink, Switch } from "react-router-dom";
import { PrivateRoute } from "../components/private-route";
import { Controllers } from "../controllers";

export function ActivityDetails({state, match}) {
    return(
        <section id="basic-tabs-components">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        <h4>Activity Details</h4>
                    </div>
                </div>
                <div className="card-content">
                    <div className="card-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <NavLink className="nav-link" id="edit-tab" exact data-toggle="tab" 
                                to={`/activities/${state.id ?? 1}`} aria-controls="edit" role="tab">
                                    <i className="bx bx-home align-middle"></i>
                                    <span className="align-middle">Edit</span>
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" id="documents-tab" data-toggle="tab" 
                                to={`/activities/${state.id ?? 1}/documents`} aria-controls="documents" role="tab">
                                    <i className="bx bx-folder align-middle"></i>
                                    <span className="align-middle">Documents</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id="indicators-tab" data-toggle="tab" 
                                to={`/activities/${state.id ?? 1}/indicators`} aria-controls="indicators" role="tab">
                                    <i className="bx bx-pulse align-middle"></i>
                                    <span className="align-middle">Indicators</span>
                                </NavLink>
                            </li> */}
                        </ul>
                        <div className="tab-content">
                        <Switch>
                            {/* <PrivateRoute exact path={`${match.path}/members`} 
                            component={Controllers.ActivityDetails.ActivityMembers} /> */}
                            <PrivateRoute exact path={`${match.path}`} 
                            component={Controllers.ActivityDetails.ActivityEdit} />
                        </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}