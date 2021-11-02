import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class Indicator extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleCreateClick: this.handleCreateClick.bind(this),
            handleEditClick: this.handleEditClick.bind(this),
            handleChange: this.handleChange.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleSelectMultipleChange: this.handleSelectMultipleChange.bind(this),
            handleIndicatorSubmit: this.handleIndicatorSubmit.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleInfoClick: this.handleInfoClick.bind(this),
            handleProjectChange:  this.handleProjectChange.bind(this)
        };
        this.state = {
            indicatorModalTitle: "Add a new indicator",
            projectId: '',
            indicatorTableHead: [
                'id', 
                'name',
                'type',
                'baseline',
                'target',
            ],
            projectList: [],
            indicatorData: [],
            indicatorTableData: [],
            indicatorTableActions: [
                'info',
                'delete'
            ],
            typeData: [
                'number',
                'percentage',
            ],
            directionData: [
                'increasing',
                'decreasing',
            ],
            id: '',
            name: '',
            type: 'number',
            direction: 'increasing',
            baseline: '',
            target:'',
            unit:'',
            description: '',
            indicatorErrorMessage: '',
            indicatorSuccessMessage: '',
            isIndicatorModalHidden: true,
            indicatorFormDisabled: false,
            isEditingIndicator: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getAllProjects()
        .then(() => this.getAllProjectIndicators());
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.projectId === "" ) return;
        if (this.getProjectId() && this.getProjectId() === prevState.projectId) return;
        this.getAllProjectIndicators();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    } 
    
    handleProjectChange(event) {
        event.preventDefault();
        this.setProjectId(event.target.value, this.pushToProject);
    }
    
    handleChange(event) {
        this.setInputValue(event);
    }
    
    handleModalCloseClick(event) {
        if (this.state.indicatorFormDisabled)
            return;
            
        this.resetIndicatorForm();
        this.setIsIndicatorModalHidden(true);
        this.setIndicatorErrorMessage('');
    }
    
    handleIndicatorSubmit(event) {
        event.preventDefault();
        
        if (this.state.indicatorFormDisabled)
        return;
            
        this.setIndicatorErrorMessage('');
        this.setIndicatorFormDisabled(event);
        
        if (this.state.isEditingIndicator) {
            this.updateIndicator()
            .then(res => {
                this.setIndicatorFormDisabled(event, false);
                this.setIsIndicatorModalHidden(true);
                this.updateIndicatorData(res.data.indicator);
                this.resetIndicatorForm();
            })
            .catch(response => {
                this.handleIndicatorError(response);
                this.setIndicatorFormDisabled(event, false);
            });

        }else{
            this.createIndicator()
            .then(res => {
                Modules.Auth.redirectIfSessionExpired(res, this.history);
                this.setIndicatorFormDisabled(event, false);
                this.setIsIndicatorModalHidden(true);
                this.appendIndicatorData(res.data.indicator);
                this.resetIndicatorForm();
            })
            .catch(response => {
                this.handleIndicatorError(response);
                this.setIndicatorFormDisabled(event, false);
            });
        }
        
    }

    handleCreateClick(event) {
        event.preventDefault();

        this.setIndicatorModalTitle("Add a new indicator")
        this.setIsEditingIndicator(false);
        this.setIsIndicatorModalHidden(false);
    }

    
    handleInfoClick(event) {
        event.preventDefault();
        this.history.push(`/indicators/${this.getClickedIndicatorId(event)}`);
    }
    
    
    handleEditClick(event) {
        const dataIndex = event.target.parentElement.getAttribute('data-index');
        const indicator = this.state.indicatorData[dataIndex];
        
        if (!indicator || indicator === undefined) return;
        
        this.setIndicatorModalTitle("Edit indicator");
        this.setIsEditingIndicator();
        this.fillIndicatorForm(indicator);
        this.setIsIndicatorModalHidden(false);
    }
    
    handleDeleteClick(event) {
        event.preventDefault();
                
        this.setIndicatorId(this.getClickedIndicatorId(event));
        this.showIndicatorDeleteAlert(this);
    }
    handleSelectMultipleChange(event) {
        this.setSelectMultupleValue(event);
    }
    
    handleIndicatorError = async (error) => {
        let errorMessages = await error.messages;
        this.setIndicatorErrorMessage(errorMessages ?? "An unexepecd error occurred");
    }

    getAllProjects = () => {
        return Services.Project.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setProjectList(res.data.projects);
            this.setProjectId(res.data.projects[0].id);
        })
        .catch(err => console.log(err));
    }

    getAllProjectIndicators = () => {
        return Services.Project.getAllIndicators(this.getProjectId(), this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIndicatorData(res.data.indicators);
            this.setIndicatorTableData(this.state.indicatorData);
        })
        .catch(err => console.log(err));
    }

    
    createIndicator = () => {
        const payload = {
            name: this.state.name,
            type: this.state.type,
            direction: this.state.direction,
            baseline: this.state.baseline,
            target: this.state.target,
            unit: this.state.unit,
            description: this.state.description,
            project_id: this.getProjectId(),
        };
    
        return Services.Indicator.create(
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    updateIndicator = () => {
        const payload = {
            name: this.state.name,
            type: this.state.type,
            direction: this.state.direction,
            baseline: this.state.baseline,
            target: this.state.target,
            unit: this.state.unit,
            description: this.state.description,
            project_id: this.getProjectId(),
        };

        return Services.Indicator.update(
            this.state.id,
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

    updateIndicatorData = indicator => {
        let indicatorTableIndex;
    
        this.state.indicatorTableData.forEach((item, index) => {
            if (indicator.id === item['id'])
                indicatorTableIndex = index
            });

        
        let indicatorTableDataCopy = [...this.state.indicatorTableData];

        indicatorTableDataCopy[indicatorTableIndex]['id'] = indicator.id;
        indicatorTableDataCopy[indicatorTableIndex]['name'] = indicator.name;
        indicatorTableDataCopy[indicatorTableIndex]['type'] = indicator.type;
        indicatorTableDataCopy[indicatorTableIndex]['baseline'] = indicator.baseline;
        indicatorTableDataCopy[indicatorTableIndex]['target'] = indicator.target;
        
        let indicatorDataCopy = [...this.state.indicatorData];
        
        indicatorDataCopy[indicatorTableIndex]['id'] = indicator.id;
        indicatorDataCopy[indicatorTableIndex]['name'] = indicator.name;
        indicatorDataCopy[indicatorTableIndex]['type'] = indicator.type;
        indicatorDataCopy[indicatorTableIndex]['direction'] = indicator.direction;
        indicatorDataCopy[indicatorTableIndex]['baseline'] = indicator.baseline;
        indicatorDataCopy[indicatorTableIndex]['target'] = indicator.target;
        indicatorDataCopy[indicatorTableIndex]['description'] = indicator.description;
        indicatorDataCopy[indicatorTableIndex]['unit'] = indicator.unit;
        
        this.setState({
            indicatorData: [...indicatorDataCopy],
            indicatorTableData: [...indicatorTableDataCopy]
        })
    }

    deleteIndicator = (self) => {
        return Services.Indicator.destroy(
            self.state.id, 
            self.abortController.signal
            );
    }
    
    appendIndicatorData = indicator => {
        const payload = {
            id: indicator.id,
            name: indicator.name,
            type: indicator.type,
            target: indicator.target,
            baseline: indicator.baseline,
        }
        this.setState((state) => {
            return {
                indicatorTableData: [payload, ...state.indicatorTableData],
                indicatorData: [indicator, ...state.indicatorData]
            }
        });
    }

    fillIndicatorForm =  (indicator) => {
        this.setState({
            id: indicator.id,
            name: indicator.name,
            type: indicator.type,
            direction: indicator.direction,
            baseline: indicator.baseline,
            target: indicator.target,
            unit: indicator.unit,
            description: indicator.description,
            project_id: this.getProjectId(),
        })
    }

    removeIndicatorData = indicator => {
        let indicatorTableIndex;
        
        this.state.indicatorTableData.forEach((item, index) => {
            if (indicator.id === item['id'])
            indicatorTableIndex = index
        });
        
        let indicatorTableDataCopy = [...this.state.indicatorTableData];
        let indicatorDataCopy = [...this.state.indicatorData];
        
        indicatorDataCopy.splice(indicatorTableIndex,1);
        indicatorTableDataCopy.splice(indicatorTableIndex,1);

        this.setState({
            indicatorTableData: [...indicatorTableDataCopy],
            indicatorData: [...indicatorDataCopy],
        })

    }

    showIndicatorDeleteAlert = self => {
        if (!self.$Swal) return

        self.$Swal.fire({
            title: "You're about to delete an indicator",
            text: "Are you sure you want to delete this indicator",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, delete indicator!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteIndicator(self)
                .then(res => {
                    self.removeIndicatorData(res.data.indicator);
                    self.resetIndicatorForm();
                })
                .catch(response => {
                    console.log(response);
                });
            }
            else if (result.dismiss === self.$Swal.DismissReason.cancel) {
                return false;
            }
        })
    }
    
    resetIndicatorForm = () => {
        this.setState({
            name:'',
            type:'number',
            direction:'increasing',
            target: '',
            baseline:'',
            unit: '',
            description: '',
        });
    }

    getProjectId = () => this.state.projectId;
    
    getClickedIndicatorId = (event) => {
        return event.target.parentElement.getAttribute('data-id');
    }
    
    setProjectList = projects => {
        const projectList = projects.map(project => {
            return {name: project.name, id: project.id};
        });

        this.setState({projectList});
    }

    setProjectId = (projectId, callback = () => null) => {
        this.setState({projectId}, callback(this, projectId));
    }

    setIndicatorTableData = data => {
        const indicatorTableData = data.map(item => {
            const {id, name, type, direction, baseline, target, unit, description} = item;
            return {id, name, type, direction, baseline, target, unit, description};
            
        })
        this.setState({indicatorTableData});
    }

    setIndicatorFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({indicatorFormDisabled: val})
    }

    setIndicatorModalTitle = (indicatorModalTitle) => {
        this.setState({indicatorModalTitle})
    }

    setIndicatorErrorMessage =  indicatorErrorMessage => {
        this.setState({indicatorErrorMessage});
    }

    setIsIndicatorModalHidden = isIndicatorModalHidden => {
        this.setState({isIndicatorModalHidden})
    }

    setIndicatorData = data => {
        this.setState({indicatorData: [...data]});
    }

    setIsIndicatorModalHidden = isIndicatorModalHidden => {
        this.setState({isIndicatorModalHidden})
    }

    setIsEditingIndicator = (bool=true) => {
        this.setState({isEditingIndicator: bool})
    }
    
    setStatus = status => {
        this.setState({status})
    }

    setIndicatorId = id => {
        this.setState({id});
    }
    
    setInputValue = event => {
        let inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    }
    
    render() {
        return(
         <Pages.Indicator 
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}