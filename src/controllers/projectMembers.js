import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class ProjectMembers extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleProjectMembersSubmit: this.handleProjectMembersSubmit.bind(this),
            handleProjectMembersChange: this.handleProjectMembersChange.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
        };
        this.state = {  
            projectId: '',
            projectMemberId:'',
            projectMembersTableHead:  ['id', 'firstname', 'lastname'],
            projectMembersTableActions: ['delete'],
            projectMembersData: [],
            projectMembersTableData: [],
            userId: '',
            userList: [],
            userFormDisabled: true,
            projectMembersErrorMessage: '',
            projectMembersSuccessMessage: '',
        };
    }

    componentDidMount() {
        const projectId = this.getParams().id;
        this.setProjectId(projectId);
        this.getAllProjectMembers(projectId)
        .then(() => this.getAllUsers());
    }

    handleProjectMembersSubmit(event) {
        event.preventDefault();

        if (this.isUserFormDisabled() || this.getUserId() === "")
            return;

        this.setProjectMembersErrorMessage('');
        this.setUserFormDisabled();
        
        this.createProjectMember()
        .then(res => {
            this.setUserFormDisabled(false);
            this.appendProjectMembersData(res.data.project_member);
        })
        .catch(response => {
            this.handleProjectMembersError(response);
            this.setUserFormDisabled(false);
        });
    }
   
    handleProjectMembersChange(event) {
        event.preventDefault();
        this.setProjectMembersErrorMessage('');
        this.setInputValue(event);
    }

    handleDeleteClick(event) {
        event.preventDefault();
        
        const project_member = this.getClickedProjectMember(event);
        this.setProjectMemberId(project_member.id);
        this.showProjectMembersDeleteAlert(this);
    }

    handleProjectMembersError = async (error) => {
        let errorMessages = await error.messages;
        this.setProjectMembersErrorMessage(errorMessages ?? "An unexpected error occured");
    }

    createProjectMember = () => {
        const payload = {
            project_id: this.getProjectId(),
            user_id: this.getUserId(),
        };
    
        return Services.ProjectMember.create(
            JSON.stringify(payload),
            this.abortController.signal
            )
    }
    
    deleteProjectMember = (self) => {
        return Services.ProjectMember.destroy(
            self.state.projectMemberId, 
            self.abortController.signal
            )
    }

    getAllUsers = () => {
        return Services.User.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setUserList(res.data.users);
            this.setUserFormDisabled(false);
        })
        .catch(err => console.log(err));
    }

    getAllProjectMembers = projectId => {
        return Services.Project.getAllMembers(projectId, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectMembersData(res.data.project_members);
            this.setProjectMembersTableData(this.state.projectMembersData);
        })
        .catch(err => console.log(err));
    }

    
    showProjectMembersDeleteAlert = self => {
        if (!self.$Swal) return

        self.$Swal.fire({
            title: "You're about to remove this user from the project",
            text: "Are you sure you want to remove this user",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, remove user!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteProjectMember(self)
                .then(res => {
                    self.removeProjectMembersData(res.data.project_member);
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

    getClickedProjectMember = (event) => {
        const dataDiff = this.state.projectMembersTableData.length - this.state.projectMembersData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        
        return this.state.projectMembersData[dataIndex];
    }

    getParams = () => this.props.match.params;

    getProjectId = () => this.state.projectId;
    
    getUserId = () => this.state.userId;

    isUserFormDisabled = () => this.state.userFormDisabled

    appendProjectMembersData = project_member => {
        const payload = {
            id: project_member.id,
            firstname: project_member.user.firstname,
            lastname: project_member.user.lastname,
        }

        this.setState((prevState) => {
            return {
                projectMembersTableData: [payload, ...prevState.projectMembersTableData],
                projectMembersData: [project_member, ...prevState.projectMembersData]
            }
        });
    }

    removeProjectMembersData = project => {
        let projectMembersTableIndex;

        this.state.projectMembersTableData.forEach((item, index) => {
            if (project.id === item['id'])
                projectMembersTableIndex = index
        });

        let projectMembersTableDataCopy = [...this.state.projectMembersTableData];
        let projectMembersDataCopy = [...this.state.projectMembersData];

        projectMembersDataCopy.splice(projectMembersTableIndex,1);
        projectMembersTableDataCopy.splice(projectMembersTableIndex,1);

        this.setState({
            projectMembersTableData: [...projectMembersTableDataCopy],
            projectMembersData: [...projectMembersDataCopy],
        });
    }

    setInputValue = event => {
        let inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    }
    
    setUserFormDisabled = (val=true) => {
        this.setState({userFormDisabled: val})
    }

    setProjectId = projectId => {
        this.setState({projectId});
    }
    
    setProjectMemberId = projectMemberId => {
        this.setState({projectMemberId});
    }
    
    setProjectMembersTableData = data => {
        const projectMembersTableData = []
        data.forEach(item => {
            if (!item.user) return;
            projectMembersTableData.push({
                id: item.id ?? "",
                firstname: item.user.firstname,
                lastname: item.user.lastname
            });
        })

        this.setState({projectMembersTableData});
    }

    setProjectMembersErrorMessage =  projectMembersErrorMessage => {
        this.setState({projectMembersErrorMessage});
    }

    setUserList = data => {
        this.setState({userList: [...data]});
    }

    setProjectMembersData = data => {
        this.setState({projectMembersData: [...data]});
    }

    render() {
        return(
         <Pages.ProjectDetails.ProjectMembers
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}