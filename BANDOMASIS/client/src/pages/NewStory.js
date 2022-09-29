import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import MainContext from "../context/MainContext"
import axios from "axios"

const NewStory = () => {
    const { storiesId } = useParams()
    const { setAlert } = useContext(MainContext)
    const [Users, setUsers ] = useState([])
    const [form, setForm ] = useState({})
    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        axios.post('/api/Stories/new', form)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            navigate('/stories')
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
        
        axios.get('/api/?storiesId=' + storiesId)
      
        .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
            if(error.response.status === 401)
                navigate('/login')
          })
    },[])

    useEffect(() => {
        
        axios.get('/api/Users/?stories=' + storiesId)
        .then(resp => setUsers(resp.data))
            .catch(error => {
                console.log(error)
                    setAlert({
                        message: error.response.data,
                        status: 'danger'
                    })
            }   )
    },[])


    return(
        <>
        <h1>Naujas uzsakymas {storiesId}</h1>
            <form onSubmit={handleSubmit}>
            

                <div>
                    <select name="userId"
                    onChange={handleForm}
                    >
                        <option value='0'>Pasirinkite Darbuotoją</option>
                        {Users.map(user => 
                            <option key={user.id} value={user.id}>
                            {user.first_name + ' ' + user.last_name}
                            </option>
                        )} 
                        
                    </select>
                </div>
                    <div>
                        <input name="Story_date" type="datetime-local" onChange={handleForm}/>
                    </div>
                <button type="submit">Užsakyti</button>
            </form>
        </>
    )
}

export default NewStory