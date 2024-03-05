import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../store/FirebaseContext';
import { firestore, storage } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if(!user){
      console.log('No user')
      setErr("Please Login!");
      return;
    }
console.log(user.uid)
    if(name && name.trim().length==0){
      setErr("Enter name!");
      return;
    }else if(category && category.trim().length==0){
      setErr("Enter category!");
      return;
    }else if(price && price<=0 || !price){
      setErr("Enter a valid price!");
      return;
    }else if(!image){
      setErr("Upload an image!");
      return;
    } 
    
    const timestamp = new Date().getTime();
    const imageName = `${timestamp}_${image.name}`;
  
    const refImage = ref(storage, `Product/${imageName}`);
    const uploadImage = uploadBytesResumable(refImage, image);
  
    uploadImage.on("state_changed", (snapshot) => {}, (err) => {
      alert(err.message);
    }, () => {
      getDownloadURL(uploadImage.snapshot.ref).then((url) => {
        const productCollection = collection(firestore, 'products');
        addDoc(productCollection, {
          name,
          category,
          price,
          url,
          userId: user.uid,
          date: new Date().toDateString()
        }).then(() => {
          navigate('/');
        }).catch((err) => {
          alert('Unable to add product details', err.message);
        });
      });
    });
  };
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            id="fname"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            id="fname"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            id="fname"
            name="Price" onChange={(e) => setPrice(e.target.value)}
          />
          <br />

          <br />
          {image && <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)}></img>}

          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          {err && <p style={{color:'red',marginTop:5}}>{err}</p>}
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
