import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
function View() {
  const [seller, setSeller] = useState('')
  const { postDetails } = useContext(PostContext)
  useEffect(() => {
    const { userId } = postDetails
    const userCollection = collection(firestore, 'users')

    getDocs(query(userCollection, where('id', '==', userId))).then((res) => {
      res.forEach((doc) => {
        setSeller(doc.data())
      })
    }).catch((err) => {
      alert(err.message)
    })
  })
  
  return (
    
      <div className = "viewParentDiv" >
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.date}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{seller?.name}</p>
          <p>{seller?.phone}</p>
        </div>
      </div>
    </div>

  )
}
export default View;
