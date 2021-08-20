import React from "react";
import { Pages } from "../pages";
import { Services } from "../services";
import { Modules } from "../modules";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.history = window.location;
        this.location = this.props.location;
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);

        this.methods = {
            onHandleChange: this.onHandleChange,
            onHandleSubmit: this.onHandleSubmit
        };
        this.state = {
            loginError: "",
            email:"",
            password:"",
            formDisabled: false,
        };
    }

    componentWillUnmount() {
        this.abortController.abort();
    } 

    setInputValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    setFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({formDisabled: val})
    }

    setLoginError = (errText) => {
        this.setState({loginError: errText});
    }

    goToTargetPage = () => {
        const page = this.location.state ? this.location.state.from : '/';
        this.history.replace(page);
    }

    login = () => {
        let payload = {
            email: this.state.email,
            password: this.state.password
        };

        return Services.Auth.login(
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    handleLoginError = response => {
        if (response.status === 401)
                this.setLoginError("Your email or password is incorrect");
        if (response.status >= 500)
            this.setLoginError("An unexpected error occured " + response.statusText);
    }
    
    onHandleChange(event) {
        this.setInputValue(event);
    }


    onHandleSubmit(event) {
        event.preventDefault();

        if (this.state.formDisabled)
            return

        this.setLoginError("");
        this.setFormDisabled(event);
        this.login()
        .then(res => {
            Modules.Auth.setSessionToken(res.access_token);
            this.setFormDisabled(event, false);
            this.goToTargetPage();
        })
        .catch(response => {
            this.handleLoginError(response);
            this.setFormDisabled(event, false)
        });
    }

    render() {
        return(
            <Pages.Auth.Login 
            {...this.props} 
            state={this.state} 
            methods={this.methods} />
        )
    }
}