import { useEffect, useState, useContext } from 'react'
import MainContext from '../../../context/MainContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const Story = () => {
    const [story, setStory] = useState([])
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
        
        axios.delete('/api/story/delete/' + id)
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

            {story ? 
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
                        {story.map(story => 
                            <tr key={story.id}>
                                <td>{story.id}</td>
                                    <td>{new Date(story.story_date).toLocaleString('lt-LT')}</td>
                                    <td>{story.user && story.user.first_name + ' ' + story.user.last_name}</td>
                                    <td>{story.service?.name}</td>
                                    <td>{story.status? 'Patvirtintas' : 'Nepatvirtintas'}</td>
                                    <td>
                          <button onClick={() => handleDelete(story.id)} className="btn">Trinti</button>
                          
                        </td>
                        <td><Link className="link" to={'/admin/Story/edit/' + story.id} >Redaguoti</Link></td>
                              
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