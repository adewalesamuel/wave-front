import React from "react";
import { Pages } from "../pages";
import { Services } from "../services";

export class ResetPassword extends React.Component {
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
            token: "",
            resetPasswordError: "",
            resetPasswordSuccess: "",
            passwordConfirmationError: "",
            password:"",
            password_confirmation: "",
            formDisabled: false,
        };
    }

    componentWillUnmount() {
        this.abortController.abort();
    } 

    componentDidMount() {
        this.setToken();
    }

    setToken() {
        if (this.location.search === undefined || this.location.search === "")
            return;

        let token = this.location.search.split("=")[1];

        if (token.includes("&"))
            token = token.split("&")[0];

        this.setState({token});
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

    setResetPasswordError = (text) => {
        this.setState({resetPasswordError: text});
    }

    setResetPasswordSuccess = (text) => {
        this.setState({resetPasswordSuccess: text});
    }

    setPasswordConfirmationError = (text) => {
        this.setState({passwordConfirmationError: text});
    }

    isPasswordConfirmed = () => {
        return this.state.password === this.state.password_confirmation;
    }

    resetPassword = () => {
        const {password, password_confirmation, token} = this.state
        let payload = {password,password_confirmation,token };

        return Services.Auth.resetPassword(
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    handleResetPasswordError = response => {
        if (response.status >= 500)
            this.setResetPasswordError("An unexpected error occured " + response.statusText);
    }
    
    onHandleChange(event) {
        this.setInputValue(event);
    }


    onHandleSubmit(event) {
        event.preventDefault();

        if (this.state.formDisabled)
            return

        if (!this.isPasswordConfirmed())
            return this.setPasswordConfirmationError("Passwords must be identical");

        this.setResetPasswordError("");
        this.setResetPasswordSuccess("")
        this.setFormDisabled(event);
        this.resetPassword()
        .then(res => {
            this.setFormDisabled(event, false);
            this.history.push('/auth/login');   
        })
        .catch(response => {
            this.handleResetPasswordError(response);
            this.setFormDisabled(event, false)
        });
    }

    render() {
        return(
           <Pages.Auth.ResetPassword 
           {...this.props} 
           state={this.state}
           methods={this.methods}/>
        )
    }
}