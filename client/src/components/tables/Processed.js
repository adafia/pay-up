import React from 'react'

const Processed = ({ data }) => {

    const renderData = () => {
        return data.map((record, index) => {
            return (
                <tr key={record.id}>
                    <th scope="row">{index}</th>
                    <td>{record.CustomerID}</td>
                    <td>{record.SeasonID}</td>
                    <td>{record.Credit}</td>
                    <td>{record.TotalRepaid}</td>
                </tr>
            )
        })
    }

    return (
        <>
        <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">CustomerID</th>
            <th scope="col">SeasonID</th>
            <th scope="col">Credit</th>
            <th scope="col">Total Repaid</th>
            </tr>
        </thead>
        <tbody>
            {renderData()}
        </tbody>
        </table>
        </>
    )
}



export default Processed
