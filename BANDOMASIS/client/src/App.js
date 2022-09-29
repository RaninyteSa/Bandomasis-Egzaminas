import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Stories from './pages/admin/Stories/Stories.js'

import NewUser from './pages/admin/Users/New.js';
import NewStory from './pages/admin/Story/New.js';
import Users from './pages/admin/Users/Users.js';
import Story from './pages/admin/Story/Story.js';
import EditStories from './pages/admin/Stories/Edit.js'

import EditUsers from './pages/admin/Users/Edit.js';
import EditStory from './pages/admin/Story/Edit.js';
//vartotoju komponentai
import './App.css';
import PublicStory from './pages/Story'
import PublicNewStory from './pages/NewStory.js';
import PublicUsers from './pages/Users.js';
import PublicStories from './pages/Stories.js'
import MainContext from './context/MainContext.js';
import Header from './components/Header/Header.js';
import Alert from "./components/Alert/Alert.js"
import Register from './pages/Register.js';
import Login from './pages/Login.js';

const App = () => {

  const [ alert, setAlert ] = useState({
    message: '',
    status: ''
  })

  const [userInfo, setUserInfo ] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth')
    .then(resp =>{
      console.log(resp);
      setUserInfo(resp.data)
      
    })
  }, [])

  return (
    <BrowserRouter>
    < MainContext.Provider value={ contextValues }>
      < Header />
      <div className='container'>
      < Alert />
      <Routes>
        {userInfo.role === 1 &&
      
        <Route path="admin" >
        <Route index element={<Stories />} />
        <Route path="Stories/new" element={<NewStory />} />
        <Route path="Stories/edit/:id" element={<EditStories />} />
        
        <Route path="Users/edit/:id" element={<EditUsers />} />
        <Route path='Story/edit/:id' element={<EditStory />} />
      
        <Route path='Users/new' element={<NewUser />} />
        <Route path='Story/new' element={<NewStory />} />
   
        <Route path="Users" element={<Users />} />
        <Route path="Story" element={<Story />} />
        </Route>
        } 
        {userInfo.id  &&
        <>
        <Route path='new-Story/:StoryId' element={<PublicNewStory/>} />
        <Route path='Story' element={<PublicStory/>} />
        </>
        }
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        
       
        <Route path='Stories' element={<PublicStories />} />
        <Route path='Users' element={<PublicUsers />} />
        
      </Routes>
      </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
