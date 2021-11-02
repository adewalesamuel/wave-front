import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class IndicatorEdit extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleChange: this.handleChange.bind(this),
            handleIndicatorSubmit: this.handleIndicatorSubmit.bind(this),
        };
        this.state = {
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
            type: '',
            direction: '',
            baseline: '',
            target:'',
            unit:'',
            description: '',
            indicator_id: '',
            indicatorErrorMessage: '',
            indicatorSuccessMessage: '',
            indicatorFormDisabled: true,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const indicatorId = this.getParams().id;
        this.setIndicatorId(indicatorId);
        this.getIndicatorById(indicatorId);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    } 

    handleChange(event) {
        this.setInputValue(event);
    }


    handleIndicatorSubmit(event) {
        event.preventDefault();

        if (this.getIndicatorFormDisabled())
            return;

        this.setIndicatorErrorMessage('');
        this.setIndicatorFormDisabled(true);
        
        this.updateIndicator()
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIndicatorFormDisabled(false);
            //Succes message
        })
        .catch(response => {
            this.handleIndicatorError(response);
            this.setIndicatorFormDisabled(false);
        });
    }

    getIndicatorById = (id) => {
        this.setIndicatorFormDisabled(true);
        return Services.Indicator.getById(id, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIndicatorData(res.data.indicator);
            this.setIndicatorFormDisabled(false);
        })
        .catch(err => {
            if (!this._isMounted) return;
            this.setIndicatorFormDisabled(false);
        })
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
            project_id: this.state.project_id,
        };
    
        return Services.Indicator.update(
            this.getIndicatorId(),
            JSON.stringify(payload),
            this.abortController.signal
            );
    }

    handleSelectMultipleChange(event) {
        this.setSelectMultupleValue(event);
    }

    handleIndicatorError = async (error) => {
        let errorMessages = await error.messages;
        this.setIndicatorErrorMessage(errorMessages ?? "An unxepected error occurred");
    }

    getIndicatorId = () => this.state.id;

    getIndicatorFormDisabled = () => this.state.indicatorFormDisabled;

    getParams = () => this.props.match.params;

    setIndicatorId = id => {
        this.setState({id});
    }

    setIndicatorFormDisabled = indicatorFormDisabled => {
        this.setState({indicatorFormDisabled});
    }

    setIndicatorErrorMessage =  indicatorErrorMessage => {
        this.setState({indicatorErrorMessage});
    }

    setIndicatorData = indicator => {
        this.setState({
            name: indicator.name,
            type: indicator.type,
            direction: indicator.direction,
            baseline: indicator.baseline,
            target: indicator.target,
            unit: indicator.unit,
            description: indicator.description,
            project_id: indicator.project_id,
        });
    }
    
    setInputValue = event => {
        let inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    }
    
    setSelectMultupleValue = event => {
        if (event.target.value === "") return; 

        this.setState( state => {
            let prevState = [...state[event.target.name]]

            if (prevState.includes(event.target.value)) {
                prevState.splice(prevState.indexOf(event.target.value),1)
                return {
                    [event.target.name]: [...prevState]
                };
            }
            return {
                [event.target.name]: [...state[event.target.name], event.target.value]
            };
        });
    }
    
    
    render() {
        return(
         <Pages.IndicatorDetails.IndicatorEdit
         {...this.props}
         methods={this.methods}
         state={this.state} 
         />
        )
    }
}