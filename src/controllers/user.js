import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class User extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleEditClick: this.handleEditClick.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleRoleModalCloseClick: this.handleRoleModalCloseClick.bind(this),
            handleChange: this.handleChange.bind(this), 
            handleCreateClick: this.handleCreateClick.bind(this),
            handleSubmit: this.handleSubmit.bind(this),
            handleRoleSubmit: this.handleRoleSubmit.bind(this),
            handleCreateRoleClick: this.handleCreateRoleClick.bind(this),
            handleSelectMultipleChange: this.handleSelectMultipleChange.bind(this) 
        };
        this.state = {
            userModalTitle: "Add a new user",
            userTableHead: [
                'id', 
                'firstname',
                'lastname', 
                'tel',
                'email',
                'role',
                'created_at'
            ],
            userData: [],
            userTableData: [],
            userTableActions: [
                'edit', 
                'delete'
            ],
            id: '',
            firstname: '',
            lastname: '',
            tel: '',
            email: '',
            role: '',
            password: '',
            roleData: [],
            permissions: [],
            roleName: '',
            permissionData: [],
            rolePermissions: [],
            userErrorMessage: '',
            userSuccessMessage: '',
            roleErrorMessage: '',
            roleSuccessMessage: '',
            isUserModalHidden: true,
            isRoleModalHidden: true,
            formDisabled: false,
            roleFormDisabled: false,
            isEditingUser: false,
        };
    }

    componentDidMount() {
        this.setPassword();
        this.getAllUsers();
        this.getAllRoles();
        this.getAllPermissions();
    }

    componentWillUnmount() {
        this.abortController.abort();
    } 

    getAllUsers = () => {
        return Services.User.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setUserData(res.data.users);
            this.setUserTableData(this.state.userData);
        })
        .catch(Modules.Auth.redirectIfSessionExpired);
    }

    getAllRoles = () => {
        return Services.Role.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setRoleData(res.data.roles);
            this.setRole(res.data.roles[0] ? res.data.roles[0].id : 1);
        })
        .catch(Modules.Auth.redirectIfSessionExpired);
    }

    getAllPermissions = () => {
        return Services.Permission.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setPermissionData(res.data.permissions);
        })
        .catch(Modules.Auth.redirectIfSessionExpired);
    }

    createUser = () => {
        const payload = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            tel: this.state.tel,
            password: this.state.password,
            email: this.state.email,
            role_id: this.state.role,
        }
        
        return Services.User.create(
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

    createRole = () => {
        const payload = {
            name: this.state.roleName,
            permissions: JSON.stringify(this.state.rolePermissions),
        }
        
        return Services.Role.create(
            JSON.stringify(payload),
            this.abortController.signal
            )
    }
            

    updateUser = () => {
        const payload = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            tel: this.state.tel,
            password: this.state.password,
            email: this.state.email,
            role_id: this.state.role,
        }

        return Services.User.update(
            this.state.id,
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

    
    deleteUser = (self) => {
        return Services.User.destroy(
            self.state.id, 
            self.abortController.signal
            )
    }

    setUserData = data => {
        this.setState({userData: [...data]});
    }

    setRoleData = data => {
        this.setState({roleData: [...data]});
    }

    setPermissionData = data => {
        this.setState({permissionData: [...data]});
    }
    
    setRole = role => {
        this.setState({role})
    }

    setUserTableData = data => {
        const userDataTable = data.map(item => {
            const {id, firstname, lastname, tel, email} = item;
            const role = item.role.name;
            const created_at = item.created_at ? new Date(item.created_at).toLocaleDateString('en').replace(/\//g, '-') : null;

            return {id, firstname, lastname, tel, email, role, created_at};
        })

        this.setState({userTableData: [...userDataTable]});
    }

    setInputValue = event => {
        let inputName = event.target.name;

        if (inputName.includes('role_id')) inputName = 'role';
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

    setUserModalTitle = (userModalTitle) => {
        this.setState({userModalTitle})
    }

    setIsUserModalHidden = isUserModalHidden => {
        this.setState({isUserModalHidden})
    }

    setIsRoleModalHidden = isRoleModalHidden => {
        this.setState({isRoleModalHidden})
    }

    setUserErrorMessage =  userErrorMessage => {
        this.setState({userErrorMessage});
    }

    setRoleErrorMessage =  roleErrorMessage => {
        this.setState({roleErrorMessage});
    }

    setUserSuccessMessage =  userSucess => {
        this.setState({userSucess});
    }

    setFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({formDisabled: val})
    }

    setRoleFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({roleFormDisabled: val})
    }

    setPassword = (max=8) => {
        const alphaNum = 'azertyuiopqsdfghjklmwxcvbn1234567890AZERTYUIOPQSDFGHJKLMWXCVBN';
        let password = '';
        let i = 0;
        
        while(i < max) {
            let randIndex = Math.ceil(Math.random() * alphaNum.length - 1);
            password += alphaNum[randIndex];
            i++;
        }

        this.setState({password});
    }

    setIsEditingUser = (bool=true) => {
        this.setState({isEditingUser: bool})
    }

    setId = id => {
        this.setState({id});
    }

    resetUserForm = () => {
        [
            'id', 
            'firstname', 
            'lastname', 
            'email', 
            'tel'
        ].forEach(item => this.setState({[item]: ""}));
        this.setPassword();
        this.setRole(this.state.roleData[0] ? this.state.roleData[0].id : 1);
    } 

    resetRoleForm = () => {
        [
            'roleName', 
            'rolePermissions', 
        ].forEach(item => this.setState({[item]: ""}));
    } 

    fillUserForm =  (user) => {
        this.setState((state) => {
            return {
                id: user.id, 
                firstname: user.firstname, 
                lastname: user.lastname, 
                email: user.email, 
                tel: user.tel, 
                role: user.role_id, 
                password: (user.password === undefined) ? state.password : user.password
            }
        })
    }

    appendUserData = user => {
        const payload = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            tel: user.tel,
            email: user.email,
            role: this.state.roleData.find(item => item.id === parseInt(user.role_id)).name,
            created_at: new Date(user.created_at).toLocaleDateString('en')
        }
        this.setState((state) => {
            return {
                userTableData: [payload, ...state.userTableData],
                userData: [user, ...state.userData]
            }
        });
    }

    appendRoleData = role => {
        this.setState((state) => {
            return {
                roleData: [role, ...state.roleData]
            }
        });
    }

    updateUserData = user => {
        let userTableIndex;

        this.state.userTableData.forEach((item, index) => {
            if (user.id === item['id'])
                userTableIndex = index
        });


        let userTableDataCopy = [...this.state.userTableData];

        userTableDataCopy[userTableIndex]['id'] = user.id;
        userTableDataCopy[userTableIndex]['firstname'] = user.firstname;
        userTableDataCopy[userTableIndex]['lastname'] = user.lastname;
        userTableDataCopy[userTableIndex]['tel'] = user.tel;
        userTableDataCopy[userTableIndex]['email'] = user.email;
        userTableDataCopy[userTableIndex]['role'] = this.state.roleData.find(role => role.id === parseInt(user.role_id)).name;

        let userDataCopy = [...this.state.userData];

        userDataCopy[userTableIndex]['id'] = user.id;
        userDataCopy[userTableIndex]['firstname'] = user.firstname;
        userDataCopy[userTableIndex]['lastname'] = user.lastname;
        userDataCopy[userTableIndex]['tel'] = user.tel;
        userDataCopy[userTableIndex]['email'] = user.email;
        userDataCopy[userTableIndex]['role'] = null;
        userDataCopy[userTableIndex]['role_id'] = user.role_id;

        if (user.password && user.password !== undefined)
            userDataCopy[userTableIndex]['password'] = user.password;
        
        this.setState({
            userData: [...userDataCopy],
            userTableData: [...userTableDataCopy]
        })
        
    }

    removeUserData = user => {
        let userTableIndex;

        this.state.userTableData.forEach((item, index) => {
            if (user.id === item['id'])
                userTableIndex = index
        });

        let userTableDataCopy = [...this.state.userTableData];
        let userDataCopy = [...this.state.userData];

        userDataCopy.splice(userTableIndex,1);
        userTableDataCopy.splice(userTableIndex,1);

        this.setState({
            userTableData: [...userTableDataCopy],
            userData: [...userDataCopy],
        })
    }

    handleUserError = async (error) => {
        let errorMessages = await error.messages;
        this.setUserErrorMessage(errorMessages ?? "An unexpected error occured");
    }

    handleRoleError = async (error) => {
        let errorMessages = await error.messages;
        this.setRoleErrorMessage(errorMessages ?? "An unexpected error occured");
     }

    showUserDeleteAlert = self => {
        if (!self.$Swal) return

        self.$Swal.fire({
            title: "You're about to delete a user",
            text: "Are you sure you want to delete this user",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, Delete user!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteUser(self)
                .then(res => {
                    self.removeUserData(res.data.user);
                    self.resetUserForm();
                })
                .catch(response => {
                    console.log(response)
                });
            }
            else if (result.dismiss === self.$Swal.DismissReason.cancel) {
                return false;
            }
        })
    }

    handleModalCloseClick(event) {
        if (this.state.formDisabled)
            return; 

        this.resetUserForm()
        this.setIsUserModalHidden(true);
        this.setUserErrorMessage('');
    }

    handleRoleModalCloseClick(event) {
        if (this.state.roleFormDisabled)
            return;

        this.resetRoleForm()
        this.setIsRoleModalHidden(true);
        this.setRoleErrorMessage('')
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleSelectMultipleChange(event) {
        this.setSelectMultupleValue(event);
    }

    handleEditClick(event) {
        const dataIndex = event.target.parentElement.getAttribute('data-index');
        const user = this.state.userData[dataIndex];
        
        if (!user || user === undefined) return;

        this.setUserModalTitle("Edit user");
        this.setIsEditingUser();
        this.fillUserForm(user);
        this.setIsUserModalHidden(false);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.formDisabled)
            return;

        this.setUserErrorMessage("");
        this.setFormDisabled(event);

        if (this.state.isEditingUser === true) {
            this.updateUser()
            .then(res => {
                this.setFormDisabled(event, false);
                this.setIsUserModalHidden(true);
                this.updateUserData(res.data.user);
                this.resetUserForm();
            })
            .catch(response => {
                this.handleUserError(response);
                this.setFormDisabled(event, false)
            });
        }else {
            this.createUser()
            .then(res => {
                this.setFormDisabled(event, false);
                this.setIsUserModalHidden(true);
                this.appendUserData(res.data.user);
                this.resetUserForm();
            })
            .catch(response => {
                this.handleUserError(response);
                this.setFormDisabled(event, false)
            });
        }
    }

    handleRoleSubmit = event => {
        event.preventDefault();

        if (this.state.roleFormDisabled)
            return;

        this.setRoleErrorMessage("");
        this.setRoleFormDisabled(event);

        this.createRole()
        .then(res => {
            this.setRoleFormDisabled(event, false);
            this.setIsRoleModalHidden(true);
            this.appendRoleData(res.data.role);
            this.resetRoleForm();
        })
        .catch(response => {
            this.handleRoleError(response);
            this.setRoleFormDisabled(event, false)
        });

    }

    handleDeleteClick(event) {
        const dataDiff = this.state.userTableData.length - this.state.userData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        const user = this.state.userData[dataIndex];

        this.setId(user.id);
        this.showUserDeleteAlert(this)
    }
    
    handleCreateClick(event) {
        event.preventDefault();

        this.setUserModalTitle("Add new user")
        this.setIsEditingUser(false);
        this.setIsUserModalHidden(false);
    }

    handleCreateRoleClick(event) {
        event.preventDefault();
        this.setIsRoleModalHidden(false);
    }

    render() {
        return(
            <Pages.User 
            {...this.props}
            state={this.state}
            methods={this.methods} />
        )
    }
}