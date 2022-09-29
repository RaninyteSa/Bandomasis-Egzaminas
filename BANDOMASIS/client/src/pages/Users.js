import { useState, useEffect, useContext } from 'react'

import MainContext from '../context/MainContext'
import axios from 'axios'

const Users = () => {
    const [ users, setUsers] = useState([])
    const { setAlert } = useContext(MainContext)
    const [ stories, setStories ] = useState([])
    const [selectedSorting, setSelctedSorting] = useState('0')
    const [ slectedStories,  setSelectedStories ] = useState('0')

    const handleFilter = (e) => {
        setSelectedStories(e.target.value)
    }

    // const handleSorting = (e) => {
    //     setSelctedSorting(e.target.value)
    // }

  

    useEffect(() => {
        let url = '/api/users/?'

        const searchParams = new URLSearchParams()

        if(slectedStories !== '0')
            searchParams.append('Stories', slectedStories)
        if(selectedSorting !== '0')
            searchParams.append('sorting', selectedSorting)

            url += searchParams.toString()

            console.log(url)
            axios.get(url)
        .then(resp => {
            // const Users = resp.data.map(Users =>  {
            //     if(Users.ratings.length > 0) {
            //         let sum = 0
            //         Users.ratings.map(r => sum += r.rating )
            //         Users.total_rating = (sum / Users.ratings.length).toFixed(2)
            //     }

            //     return Users
            // })
            
           setUsers(resp.data)
        }) 
        .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
          })
    }, [slectedStories, selectedSorting])

    useEffect(() => {
        axios.get('/api/stories/')

        .then(resp => setStories(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
          })
    }, [])

    
    return (
        <>
        
            <h1> Vartotojų sąrašas: </h1>

            <div className='stories'>
            { stories && 
                <select onChange={handleFilter}>
                    <option value='0'>Pasirinkite istoriją:</option>
                    {stories.map(stories => 
                        <option key={stories.id} value={stories.id}>{stories.story}</option>
                    )}
                </select>
            }
         
            </div>
            <div  className='users'>
            { users && users.map(users => 
                <div key={users.id}>
                    <img className='wimg'src={users.photo} />
                    <h4>{users.first_name + ' ' + users.last_name}</h4>
                    <div>{users.Stories.name}</div>
                  
                </div>
                
            )}
            </div>
         </>
    )
}

export default Users