import React, { useEffect, useState } from 'react'
import CurrVehicles from './CurrVehicles';
import './carprking.css'


function CarParking() {
    const [noofcar, setNoofcar] = useState(0);
    const [inputarr, setInputarr] = useState([]);
    const [currVehiclesArr, setCurrVehiclesArr] = useState([]);
    const [showCurrVehicle, SetShowCurrVehicle] = useState(false);
    const [inputsearch,setInputsearch] = useState('')
    const [inputdata, setInputdata] = useState({
        name: '',
        carNo: '',
        inTime: '',
        outTime: '',
    })

    function handlchange(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    }
    let { name, carNo, outTime, inTime } = inputdata
    function submit() {
        if(name && carNo && outTime && inTime){
        setInputarr([...inputarr, { name, carNo, outTime, inTime }])
        setInputdata({ name: '', carNo: '', outTime: '', inTime: '' })
        setNoofcar(noofcar + 1);
        }
        else{
            alert('Please Fill All Details')
        }
    }
    function clear(id) {
        let newarrlist = [...inputarr]
        newarrlist.splice(id, 1)
        setNoofcar(noofcar - 1)
        return setInputarr(newarrlist)
    }
    function compareTime(item) {
        let currTime = new Date().getHours() + ':' + new Date().getMinutes();
        let regex = new RegExp(':', 'g'),
            timeStr1 = item.outTime,
            timeStr2 = currTime;
        if (parseInt(timeStr1.replace(regex, '')) >= parseInt(timeStr2.replace(regex, ''))) {

            return true;
        } else {

            return false;
        }

    }
    let currVehicles = inputarr.filter((item) => {
        return compareTime(item)
    });
    useEffect(() => {
       
        setCurrVehiclesArr(currVehicles);
    }, [showCurrVehicle])


    return (

        <div>
            
            <h1>Car Parking App</h1><br />
            <h2>Number of Car Parked -:{noofcar}</h2>
            <input
                type='text'
                name='name'
                value={inputdata.name}
                autoComplete='newpasword'
                placeholder='Driver Name...'
                onChange={handlchange}
            >
            </input>
            <br />
            <input
                type='text'
                name='carNo'
                value={inputdata.carNo}
                autoComplete='newpasword'
                placeholder='Car No...'
                onChange={handlchange}
            >

            </input>
          
            
            <div style={{fontWeight: '900', marginTop:'1rem'}}>In-Time:-</div>
            
            <input
                type='time'
                name='inTime'
                value={inputdata.inTime}
                autoComplete='newpasword'
                placeholder=''
                onChange={handlchange}
            ></input>
           
            
            <div style={{fontWeight: '900',marginTop:'1rem'}}>Out-Time:-</div>
            

            <input
                type='time'
                name='outTime'
                value={inputdata.outTime}
                autoComplete='newpasword'
                placeholder=''
                onChange={handlchange}
            ></input>
             <br />
             <input type='search' onChange={(e)=>setInputsearch(e.target.value)}
               placeholder='search by car no. or name..'
               style={{height:'3rem',marginBottom:'1rem'}}></input>
             <br />
            <div className='btn'>
            <button style={{background:'blue',color:'white'}}              
                onClick={submit}
            >
                Add Car
            </button>

            <button style={{background:'blue',color:'white'}}
               
                onClick={()=>SetShowCurrVehicle(true)}
            >
                Current Vehicle
            </button>

            <button style={{background:'blue',color:'white'}}                           
                onClick={() => SetShowCurrVehicle(false)}
            >
                Vehicle History
            </button> 
            </div>
            {!showCurrVehicle ? (
               
                <table
                    border={1}
                    width='25%'
                    cellPadding={10}
                   
                >
                    <tr style={{  fontWeight: '700' }}>

                        <th>Driver Name</th>
                        <th>Car No.</th>
                        <th>CheckInTime</th>
                        <th>CheckOutTime</th>
                        <th>clear</th>
                    </tr>
        {
                        inputarr.filter((i)=>i.name.toLowerCase().includes(inputsearch) ||
                        i.carNo.toLowerCase().includes(inputsearch))
                        .map((item, index) => {
                            return <tr key={index} style={{ color: 'green', background: 'blue' }}>
                                <td>{item.name}</td>
                                <td>{item.carNo}</td>
                                <td>{item.inTime}</td>
                                <td>{item.outTime}</td>
                                <td><button style={{background:'blue',color:'white'}}
                                onClick={() => clear(index)}>Delete</button></td>
                            </tr>
                        })
                    }
                </table>
             ) : (
                <CurrVehicles currVehiclesArr={currVehiclesArr} />)}
            
        </div>
    )
}

export default CarParking