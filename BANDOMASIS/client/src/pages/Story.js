import { useEffect, useState, useContext } from 'react'
import MainContext from '../context/MainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Story = () => {

    const [orders, setOrders] = useState([])
    const { setAlert } = useContext(MainContext)
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)

    // const handleRatings = (e, workerId, orderId) => {
    //     axios.post('/api/ratings/worker/' + workerId + '/order/' + orderId ,  {
    //         rating: e.target.value
    //     })
    //     .then(resp => {
    //         setAlert({
    //             message: resp.data,
    //             status: 'success'
    //         })
    //         setRefresh(!refresh)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         setAlert({
    //             message: error.response.data,
    //             status: 'danger'
    //         })

    //         if(error.response.status === 401)
    //             navigate('/login')
    //     })
    // }

    useEffect(() => {
        axios.get('/api/orders/user')
        .then(resp => setOrders(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if(error.response.status === 401)
                navigate('/login')
        })
    }, [setAlert, refresh])

    return (
        <>
            <h1>Jusu istorijos:</h1>

            {orders ? 
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>istorija</th>
                            <th>Vartotojasjas</th>
                            <th>statusas</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(Story => 
                            <tr key={Story.id}>
                                <td>{Story.id}</td>
                                    <td>{Story.story}</td>
                                    <td>{Story.user}</td>
                                    <td>{Story.user.first_name +' ' + Story.user.last_name}</td>
                                    <td>{Story.status? 'Patvirtintas' : 'Nepatvirtintas'}</td> 
                                  
                            </tr>
                        )}
                    </tbody>
                </table>
             : 
                <h3>Nėra užsakymų</h3>
            }
        </>
    )
}


export default Story