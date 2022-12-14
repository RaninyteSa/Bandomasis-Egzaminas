import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import MainContext from "../../../context/MainContext.js"

const NewSaloon = () => {

  const { setAlert } = useContext(MainContext)
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    story: '',
    photo: '',
    sum: ''

  })

  const handleForm = (e) => {
    setForm({...form, [e.target.name]: e.target.value})

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/api/saloons/new', form)
    .then(resp => {
      setAlert({
        message:resp.data,
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

    if(error.response.status === 401)
        navigate('/login')
      
  })
}


  return  (
    <>
      <h1>Naujas grožio salonas</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mb-2">
              <label className="mb-1">istorija:</label>
              <input type="text" name="story" className="form-control" onChange={handleForm} />
          </div>
          <div className="form-group mb-2">
              <label className="mb-1">:</label>
              <input type="text" name="photo" className="form-control" onChange={handleForm} />
          </div>
          <div className="form-group mb-2">
              <label className="mb-1">suma:</label>
              <input type="text" name="sum" className="form-control" onChange={handleForm} />
          </div>
          <button className="btn btn-dark">Siųsti</button>
      </form>
    </>
  )
}

export default NewSaloon