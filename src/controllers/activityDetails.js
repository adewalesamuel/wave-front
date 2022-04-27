import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class ActivityDetails extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();

        this.methods = {
        };
        this.state = {  
            id: this.props.match.params.id,
            indicator_id: null
        };
    }

    componentDidMount() {
        this.getActivityById(this.props.match.params.id);
    }

    getActivityById = (id) => {
        return Services.Activity.getById(id, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setState({indicator_id: res.data.activity.indicator_id});
        })
        .catch(err => {
            console.log(err);
        })
    }

    componentWillUnmount() {
        this.abortController.abort();
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