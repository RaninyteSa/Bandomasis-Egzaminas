import { useState, useEffect, useContext } from "react"
import MainContext from "../context/MainContext"
import axios from "axios"


const Stories= () => {

    const [ Stories, setStories] = useState([])
    const { setAlert, userInfo } = useContext(MainContext)
    const [ sort, setSort ] = useState('')

    useEffect(() => {
        let url = 'api/Stories/'
        if (sort === '1' || sort === '2')
            url += '?sort=' + sort
     console.log(url);
        axios.get(url)
        .then(resp => setStories(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
          })
    },[sort])
    return (
    <>
        <h1> Istorijų sąrašas </h1>
        <select onChange={(e) => setSort(e.target.value)}>
            <option>Pagal id</option>
            <option value="1">Pagal Pavadinimą a-ž</option>
            <option value="2">Pagal Pavadinimą ž-a</option>
        </select>
        {Stories && Stories.map(stories =>
           <div key={stories.id} style={{ marginBottom: 30, borderBottom: '3px solid black'}}>
                <div><strong>{stories.story}</strong ></div>
                <div>{stories.photo}</div>
                <div>{stories.sum}</div>
         
           </div> 
            
        )}
            
    </>
    )
}

export default Stories