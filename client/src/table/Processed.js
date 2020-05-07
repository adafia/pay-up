import React from 'react'
import Moment from 'react-moment'

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
                    <td>{record.init}</td>
                    <td><Moment format='YYYY/MM/DD'>{record.Date}</Moment></td>
                </tr>
            )
        })
    }

    return (
        <>
        <h4>Preview of Customer Summaries</h4>
        <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">CustomerID</th>
            <th scope="col">SeasonID</th>
            <th scope="col">Credit</th>
            <th scope="col">Total Repaid</th>
            <th scope="col">init Total Repaid</th>
            <th scope="col">Date</th>
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