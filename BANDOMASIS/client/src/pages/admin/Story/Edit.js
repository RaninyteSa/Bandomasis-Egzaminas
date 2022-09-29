import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const EditStory= () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        Story_date: '',
        status: ''
    
    })

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/story/edit/' + id, form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin/story')
            })
            .catch(error => {
                console.log(error)

                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    navigate('/login')
            })
    }

    useEffect(() => {
        axios.get('/api/story/single/' + id)
            .then(resp =>  {
                resp.data.Story_date = new Date(resp.data.Story_date).toISOString().slice(0,16)
                resp.data.status = resp.data.status ? '1' : '2'
                setForm(resp.data)
            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [id, setAlert])


    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>užsakymų redagavimas</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Užsakymų data:</label>
                        <input
                         type="datetime-local" 
                         name="Story_date" className="form-control"
                         onChange={handleForm}
                         value={form.Story_date} 
                         />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Statusas:</label>
                        <select name="status"
                
                        onChange={handleForm}
                        value={form.status}>
                           <option value="0" >nepatvirtintas</option>
                           <option value="1" > patvirtintas</option>
                        </select>
                    </div>

                    <button className="btn btn-primary">Išsaugoti</button>
                </form>
            </div>
        </>
    )
}

export default EditStory