import { NavLink, Switch } from "react-router-dom";
import { PrivateRoute } from "../components/private-route";
import { Controllers } from "../controllers";

export function ProjectDetails({methods, state, match}) {
    return(
        <section id="basic-tabs-components">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        <h4>Project Details</h4>
                    </div>
                    {/* <div className="projects-list-filter p-0 mt-2 row ">
                        <form className="col-lg-4 col-sm-12">
                            <label htmlFor="projects-list-name">Select a project</label>
                            <fieldset className="form-group">
                                <select className="form-control" id="projects-list-status"
                                onChange={methods.handleProjectChange ?? null} name="projectList" value={state.id}>
                                    {
                                        state.projectList.map(project => {
                                            return (<option key={Math.random()} value={project.id ?? ""}>
                                                    {project.name}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset>
                        </form>
                    </div> */}
                </div>
                <div className="card-content">
                    <div className="card-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <NavLink className="nav-link" id="edit-tab" exact data-toggle="tab" 
                                to={`/projects/${state.id ?? 1}`} aria-controls="edit" role="tab">
                                    <i className="bx bx-home align-middle"></i>
                                    <span className="align-middle">Edit</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id="members-tab" data-toggle="tab" 
                                to={`/projects/${state.id ?? 1}/members`} aria-controls="members" role="tab">
                                    <i className="bx bx-user align-middle"></i>
                                    <span className="align-middle">Members</span>
                                </NavLink>
                            </li>
                        </ul>
                        <div className="tab-content">
                        <Switch>
                            <PrivateRoute exact path={`${match.path}/members`} 
                            component={Controllers.ProjectDetails.ProjectMembers} />
                            <PrivateRoute exact path={`${match.path}`} 
                            component={Controllers.ProjectDetails.ProjectEdit} />
                        </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}