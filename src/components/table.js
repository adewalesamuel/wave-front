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

    function renderTableData(data) {
        let tableCells = [];

        for (const key in data)  {
            if (props.tableHead.includes(key))
                tableCells.push(<td key={Math.random()}>{data[key]}</td>);
        }

        if (!props.tableActions) 
            return tableCells;

        let actions = props.tableActions.map((item, index) => {
            if (item === "edit")
                return <a key={Math.random()} role="button" onClick={props.methods.onHandleEditClick ?? null} ><i className="bx bx-edit-alt"></i></a>;
            if (item === "info")
                return <a key={Math.random()} role="button" onClick={props.methods.onHandleInfoClick ?? null}><i className="bx bx-show-alt"></i></a>;
            if (item === "delete")
                return <a key={Math.random()} role="button" onClick={props.methods.onHandleDeleteClick ?? null}><i className="bx bx-bin-alt"></i></a>;
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
                    { renderTableData(item) }
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