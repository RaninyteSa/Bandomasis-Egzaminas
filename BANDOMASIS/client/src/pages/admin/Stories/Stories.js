import { useEffect, useState, useContext } from 'react'
import MainContext from '../../../context/MainContext'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Stories = () => {
    const [Stories, setStories] = useState([])
    const { setAlert } = useContext(MainContext)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/Stories/')
        .then(resp => setStories(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }, [refresh, setAlert])

    const handleDelete = (id) => {
        
          axios.delete('/api/Stories/delete/' + id)
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
        
        
        
    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     axios.put('/api/saloon/edit/' )
    //     .then(resp => {
    //         setAlert({
    //             message: resp.data,
    //             status: 'success'
    //         })

    //         window.scrollTo(0, 0)

    //         setTimeout(() => navigate('/'), 2000)
    //     })
    //     .catch(error => {
    //         setAlert({
    //             message: error.response.data,
    //             status: 'danger'
    //         })
    //     })

    // }


    return (
        <>
            <h1>Grožio salonai</h1>

            {Stories ? 
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pavadinimas</th>
                      
                            <th> photo</th>
                            <th>Trinti</th>
                            <th>Redaguoti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Stories.map(stories => 
                            <tr key={stories.id}>
                                <td>{stories.id}</td>
                                <td>{stories.story}</td>
                                <td>{stories.sum}</td>
                           
                                <td>{stories.photo}</td>
                                
                                <td>
                          <button onClick={() => handleDelete(stories.id)} className="btn">Trinti</button>
                          
                        </td>
                        <td><Link className="link" to={'/admin/Stories/edit/' +stories.id} >Redaguoti</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
             : 
                <h3>Nėra sukurtų grožio salonų</h3>
            }
        </>
    )
}

export default Stories