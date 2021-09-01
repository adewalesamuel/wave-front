import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class User extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.$Swal = window.Swal;
        this.usersTable = null;
        this.history = this.props.history;

        this.methods = {
            onHandleEditClick: this.onHandleEditClick.bind(this),
            onHandleDeleteClick: this.onHandleDeleteClick.bind(this),
            onHandleModalCloseClick: this.onHandleModalCloseClick.bind(this),
            onHandleChange: this.onHandleChange.bind(this), 
            onHandleCreateClick: this.onHandleCreateClick.bind(this),
            onHandleSubmit: this.onHandleSubmit.bind(this)
        };
        this.state = {
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
            userErrorMessage: '',
            userSuccessMessage: '',
            isUserModalHidden: true,
            formDisabled: false,
            isEditingUser: false,
        };
    }

    componentDidMount() {
        this.setPassword();
        this.getAllUsers();
        this.getAllRoles();
    }

    componentWillUnmount() {
        this.abortController.abort();
    } 

    getAllUsers = () => {
        return Services.User.getAll(this.abortController.signal)
        .then(res => {
            this.errorManager(res)
            this.setUserData(res.data.users);
            this.setUserTableData(this.state.userData);
        })
        .catch(this.errorManager);
    }

    getAllRoles = () => {
        return Services.Role.getAll(this.abortController.signal)
        .then(res => {
            this.errorManager(res)
            this.setRoleData(res.data.roles);
            this.setRole(res.data.roles[0].id);
        })
        .catch(this.errorManager);
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

    setRole = role => {
        this.setState({role})
    }

    setUserTableData = data => {
        const userDataTable = data.map(item => {
            const {id, firstname, lastname, tel, email} = item;
            const role = item.role.name;
            const created_at = item.created_at ? new Date(item.created_at).toLocaleDateString('en'): null;

            return {id, firstname, lastname, tel, email, role, created_at};
        })

        this.setState({userTableData: [...userDataTable]});
    }

    setInputValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    errorManager = err => {
        if (!err) return;
        
        if (err.status && err.status === "Token is Expired") {
            Modules.Auth.removeSessionToken();
            this.history.push('/auth/login');
            return;
        }
            
    }

    setIsUserModalHidden = bool => {
        this.setState({isUserModalHidden: bool})
    }

    setUserErrorMessage =  errText => {
        this.setState({userErrorMessage: errText});
    }

    setUserSuccessMessage =  text => {
        this.setState({userSucess: text});
    }

    setFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({formDisabled: val})
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
            role: this.state.roleData.find(item => item.id === user.role_id).name,
            created_at: new Date(user.created_at).toLocaleDateString('en')
        }
        this.setState((state) => {
            return {
                userTableData: [payload, ...state.userTableData],
                userData: [user, ...state.userData]
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
        userTableDataCopy[userTableIndex]['role'] = this.state.roleData.find(role => role.id === user.role_id).name;

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

    handleUserError = response => {
       if (response.status >= 400)
            this.setUserErrorMessage(`An error occured! Check if the form 
            was correctly registered or if the user already exist.`) 
    }

    showUserDeleteAlert = self => {
        self.$Swal.fire({
            title: "You're about to delete a user",
            text: "Are you sure you want to delete this user",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
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

    onHandleModalCloseClick(event) {
        if (this.state.formDisabled)
            return

        this.resetUserForm()
        this.setIsUserModalHidden(true);
    }

    onHandleChange(event) {
        this.setInputValue(event);
    }

    onHandleEditClick(event) {
        const dataIndex = event.target.parentElement.getAttribute('data-index');
        const user = this.state.userData[dataIndex];

        this.setIsEditingUser();
        this.fillUserForm(user);
        this.setIsUserModalHidden(false);
    }

    onHandleSubmit(event) {
        event.preventDefault();

        if (this.state.formDisabled)
            return

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

    onHandleDeleteClick(event) {
        const dataDiff = this.state.userTableData.length - this.state.userData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        const user = this.state.userData[dataIndex];

        this.setId(user.id);
        this.showUserDeleteAlert(this)
    }
    
    onHandleCreateClick(event) {
        event.preventDefault();
        this.setIsEditingUser(false);
        this.setIsUserModalHidden(false);
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