import { useState, useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import MainContext from "../context/MainContext"
import axios from "axios"
import NewSaloon from "./admin/Stories/New"

const Saloons= () => {

    const [ saloons, setSaloons] = useState([])
    const { setAlert, userInfo } = useContext(MainContext)
    const [ sort, setSort ] = useState('')

    useEffect(() => {
        let url = 'api/saloons/'
        if (sort === '1' || sort === '2')
            url += '?sort=' + sort
     console.log(url);
        axios.get(url)
        .then(resp => setSaloons(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
          })
    },[sort])
    return (
    <>
        <h1> Salonų sąrašas </h1>
        <select onChange={(e) => setSort(e.target.value)}>
            <option>Pagal id</option>
            <option value="1">Pagal Pavadinimą a-ž</option>
            <option value="2">Pagal Pavadinimą ž-a</option>
        </select>
        {saloons && saloons.map(saloon =>
           <div key={saloon.id} style={{ marginBottom: 30, borderBottom: '3px solid black'}}>
                <div><strong>{saloon.name}</strong ></div>
                <div>{saloon.address}</div>
                <div>{saloon.phone}</div>
                <div>
                    <Link 
                        to={userInfo.id ? '/new-order/' + saloon.id : '/login'}
                        >
                            rezervuoti laiką
                    </Link>
                </div>
           </div> 
            
        )}
            
    </>
    )
}

export default Saloons