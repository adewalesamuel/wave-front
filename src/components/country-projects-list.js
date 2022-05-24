export function CountryProjectList({state, methods}) {
    const projectCheckbox = (project, index) => {
        return (
            <li className="d-block mr-2 mb-1" key={index}>
                <fieldset>
                    <div className="checkbox">
                        <input type="checkbox" name="project_id" id={`project${project.id}`}
                        onChange={e => methods.handleProjectCheck(e, project.id)} 
                        checked={state.projectIds.includes(project.id)} value={""}/>
                        <label htmlFor={`project${project.id}`} className="pl-1">
                            {project.name ?? ''}
                        </label>
                    </div>
                </fieldset>
            </li>
        )
    }
    return (
        <>
        <ul className="list-unstyled mb-0 mt-2">
            {state.countryData.map((country, i) => {
                return (
                    <li key={i}>
                        <p>{country.name ?? ""}</p>
                        <ul className="list-unstyled mb-0 mt-2">
                            {country.projects ? 
                            country.projects.map((project, j) => projectCheckbox(project, j))
                            : state.projectList.map((project, j) => projectCheckbox(project, j)) }
                        </ul>

                    </li>
                )
            })}
        </ul>
        </>
    );
}