export function Table(props) {
    
    function renderTableHead() {
        if (!props.tableHead)
            return null;

        let tableHead = [...props.tableHead];

        if (props.tableActions)
            tableHead.push('actions');

        return tableHead.map((item,index) => {
            return(
                <th key={index * Math.random()}>
                    {item}
                </th>
            )
        })
    }

    function renderTableData(data, dataIndex=0) {
        let tableCells = [];

        for (const key in data)  {
            if (props.tableHead.includes(key))
                tableCells.push(<td key={Math.random()}>{data[key]}</td>);
        }

        if (!props.tableActions) 
            return tableCells;

        let actions = props.tableActions.map((item, index) => {
            if (item === "edit")
                return (
                    <button key={Math.random()} data-index={dataIndex} className="link" 
                    onClick={props.methods.handleEditClick ?? null} >
                        <i className="bx bx-edit-alt text-primary bx-small"></i>
                    </button>
                );
            if (item === "info")
                return (
                <button key={Math.random()} data-index={dataIndex} className="ml-1 link" 
                onClick={props.methods.handleInfoClick ?? null}>
                    <i className="bx bx-show-alt text-primary bx-small"></i>
                </button>);
            if (item === "delete")
                return (
                <button key={Math.random()} data-index={dataIndex} className="ml-1 link" 
                onClick={props.methods.handleDeleteClick ?? null}>
                    <i className="bx bxs-trash text-danger bx-small"></i>
                </button>);
            return null;
        });

        tableCells.push(
            <td key={Math.random()}>
                {actions}
            </td>
        )

        return tableCells;
    }

    function renderTableRows() {
        if (!props.tableData)
            return null;

        return props.tableData.map((item,index) => {
            return(
                <tr key={index * Math.random()}>
                    { renderTableData(item, index) }
                </tr>
            )
        })
    }

    return(
        <div className="table-responsive">
            <table id={`${props.tableName ?? "users"}-list-datatable`} className="table">
                <thead>
                    <tr>
                        { renderTableHead() }
                    </tr>
                </thead>
                <tbody>
                    { renderTableRows() }
                </tbody>
            </table>
        </div>
    )
}