export function FilterForm({methods, state}) {
    return(
        <div className="col-12 col-sm-6 col-lg-6">       
            <form className="d-flex justify-content-beetween flex-column flex-lg-row">
                <fieldset className="form-group w-100 w-lg-50 pr-sm-1">
                    <label htmlFor="countries-list-name">Select a country</label>
                    <select className="form-control" id="countries-list-status" 
                    onChange={methods.handleCountryChange ?? null} name="countryData" 
                    value={state.countryId}>
                        {
                            state.countryData.map(country => {
                                return (<option key={Math.random()} value={country.id ?? ""}>
                                        {country.name}
                                    </option>)
                            })
                        } 
                    </select>
                </fieldset>
                <fieldset className="form-group w-100 w-lg-50 pr-sm-1">
                    <label htmlFor="projects-list-name">Select a project</label>
                    <select className="form-control" id="projects-list-status" 
                    onChange={methods.handleProjectChange ?? null} name="projectList" 
                    value={state.projectId}>
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
        </div>
    )
}