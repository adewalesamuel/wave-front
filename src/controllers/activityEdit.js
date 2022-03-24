import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class ActivityEdit extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleChange: this.handleChange.bind(this),
            handleSelectMultipleChange: this.handleSelectMultipleChange.bind(this),
            handleActivitySubmit: this.handleActivitySubmit.bind(this),
        };
        this.state = {
            id: '',
            name: '',
            status: '',
            start_date: '',
            end_date: '',
            description: '',
            activity_id: '',
            budget:'',
            amount_spent: '',
            user_id: '',
            project_id: '',
            outcome_id: '',
            indicator_id: '',
            statusData: [
                'open',
                'closed',
                'pending'
            ],
            activityData: [],
            outcomeData: [],
            indicatorData: [],
            userList: [],
            periods:[
                // {date: "string", quaters:["string"]}
                // {date: "string", quaters:["string"]}
            ],
            periodYear: '',
            periodQuarters: [],
            yearList: [],
            quarterList: [],
            activityErrorMessage: '',
            activitySuccessMessage: '',
            activityFormDisabled: true
        };
    }

    componentDidMount() {
        this._isMounted = true;      
        const activityId = this.getParams().id;

        this.setDefaultQuarterList();
        this.setDefaultYearList();

        this.setActivityId(activityId);
        this.getActivityById(activityId)
        .then(() => {
            return Promise.all([
                this.getAllOutcomes(),
                this.getAllProjectMembers(),
                this.getAllProjectActivities(),
                this.getAllProjectIndicators()
            ]);
        })
        .then((data) => this.setActivityFormDisabled(false))
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    } 

    handleChange(event) {
        this.setInputValue(event);
    }


    handleActivitySubmit(event) {
        event.preventDefault();

        if (this.getActivityFormDisabled())
            return;

        this.setActivityErrorMessage('');
        this.setActivityFormDisabled(true);
        
        this.updateActivity()
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setActivityFormDisabled(false);
            //Succes message
        })
        .catch(response => {
            this.handleActivityError(response);
            this.setActivityFormDisabled(false);
        });
    }

    handleSelectMultipleChange(event) {
        this.setSelectMultupleValue(event);
    }

    handleActivityError = async (error) => {
        let errorMessages = await error.messages;
        this.setActivityErrorMessage(errorMessages ?? "An unxepected error occurred");
    }
    
    getActivityById = (id) => {
        this.setActivityFormDisabled(true);
        return Services.Activity.getById(id, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setActivity(res.data.activity);
        })
        .catch(err => {
            console.log(err);
        })
    }

    updateActivity = () => {
        const payload = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            description: this.state.description,
            activity_id: this.state.activity_id ?? "",
            budget:this.state.budget,
            amount_spent: this.state.amount_spent,
            user_id: this.state.user_id,
            project_id: this.state.project_id,
            outcome_id: this.state.outcome_id,
            indicator_id: this.state.indicator_id
        };
    
        return Services.Activity.update(
            this.getActivityId(),
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    getAllProjectMembers = () => {
        return Services.Project.getAllMembers(this.getActivityProjectId(), this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setUserList(res.data.project_members);
        })
        .catch(err => {
            console.log(err);
        });
    }

    getAllProjectActivities = () => {
        return Services.Project.getAllActivities(this.getActivityProjectId(), this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setActivityData(res.data.activities);
        })
        .catch(err => {
            console.log(err);
        });
    }

    getAllProjectIndicators = () => {
        return Services.Project.getAllIndicators(this.getActivityProjectId(), this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIndicatorData(res.data.indicators);
        })
        .catch(err => console.log(err));
    }

    getAllOutcomes = () => {
        return Services.Outcome.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setOutcomeData(res.data.outcomes);
        })
        .catch(err => console.log(err));
    }

    getActivityId = () => this.state.id;

    getActivityProjectId = () => this.state.project_id;

    getActivityFormDisabled = () => this.state.activityFormDisabled;

    getParams = () => this.props.match.params;

    setUserList = data => {
        const userList = [];
        data.forEach(item => {
            if (!item.user) return;
            userList.push({
                id: item.user.id,
                firstname: item.user.firstname,
                lastname: item.user.lastname
            });
        })
        this.setState({userList});
    }
    
    setActivityId = id => {
        if (!this._isMounted) return;
        this.setState({id});
    }

    setDefaultYearList = () => {
        const currentYear = new Date().getFullYear();
        const numYears = 10;
        const startYear = currentYear - numYears;
        const endYear = currentYear + numYears;
        
        let yearList = [];
        
        for(let i=startYear; i<=endYear; i++) yearList.push(i);

        this.setState({yearList});
    }

    setDefaultQuarterList = () => {
        this.setState({
            quarterList: ["q1", "q2", "q3", "q4"]
        })
    }

    setActivityFormDisabled = activityFormDisabled => {
        if (!this._isMounted) return;
        this.setState({activityFormDisabled});
    }

    setActivityErrorMessage =  activityErrorMessage => {
        this.setState({activityErrorMessage});
    }

    setActivityData = activityData => {
        this.setState({activityData});
    }

    setIndicatorData = indicators => {
        const indicatorData = indicators.map(indicator => {
            return {name: indicator.name, id: indicator.id};
        });

        this.setState({indicatorData});
    }

    setOutcomeData = outcomeData => {
        this.setState({outcomeData});
    }

    setActivity = activity => {
        this.setState({
            id: activity.id,
            name: activity.name,
            status: activity.status,
            start_date: activity.start_date,
            end_date: activity.end_date,
            description: activity.description,
            activity_id: activity.activity_id ?? "",
            budget:activity.budget,
            amount_spent: activity.amount_spent,
            user_id: activity.user_id,
            project_id: activity.project_id,
            outcome_id: activity.outcome_id,
            indicator_id: activity.indicator_id
        });
    }
    
    setInputValue = event => {
        let inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    }
    
    setSelectMultupleValue = event => {
        if (event.target.value === "") return; 

        this.setState( state => {
            let prevState = [...state[event.target.name]]

            if (prevState.includes(event.target.value)) {
                prevState.splice(prevState.indexOf(event.target.value),1)
                return {
                    [event.target.name]: [...prevState]
                };
            }
            return {
                [event.target.name]: [...state[event.target.name], event.target.value]
            };
        });
    }
    
    
    render() {
        return(
         <Pages.ActivityDetails.ActivityEdit
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}