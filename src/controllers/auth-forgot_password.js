import React from "react";
import { Pages } from "../pages";
import { Services } from "../services";

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.history = this.props.history;
        this.location = this.props.location;
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);

        this.methods = {
            onHandleChange: this.onHandleChange,
            onHandleSubmit: this.onHandleSubmit
        };
        this.state = {
            forgotPasswordError: "",
            forgotPasswordSuccess: "",
            email:"",
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

    resetEmailInput = () => {
        this.setState({email: ""});
    }

    setFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({formDisabled: val})
    }

    setForgotPasswordError = (text) => {
        this.setState({forgotPasswordError: text});
    }

    setForgotPasswordSuccess = (text) => {
        this.setState({forgotPasswordSuccess: text});
    }

    forgotPassword = () => {
        let payload = {
            email: this.state.email,
        };

        return Services.Auth.forgotPassword(
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    handleforgotPasswordError = response => {
        if (response.status === 404)
                this.setForgotPasswordError("This user with entrered email cannot be found.");
        if (response.status >= 500)
            this.setForgotPasswordError("An unexpected error occured " + response.statusText);
    }
    
    onHandleChange(event) {
        this.setInputValue(event);
    }


    onHandleSubmit(event) {
        event.preventDefault();

        if (this.state.formDisabled)
            return

        this.setForgotPasswordError("");
        this.setForgotPasswordSuccess("")
        this.setFormDisabled(event);
        this.forgotPassword()
        .then(res => {
            this.setFormDisabled(event, false);
            this.setForgotPasswordSuccess(`A mail was sent to the address 
            ${this.state.email}. Check your email to reset your password.`);
            this.resetEmailInput();
        })
        .catch(response => {
            this.handleforgotPasswordError(response);
            this.setFormDisabled(event, false)
        });
    }

    render() {
        return(
            <Pages.Auth.ForgotPassword  
            {...this.props} 
            state={this.state} 
            methods={this.methods} />
        )
    }
}