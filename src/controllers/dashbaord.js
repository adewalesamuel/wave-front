import React from "react";
import { Pages } from "../pages";
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Services } from "../services";
import { Modules } from "../modules";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            renderGraphItem: this.renderGraphItem.bind(this),
            handleChange: this.handleChange.bind(this),
            handleCreateClick: this.handleCreateClick.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleProjectChange: this.handleProjectChange.bind(this),
            handleGraphSubmit: this.handleGraphSubmit.bind(this),
            handleCountryChange: this.handleCountryChange.bind(this)
        };
        this.state = {
            projectId: '',
            projectInfo:null,
            graphData: [
                // {
                //     name: "Graph 1",
                //     type: 'line',
                //     indicator: {
                //         name: "Indicator 1",
                //         type: "Number",
                //         unit: "Unit",
                //         collected_data: [
                //             {
                //                 values: 100,
                //                 collection_date: new Date().toLocaleDateString('en'),
                //                 disaggregation_values: [
                //                     {
                //                         type: "Type 1",
                //                         fields: [
                //                             {name: "Field 1", value: 50},
                //                             {name: "Field 2", value: 50},
                //                         ]
                //                     }
                //                 ]
                //             },
                //             {
                //                 values: 50,
                //                 collection_date: new Date().toLocaleDateString('en'),
                //                 disaggregation_values: [
                //                     {
                //                         type: "Type 1",
                //                         fields: [
                //                             {name: "Field 1", value: 50},
                //                             {name: "Field 2", value: 50},
                //                         ]
                //                     }
                //                 ]
                //             },
                //             {
                //                 values: 75,
                //                 collection_date: new Date().toLocaleDateString('en'),
                //                 disaggregation_values: [
                //                     {
                //                         type: "Type 1",
                //                         fields: [
                //                             {name: "Field 1", value: 50},
                //                             {name: "Field 2", value: 50},
                //                         ]
                //                     }
                //                 ]
                //             }
                //         ]
                //     }
                // }
            ],
            graphModalTitle: "Add new graph",
            typeList: [
                {name:"Vertical Bar", value:"v-bar"},
                {name:"Pie", value:"donut"},
                {name:"Line", value:"graph"}
            ],
            projectList: [],
            countryData: [],
            indicatorList: [],
            countryProjectInfoData: [],
            graphCardActions: [
                'info', 
                'delete'
            ],
            id: '',
            name: '',
            type: '',
            description: '',
            indicators: '',
            graphErrorMessage: '',
            graphSuccessMessage: '',
            isGraphModalHidden: true,
            isGraphFormDisabled: false,
            isEditingGraph: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;

        // if (!Modules.Auth.getUser().isAdmin()) {
        //     this.setCountryData([Modules.Auth.getUser().country]);
        //     this.setCountryId(Modules.Auth.getUser().country.id);
        //     this.getAllCountryProjects();
        //     return;
        // }

        this.getAllCountries()
        .then(() => this.getAllCountryProjects())
        .then(() => {
            if (this.state.projectId === '') {
                this.getAllCountryProjectsInfos(); // If admin
                return;
            }
            this.getAllGraphByProject(this.state.projectId)
            this.getAllProjectIndicators()
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if ( this.state.countryId === '') return;
        if (this.state.countryId && this.state.countryId === prevState.countryId) {
            if (this.state.projectId === '') return;
            if (this.state.projectId && this.state.projectId === prevState.projectId) {
                return;
            }else {
                this.getAllGraphByProject(this.state.projectId);
                this.getAllProjectIndicators();
            }
            return;
        }else {
            if (this.state.countryId) {
                this.getAllCountryProjects()
                .then(() => {
                    // If admin
                    if (this.state.projectId === '') {
                        this.getAllCountryProjectsInfos();
                    }
                })   
            }
            if (this.state.projectId === '') {
                this.getAllCountryProjectsInfos(); //If admin
                return
            };

            this.getAllGraphByProject(this.state.projectId);
            this.getAllProjectIndicators();
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    } 

    handleCreateClick(event) {
        event.preventDefault();

        this.setGraphModalTitle("Add new graph");
        this.setIsEditingGraph(false);
        this.setIsGraphModalHidden(false);
    }

    handleModalCloseClick(event) {
        event.preventDefault();
        if (this.state.isGraphFormDisabled) return;
            
        this.resetGraphForm();
        this.setIsGraphModalHidden(true);
        this.setGraphErrorMessage('');
    }

    handleCountryChange(event) {
        event.preventDefault();

        this.setProjectList([]);
        this.setCountryId(event.target.value);
    }

    handleGraphSubmit(event) {
        event.preventDefault();
        
        if (this.state.isGraphFormDisabled || this.state.indicators === "") return;
            
        this.setGraphErrorMessage('');
        this.setIsGraphFormDisabled();
        
        this.createGraph()
        .then(res => {
            this.setIsGraphFormDisabled(false);
            this.setIsGraphModalHidden(true);
            this.resetGraphForm();
            window.location.reload();
        })
        .catch(response => {
            this.handleGraphError(response);
            this.setIsGraphFormDisabled(false);
        });
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleProjectChange(event) {
        event.preventDefault();
        this.setProjectId(event.target.value);
    }

    handleGraphError = async (error) => {
        let errorMessages = await error.messages;
        this.setGraphErrorMessage(errorMessages ?? "An unexepecd error occurred");
    }

    getAllProjectIndicators = () => {
        return Services.Project.getAllIndicators(this.state.projectId, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIndicatorList(res.data.indicators);
        })
        .catch(err => console.log(err));
    }

    getAllCountryProjects = () => {
        return Services.Country.getAllProjects(this.state.countryId, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectList(res.data.projects);

            if (res.data.projects.length > 0)
                this.setProjectId(this.state.projectList[0].id);
        })
        .catch(err => console.log(err));
    }

    getAllCountries = () => {
        return Services.Country.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setCountryData(res.data.countries);

            if (res.data.countries.length > 0)
                this.setCountryId(res.data.countries[0].id);
        })
        .catch(err => console.log(err));
    }

    getAllGraphByProject= (projectId) => {
        return Services.Graph.getAllByProject(projectId, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setGraphData(res.data.graphs);
            this.setProjectInfo(res.data.project_info);
        })
        .catch(err => console.log(err));
    }

    getAllProjects = () => {
        return Services.Project.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectList(res.data.projects);
            if (res.data.projects.length > 0)
                this.setProjectId(res.data.projects[0].id);
        })
        .catch(err => console.log(err));
    }

    getAllCountryProjectsInfos = () => {
        for (let i = 1; i <= this.state.projectList.length - 1; i++ ) {
            Services.Graph.getAllByProject(this.state.projectList[i].id, this.abortController.signal)
            .then(res => {
                Modules.Auth.redirectIfSessionExpired(res, this.history);
                this.appendCountryProjectInfoData(res.data.project_info);
            })
            .catch(err => console.log(err));
        }
    }

    createGraph = () => {
        const payload = {
            name: this.state.name,
            type: this.state.type,
            indicators: JSON.stringify([...this.state.indicators]),
            description: this.state.description,
            project_id: this.state.projectId,
        };
    
        return Services.Graph.create(
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    renderGraphItem(graph = this.state.graphData[0]) {
        const labels = graph.indicator.collected_data.map((data) => data.collection_date);
        const data = graph.indicator.collected_data.map(data => data.values);
        // datasets: [{
        //     data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}]
        // }]
        // https://www.chartjs.org/docs/latest/general/data-structures.html
        const graphOptions = {
            parsing: {
                xAxisKey: 'name',
                yAxisKey: 'value',
            },
            title: {
                display: true,
                text: graph.name
            }
        } 
        const graphData = {
            labels,
            datasets:[
               {
                  label: graph.name,
                  data,
                  backgroundColor:[
                   'rgba(255,105,145,0.6)',
                   'rgba(155,100,210,0.6)',
                   'rgba(90,178,255,0.6)',
                   'rgba(240,134,67,0.6)',
                   'rgba(120,120,120,0.6)',
                   'rgba(250,55,197,0.6)'
                ]
               }
            ]
        };

        switch (graph.type) {
            case 'v-bar':
                return <Bar data={graphData} options={graphOptions}/>;
            case 'graph':
                return <Line data={graphData} options={graphOptions}/>;
            case 'donut':
                return <Pie data={graphData} options={graphOptions}/>;
            default:
                return <Bar data={graphData} options={graphOptions}/>;
        }
    }

    resetGraphForm = () => {
        this.setState({
            name:'',
            type:'',
            indicators: [],
            description: '',
        });
    }

    appendCountryProjectInfoData = (projectInfo) => {
        this.setState(state => {
            return {countryProjectInfoData: [...state.countryProjectInfoData, projectInfo]}
        })
    }

    setIsEditingGraph = (bool=true) => {
        this.setState({isEditingGraph: bool})
    }

    setProjectList = projects => {
        const projectList = projects.map(project => {
            return {name: project.name, id: project.id};
        });
        projectList.unshift({
            name: "All projects",
            id: ""
        })

        this.setState({projectList});
    }

    setIndicatorList = indicators => {
        const indicatorList = indicators.map(indicator => {
            return {name: indicator.name, id: indicator.id};
        });

        this.setState({indicatorList});
    }

    setGraphData = graphData => {
        this.setState({graphData});
    }
   
    setProjectInfo = projectInfo => {
        this.setState({projectInfo});
    }

    setCountryData = data => {
        this.setState({countryData: [...data]});
    }

    setCountryId = countryId => {
        this.setState({countryId});
    }

    setGraphModalTitle = (graphModalTitle) => {
        this.setState({graphModalTitle});
    }

    setIsGraphModalHidden = isGraphModalHidden => {
        this.setState({isGraphModalHidden});
    }

    setGraphErrorMessage = graphErrorMessage => {
        this.setState({graphErrorMessage});
    }

    setGraphSuccessMessage =  graphSucessMessage => {
        this.setState({graphSucessMessage});
    }

    setProjectId = projectId => {
        this.setState({projectId});
    }

    setIsGraphFormDisabled = (val=true) => {
        this.setState({isGraphFormDisabled: val})
    }

    setInputValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    render() {
        return(
         <Pages.Dashboard 
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}