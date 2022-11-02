import React from 'react'

function CurrVehicles({currVehiclesArr}) {
  return (
    <div>
        <table
    border={1}
    width='25%'
    cellPadding={10}
>
    <tr style={{ background: '#00FFFF', color: 'red', fontWeight: '700' }}>

        <th>Driver Name</th>
        <th>Car No.</th>
        <th>CheckInTime</th>
        <th>CheckOutTime</th>
    </tr>
    {
        currVehiclesArr.map((item, index) => {
            return <tr key={index} style={{ color: 'white', background: 'blue' }}>

                <td>{item.name}</td>
                <td>{item.carNo}</td>
                <td>{item.inTime}</td>

                <td>{item.outTime}</td>

                {/* <td><button onClick={() => clear(index)}>Clear</button></td> */}
            </tr>
        })
    }
</table>

</div>
)
}



export default CurrVehicles