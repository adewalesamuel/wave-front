import { Fragment } from "react";
import { Link } from 'react-router-dom';

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
                    {item.replace(/_/g, ' ')}
                </th>
            )
        })
    }

    function renderTableData(data, dataIndex=0) {
        let tableCells = [];

        for (const key in data)  {
            if (props.tableHead.includes(key)) {
                if (props.cellDataAsLink && key in props.cellDataAsLink) {
                    if (props.cellDataAsLink[key] && 'tableData' in props.cellDataAsLink[key] 
                    && data[props.cellDataAsLink[key].tableData]) {
                        tableCells.push(<td style={{borderBottom: "1px solid #DFE3E7"}} key={Math.random()}>
                            <a href={data[props.cellDataAsLink[key].tableData]}>
                                {data[key]}
                            </a>
                        </td>);
                    } else {
                        tableCells.push(<td style={{borderBottom: "1px solid #DFE3E7"}} key={Math.random()}>
                                <Link to={props.cellDataAsLink[key] ?? `${props.location.pathname}/${data.id.toString()}`}>
                                    {data[key]}
                                </Link>
                            </td>);
                    }
                } else if (props.cellDataClassNameByValue && key in props.cellDataClassNameByValue){
                    tableCells.push(<td style={{borderBottom: "1px solid #DFE3E7"}} key={Math.random()}>
                            <span className={props.cellDataClassNameByValue[key][data[key]]}>{data[key]}</span>
                        </td>);
                }else {
                    tableCells.push(<td style={{borderBottom: "1px solid #DFE3E7"}} key={Math.random()}>{data[key]}</td>);
                }
            }
        }

        if (!props.tableActions) 
            return tableCells;

        let actions = props.tableActions.map((item, index) => {
            if (item === "edit")
                return (
                    <button key={Math.random()} data-index={dataIndex} data-id={data.id} className="ml-1 link" 
                    onClick={props.methods.handleEditClick ?? null} >
                        <i className="bx bx-edit-alt text-primary bx-small"></i>
                    </button>
                );
            if (item === "info")
                return (
                <button key={Math.random()} data-index={dataIndex} data-id={data.id} className="ml-1 link" 
                onClick={props.methods.handleInfoClick ?? null}>
                    <i className="bx bx-show-alt text-primary bx-small"></i>
                </button>);
            if (item === "delete")
                return (
                <button key={Math.random()} data-index={dataIndex} data-id={data.id} className="ml-1 link" 
                onClick={props.methods.handleDeleteClick ?? null}>
                    <i className="bx bxs-trash text-danger bx-small"></i>
                </button>);
            return null;
        });

        tableCells.push(
            <td style={{borderBottom: "1px solid #DFE3E7"}} key={Math.random()}>
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
                <Fragment key={(index + 1) * Math.random()}>
                    <tr key={(index + 1) * Math.random()}>
                        { renderTableData(item, index) }
                    </tr>
                    <tr key={(index + 1) * Math.random()}>
                        { (item.children && item.children.length > 0) ?
                            <>
                                <td  style={{borderRight: "1px solid #DFE3E7"}}></td>
                                <td colSpan="6" style={{padding: "0px"}}>
                                    <table width="100%">
                                        <tbody>
                                            {
                                                item.children.map((childItem, childIndex) => {
                                                    return (
                                                        <tr key={(index + 1) * Math.random()}>
                                                            {renderTableData(childItem, childIndex)}
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </td>
                            </> : null
                        }
                    </tr>
                </Fragment>
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