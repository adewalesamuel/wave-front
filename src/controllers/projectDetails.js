import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class ProjectDetails extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.history = this.props.history;

        this.methods = {
            handleProjectChange: this.handleProjectChange.bind(this)
        };
        this.state = {  
            id: this.props.match.params.id,
            projectList: [],
        };
    }

    componentDidMount() {
        this.getAllProjects();
    }

    handleProjectChange(event) {
        event.preventDefault();
        this.setProjectId(event.target.value, this.pushToProject);
    }

    getAllProjects = () => {
        return Services.Project.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectList(res.data.projects);
        })
        .catch(err => console.log(err));
    }

    pushToProject(self, projectId) {
        self.history.push(`/projects/${projectId}`);
    }
    
    setProjectId = (id, callback = () => null) => {
        this.setState({id}, callback(this, id));
    }

    setProjectList = projects => {
        const projectList = projects.map(project => {
            return {name: project.name, id: project.id};
        });

        this.setState({projectList});
    }

    render() {
        return(
         <Pages.ProjectDetails.Index
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}