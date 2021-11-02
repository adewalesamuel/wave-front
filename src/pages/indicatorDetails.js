import { NavLink, Switch } from "react-router-dom";
import { PrivateRoute } from "../components/private-route";
import { Controllers } from "../controllers";

export function IndicatorDetails({state, match}) {
    return(
        <section id="basic-tabs-components">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        <h4>Indicator Details</h4>
                    </div>
                </div>
                <div className="card-content">
                    <div className="card-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <NavLink className="nav-link" id="edit-tab" exact data-toggle="tab" 
                                to={`/indicators/${state.id ?? 1}`} aria-controls="edit" role="tab">
                                    <i className="bx bx-home align-middle"></i>
                                    <span className="align-middle">Edit</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id="disaggregations-tab" data-toggle="tab" 
                                to={`/indicators/${state.id ?? 1}/disaggregations`} aria-controls="disaggregations" role="tab">
                                    <i className="bx bx-collection align-middle"></i>
                                    <span className="align-middle">Disaggregations</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id="collected_data-tab" data-toggle="tab" 
                                to={`/indicators/${state.id ?? 1}/collected_data`} aria-controls="collected_data" role="tab">
                                    <i className="bx bx-data align-middle"></i>
                                    <span className="align-middle">Collected Data</span>
                                </NavLink>
                            </li>
                        </ul>
                        <div className="tab-content">
                        <Switch>
                            <PrivateRoute exact path={`${match.path}/disaggregations`} 
                            component={Controllers.IndicatorDetails.IndicatorDisaggregation} />
                            <PrivateRoute exact path={`${match.path}`} 
                            component={Controllers.IndicatorDetails.IndicatorEdit} />
                        </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}