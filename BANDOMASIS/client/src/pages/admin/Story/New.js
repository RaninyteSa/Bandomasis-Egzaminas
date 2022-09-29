import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import MainContext from "../../../context/MainContext.js"

const NewStory = () => {

  const { setAlert } = useContext(MainContext)
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    story_date: '',
    status: ''

  })

  const handleForm = (e) => {
    setForm({...form, [e.target.name]: e.target.value})

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/api/Storys/new', form)
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
      <h1>Naujas užsakymas</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mb-2">
              <label className="mb-1">Užsakymo data:</label>
              <input type="datetime-local" name="Story_date" className="form-control" onChange={handleForm} />
          </div>
          <div className="form-group mb-2">
              <label className="mb-1">Statusas:</label>
              <input type="number" name="status" className="form-control" onChange={handleForm} />
          </div>
          <div className="form-group mb-2">
              <label className="mb-1">Paslauga:</label>
              <input type="number" name="serviceId" className="form-control" onChange={handleForm} />
          </div>
          <button className="btn btn-dark">Siųsti</button>
      </form>
    </>
  )
}

export default NewStory