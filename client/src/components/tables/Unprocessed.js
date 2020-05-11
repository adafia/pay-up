import React from 'react'

const Unprocessed = ({ data }) => {

    const formatDate = (date) => {
        const d = new Date(date)
        const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d)
        return `${da}-${mo}-${ye}`
    }

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
                    <td>{formatDate(record.Date)}</td>
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



export default Unprocessed
