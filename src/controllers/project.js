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
            handleSubmit: this.handleSubmit.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this)
        };
        this.state = {
            projectModalTitle: "Add new project",
            projectTableHead: [
                'id', 
                'name',
                'status', 
                'start_date',
                'end_date',
                'created_at'
            ],
            projectData: [],
            projectTableData: [],
            projectTableActions: [
                'edit', 
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
            countries: [],   
            description: "",
            projectErrorMessage: '',
            projectSuccessMessage: '',
            isProjectModalHidden: true,
            projectFormDisabled: false,
            isEditingproject: false,
        };
    }

    componentDidMount() {
        this.getAllProjects();
        this.setdefaultDates();
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
        .catch(Modules.Auth.redirectIfSessionExpired);
    }

    handleCreateClick(event) {
        event.preventDefault();
        this.setIsProjectModalHidden(false);
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleModalCloseClick(event) {
        if (this.state.projectFormDisabled)
            return

        this.resetProjectForm();
        this.setIsProjectModalHidden(true);
        this.setProjectErrorMessage('');
    }

    handleSubmit(event) {
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
        const dataDiff = this.state.projectTableData.length - this.state.projectData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        const project = this.state.projectData[dataIndex];

        this.setProjectId(project.id);
        this.showProjectDeleteAlert(this);
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
            countries: JSON.stringify(this.state.countries),
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
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
            description: ""
        });
        this.setdefaultDates();
        this.setStatus(this.state.statusData[0] ?? "open");
        this.setCountries(this.state.countrieData[0].slug ?? "cote-divoire");
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

    setIsProjectModalHidden = isProjectModalHidden => {
        this.setState({isProjectModalHidden})
    }

    setCountries = countrie => {
        this.setState({countrie})
    }

    setStatus = status => {
        this.setState({status})
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