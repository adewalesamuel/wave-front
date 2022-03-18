import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class Project extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleCreateClick: this.handleCreateClick.bind(this),
            handleChange: this.handleChange.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleSelectMultipleChange: this.handleSelectMultipleChange.bind(this),
            handleProjectSubmit: this.handleProjectSubmit.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleInfoClick: this.handleInfoClick.bind(this),
            handleCountryChange: this.handleCountryChange.bind(this)
        };
        this.state = {
            projectTableHead: [
                'id', 
                'name',
                'status', 
                'start_date',
                'end_date',
                'created_at'
            ],
            projectData: [],
            countryData: [],
            projectTableData: [],
            projectTableActions: [
                'info', 
                'delete'
            ],
            countrieData: [
                {name:"Côte d'Ivoire", slug:"cote-divoire"},
                {name:"Nigeria", slug:"nigeria"},
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
            country_id: "",  
            countryId: "", 
            description: "",
            projectErrorMessage: '',
            projectSuccessMessage: '',
            isProjectModalHidden: true,
            projectFormDisabled: false,
            isEditingproject: false,
        };
    }

    componentDidMount() {
        // if (!Modules.Auth.getUser().isAdmin()) {
        //     this.setCountryData([Modules.Auth.getUser().country]);
        //     this.setCountryId(Modules.Auth.getUser().country.id);
        //     this.getAllCountryProjects();
        //     return;
        // }

        this.getAllCountries()
        .then(() => this.getAllCountryProjects());
        this.setdefaultDates();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.countryId === "" ) return;
        if (this.state.countryId && this.state.countryId === prevState.countryId) return;
        if (this.state.countryId === '') return;

        this.getAllCountryProjects();
    }

    componentWillUnmount() {
        this.abortController.abort();
    } 

    getAllProjects = () => {
        return Services.Project.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setProjectData(res.data.projects);
            this.setProjectTableData(this.state.projectData);
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
            this.setProjectTableData(this.state.projectData);
        })
        .catch(err => console.log(err));
    }

    handleCreateClick(event) {
        event.preventDefault();
        this.setIsProjectModalHidden(false);
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleCountryChange(event) {
        event.preventDefault();
        this.setCountryId(event.target.value);
    }

    handleModalCloseClick(event) {
        if (this.state.projectFormDisabled)
            return;

        this.resetProjectForm();
        this.setIsProjectModalHidden(true);
        this.setProjectErrorMessage('');
    }

    handleProjectSubmit(event) {
        event.preventDefault();

        if (this.state.projectFormDisabled)
            return;

        this.setProjectErrorMessage('');
        this.setProjectFormDisabled(event);
        
        this.createProject()
        .then(res => {
            this.setProjectFormDisabled(event, false);
            this.setIsProjectModalHidden(true);
            this.appendProjectData(res.data.project);
            this.resetProjectForm();
        })
        .catch(response => {
            this.handleProjectError(response);
            this.setProjectFormDisabled(event, false);
        });
    }

    handleDeleteClick(event) {
        event.preventDefault();
        
        const project = this.getClickedProject(event);
        
        this.setProjectId(project.id);
        this.showProjectDeleteAlert(this);
    }
    
    handleInfoClick(event) {
        event.preventDefault();
        const project = this.getClickedProject(event);

        if (!project || project === undefined) return;

        this.history.push(`/projects/${project.id}`);
    }

    handleSelectMultipleChange(event) {
        this.setSelectMultupleValue(event);
    }

    handleProjectError = async (error) => {
        let errorMessages = await error.messages;
        this.setProjectErrorMessage(errorMessages ?? "An unexepecd error occurred");
    }

    createProject = () => {
        const payload = {
            name: this.state.name,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            status: this.state.status,
            country_id: this.state.country_id,
            description: this.state.description.toString(),
        }
    
        return Services.Project.create(
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

    deleteProject = (self) => {
        return Services.Project.destroy(
            self.state.id, 
            self.abortController.signal
            )
    }

    appendProjectData = project => {
        const payload = {
            id: project.id,
            name: project.name,
            status: project.status,
            start_date: project.start_date,
            end_date: project.end_date,
            created_at: new Date(project.created_at).toLocaleDateString('en'),
        }

        this.setState((prevState) => {
            return {
                projectTableData: [payload, ...prevState.projectTableData],
                projectData: [project, ...prevState.projectData]
            }
        });
    }

    removeProjectData = project => {
        let projectTableIndex;

        this.state.projectTableData.forEach((item, index) => {
            if (project.id === item['id'])
                projectTableIndex = index
        });

        let projectTableDataCopy = [...this.state.projectTableData];
        let projectDataCopy = [...this.state.projectData];

        projectDataCopy.splice(projectTableIndex,1);
        projectTableDataCopy.splice(projectTableIndex,1);

        this.setState({
            projectTableData: [...projectTableDataCopy],
            projectData: [...projectDataCopy],
        });
    }

    showProjectDeleteAlert = self => {
        if (!self.$Swal) return

        self.$Swal.fire({
            title: "You're about to delete a project",
            text: "Are you sure you want to delete this project",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, delete project!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteProject(self)
                .then(res => {
                    self.removeProjectData(res.data.project);
                    self.resetProjectForm();
                })
                .catch(response => {
                    console.log(response);
                });
            }
            else if (result.dismiss === self.$Swal.DismissReason.cancel) {
                return false;
            }
        })
    }

    resetProjectForm = () => {
        this.setState({
            name:"",
            start_date:"",
            end_date:"",
            description: "",
            country_id: ""
        });
        this.setdefaultDates();
        this.setStatus(this.state.statusData[0] ?? "open");
    }

    getClickedProject = (event) => {
        const dataDiff = this.state.projectTableData.length - this.state.projectData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        
        return this.state.projectData[dataIndex];
    }

    setProjectTableData = data => {
        const projectTableData = data.map(item => {
            const {id, name, status} = item;
            const start_date = item.start_date ? new Date(item.start_date).toLocaleDateString('en').replace(/\//g, '-') : null;
            const end_date = item.end_date ? new Date(item.end_date).toLocaleDateString('en').replace(/\//g, '-') : null;
            const created_at = item.created_at ? new Date(item.created_at).toLocaleDateString('en').replace(/\//g, '-') : null;

            return {id, name, status, start_date, end_date, created_at};
        })

        this.setState({projectTableData});
    }

    setProjectFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({projectFormDisabled: val})
    }

    setProjectErrorMessage =  projectErrorMessage => {
        this.setState({projectErrorMessage});
    }

    setIsProjectModalHidden = isProjectModalHidden => {
        this.setState({isProjectModalHidden})
    }

    setProjectData = data => {
        this.setState({projectData: [...data]});
    }
    
    setCountryData = data => {
        this.setState({countryData: [...data]});
    }
    
    setCountries = countrie => {
        this.setState({countrie});
    }

    setCountryId = countryId => {
        this.setState({countryId, country_id: countryId});
    }

    setStatus = status => {
        this.setState({status});
    }

    setProjectId = id => {
        this.setState({id});
    }

    setdefaultDates = () => {
        const date = new Date();
        const dateString = date.toLocaleDateString().replace(/\//g, '-')
        .split('-').reverse().join('-');

        this.setState({
            start_date: dateString,
            end_date: dateString
        })
    }
    
    setInputValue = event => {
        let inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    }
    
    setSelectMultupleValue = event => {
        if (event.target.value === "") return 

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
         <Pages.Project 
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}