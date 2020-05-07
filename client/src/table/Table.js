import React from 'react'
import Moment from 'react-moment'

const Table = ({ data }) => {

    const renderData = () => {
        return data.map((record, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{record.CustomerID}</td>
                    {
                    !record.SeasonID ? <td> - </td> : <td>{record.SeasonID}</td>
                    }
                    <td>{record.Amount}</td>
                    <td><Moment format='YYYY/MM/DD'>{record.Date}</Moment></td>
                </tr>
            )
        })
    }

    return (
        <>
        <h4>Preview of Uploaded Repayment Records</h4>
        <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">CustomerID</th>
            <th scope="col">SeasonID</th>
            <th scope="col">Amount</th>
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



export default Table
