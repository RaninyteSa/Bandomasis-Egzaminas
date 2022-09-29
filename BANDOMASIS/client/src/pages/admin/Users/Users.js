import { useEffect, useState, useContext } from 'react'
import MainContext from '../../../context/MainContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const Users = () => {
    const [Users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const { setAlert } = useContext(MainContext)
    // const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()




    useEffect(() => {
        axios.get('/api/Users/')
        .then(resp => setUsers(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }, [refresh, setAlert])

    const handleDelete = (id) => {
        
        axios.delete('/api/Users/delete/' + id)
        .then(resp => {
          setAlert({
              message:resp.data,
              status: 'success'
          })
          
          setRefresh(!refresh)

          window.scrollTo(0, 0)
          
        })
          

        .catch(error => {
          console.log(error)
          setAlert({
            message: error.response.data,
            status: 'danger'
          })
        
  
          if(error.response.status === 401)
            navigate('/login/')

            
        })
        
      }

    return (
        <>
            <h1>Darbuotojai</h1>

            {Users ? 
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nuotrauka</th>
                            <th>Vardas</th>
                            <th>Pavardė</th>
                            <th>Salonas</th>
                            <th>Trinti</th>
                            <th>Redaguoti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map(worker => 
                            <tr key={worker.id}>
                                <td>{worker.id}</td>
                                <td> 
                                    <img

                                    src={worker.photo }
                                    alt={worker.first_name + ' ' + worker.last_name}
                                    style={{ maxWidth: '80px', maxHeight: '80px', opacity: '0.7'}}
                                    />
                                    </td>
                                    <td>{worker.first_name}</td>
                                    <td>{worker.last_name}</td>
                                    <td>{worker.saloon?.name}</td>
                                    <td>
                          <button onClick={() => handleDelete(worker.id)} className="btn">Trinti</button>
                          
                        </td>
                        <td><Link className="link" to={'/admin/Users/edit/' + worker.id} >Redaguoti</Link></td>
                              
                            </tr>
                        )}
                    </tbody>
                </table>
             : 
                <h3>Nėra darbuotojų</h3>
            }
        </>
    )
}

export default Users