import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class Country extends React.Component {
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
            countryModalTitle: "Add a new country",
            countryTableHead: [
                'id',
                'name',
                'code',
                'created_at'
            ],
            countryData: [],
            countryTableData: [],
            countryTableActions: [
                'edit',
                'delete'
            ],
            id: '',
            name: '',
            code: '',
            countryErrorMessage: '',
            countrySuccessMessage: '',
            isCountryModalHidden: true,
            formDisabled: false,
            isEditingCountry: false,
        };
    }

    componentDidMount() {
        this.getAllCountries()
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    getAllCountries = () => {
        return Services.Country.getAll(this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setCountryData(res.data.countries);
            this.setCountryTableData(this.state.countryData);
        })
        .catch(err => console.log(err));
    }

    createCountry = () => {
        const payload = {
            name: this.state.name,
            code: this.state.code
        }

        return Services.Country.create(
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

    updateCountry = () => {
        const payload = {
            name: this.state.name,
            code: this.state.code
        }

        return Services.Country.update(
            this.state.id,
            JSON.stringify(payload),
            this.abortController.signal
            )
    }

    deleteCountry = (self) => {
        return Services.Country.destroy(
            self.state.id,
            self.abortController.signal
            )
    }

    setCountryData = countryData => {
        this.setState({countryData});
    }

    setCountryTableData = data => {
        const countryTableData = data.map(item => {
            const {id, name, code} = item;
            const created_at = item.created_at ? new Date(item.created_at).toLocaleDateString('en').replace(/\//g, '-') : null;

            return {id, name, code, created_at};
        })

        this.setState({countryTableData});
    }

    setInputValue = event => {
        let inputName = event.target.name;

        this.setState({
            [inputName]: event.target.value
        });
    }

    setCountryModalTitle = (countryModalTitle) => {
        this.setState({countryModalTitle})
    }

    setIsCountryModalHidden = isCountryModalHidden => {
        this.setState({isCountryModalHidden})
    }

    setCountryErrorMessage =  countryErrorMessage => {
        this.setState({countryErrorMessage});
    }

    setCountrySuccessMessage =  countrySucess => {
        this.setState({countrySucess});
    }

    setFormDisabled = (event, val=true) => {
        event.target.disabled = val;
        this.setState({formDisabled: val})
    }

    setIsEditingCountry = (bool=true) => {
        this.setState({isEditingCountry: bool})
    }

    setId = id => {
        this.setState({id});
    }

    resetCountryForm = () => {
        [
            'id',
            'name',
            'code'
        ].forEach(item => this.setState({[item]: ""}));
    }

    fillCountryForm =  (country) => {
        this.setState((state) => {
            return {
                id: country.id,
                name: country.name,
                code: country.code,
            }
        })
    }

    appendCountryData = country => {
        const payload = {
            id: country.id,
            name: country.name,
            code: country.code,
            created_at: new Date(country.created_at).toLocaleDateString('en')
        }
        this.setState((state) => {
            return {
                countryTableData: [payload, ...state.countryTableData],
                countryData: [country, ...state.countryData]
            }
        });
    }

    updateCountryData = country => {
        let countryTableIndex;

        this.state.countryTableData.forEach((item, index) => {
            if (country.id === item['id']) countryTableIndex = index;
        });


        let countryTableDataCopy = [...this.state.countryTableData];

        countryTableDataCopy[countryTableIndex]['id'] = country.id;
        countryTableDataCopy[countryTableIndex]['name'] = country.name;
        countryTableDataCopy[countryTableIndex]['code'] = country.code;

        let countryDataCopy = [...this.state.countryData];

        countryDataCopy[countryTableIndex]['id'] = country.id;
        countryDataCopy[countryTableIndex]['name'] = country.name;
        countryDataCopy[countryTableIndex]['code'] = country.code;

        this.setState({
            countryData: [...countryDataCopy],
            countryTableData: [...countryTableDataCopy]
        })

    }

    removeCountryData = country => {
        let countryTableIndex;

        this.state.countryTableData.forEach((item, index) => {
            if (country.id === item['id']) countryTableIndex = index;
        });

        let countryTableDataCopy = [...this.state.countryTableData];
        let countryDataCopy = [...this.state.countryData];

        countryDataCopy.splice(countryTableIndex,1);
        countryTableDataCopy.splice(countryTableIndex,1);

        this.setState({
            countryTableData: [...countryTableDataCopy],
            countryData: [...countryDataCopy],
        })
    }

    handleCountryError = async (error) => {
        let errorMessages = await error.messages;
        this.setCountryErrorMessage(errorMessages ?? "An unexpected error occured");
    }

    showCountryDeleteAlert = self => {
        if (!self.$Swal) return

        self.$Swal.fire({
            title: "You're about to delete a country",
            text: "Are you sure you want to delete this country",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, Delete country!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteCountry(self)
                .then(res => {
                    self.removeCountryData(res.data.country);
                    self.resetCountryForm();
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

        this.resetCountryForm()
        this.setIsCountryModalHidden(true);
        this.setCountryErrorMessage('');
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleEditClick(event) {
        const dataIndex = event.target.parentElement.getAttribute('data-index');
        const country = this.state.countryData[dataIndex];

        if (!country || country === undefined) return;

        this.setCountryModalTitle("Edit country");
        this.setIsEditingCountry();
        this.fillCountryForm(country);
        this.setIsCountryModalHidden(false);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.formDisabled) return;

        this.setCountryErrorMessage("");
        this.setFormDisabled(event);

        if (this.state.isEditingCountry === true) {
            this.updateCountry()
            .then(res => {
                this.setFormDisabled(event, false);
                this.setIsCountryModalHidden(true);
                this.updateCountryData(res.data.country);
                this.resetCountryForm();
            })
            .catch(response => {
                this.handleCountryError(response);
                this.setFormDisabled(event, false)
            });
        }else {
            this.createCountry()
            .then(res => {
                this.setFormDisabled(event, false);
                this.setIsCountryModalHidden(true);
                this.appendCountryData(res.data.country);
                this.resetCountryForm();
            })
            .catch(response => {
                this.handleCountryError(response);
                this.setFormDisabled(event, false)
            });
        }
    }

    handleDeleteClick(event) {
        const dataDiff = this.state.countryTableData.length - this.state.countryData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        const country = this.state.countryData[dataIndex];

        this.setId(country.id);
        this.showCountryDeleteAlert(this)
    }

    handleCreateClick(event) {
        event.preventDefault();

        this.setCountryModalTitle("Add new country")
        this.setIsEditingCountry(false);
        this.setIsCountryModalHidden(false);
    }

    render() {
        return(
            <Pages.Country 
            {...this.props}
            state={this.state}
            methods={this.methods} />
        )
    }
}