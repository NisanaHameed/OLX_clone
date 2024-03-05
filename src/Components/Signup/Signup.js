import React, { useState,useContext } from 'react';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import {auth,firestore,storage} from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate();
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!username.trim().length){
      setErr("Enter username!");
      return;
    }else if(!email.trim().length || !emailPattern.test(email)){
      setErr("Enter a valid email!");
      return;
    }else if(!phone || phone.length<10 || phone<0){
      setErr("Enter a valid phone number!");
      return;
    }else if(!password.trim().length || password.length<6){
      setErr("Password must contain atleast 6 characters!");
      return;
    }
    createUserWithEmailAndPassword(auth,email,password).then((result)=>{
      const user = result.user;
      updateProfile(user,{displayName:username}).then(()=>{
       const userCollection = collection(firestore,"users")
       addDoc(userCollection,{
        id:user.uid,
        name:username,
        phone:phone,
       }).then(()=>{
        navigate('/login')
       })
      })
    }).catch(()=>{
      alert("Email already in use!");
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          {err && <p style={{color:'red'}}>{err}</p>}
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
