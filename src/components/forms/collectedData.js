import { Components } from "..";
import { API_URL } from "../../services/api";

export function CollectedData({state, methods}) {
    return (
        <form className={`form form-vertical ${state.isCollectedDataFormDisabled ? "disabled" : ''}`}
        onSubmit={methods.handleSubmit}>
            <Components.ErrorMessageText>
                {state.collectedDataErrorMessage ?? ''}
            </Components.ErrorMessageText>
            <div className="form-body">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="values-vertical">Values</label>
                            <input disabled={state.isCollectedDataFormDisabled} type="text" id="values-vertical" 
                            className="form-control" name="values" placeholder="Values" value={state.values}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="collection_date">Collection date</label>
                            <input disabled={state.isCollectedDataFormDisabled} type="date" id="collection_date" lang="en"
                            className="form-control" name="collection_date" placeholder="Start date" value={state.collection_date}
                            onChange={methods.handleChange}  />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="notes-info-vertical">Notes</label>
                            <textarea className="form-control" name="notes" id="notes-info-vertical" 
                            rows="4" onChange={methods.handleChange} value={state.notes}>
                            </textarea> 
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="tel-id-vertical">Proof of data</label> 
                        </div>
                        <ul className="collected-data-file-list">
                            {state.files_urls ? JSON.parse(state.files_urls).map((file_url, index) => {
                                return (
                                    <li className="file-item d-flex justify-content-between align-item-center" key={index}>
                                        <a href={`${API_URL}/storage/${file_url}`} download={true} role="button" target={'_blank'}
                                        rel="noreferrer">
                                            <span className="file-name">{file_url.split('/')[1]}</span>
                                        </a>
                                        <span className="bx bxs-trash text-danger bx-small" role="button"
                                        onClick={event => methods.handleDeleteFileClick(event, file_url)}></span>
                                    </li>)
                                }) 
                            : null} 
                        </ul>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="file-id-vertical">File</label>
                            <input disabled={state.isCollectedDataFormDisabled} type="file" id="collected_data_file" 
                            className="form-control" name="collected_data_file" placeholder="Import File" defaultValue=""/> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="file_name-id-vertical">File name</label>
                            <input disabled={state.isCollectedDataFormDisabled} type="text" id="file_name-id-vertical" 
                            className="form-control" name="file_name" placeholder="File name" value={state.file_name}
                            onChange={methods.handleChange} /> 
                        </div>
                        <div className="float-right" >
                        <span className="btn btn-text primary p-0" role="button" style={{fontSize: "0.82rem", fontWeight: "bold"}}
                        onClick={methods.handleFileUpload}>
                            <span className="bx bx-plus" style={{transform: "translateY(+4px)"}}></span> Add file
                        </span>
                    </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                                <label htmlFor="indicator_disaggreations-vertical">
                                    Add disaggregation <span onClick={methods.handleAddDisaggregationValuesClick} role="button" 
                                    className="bx bxs-plus-circle" style={{transform: "translateY(3px)"}} 
                                    title="Add a new disagggregation"></span> 
                                </label>
                                <fieldset className="form-group">
                                    <select className="custom-select" id="customSelect" value={state.indicatorDisaggregationId}
                                    onChange={methods.handleChange} name="indicatorDisaggregationId">
                                        <option hidden>Select a disaggregation</option>
                                        {
                                            state.indicatorDisaggregationData.map(indicatorDisaggregation => {
                                                return (<option key={Math.random()} value={indicatorDisaggregation.id}>
                                                    {indicatorDisaggregation.disaggregation.type}
                                                    </option>)
                                            })
                                        } 
                                    </select>
                                </fieldset>
                            </div>
                        <div className="form-group" id="disaggregation_values">
                            <label htmlFor="disaggregation_values">Disaggregations</label>
                            {
                                state.disaggregation_values.map(disaggregation => {
                                    return (
                                        <div className="form-group disaggregations" key={Math.random()} data-type={disaggregation.type}>
                                            <label htmlFor="notes-info-vertical">{disaggregation.type}</label>
                                            {
                                                disaggregation.fields.map((field, jndex) => {
                                                    return (
                                                        <input disabled={state.isCollectedDataFormDisabled} type="text" 
                                                        className="form-control mt-1" key={jndex} name={field.name} placeholder={field.name} 
                                                        data-index={jndex} defaultValue={field.value}/>
                                                    )
                                                })
                                            }
                                        </div>
                                        )
                                })
                            }        
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}