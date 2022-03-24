import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class Outcome extends React.Component {
    constructor(props) {
        super(props);

        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;

        this.methods = {
            handleEditClick: this.handleEditClick.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleChange: this.handleChange.bind(this),
            handleCreateClick: this.handleCreateClick.bind(this),
            handleSubmit: this.handleSubmit.bind(this),
        };
        this.state = {
            outcomeModalTitle: "Add a new outcome",
            outcomeTableHead: [
                'id',
                'name',
                'created_at'
            ],
            outcomeData: [],
            outcomeTableData: [],
            outcomeTableActions: [
                'edit',
                'delete'
            ],
            id: '',
            name: '',
            description: '',
            outcomeErrorMessage: '',
            outcomeSuccessMessage: '',
            isOutcomeModalHidden: true,
            formDisabled: false,
            isEditingOutcome: false,
        };
    }

    componentDidMount() {
        this.getAllOutcomes()
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    getAllOutcomes = () => {
        return Services.Outcome.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setOutcomeData(res.data.outcomes);
            this.setOutcomeTableData(this.state.outcomeData);
        })
        .catch(err => console.log(err));
    }

    createOutcome = () => {
        const payload = {
            name: this.state.name,
            description: this.state.description
        }

        return Services.Outcome.create(
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

    updateOutcome = () => {
        const payload = {
            name: this.state.name,
            description: this.state.description
        }

        return Services.Outcome.update(
            this.state.id,
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

    deleteOutcome = (self) => {
        return Services.Outcome.destroy(
            self.state.id,
            self.abortController.signal
            )
    }

    setOutcomeData = outcomeData => {
        this.setState({outcomeData});
    }

    setOutcomeTableData = data => {
        const outcomeTableData = data.map(item => {
            const {id, name, code} = item;
            const created_at = item.created_at ? new Date(item.created_at).toLocaleDateString('en').replace(/\//g, '-') : null;

            return {id, name, code, created_at};
        })

        this.setState({outcomeTableData});
    }

    setInputValue = event => {
        let inputName = event.target.name;

        this.setState({
            [inputName]: event.target.value
        });
    }

    setOutcomeModalTitle = (outcomeModalTitle) => {
        this.setState({outcomeModalTitle})
    }

    setIsOutcomeModalHidden = isOutcomeModalHidden => {
        this.setState({isOutcomeModalHidden})
    }

    setOutcomeErrorMessage =  outcomeErrorMessage => {
        this.setState({outcomeErrorMessage});
    }

    setOutcomeSuccessMessage =  outcomeSucess => {
        this.setState({outcomeSucess});
    }

    setFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({formDisabled: val})
    }

    setIsEditingOutcome = (bool=true) => {
        this.setState({isEditingOutcome: bool})
    }

    setId = id => {
        this.setState({id});
    }

    resetOutcomeForm = () => {
        [
            'id',
            'name',
            'description'
        ].forEach(item => this.setState({[item]: ""}));
    }

    fillOutcomeForm =  (outcome) => {
        this.setState((state) => {
            return {
                id: outcome.id,
                name: outcome.name,
                description: outcome.description,
            }
        })
    }

    appendOutcomeData = outcome => {
        const payload = {
            id: outcome.id,
            name: outcome.name,
            description: outcome.description,
            created_at: new Date(outcome.created_at).toLocaleDateString('en')
        }
        this.setState((state) => {
            return {
                outcomeTableData: [payload, ...state.outcomeTableData],
                outcomeData: [outcome, ...state.outcomeData]
            }
        });
    }

    updateOutcomeData = outcome => {
        let outcomeTableIndex;

        this.state.outcomeTableData.forEach((item, index) => {
            if (outcome.id === item['id']) outcomeTableIndex = index;
        });


        let outcomeTableDataCopy = [...this.state.outcomeTableData];

        outcomeTableDataCopy[outcomeTableIndex]['id'] = outcome.id;
        outcomeTableDataCopy[outcomeTableIndex]['name'] = outcome.name;
        outcomeTableDataCopy[outcomeTableIndex]['description'] = outcome.description;

        let outcomeDataCopy = [...this.state.outcomeData];

        outcomeDataCopy[outcomeTableIndex]['id'] = outcome.id;
        outcomeDataCopy[outcomeTableIndex]['name'] = outcome.name;
        outcomeDataCopy[outcomeTableIndex]['description'] = outcome.description;

        this.setState({
            outcomeData: [...outcomeDataCopy],
            outcomeTableData: [...outcomeTableDataCopy]
        })

    }

    removeOutcomeData = outcome => {
        let outcomeTableIndex;

        this.state.outcomeTableData.forEach((item, index) => {
            if (outcome.id === item['id']) outcomeTableIndex = index;
        });

        let outcomeTableDataCopy = [...this.state.outcomeTableData];
        let outcomeDataCopy = [...this.state.outcomeData];

        outcomeDataCopy.splice(outcomeTableIndex,1);
        outcomeTableDataCopy.splice(outcomeTableIndex,1);

        this.setState({
            outcomeTableData: [...outcomeTableDataCopy],
            outcomeData: [...outcomeDataCopy],
        })
    }

    handleOutcomeError = async (error) => {
        let errorMessages = await error.messages;
        this.setOutcomeErrorMessage(errorMessages ?? "An unexpected error occured");
    }

    showOutcomeDeleteAlert = self => {
        if (!self.$Swal) return

        self.$Swal.fire({
            title: "You're about to delete an outcome",
            text: "Are you sure you want to delete this outcome",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, Delete outcome!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteOutcome(self)
                .then(res => {
                    self.removeOutcomeData(res.data.outcome);
                    self.resetOutcomeForm();
                })
                .catch(response => {
                    console.log(response)
                });
            }
            else if (result.dismiss === self.$Swal.DismissReason.cancel) {
                return false;
            }
        })
    }

    handleModalCloseClick() {
        if (this.state.formDisabled) return;

        this.resetOutcomeForm()
        this.setIsOutcomeModalHidden(true);
        this.setOutcomeErrorMessage('');
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleEditClick(event) {
        const dataIndex = event.target.parentElement.getAttribute('data-index');
        const outcome = this.state.outcomeData[dataIndex];

        if (!outcome || outcome === undefined) return;

        this.setOutcomeModalTitle("Edit outcome");
        this.setIsEditingOutcome();
        this.fillOutcomeForm(outcome);
        this.setIsOutcomeModalHidden(false);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.formDisabled) return;

        this.setOutcomeErrorMessage("");
        this.setFormDisabled(event);

        if (this.state.isEditingOutcome === true) {
            this.updateOutcome()
            .then(res => {
                this.setFormDisabled(event, false);
                this.setIsOutcomeModalHidden(true);
                this.updateOutcomeData(res.data.outcome);
                this.resetOutcomeForm();
            })
            .catch(response => {
                this.handleOutcomeError(response);
                this.setFormDisabled(event, false)
            });
        }else {
            this.createOutcome()
            .then(res => {
                this.setFormDisabled(event, false);
                this.setIsOutcomeModalHidden(true);
                this.appendOutcomeData(res.data.outcome);
                this.resetOutcomeForm();
            })
            .catch(response => {
                this.handleOutcomeError(response);
                this.setFormDisabled(event, false)
            });
        }
    }

    handleDeleteClick(event) {
        const dataDiff = this.state.outcomeTableData.length - this.state.outcomeData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        const outcome = this.state.outcomeData[dataIndex];

        this.setId(outcome.id);
        this.showOutcomeDeleteAlert(this)
    }

    handleCreateClick(event) {
        event.preventDefault();

        this.setOutcomeModalTitle("Add new outcome")
        this.setIsEditingOutcome(false);
        this.setIsOutcomeModalHidden(false);
    }

    render() {
        return(
            <Pages.Outcome 
            {...this.props}
            state={this.state}
            methods={this.methods} />
        )
    }
}