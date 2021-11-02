import React from "react";
import { Pages } from "../pages";

export class IndicatorDetails extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.history = this.props.history;

        this.methods = {
        };
        this.state = {  
            id: this.props.match.params.id,
        };
    }

    render() {
        return(
         <Pages.IndicatorDetails.Index
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}