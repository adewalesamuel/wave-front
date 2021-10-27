import React from "react";
import { Pages } from "../pages";

export class ActivityDetails extends React.Component {
    constructor(props) {
        super(props);

        this.methods = {
        };
        this.state = {  
            id: this.props.match.params.id,
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