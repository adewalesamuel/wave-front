import React from "react";
import { Pages } from "../pages";

export class ActivitytDetails extends React.Component {
    constructor(props) {
        super(props);

        this.methods = {
        };
        this.state = {  
            id: '',
            projectList: [],
        };
    }

    render() {
        return(
            <Pages.ActivityDetails.Index
            {...this.props}
            methods={this.methods}
            state={this.state} 
            />
        )
    }
}