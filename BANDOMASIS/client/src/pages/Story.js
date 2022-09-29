import { useEffect, useState, useContext } from 'react'
import MainContext from '../context/MainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Orders = () => {

    const [orders, setOrders] = useState([])
    const { setAlert } = useContext(MainContext)
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)

    const handleRatings = (e, workerId, orderId) => {
        axios.post('/api/ratings/worker/' + workerId + '/order/' + orderId ,  {
            rating: e.target.value
        })
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setRefresh(!refresh)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if(error.response.status === 401)
                navigate('/login')
        })
    }

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
            <h1>Jusu uzsakymai:</h1>

            {orders ? 
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Užsakymo data</th>
                            <th>Salonas</th>
                            <th>Paslauga</th>
                            <th>Darbuotjas</th>
                            <th>statusas</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => 
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                    <td>{new Date(order.order_date).toLocaleString('lt-LT')}</td>
                                    <td>{order.service.saloon.name}</td>
                                    <td>{order.service?.name}</td>
                                    <td>{order.worker.first_name +' ' + order.worker.last_name}</td>
                                    <td>{order.status? 'Patvirtintas' : 'Nepatvirtintas'}</td> 
                                    <td>
                                        <h4>Įvertinimas</h4>
                                        {order.rating ? 'jusu ivertinimas:' + order.rating.rating : 
                                        <select onChange={(e) => handleRatings(e, order.workerId, order.id)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        }
                                    </td> 
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


export default Orders