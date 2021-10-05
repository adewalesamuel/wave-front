import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class ProjectEdit extends React.Component {
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
            handleProjectSubmit: this.handleProjectSubmit.bind(this),
        };
        this.state = {
            id: '',  
            name: '',
            status: '',
            start_date: '',
            end_date: '',
            countries: [],   
            description: "",
            countrieData: [
                {name:"Côte d'Ivoire", slug:"cote-divoire"},
                {name:"Nigeria", slug:"nigeria"},
            ],
            statusData: [
                'open',
                'closed',
                'pending'
            ],
            projectErrorMessage: '',
            projectSuccessMessage: '',
            projectFormDisabled: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const projectId = this.getParams().id;
        this.setProjectId(projectId);
        this.getProjectById(projectId);
    }

    componentDidUpdate(prevProps, prevState) {
        const projectId = this.getParams().id;
        if (prevState.id === "") return;
        if (projectId === prevState.id) {
            return;
        }else {
            if (!this._isMounted) return;
            this.setProjectId(projectId);
            this.getProjectById(projectId);
        }
        
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    } 

    handleChange(event) {
        this.setInputValue(event);
    }


    handleProjectSubmit(event) {
        event.preventDefault();

        if (this.getProjectFormDisabled())
            return;

        this.setProjectErrorMessage('');
        this.setProjectFormDisabled(true);
        
        this.updateProject()
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectFormDisabled(false);
            //Succes message
        })
        .catch(response => {
            this.handleProjectError(response);
            this.setProjectFormDisabled(false);
        });
    }

    getProjectById = (id) => {
        this.setProjectFormDisabled(true);
        return Services.Project.getById(id, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectData(res.data.project);
            this.setProjectFormDisabled(false);
        })
        .catch(err => {
            if (!this._isMounted) return;
            this.setProjectFormDisabled(false);
        })
    }

    updateProject = () => {
        const payload = {
            name: this.state.name,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            status: this.state.status,
            countries: JSON.stringify(this.state.countries),
            description: this.state.description.toString(),
        };
    
        return Services.Project.update(
            this.getProjectId(),
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    handleSelectMultipleChange(event) {
        this.setSelectMultupleValue(event);
    }

    handleProjectError = async (error) => {
        let errorMessages = await error.messages;
        this.setProjectErrorMessage(errorMessages ?? "An unxepected error occurred");
    }

    getProjectId = () => this.state.id;

    getProjectFormDisabled = () => this.state.projectFormDisabled;

    getParams = () => this.props.match.params;

    setProjectId = id => {
        this.setState({id});
    }

    setProjectFormDisabled = projectFormDisabled => {
        this.setState({projectFormDisabled});
    }

    setProjectErrorMessage =  projectErrorMessage => {
        this.setState({projectErrorMessage});
    }

    setProjectData = project => {
        this.setState({
            name: project.name,
            start_date: project.start_date,
            end_date: project.end_date,
            status: project.status,
            description: project.description ?? "",
            countries: JSON.parse(project.countries) ?? []
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
         <Pages.ProjectDetails.ProjectEdit
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}