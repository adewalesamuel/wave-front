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
            handleChange: this.handleChange.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleSelectMultipleChange: this.handleSelectMultipleChange.bind(this),
            handleActivitySubmit: this.handleActivitySubmit.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleInfoClick: this.handleInfoClick.bind(this),
            handleProjectChange:  this.handleProjectChange.bind(this),
            handleCountryChange: this.handleCountryChange.bind(this)
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
            countryData: [],
            userList: [],
            projectList: [],
            activityTableData: [],
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
            activityErrorMessage: '',
            activitySuccessMessage: '',
            isActivityModalHidden: true,
            activityFormDisabled: false,
        };
    }

    componentDidMount() {
        // if (!Modules.Auth.getUser().isAdmin()) {
        //     this.setCountryData([Modules.Auth.getUser().country]);
        //     this.setCountryId(Modules.Auth.getUser().country.id);
        //     this.getAllCountryProjects();
        //     return;
        // }

        this.setDefaultDates();
        this.getAllCountries()
        .then(() => {
            this.getAllCountryProjects();

            if (this.getProjectId() === '') return;

            this.getAllProjectMembers(this.getProjectId())
            .then(() => this.getAllProjectActivities());
        });
    }

    componentDidUpdate(prevProps, prevState) {        
        if ( this.state.countryId === '') return;
        if (this.state.countryId && this.state.countryId === prevState.countryId) {
            if (this.getProjectId() === '') return;
            if (this.getProjectId() && this.getProjectId() === prevState.projectId) {
                return;
            }else {
                this.getAllProjectActivities();
                this.getAllProjectMembers(this.getProjectId());
            }
            return;
        }else {
            this.getAllCountryProjects();

            if (this.getProjectId() === '') return;

            this.getAllProjectActivities();
            this.getAllProjectMembers(this.getProjectId());
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

    handleCreateClick(event) {
        event.preventDefault();
        this.setIsActivityModalHidden(false);
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleCountryChange(event) {
        event.preventDefault();
        this.setCountryId(event.target.value);
    }
    
    handleModalCloseClick(event) {
        if (this.state.activityFormDisabled) return;
            
        this.resetActivityForm();
        this.setIsActivityModalHidden(true);
        this.setActivityErrorMessage('');
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
            this.resetActivityForm();
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

    getAllProjects = () => {
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
            description: this.state.description
        };
    
        return Services.Activity.create(
            JSON.stringify(payload),
            this.abortController.signal
            );
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
            start_date: new Date(activity.start_date).toLocaleDateString('fr').replace(/\//g, '-'),
            budget: activity.budget,
            amount_spent: activity.amount_spent,
            activity_id: activity.activity_id
        };
        
        // Could not create deep copy
        let activityDataCopy = this.state.activityData;
        let activityTableDataCopy = this.state.activityTableData;
        
        if (activity.activity_id && activity.activity_id !== "") {
            let parentActivity = activityDataCopy.find(pActivity => pActivity.id === parseInt(activity.activity_id));
            let tableParentActivity = activityTableDataCopy.find(tPActivity => tPActivity.id === parseInt(activity.activity_id));
            
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
            this.state.activityTableData[parentActivityIndex].children.splice(childActivityIndex,1);
        }else{
            this.state.activityData.splice(parentActivityIndex,1);
            this.state.activityTableData.splice(parentActivityIndex,1);
        }

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
        });
        this.setDefaultDates();
        this.setStatus(this.state.statusData[0] ?? "open");
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

    setProjectId = (projectId, callback = () => null) => {
        this.setState({projectId}, callback(this, projectId));
    }

    setActivityTableData = data => {
        const activityTableData = data.map(item => {
            const {id, name, status, budget, amount_spent, children} = item;
            const start_date = item.start_date ? new Date(item.start_date).toLocaleDateString('fr').replace(/\//g, '-') : null;
            return {id, name, status, start_date, budget, amount_spent, children};
        })

        this.setState({activityTableData});
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