import React from "react";
import { Pages } from "../pages";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.methods = {
        };
        this.state = {
        };
    }

    render() {
        return(
          <Pages.Home
          {...this.props}
          methods={this.methods}
          state={this.state} 
          />
        )
    }
}