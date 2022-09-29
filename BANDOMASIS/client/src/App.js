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
        <Route path="stories/new" element={<NewStory />} />
        <Route path="stories/edit/:id" element={<EditStories />} />
        
        <Route path="users/edit/:id" element={<EditUsers />} />
        <Route path='story/edit/:id' element={<EditStory />} />
      
        <Route path='users/new' element={<NewUser />} />
        <Route path='story/new' element={<NewStory />} />
   
        <Route path="users" element={<Users />} />
        <Route path="story" element={<Story />} />
        </Route>
        } 
        {userInfo.id  &&
        <>
        <Route path='new-story/:storyId' element={<PublicNewStory/>} />
        <Route path='story' element={<PublicStory/>} />
        </>
        }
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        
       
        <Route path='stories' element={<PublicStories />} />
        <Route path='users' element={<PublicUsers />} />
        
      </Routes>
      </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
