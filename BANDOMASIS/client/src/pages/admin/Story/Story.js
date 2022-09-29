import { useEffect, useState, useContext } from 'react'
import MainContext from '../../../context/MainContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const Story = () => {
    const [Story, setStory] = useState([])
    const { setAlert } = useContext(MainContext)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/Story/')
        .then(resp => setStory(resp.data))
        .catch(error => {
            console.log(error)
            // setAlert({
            //     message: error.response.data,
            //     status: 'danger'
            // })
        })
    }, [refresh])

    const handleDelete = (id) => {
        
        axios.delete('/api/Story/delete/' + id)
        .then(resp => {
          setAlert({
              message:resp.data,
              status: 'success'
          })
          
          setRefresh(!refresh)
          
          window.scrollTo(0, 0)
          //navigate('/api/admin')
          
        })
          .catch(error => {
          console.log(error)
          setAlert({
            message: error.response.data,
            status: 'danger'
          })
          
  
          if(error.response.status === 401)
            navigate('/api/login/')
        })
        
      }

    return (
        <>
            <h1>Visi Uzsakymai:</h1>

            {Story ? 
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Užsakymo data</th>
                            <th>Klientas</th>
                            <th>Paslauga</th>
                            <th>Statusas</th>
                            <th>Trinti</th>
                            <th>Redaguoti</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Story.map(order => 
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                    <td>{new Date(order.order_date).toLocaleString('lt-LT')}</td>
                                    <td>{order.user && order.user.first_name + ' ' + order.user.last_name}</td>
                                    <td>{order.service?.name}</td>
                                    <td>{order.status? 'Patvirtintas' : 'Nepatvirtintas'}</td>
                                    <td>
                          <button onClick={() => handleDelete(order.id)} className="btn">Trinti</button>
                          
                        </td>
                        <td><Link className="link" to={'/admin/Story/edit/' + order.id} >Redaguoti</Link></td>
                              
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