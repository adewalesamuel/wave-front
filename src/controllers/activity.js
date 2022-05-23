import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class Activity extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleCreateClick: this.handleCreateClick.bind(this),
            handleCountryProjectAddClick: this.handleCountryProjectAddClick.bind(this),
            handleChange: this.handleChange.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleSelectMultipleChange: this.handleSelectMultipleChange.bind(this),
            handleActivitySubmit: this.handleActivitySubmit.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleInfoClick: this.handleInfoClick.bind(this),
            handleProjectChange:  this.handleProjectChange.bind(this),
            handleProjectCheck: this.handleProjectCheck.bind(this),
            handleCountryChange: this.handleCountryChange.bind(this),
            handleAddPeriodClick: this.handleAddPeriodClick.bind(this),
            handleDeletePeriodClick: this.handleDeletePeriodClick.bind(this),
            handleCountryProjectListModalCloseClick: this.handleCountryProjectListModalCloseClick.bind(this),
            handleCountryProjectListSubmit: this.handleCountryProjectListSubmit.bind(this)
        };
        this.state = {
            countryId: '',
            projectId: '',
            activityTableHead: [
                'id', 
                'name',
                'status',
                'start_date',
                'budget',
                'amount_spent'
            ],
            activityData: [],
            outcomeData: [],
            countryData: [],
            projectIds: [],
            indicatorData: [],
            userList: [],
            projectList: [],
            activityTableData: [],
            periods:[
                // {date: "string", quaters:["string"]}
                // {date: "string", quaters:["string"]}
            ],
            periodYear: '',
            periodQuarters: [],
            yearList: [],
            quarterList: [],
            activityTableActions: [
                'info', 
                'delete'
            ],
            statusData: [
                'open',
                'closed',
                'pending'
            ],
            id: '',
            name: '',
            status: 'open',
            start_date: '',
            end_date: '',
            description: '',
            activity_id: '',
            budget:'',
            amount_spent: '',
            user_id: '',
            outcome_id: '',
            indicator_id: '',
            activityErrorMessage: '',
            activitySuccessMessage: '',
            isActivityModalHidden: true,
            isCountryProjectListModalHidden: true,
            activityFormDisabled: false,
        };
    }

    componentDidMount() {
        this.setDefaultQuarterList();
        this.setDefaultYearList();
        this.setDefaultDates();

        this.getAllCountries()
        .then(() => this.getAllOutcomes());
    }

    componentDidUpdate(prevProps, prevState) {        
        if ( this.state.countryId === '') return;
        if (this.state.countryId && this.state.countryId === prevState.countryId) {
            if (this.getProjectId() === '') return;
            if (this.getProjectId() && this.getProjectId() === prevState.projectId) {
                return;
            }else {
                this.getAllProjectActivities()
                .then(() => {
                    this.getAllProjectMembers(this.getProjectId());
                    this.getAllProjectIndicators();
                });
            }
            return;
        }else {
            this.getAllCountryProjects();
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    } 
    
    handleProjectChange(event) {
        event.preventDefault();
        this.setProjectId(event.target.value, this.pushToProject);
    }
    
    handleAddPeriodClick(event) {
        event.preventDefault();
        this.appendPeriod();
    }

    handleProjectCheck = (e, projectId) => {
        const projectIdsCopy = [...this.state.projectIds];

        if (projectIdsCopy.includes(projectId)) {
            projectIdsCopy.splice(projectIdsCopy.indexOf(projectId), 1);
        }else {
            projectIdsCopy.push(projectId);
        }

        this.setState({projectIds: [...projectIdsCopy]});
    }

    handleCreateClick(event) {
        event.preventDefault();
        this.resetActivityForm();
        this.resetProjectIds()
        this.setIsActivityModalHidden(false);
    }

    handleCountryProjectAddClick(event) {
        event.preventDefault();
        this.setIsCountryProjectListModalHidden(false);
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleCountryChange(event) {
        event.preventDefault();
        this.setCountryId(event.target.value);
    }

    handleDeletePeriodClick(event, period) {
        event.preventDefault(); 
        this.removePeriod(period);
    }
    
    handleModalCloseClick(event) {
        if (this.state.activityFormDisabled) return;
            
        this.resetActivityForm();
        this.setIsActivityModalHidden(true);
        this.setActivityErrorMessage('');
    }

    handleCountryProjectListModalCloseClick(event) {            
        this.resetActivityForm();
        this.resetProjectIds();
        this.setIsCountryProjectListModalHidden(true);
    }

    handleCountryProjectListSubmit(event) {
        this.setIsCountryProjectListModalHidden(true);
    }
    
    handleActivitySubmit(event) {
        event.preventDefault();
        
        if (this.state.activityFormDisabled) return;
            
        this.setActivityErrorMessage('');
        this.setActivityFormDisabled(event);
        
        this.createActivity()
        .then(res => {
            this.setActivityFormDisabled(event, false);
            this.setIsActivityModalHidden(true);
            this.appendActivityData(res.data.activity);

            this.createActivityByProject();
        })
        .catch(response => {
            this.handleActivityError(response);
            this.setActivityFormDisabled(event, false);
        });
    }

    handleDeleteClick(event) {
        event.preventDefault();
                
        this.setActivityId(this.getClickedActivityId(event));
        this.showActivityDeleteAlert(this);
    }
    
    handleInfoClick(event) {
        event.preventDefault();
        this.history.push(`/activities/${this.getClickedActivityId(event)}`);
    }
    
    handleSelectMultipleChange(event) {
        this.setSelectMultupleValue(event);
    }
    
    handleActivityError = async (error) => {
        let errorMessages = await error.messages;
        this.setActivityErrorMessage(errorMessages ?? "An unexepecd error occurred");
    }

    getAllProjectMembers = projectId => {
        return Services.Project.getAllMembers(projectId, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setUserList(res.data.project_members);
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

    getAllCountries = () => {
        return Services.Country.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setCountryData(res.data.countries);

            if (res.data.countries.length > 0)
                this.setCountryId(res.data.countries[0].id);
        })
        .catch(err => console.log(err));
    }

    getAllCountryProjects = () => {
        return Services.Country.getAllProjects(this.state.countryId, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectData(res.data.projects);

            if (res.data.projects.length > 0)
                this.setProjectId(res.data.projects[0].id);
        })
        .catch(err => console.log(err));
    }

    getAllProject = () => {
        return Services.Project.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectData(res.data.projects);
            if (res.data.projects.length > 0)
                this.setProjectId(res.data.projects[0].id);
        })
        .catch(err => console.log(err));
    }

    getAllProjectActivities = () => {
        return Services.Project.getAllActivities(this.getProjectId(), this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setActivityData(res.data.activities);
            this.setActivityTableData(this.state.activityData);
        })
        .catch(err => console.log(err));
    }

    getAllProjectIndicators = () => {
        return Services.Project.getAllIndicators(this.state.projectId, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIndicatorData(res.data.indicators);
        })
        .catch(err => console.log(err));
    }

    getProjectId = () => this.state.projectId;
    
    createActivity = () => {
        const payload = {
            name: this.state.name,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            status: this.state.status,
            budget: this.state.budget,
            amount_spent: this.state.amount_spent,
            activity_id: this.state.activity_id,
            user_id: this.state.user_id,
            project_id: this.getProjectId(),
            description: this.state.description,
            outcome_id: this.state.outcome_id,
            indicator_id: this.state.indicator_id,
            periods: JSON.stringify(this.state.periods)
        };
    
        return Services.Activity.create(
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    createActivityByProject = () => {
        if (!this.state.projectIds === 0) return;

        this.state.projectIds.forEach(projectId => {
            if (parseInt(projectId) === parseInt(this.getProjectId()))
                return;
            
            let payload = {
                name: this.state.name,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                status: this.state.status,
                budget: this.state.budget,
                amount_spent: this.state.amount_spent,
                activity_id: this.state.activity_id,
                user_id: this.state.user_id,
                project_id: projectId,
                description: this.state.description,
                outcome_id: this.state.outcome_id,
                indicator_id: this.state.indicator_id,
                periods: JSON.stringify(this.state.periods)
            };

            Services.Activity.create(
                JSON.stringify(payload),
                this.abortController.signal
                );
        })
    }

    deleteActivity = (self) => {
        return Services.Activity.destroy(
            self.state.id, 
            self.abortController.signal
            );
    }

    appendActivityData = activity => {
        const payload = {
            id: activity.id,
            name: activity.name,
            status: activity.status,
            start_date: new Date(activity.start_date)
            .toLocaleDateString('fr').replace(/\//g, '-'),
            budget: activity.budget,
            amount_spent: activity.amount_spent,
            activity_id: activity.activity_id
        };
        
        // Could not create deep copy
        let activityDataCopy = this.state.activityData;
        let activityTableDataCopy = this.state.activityTableData;
        
        if (activity.activity_id && activity.activity_id !== "") {
            let parentActivity = activityDataCopy
            .find(pActivity => pActivity.id === parseInt(activity.activity_id));
            let tableParentActivity = activityTableDataCopy
            .find(tPActivity => tPActivity.id === parseInt(activity.activity_id));
            
            parentActivity['children'] = parentActivity.children ?? [];
            tableParentActivity['children'] = tableParentActivity.children ?? [];
            
            //parentActivity['children'].unshift(payload); //Inserted activity object twice in parentActivity and tableParentActivity
            tableParentActivity['children'].unshift(payload);
        }else {
            activityDataCopy.unshift(activity);
            activityTableDataCopy.unshift(payload);
        }
        
        this.setState({
            activityTableData: [...activityTableDataCopy],
            activityData: [...activityDataCopy],
        });
    }

    removeActivityData = activity => {
        let parentActivityIndex = -1;
        let childActivityIndex = -1;

        this.state.activityTableData.forEach((pActivity, i) => {
            if (parseInt(pActivity.id) === parseInt(activity.id)) {
                parentActivityIndex = i;
                return;
            }else {
                if (pActivity.children && pActivity.children.length > 0) {
                    pActivity.children.forEach((cActivity, j) => {
                        if (parseInt(cActivity.id) === parseInt(activity.id)) {
                            parentActivityIndex = i;
                            childActivityIndex = j;
                            return;
                        }
                    }); 
                }
            }
        });


        if (childActivityIndex > -1) {
            // this.state.activityData[parentActivityIndex].children.splice(childActivityIndex,1); Should propably do a deep copy
            this.state.activityTableData[parentActivityIndex].children
            .splice(childActivityIndex,1);
        }else{
            this.state.activityData.splice(parentActivityIndex,1);
            this.state.activityTableData.splice(parentActivityIndex,1);
        }

    }

    appendPeriod = () => {
        if (!this.state.periodYear || this.state.periodQuarters.length < 1) return;

        this.setState(state => {
            return {
                periods: [
                    {
                        date: this.state.periodYear,
                        quarters: this.state.periodQuarters
                    },
                    ...state.periods
                ]
            }
        });

        this.resetPeriodFields();
    }

    resetPeriodFields = () => {
        this.setState({periodYear: '', periodQuarters: []});
    }

    removePeriod = (oldPeriod) => {
        let periods = [...this.state.periods];
        periods = periods.filter(period => parseInt(period.date) !== parseInt(oldPeriod.date));

        this.setState({periods});
    }

    showActivityDeleteAlert = self => {
        if (!self.$Swal) return;

        self.$Swal.fire({
            title: "You're about to delete an activity",
            text: "Are you sure you want to delete this activity",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, delete activity!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteActivity(self)
                .then(res => {
                    self.removeActivityData(res.data.activity);
                    self.resetActivityForm();
                })
                .catch(response => {
                    console.log(response);
                });
            }
            else if (result.dismiss === self.$Swal.DismissReason.cancel) {
                return false;
            }
        });
    }

    resetActivityForm = () => {
        this.setState({
            name:'',
            start_date:'',
            end_date:'',
            description: '',
            activity_id: '',
            budget:'',
            amount_spent: '',
            user_id: '',
            outcome_id: '',
            indicator_id: '',
            periods: [],
            periodQuarters: [],
            periodYear: '',
            projectIds: []
        });
        this.setDefaultDates();
        this.setStatus(this.state.statusData[0] ?? "open");
    }

    resetProjectIds = () => {
        this.setState({projectIds: []});
    }

    getClickedActivityId = (event) => {
        return event.target.parentElement.getAttribute('data-id');
    }

    setProjectData = projects => {
        const projectList = projects.map(project => {
            return {name: project.name, id: project.id};
        });

        this.setState({projectList});
    }

    setCountryId = countryId => {
        this.setState({countryId});
    }

    setCountryData = data => {
        this.setState({countryData: [...data]});
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

    setOutcomeData = outcomeData => {
        this.setState({outcomeData});
    }

    setProjectId = (projectId, callback = () => null) => {
        this.setState({projectId}, callback(this, projectId));
    }

    setActivityTableData = data => {
        const activityTableData = data.map(item => {
            const {id, name, status, budget, amount_spent, children} = item;
            const start_date = item.start_date ? 
            new Date(item.start_date).toLocaleDateString('fr').replace(/\//g, '-') : null;

            return {id, name, status, start_date, budget, amount_spent, children};
        })

        this.setState({activityTableData});
    }

    setIndicatorData = indicators => {
        const indicatorData = indicators.map(indicator => {
            return {name: indicator.name, id: indicator.id};
        });

        this.setState({indicatorData});
    }

    setActivityFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({activityFormDisabled: val});
    }

    setActivityErrorMessage =  activityErrorMessage => {
        this.setState({activityErrorMessage});
    }

    setIsActivityModalHidden = isActivityModalHidden => {
        this.setState({isActivityModalHidden});
    }
    
    setIsCountryProjectListModalHidden = isCountryProjectListModalHidden => {
        this.setState({isCountryProjectListModalHidden});
    }

    setActivityData = data => {
        this.setState({activityData: [...data]});
    }

    setStatus = status => {
        this.setState({status});
    }

    setActivityId = id => {
        this.setState({id});
    }

    setDefaultDates = () => {
        const date = new Date();
        const dateString = date.toLocaleDateString().replace(/\//g, '-')
        .split('-').reverse().join('-');

        this.setState({
            start_date: dateString,
            end_date: dateString
        });
    }
    
    setInputValue = event => {
        let inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    }
    
    setSelectMultupleValue = event => {
        if (event.target.value === '') return 

        this.setState( state => {
            let prevState = [...state[event.target.name]]

            if (prevState.includes(event.target.value)) {
                prevState.splice(prevState.indexOf(event.target.value),1)
                return {
                    [event.target.name]: [...prevState]
                }
            }
            return {
                [event.target.name]: [...state[event.target.name], event.target.value]
            }
        });
    }
    
    render() {
        return(
         <Pages.Activity 
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        );
    }
}