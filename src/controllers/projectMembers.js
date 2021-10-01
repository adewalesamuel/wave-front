import React from "react";
import { Pages } from "../pages";

export class ProjectMembers extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
        };
        this.state = {  
        };
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