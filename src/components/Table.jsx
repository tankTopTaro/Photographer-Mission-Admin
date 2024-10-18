import TableForm from './TableForm'

const Table = ({ table, tableName, refreshTable }) => {
    const columns = table.length > 0 ? Object.keys(table[0]) : []   // Extract column names from the first item in the table

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold text-center mb-8">{tableName ?? 'Data'} Table</h1>

            <div className="overflow-x-auto w-full lg:w-4/5 -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        {columns.map((col, index) => (
                            <th
                            key={index}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                            {col}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.map((item, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {columns.map((column, colIndex) => (
                            <td
                                key={colIndex}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                            >
                                {tableName === 'Albums' && column === 'status' ? (
                                <TableForm item={item} refreshTable={refreshTable} />
                                ) : (
                                item[column]
                                )}
                            </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Table