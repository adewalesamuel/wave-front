import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class IndicatorDisaggregation extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleIndicatorDisaggregationSubmit: this.handleIndicatorDisaggregationSubmit.bind(this),
            handleCreateClick: this.handleCreateClick.bind(this),
            handleChange: this.handleChange.bind(this),
            handleAddFieldClick: this.handleAddFieldClick.bind(this),
            handleFieldChange: this.handleFieldChange.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleDisaggregationSubmit: this.handleDisaggregationSubmit.bind(this),            
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleDisaggregationChange:  this.handleDisaggregationChange.bind(this)
        };
        this.state = {
            disaggregationId: '',
            indicatorId: this.props.match.params.id,
            indicatorDisaggregationTableHead: [
                'id', 
                'type',
                'fields'
            ],
            disaggregationList: [],
            indicatorDisaggregationData: [],
            indicatorDisaggregationTableData: [],
            indicatorDisaggregationTableActions: [
                'delete'
            ],
            availabilityData: [
                'organisation',
                'project',
                'indicator',
            ],
            id: '',
            type: '',
            availability: 'organisation',
            fields: [''],
            disaggregationErrorMessage: '',
            disaggregationSuccessMessage: '',
            isDisaggregationFormDisabled: false
            ,
            isDisaggregationModalHidden: true,
            indicatorDisaggregationErrorMessage: '',
            indicatorDisaggregationSuccessMessage: '',
            isIndicatorDisaggregationFormDisabled: true,
            isEditingDisaggregation: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
        this.getAllIndicatorDisaggregations()
        .then(() => this.getAllDisaggregations());
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    } 
    
    handleDisaggregationChange(event) {
        event.preventDefault();
        this.setDisaggregationId(event.target.value);
    }
    
    handleChange(event) {
        this.setInputValue(event);
    }

    handleDeleteClick(event) {
        event.preventDefault();
        
        const indicator_disaggregation = this.getClickedIndicatorDisaggregation(event);
        this.setIndicatorDisaggregationId(indicator_disaggregation.id);
        this.showIndicatorDisaggregationDeleteAlert(this);
    }
    
    handleModalCloseClick(event) {
        if (this.state.isDisaggregationFormDisabled) return;
            
        this.resetDisaggregationForm();
        this.setIsDisaggregationModalHidden(true);
        this.setDisaggregationErrorMessage('');
    }
    
    handleDisaggregationSubmit(event) {
        event.preventDefault();
        
        if (this.state.isDisaggregationFormDisabled) return;
            
        this.setDisaggregationErrorMessage('');
        this.setIsDisaggregationFormDisabled(event);

        this.createDisaggregation()
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIsDisaggregationFormDisabled(event, false);
            this.setIsDisaggregationModalHidden(true);
            this.appendDisaggregationList(res.data.disaggregation);
            this.resetDisaggregationForm();
        })
        .catch(response => {
            this.handleDisaggregationError(response);
            this.setIsDisaggregationFormDisabled(event, false);
        });
        
    }
    
    handleIndicatorDisaggregationSubmit(event) {
        event.preventDefault();
            
        this.setIndicatorDisaggregationErrorMessage('');
        this.setIsIndicatorDisaggregationFormDisabled(event);

        this.createIndicatorDisaggregation()
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIsIndicatorDisaggregationFormDisabled(false);
            this.appendIndicatorDisaggregationData(res.data.indicator_disaggregation);
        })
        .catch(response => {
            this.handleIndicatorDisaggregationError(response);
            this.setIsIndicatorDisaggregationFormDisabled(false);
        });
        
    }

    handleCreateClick(event) {
        event.preventDefault();
        this.setIsDisaggregationModalHidden(false);
    }

    handleAddFieldClick(event) {
        event.preventDefault();

        let fields = this.getFields();
        
        fields.push("");
        
        this.setFields(fields);
    }

    handleFieldChange(event) {
        event.preventDefault();
    }
    
    handleDisaggregationError = async (error) => {
        let errorMessages = await error.messages;
        this.setDisaggregationErrorMessage(errorMessages ?? "An unexpected error occurred");
    }
    
   
    handleIndicatorDisaggregationError = async (error) => {
        let errorMessages = await error.messages;
        this.setIndicatorDisaggregationErrorMessage(errorMessages ?? "An unexpected error occurred");
    }

    getAllDisaggregations = () => {
        return Services.Disaggregation.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setDisaggregationList(res.data.disaggregations);
            this.setIsIndicatorDisaggregationFormDisabled(false);
        })
        .catch(err => {
            this.setIsIndicatorDisaggregationFormDisabled(false);
        });
    }
    
    getAllIndicatorDisaggregations = () => {
        return Services.Indicator.getAllDisaggregations(this.state.indicatorId ,this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIndicatorDisaggregationData(res.data.indicator_disaggregations);
            this.setIndicatorDisaggregationTableData(this.state.indicatorDisaggregationData);
        })
        .catch(err => {
            console.log(err)
        });
    }
    
    createDisaggregation = () => {
        let fields = this.getFields();
        this.setFields(fields);

        const payload = {
            type: this.state.type,
            availability: this.state.availability,
            fields: JSON.stringify(fields),
            indicator_id: this.state.indicatorId
        };

        return Services.Disaggregation.create(
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    createIndicatorDisaggregation = () => {
        const payload = {
            indicator_id: this.state.indicatorId,
            disaggregation_id: this.state.disaggregationId,
        };
    
        return Services.IndicatorDisaggregation.create(
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

        deleteIndicatorDisaggregation = (self) => {
        return Services.IndicatorDisaggregation.destroy(
            self.state.id, 
            self.abortController.signal
            )
    }
    
    appendDisaggregationList = disaggregation => {
        const payload = {
            id: disaggregation.id,
            type: disaggregation.type,
            fields: disaggregation.fields,
        }
        this.setState((state) => {
            return {
                disaggregationList: [payload, ...state.disaggregationList],
            }
        });
    }

    appendIndicatorDisaggregationData = indicator_disaggregation => {
        const payload = {
            id: indicator_disaggregation.id,
            type: indicator_disaggregation.disaggregation.type,
            fields: indicator_disaggregation.disaggregation.fields,
        }

        this.setState((prevState) => {
            return {
                indicatorDisaggregationTableData: [payload, ...prevState.indicatorDisaggregationTableData],
                indicatorDisaggregationData: [indicator_disaggregation, ...prevState.indicatorDisaggregationData]
            }
        });
    }

    removeIndicatorDisaggregationData = indicator_disaggregation => {
            let indicatorDisaggregationTableIndex;

            this.state.indicatorDisaggregationTableData.forEach((item, index) => {
                if (indicator_disaggregation.id === item['id'])
                    indicatorDisaggregationTableIndex = index
            });

            let indicatorDisaggregationTableDataCopy = [...this.state.indicatorDisaggregationTableData];
            let indicatorDisaggregationDataCopy = [...this.state.indicatorDisaggregationData];

            indicatorDisaggregationDataCopy.splice(indicatorDisaggregationTableIndex,1);
            indicatorDisaggregationTableDataCopy.splice(indicatorDisaggregationTableIndex,1);

            this.setState({
                indicatorDisaggregationTableData: [...indicatorDisaggregationTableDataCopy],
                indicatorDisaggregationData: [...indicatorDisaggregationDataCopy],
            });
        }

    showIndicatorDisaggregationDeleteAlert = self => {
        if (!self.$Swal) return

        self.$Swal.fire({
            title: "You're about to delete this disaggregation",
            text: "Are you sure you want to delete this disaggregation",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, delete disaggregation!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteIndicatorDisaggregation(self)
                .then(res => {
                    Modules.Auth.redirectIfSessionExpired(res, self.history);
                    self.removeIndicatorDisaggregationData(res.data.indicator_disaggregation);
                })
                .catch(response => {
                    console.log(response);
                });
            }
            else if (result.dismiss === self.$Swal.DismissReason.cancel) {
                return false;
            }
        });
    }
    
    resetDisaggregationForm = () => {
        this.setState({
            type: "",
            availability: 'organisation',
            fields: [""],
        });
    }
    
    getClickedIndicatorDisaggregation = (event) => {
        const dataDiff = this.state.indicatorDisaggregationTableData.length - this.state.indicatorDisaggregationData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        
        return this.state.indicatorDisaggregationData[dataIndex];
    }

    getFields = () => {
        return Array.from(window.document.getElementById('fields')
        .getElementsByTagName('input'))
        .map(input => input.value);
    }
    
    setFields = fields => {
        this.setState({fields: [...fields]});
    }

    setIsDisaggregationFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({isDisaggregationFormDisabled: val});
    }
   
    setIsIndicatorDisaggregationFormDisabled = (val=true) => {
        if (!this._isMounted) return;
        this.setState({isIndicatorDisaggregationFormDisabled: val});
    }

    setIndicatorDisaggregationId = (id) => {
        this.setState({id});
    }

    setDisaggregationErrorMessage =  disaggregationErrorMessage => {
        this.setState({disaggregationErrorMessage});
    }
  
    setIndicatorDisaggregationErrorMessage =  indicatorDisaggregationErrorMessage => {
        this.setState({indicatorDisaggregationErrorMessage});
    }

    setIsDisaggregationModalHidden = isDisaggregationModalHidden => {
        this.setState({isDisaggregationModalHidden});
    }

    setIndicatorDisaggregationData = data => {
        this.setState({indicatorDisaggregationData: [...data]});
    }

    setIndicatorDisaggregationTableData = data => {
        const indicatorDisaggregationTableData = [];
        data.forEach(item => {
            if (!item.disaggregation) return;
            indicatorDisaggregationTableData.push({
                id: item.id ?? "",
                type: item.disaggregation.type,
                fields: item.disaggregation.fields
            });
        })

        this.setState({indicatorDisaggregationTableData});
    }
    
    setDisaggregationList = data => {
        this.setState({disaggregationList: [...data]});
    }

    setDisaggregationId = disaggregationId => {
        this.setState({disaggregationId});
    }
    
    setInputValue = event => {
        let inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    }
    
    render() {
        return(
         <Pages.IndicatorDetails.IndicatorDisaggregation 
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}