import { Components } from "../components";

export function IndicatorDisaggregation(props) {
    return(
        <section className="indicator_disaggregation-list-wrapper">
            <div className="indicator_disaggregation-list-filter px-1">
                <form onSubmit={props.methods.handleIndicatorDisaggregationSubmit}>
                    <div className="row border rounded py-2 mb-2">
                        <div className="col-12 col-sm-6 col-lg-3">
                        <Components.ErrorMessageText>
                            {props.state.indicatorDisaggregationErrorMessage ?? ''}
                        </Components.ErrorMessageText>
                            <label htmlFor="disaggregations-list">
                                Disaggregations 
                                <span onClick={props.methods.handleCreateClick} role="button" 
                                className="bx bxs-plus-circle ml-1" style={{transform: "translateY(3px)"}} 
                                title="Create a disaggregation"></span> 
                                </label>
                            <fieldset className="form-group">
                                <select className="form-control" id="disaggregations-list" name="disaggregationId"
                                required onChange={props.methods.handleDisaggregationChange ?? null} 
                                value={props.state.disaggregationId}>
                                    <option hidden>Select a disaggregation</option>
                                    {
                                        props.state.disaggregationList.map(disaggregation => {
                                            return (<option key={Math.random()} value={disaggregation.id ?? ""}>
                                                    {`${disaggregation.type[0].toUpperCase()}${disaggregation.type.slice(1)}`}
                                                </option>)
                                        })
                                    } 
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                            <button disabled={props.state.isIndicatorDisaggregationFormDisabled ?? false} type="submit"
                            className="btn btn-primary btn-block glow disaggregations-list-clear mb-0">
                                Add a new disaggregation
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="indicator_disaggregation-list-table">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <Components.Table
                                {...props}
                                tableHead={props.state.indicatorDisaggregationTableHead ?? null}
                                tableData={props.state.indicatorDisaggregationTableData ?? null} 
                                tableActions={props.state.indicatorDisaggregationTableActions ?? null}
                                tableName="indicator_disaggregation"
                                methods={props.methods} />
                        </div>
                    </div>
                </div>
            </div>
            <Components.Modal
                isHidden={props.state.isDisaggregationModalHidden ?? true}
                closeModal={props.methods.handleModalCloseClick}
                isDisabled={props.state.disaggregationFormDisabled}
                confirmModal={props.methods.handleDisaggregationSubmit}
                modalTitle="Add a new disaggregation"
                modalSize="modal-sm">
                    <Components.Forms.Disaggregation {...props} />
            </Components.Modal>
        </section>
    )
}