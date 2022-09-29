import { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const Workers = () => {
    const [ workers, setWorkers] = useState([])
    const { setAlert } = useContext(MainContext)
    const [ saloons, setSaloons ] = useState([])
    const [selectedSorting, setSelctedSorting] = useState('0')
    const [ slectedSaloon,  setSelectedSaloon ] = useState('0')

    const handleFilter = (e) => {
        setSelectedSaloon(e.target.value)
    }

    const handleSorting = (e) => {
        setSelctedSorting(e.target.value)
    }

  

    useEffect(() => {
        let url = '/api/workers/?'

        const searchParams = new URLSearchParams()

        if(slectedSaloon !== '0')
            searchParams.append('saloon', slectedSaloon)
        if(selectedSorting !== '0')
            searchParams.append('sorting', selectedSorting)

            url += searchParams.toString()

            console.log(url)
            axios.get(url)
        .then(resp => {
            // const workers = resp.data.map(worker =>  {
            //     if(worker.ratings.length > 0) {
            //         let sum = 0
            //         worker.ratings.map(r => sum += r.rating )
            //         worker.total_rating = (sum / worker.ratings.length).toFixed(2)
            //     }

            //     return worker
            // })
            
           setWorkers(resp.data)
        }) 
        .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
          })
    }, [slectedSaloon, selectedSorting])

    useEffect(() => {
        axios.get('/api/saloons/')

        .then(resp => setSaloons(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
          })
    }, [])

    
    return (
        <>
        
            <h1> Darbuotojų sąrašas: </h1>

            <div className='saloon'>
            { saloons && 
                <select onChange={handleFilter}>
                    <option value='0'>Pasirinkite saloną:</option>
                    {saloons.map(saloon => 
                        <option key={saloon.id} value={saloon.id}>{saloon.name}</option>
                    )}
                </select>
            }
            <select onChange={handleSorting}>
                <option value="0">Pasirinkite rūšiavimą</option>
                <option value="1">pagal įvertinimą didėjančia tvarka</option>
                <option value="2">pagal įvertinimą mažėjančia tvarka</option>
            </select>
            </div>
            <div  className='worker'>
            { workers && workers.map(worker => 
                <div key={worker.id}>
                    <img className='wimg'src={worker.photo} />
                    <h4>{worker.first_name + ' ' + worker.last_name}</h4>
                    <div>{worker.saloon.name}</div>
                    {worker.total_rating &&
                        <div>Įvertinimas: {parseFloat(worker.total_rating).toFixed(2)}</div> 
                    } 
                    {!worker.total_rating &&
                        <div>įvertinimų nėra 😇 </div>
                    }
                </div>
                
            )}
            </div>
         </>
    )
}

export default Workers