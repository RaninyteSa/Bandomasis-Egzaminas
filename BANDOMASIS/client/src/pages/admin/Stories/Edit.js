import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const EditStories = () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        story: '',
        photo: '',
        sum: ''
    })
    

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/stories/edit/' + id, form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin')
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
        axios.get('/api/stories/single/' + id)
            .then(resp => setForm(resp.data))
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [id, setAlert])

    return (
        <div className="containerr"> <h1>Redaguoti</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-control">
          
                </div>
                <div className="form-control">
                <label>istorija:</label>
                    <input type="text" name="story" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-control">
                    <label>:</label>
                    <textarea type="text" name="photo" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <div className="form-control">
                    <label>suma:</label>
                    <textarea type="text" name="sum" onChange={(e) => handleForm(e)}></textarea>
                </div>
             
                <button className="btn btn-primary">Siųsti</button>
                
            </form>
        </div>
    )
}

export default EditStories