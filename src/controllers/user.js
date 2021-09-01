import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class User extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();

        this.history = this.props.history;

        this.methods = {
            onHandleEditClick: this.onHandleEditClick.bind(this),
            onHandleInfoClick: this.onHandleInfoClick.bind(this), 
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
            ],
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

    appendUserTableData = user => {
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
            return {userTableData: [payload, ...state.userTableData]}
        });
    }

    handleUserError = response => {
        console.log(response.json())
       if (response.status >= 400)
            this.setUserErrorMessage(`An error occured! Check if the form 
            was correctly registered or if the user already exist.`) 
    }

    onHandleModalCloseClick(event) {
        if (this.state.formDisabled)
            return

        this.setIsUserModalHidden(true);
    }

    onHandleChange(event) {
        this.setInputValue(event);
    }

    onHandleEditClick(event) {
        this.setIsUserModalHidden(false);
    }

    onHandleSubmit(event) {
        event.preventDefault();

        if (this.state.formDisabled)
            return

        this.setUserErrorMessage("");
        this.setFormDisabled(event);
        this.createUser()
        .then(res => {
            this.setFormDisabled(event, false);
            this.setIsUserModalHidden(true);
            this.appendUserTableData(res.data.user);
            this.resetUserForm();
        })
        .catch(response => {
            this.handleUserError(response);
            this.setFormDisabled(event, false)
        });
    }

    onHandleInfoClick(event) {
    }

    onHandleDeleteClick(event) {
    }
    
    onHandleCreateClick(event) {
        event.preventDefault();
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