import { useMemo } from "react";
import { useTable, Column } from "react-table";

interface Props {
    data: Array<object>;
}

export const TradeTable = (props: Props) => {
    console.log(props.data)
    const data = useMemo(() => props.data, [props.data])
    const columns = useMemo(() => [
        {
            Header: "Action",
            accessor: "action"
        },
        {
            Header: "Price",
            accessor: "price"
        },
        {
            Header: "Base",
            accessor: "base"
        },
        {
            Header: "Quote",
            accessor: "quote"
        },
        {
            Header: "Volume",
            accessor: "volume"
        },
      ],
      []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = 
    useTable({ columns, data })
  
    return (
        <div className="table">
            <table {...getTableProps}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}            
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
