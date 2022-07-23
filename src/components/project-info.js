export function ProjectInfo(props) {
    let budgetDiff = 0;

    if (props.projectInfo)
        budgetDiff = parseInt(props.projectInfo.amount_spent) - parseInt(props.projectInfo.budget);

    return (
        <>
            { props.projectInfo ?
                <div className="row" key={props.index ?? Math.random()}>
                    <div className="col-xl-3 col-md-4 col-sm-6 col-6">
                        <div className="card text-center">
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="badge-circle badge-circle-lg badge-circle-light-primary mx-auto my-1">
                                        <i className="bx bx-money font-medium-5"></i>
                                    </div>
                                    <p className="text-muted mb-0 line-ellipsis">Budget</p>
                                    <h2 className="mb-0">{props.projectInfo.budget ?? 0}</h2>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-xl-3 col-md-4 col-sm-6 col-6">
                        <div className="card text-center">
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="badge-circle badge-circle-lg bg-rgba-warning mx-auto my-1">
                                        <i className="bx bx-dollar text-warning font-medium-5"></i>
                                    </div>
                                    <p className="text-muted mb-0 line-ellipsis">Amount Spent</p>
                                    <h2 className={`mb-0 ${parseInt(props.projectInfo.amount_spent) > parseInt(props.projectInfo.budget) ? 'text-danger': ''}`}>
                                            {props.projectInfo.amount_spent ?? 0}
                                            {budgetDiff > 0 ? <sup style={{fontSize: '16px'}}> +{budgetDiff}</sup>:null}
                                        </h2>   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-4 col-sm-6 col-6">
                        <div className="card text-center">
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="badge-circle badge-circle-lg bg-rgba-danger mx-auto my-1">
                                        <i className="bx bx-loader-circle text-danger font-medium-5"></i>
                                    </div>
                                    <p className="text-muted mb-0 line-ellipsis">Completed At</p>
                                    <h2 className="mb-0">
                                        { Math.ceil((100 * props.projectInfo.activities_closed) / 
                                        ((props.projectInfo.activities_all !== 0) ? props.projectInfo.activities_all : 1))} %
                                        </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null
            }
        </>
    )
}