import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const EditSaloon = () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: ''
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
                <label>Pavadinimas:</label>
                    <input type="text" name="name" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-control">
                    <label>Telefono nr.:</label>
                    <textarea type="text" name="phone" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <div className="form-control">
                    <label>Adresas:</label>
                    <textarea type="text" name="address" onChange={(e) => handleForm(e)}></textarea>
                </div>
             
                <button className="btn btn-primary">Siųsti</button>
                
            </form>
        </div>
    )
}

export default EditSaloon