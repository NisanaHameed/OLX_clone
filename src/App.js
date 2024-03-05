import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import './App.css';
import {AuthContext} from './store/FirebaseContext';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase/config';
import Post from './store/PostContext';
import Home from './Pages/Home';

function App() {
  const {setUser} = useContext(AuthContext);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[])
  
  return (
    <div>
      <Post>
      <Router>
        <Routes> 
          <Route path='/' element={<Home />} />
          
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/post' element={<ViewPost />}></Route>
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
