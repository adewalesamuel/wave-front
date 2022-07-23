export function FilterForm({methods, state, isDashboard}) {
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
                    {isDashboard ? 
                        <div className="float-right" >
                            <span className="btn btn-text primary p-0" role="button" style={{fontSize: "0.82rem", fontWeight: "bold"}}
                            onClick={methods.handleSelectMultipleCountryClick}>
                                <span className="bx bx-plus" style={{transform: "translateY(+4px)"}}></span> Select multiple
                            </span>
                        </div>
                    : null}
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