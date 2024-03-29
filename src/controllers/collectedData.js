import React from "react";
import { Modules } from "../modules";
import { Pages } from "../pages";
import { Services } from "../services";

export class CollectedData extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();
        this.$ = window.$;
        this.$Swal = window.Swal;
        this.history = this.props.history;
        this.collectedDataFile = null;

        this.methods = {
            handleEditClick: this.handleEditClick.bind(this),
            handleAddDisaggregationValuesClick: this.handleAddDisaggregationValuesClick.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleModalCloseClick: this.handleModalCloseClick.bind(this),
            handleChange: this.handleChange.bind(this), 
            handleCreateClick: this.handleCreateClick.bind(this),
            handleSubmit: this.handleSubmit.bind(this),
            handleFileUpload: this.handleFileUpload.bind(this),
            handleDeleteFileClick: this.handleDeleteFileClick.bind(this)
        };
        this.state = {
            indicatorId: this.props.match.params.id,
            indicatorDisaggregationId: '',
            collectedDataModalTitle: "Add new collected data",
            collectedDataTableHead: [
                'id', 
                'values',
                'collection_date', 
                'files_urls',
            ],
            collectedData: [],
            indicatorDisaggregationData: [],
            collectedDataTableData: [],
            collectedDataTableActions: [
                'edit',
                'delete'
            ],
            values: '',
            notes: '',
            collection_date: '',
            budget: '',
            amount_spent: '',
            file_name: '',
            collected_data_file: null,
            file_url: '',
            files_urls: '',
            disaggregation_values: [],
            collectedDataErrorMessage: '',
            collectedDataSuccessMessage: '',
            isCollectedDataModalHidden: true,
            isRoleModalHidden: true,
            isCollectedDataFormDisabled: false,
            isEditingCollectedData: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.collectedDataFile = window.document.getElementById('collected_data_file');
        this.collectedDataFile.addEventListener('change', event => this.handleFileChange(this, event));
        this.getAllIndicatorCollectedData()
        .then(() => this.getAllIndicatorDisaggregations()); 
        this.setDefaultCollectionDate();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
        this.collectedDataFile.removeEventListener('change', event => this.handleFileChange(this, event));
        this.collectedDataFile = null;
    } 

    handleModalCloseClick() {
        if (this.state.isCollectedDataFormDisabled) return; 

        this.resetCollectedDataForm()
        this.setIsCollectedDataModalHidden(true);
        this.setCollectedDataErrorMessage('');
    }

    handleChange(event) {
        this.setInputValue(event);
    }

    handleSelectMultipleChange(event) {
        this.setSelectMultupleValue(event);
    }

    handleEditClick(event) {
        const dataIndex = event.target.parentElement.getAttribute('data-index');
        const collectedData = this.state.collectedData[dataIndex];
        
        if (!collectedData || collectedData === undefined) return;

        this.setCollectedDataModalTitle("Edit collectedData");
        this.setIsEditingCollectedData();
        this.fillCollectedDataForm(collectedData);
        this.setIsCollectedDataModalHidden(false);
    }

    handleAddDisaggregationValuesClick(event) {
        event.preventDefault();
        
        if (this.state.indicatorDisaggregationId ===  "") return;

        let disaggregation_values = this.getDisaggregationValues();

        const disaggregation = this.state.indicatorDisaggregationData
        .find(indicatorDisaggregation => indicatorDisaggregation.id === parseInt(this.state.indicatorDisaggregationId)).disaggregation;
        const disaggregationValue = {
            type: disaggregation.type,
            fields: JSON.parse(disaggregation.fields).map(field => {
                return {name: field, value: ""}
            })
        };

        disaggregation_values.push(disaggregationValue);
        this.setState({disaggregation_values});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.isCollectedDataFormDisabled) return;

        this.setCollectedDataErrorMessage("");
        this.setIsCollectedDataFormDisabled();

        if (this.state.isEditingCollectedData === true) {
            this.updateCollectedData()
            .then(res => {
                this.setIsCollectedDataFormDisabled(false);
                this.setIsCollectedDataModalHidden(true);
                this.updateCollectedDataData(res.data.collected_data);
                this.resetCollectedDataForm();
            })
            .catch(response => {
                this.handleCollectedDataError(response);
                this.setIsCollectedDataFormDisabled(false);
            });
        }else {
            this.createCollectedData()
            .then(res => {
                this.setIsCollectedDataFormDisabled(false);
                this.setIsCollectedDataModalHidden(true);
                this.appendCollectedData(res.data.collected_data);
                this.resetCollectedDataForm();
            })
            .catch(response => {
                this.handleCollectedDataError(response);
                this.setIsCollectedDataFormDisabled(false);
            });
        }
    }

    handleFileChange(self, event) {
        const file = event.target.files[0];

        self.setState({
            file_name: file.name,
            collected_data_file: file
        });
    }

    handleFileUpload(event) {
        event.preventDefault();

        if (this.state.isCollectedDataFormDisabled) return;

        this.setCollectedDataErrorMessage("");

        const formData = new FormData();

        formData.append('file', this.state.collected_data_file);
        formData.append('file_name', this.state.file_name);

        this.setIsCollectedDataFormDisabled();
        Services.File.store(formData, this.abortController.signal)
        .then(response => {
            const files_urls = this.state.files_urls ? 
            JSON.parse(this.state.files_urls) : [];

            files_urls.unshift(response.file_url);

            this.setFilesUrls(JSON.stringify(files_urls));
            this.setIsCollectedDataFormDisabled(false);
            this.setState({file_name: '', collected_data_file: ''});
        }).catch(response => {
            this.handleCollectedDataError(response);
            this.setIsCollectedDataFormDisabled(false);
        });
    }

    handleDeleteFileClick(event, file_url) {
        event.preventDefault(); 
        this.removeFile(file_url);
    }

    handleDeleteClick(event) {
        const dataDiff = this.state.collectedDataTableData.length - this.state.collectedData.length;
        const dataIndex = event.target.parentElement.getAttribute('data-index') - dataDiff;
        const collectedData = this.state.collectedData[dataIndex];

        this.setId(collectedData.id);
        this.showCollectedDataDeleteAlert(this)
    }
    
    handleCreateClick(event) {
        event.preventDefault();

        this.setCollectedDataModalTitle("Add new collected data")
        this.setIsEditingCollectedData(false);
        this.setIsCollectedDataModalHidden(false);
    }

    getAllIndicatorCollectedData = () => {
        return Services.Indicator.getAllCollectedData(this.state.indicatorId, this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history)
            this.setCollectedData(res.data.indicator_collected_data);
            this.setCollectedDataTableData(this.state.collectedData);
        })
        .catch(err => console.log(err));
    }

    getAllIndicatorDisaggregations = () => {
        return Services.Indicator.getAllDisaggregations(this.state.indicatorId ,this.abortController.signal)
        .then(res => {
            Modules.Auth.redirectIfSessionExpired(res, this.history);
            this.setIndicatorDisaggregationData(res.data.indicator_disaggregations);
        })
        .catch(err => {
            console.log(err)
        });
    }

    createCollectedData = () => {
        let disaggregation_values = this.getDisaggregationValues();

        this.setState({disaggregation_values});

        let formData = new FormData();

        const {values, collection_date, budget, amount_spent, file_name, files_urls, 
            notes, indicatorId} = this.state;

        formData.append("values", values);
        formData.append("collection_date", collection_date);
        formData.append("budget", budget);
        formData.append("amount_spent", amount_spent);
        formData.append("file_name", file_name);
        formData.append("files_urls", files_urls);
        formData.append("disaggregation_values", JSON.stringify(disaggregation_values));
        formData.append("notes", notes);
        formData.append("indicator_id", indicatorId);
        
        return Services.CollectedData.create(
            formData,
            this.abortController.signal
            );
    }

    updateCollectedData = () => {
        let disaggregation_values = this.getDisaggregationValues();

        this.setState({disaggregation_values});

        let formData = new FormData();

        const {values, collection_date, budget, amount_spent, file_name, files_urls, 
            notes, indicatorId} = this.state;

        formData.append("values", values);
        formData.append("collection_date", collection_date);
        formData.append("budget", budget);
        formData.append("amount_spent", amount_spent);
        formData.append("file_name", file_name);
        formData.append("files_urls", files_urls);
        formData.append("disaggregation_values", JSON.stringify(disaggregation_values));
        formData.append("notes", notes);
        formData.append("indicator_id", indicatorId);
        
        return Services.CollectedData.update(
            this.state.id,
            formData,
            this.abortController.signal
            );
    }

    createRole = () => {
        const payload = {
            name: this.state.roleName,
            permissions: JSON.stringify(this.state.rolePermissions),
        }
        
        return Services.Role.create(
            JSON.stringify(payload),
            this.abortController.signal
            )
    }
    
    deleteCollectedData = (self) => {
        return Services.CollectedData.destroy(
            self.state.id, 
            self.abortController.signal
            )
    }

    showCollectedDataDeleteAlert = self => {
        if (!self.$Swal) return

        self.$Swal.fire({
            title: "You're about to delete a collected data",
            text: "Are you sure you want to delete this collected data",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Yes, Delete collected data!',
            confirmButtonClass: 'btn btn-warning',
            cancelButtonClass: 'btn btn-danger ml-1',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                self.deleteCollectedData(self)
                .then(res => {
                    self.removeCollectedData(res.data.collected_data);
                    self.resetCollectedDataForm();
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

    fillCollectedDataForm =  (collectedData) => {
        this.setState((state) => {
            return {
                id: collectedData.id, 
                values: collectedData.values ?? "", 
                notes: collectedData.notes ?? "", 
                collection_date: collectedData.collection_date ?? "", 
                budget: collectedData.budget ?? "", 
                amount_spent: collectedData.amount_spent ?? "", 
                files_urls: collectedData.files_urls ?? "", 
                disaggregation_values: JSON.parse(collectedData.disaggregation_values), 
            }
        })
    }

    appendCollectedData = collected_data => {
        const payload = {
            id: collected_data.id,
            values: collected_data.values,
            collection_date: new Date(collected_data.collection_date).toLocaleDateString('en').replace(/\//g, '-'),
            file_name: collected_data.file_name,
            files_urls: collected_data.files_urls
        }
        this.setState((state) => {
            return {
                collectedDataTableData: [payload, ...state.collectedDataTableData],
                collectedData: [collected_data, ...state.collectedData]
            }
        });
    }

    updateCollectedDataData = collectedData => {
        let collectedDataTableIndex;

        this.state.collectedDataTableData.forEach((item, index) => {
            if (collectedData.id === item['id']) collectedDataTableIndex = index;
        });


        let collectedDataTableDataCopy = [...this.state.collectedDataTableData];

        collectedDataTableDataCopy[collectedDataTableIndex]['id'] = collectedData.id;
        collectedDataTableDataCopy[collectedDataTableIndex]['values'] = collectedData.values;
        collectedDataTableDataCopy[collectedDataTableIndex]['collection_date'] = collectedData.collection_date;
        collectedDataTableDataCopy[collectedDataTableIndex]['file_name'] = collectedData.file_name;
        collectedDataTableDataCopy[collectedDataTableIndex]['files_urls'] = collectedData.files_urls;

        let collectedDataCopy = [...this.state.collectedData];

        collectedDataCopy[collectedDataTableIndex]['id'] = collectedData.id;
        collectedDataCopy[collectedDataTableIndex]['values'] = collectedData.values;
        collectedDataCopy[collectedDataTableIndex]['notes'] = collectedData.notes;
        collectedDataCopy[collectedDataTableIndex]['budget'] = collectedData.budget;
        collectedDataCopy[collectedDataTableIndex]['amount_spent'] = collectedData.amount_spent;
        collectedDataCopy[collectedDataTableIndex]['files_urls'] = collectedData.files_urls;
        collectedDataCopy[collectedDataTableIndex]['disaggregation_values'] = collectedData.disaggregation_values;
        collectedDataCopy[collectedDataTableIndex]['collection_date'] = collectedData.collection_date;
        collectedDataCopy[collectedDataTableIndex]['file_name'] = collectedData.file_name;

        this.setState({
            collectedData: [...collectedDataCopy],
            collectedDataTableData: [...collectedDataTableDataCopy]
        })

    }

    removeCollectedData = collectedData => {
        let collectedDataTableIndex;

        this.state.collectedDataTableData.forEach((item, index) => {
            if (collectedData.id === item['id'])
                collectedDataTableIndex = index
        });

        let collectedDataTableDataCopy = [...this.state.collectedDataTableData];
        let collectedDataCopy = [...this.state.collectedData];

        collectedDataCopy.splice(collectedDataTableIndex,1);
        collectedDataTableDataCopy.splice(collectedDataTableIndex,1);

        this.setState({
            collectedDataTableData: [...collectedDataTableDataCopy],
            collectedData: [...collectedDataCopy],
        })
    }

    removeFile = (file_url) => {
        let fileUrls = JSON.parse(this.state.files_urls);
        fileUrls = fileUrls.filter(fileUrl => fileUrl !== file_url);

        this.setState({files_urls: JSON.stringify(fileUrls)});
    }

    handleCollectedDataError = async (error) => {
        let errorMessages = await error.messages;
        this.setCollectedDataErrorMessage(errorMessages ?? "An unexpected error occured");
    }

    getDisaggregationValues = () => {
        return Array.from(window.document.getElementById('disaggregation_values')
        .getElementsByClassName('disaggregations'))
        .map(disaggregation => {
            return {
                type: disaggregation.getAttribute('data-type'),
                fields: Array.from(disaggregation.getElementsByTagName('input'))
                .map(field => {
                    return {
                        name: field.name ?? "",
                        value: field.value ?? ""
                    };
                })
            };
        });
    }
    
    resetCollectedDataForm = () => {
        this.setState({
            id:'',
            values: '',
            notes: '',
            file_name: '',
            budget: '', 
            amount_spent: '', 
            collected_data_file: null,
            files_urls: '',
            disaggregation_values: [],
            indicatorDisaggregationId: ''
        });
        this.setDefaultCollectionDate()
    }

    setFilesUrls = (files_urls) => {
        this.setState({files_urls});
    }

    setCollectedData = collectedData => {
        this.setState({collectedData});
    }

    setRoleData = roleData => {
        this.setState({roleData});
    }

    setPermissionData = permissionData => {
        this.setState({permissionData});
    }
    
    setRole = role => {
        this.setState({role})
    }

    setCollectedDataTableData = data => {
        const collectedDataTableData = data.map(item => {
            const {id, values, collection_date, file_name, files_urls} = item;

            return {id, values, 
                collection_date: new Date(collection_date)
                .toLocaleDateString('en').replace(/\//g, '-'), 
                file_name, files_urls};
        })

        this.setState({collectedDataTableData});
    }

    setInputValue = event => {
        let inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    }

    setDefaultCollectionDate = () => {
        if (!this._isMounted) return;
        const date = new Date();
        const dateString = date.toLocaleDateString().replace(/\//g, '-')
        .split('-').reverse().join('-');

        this.setState({
            collection_date: dateString,
        });
    }

    setCollectedDataModalTitle = (collectedDataModalTitle) => {
        this.setState({collectedDataModalTitle})
    }

    setIsCollectedDataModalHidden = isCollectedDataModalHidden => {
        this.setState({isCollectedDataModalHidden})
    }

    setIsRoleModalHidden = isRoleModalHidden => {
        this.setState({isRoleModalHidden})
    }

    setCollectedDataErrorMessage =  collectedDataErrorMessage => {
        this.setState({collectedDataErrorMessage});
    }

    setRoleErrorMessage =  roleErrorMessage => {
        this.setState({roleErrorMessage});
    }

    setCollectedDataSuccessMessage =  collectedDataSucess => {
        this.setState({collectedDataSucess});
    }

    setIsCollectedDataFormDisabled = (val=true) => {
        this.setState({isCollectedDataFormDisabled: val})
    }

    setIndicatorDisaggregationData = data => {
        this.setState({indicatorDisaggregationData: [...data]});
    }

    setIsEditingCollectedData = (bool=true) => {
        this.setState({isEditingCollectedData: bool})
    }

    setId = id => {
        this.setState({id});
    }


    render() {
        return(
            <Pages.CollectedData 
            {...this.props}
            state={this.state}
            methods={this.methods} />
        )
    }
}