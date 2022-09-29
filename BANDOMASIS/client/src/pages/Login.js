import { useState, useContext } from "react"
import MainContext from "../context/MainContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {

    const { setAlert, setUserInfo } = useContext(MainContext)

        const [form, setForm] = useState({
            email: '',
            password: '',
        })
        
    
        const navigate = useNavigate()
    
        const handleForm = (e) => {
            setForm({...form, [e.target.name]: e.target.value})
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
    
            axios.post('/api/users/login', form)
            .then(resp => {
               setUserInfo(resp.data.user)
               setAlert({
                    message: resp.data.message,
                    status: 'success'
                })
    
                setTimeout(() => {
                    if(resp.data.user.role === 1 )
                    return navigate ('/admin')

                  navigate('/saloons') 
                
                } , 1000) 
            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
        }
    return (
        <>
            <h1>Prisijungimas</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>El. pašto adresas:</label>
                    <input type="email" name="email" onChange={handleForm} required />
                </div>
                <div className="form-control">
                    <label>Slaptažodis:</label>
                    <input type="password" name="password" onChange={handleForm} />
                </div>
                <button className="btn btn-primary">Prisijungti</button>
            </form>
       </>
    )
}

export default Login;