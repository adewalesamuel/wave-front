import React from "react";
import { withRouter } from "react-router-dom";
import { Components } from "../components";
import { Modules } from "../modules";

class HeaderController extends React.Component {
    constructor(props) {
        super(props);

        this.$Swal = window.Swal;
        this.history = this.props.history;
        this.onHandleLogoutClick = this.onHandleLogoutClick.bind(this);

        this.methods = {
            onHandleLogoutClick: this.onHandleLogoutClick
        }
        this.state = {};
    }

    onHandleLogoutClick(event) {
        this.showLogoutAlert(this);
    }

    logout = (self) => {
        Modules.Auth.removeSessionToken();
        self.history.push('/auth/login');
    }

    showLogoutAlert = self => {
        self.$Swal.fire({
            title: "You are logging out",
            text: "Are you sure you want to loggout ?",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Log out!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.logout(self);
            }
            else if (result.dismiss === self.$Swal.DismissReason.cancel) {
            return false;
            }
        })
    }

    render() {
        return(
            <Components.Header
            {...this.props}
            methods={this.methods}
            state={this.state} 
            />
        )
    }
}

export const Header =  withRouter(HeaderController);