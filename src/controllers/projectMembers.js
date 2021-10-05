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
            this.appendProjectMembersData(res.data);
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

    getParams = () => this.props.match.params;

    getProjectId = () => this.state.projectId;
    
    getUserId = () => this.state.userId;

    isUserFormDisabled = () => this.state.userFormDisabled

    appendProjectMembersData = data => {
        const payload = {
            id: data.project_member.id,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
        }

        this.setState((prevState) => {
            return {
                projectMembersTableData: [payload, ...prevState.projectMembersTableData],
                projectMembersData: [data, ...prevState.projectMembersData]
            }
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
    
    setProjectMembersTableData = data => {
        const projectMembersTableData = data.map(item => {
            return {
                id: item.id,
                firstname: item.user.firstname,
                lastname: item.user.lastname
            };
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