import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase.js';
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useCookies } from 'react-cookie';
import { FcDownload } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";



export const CreateData = () => {

  const navigate = useNavigate();

  const [cookies] = useCookies(["access_token"]);
  const peopleCollectionRef = collection(db, "people");

  const [isSaved, setIsSaved] = useState(false)
  const [imgUser, setImgUser] = useState([]);
  
  const [dataOfUser, setDataOfUser] = useState({
    fullName: "",
    dateOfBirth: "",
    country: "",
    phone: "",
    description: null,
    owner: cookies.access_token,
    images: []
  });

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUpload2, setImageUpload2] = useState(null);
  const [imageUpload3, setImageUpload3] = useState(null);
  const [imageUpload4, setImageUpload4] = useState(null);
  const [imageUpload5, setImageUpload5] = useState(null);


  

  



  const saveData = () => {
    setDataOfUser({...dataOfUser, images: imgUser});
    setIsSaved(true)
  }



  const sendDataOfUser = async () => {
    try {
      await addDoc(peopleCollectionRef, dataOfUser);
      
      if (imageUpload) {
        const imageRef = ref(storage, `${cookies.access_token}/${imageUpload.name}`);
        await uploadBytes(imageRef, imageUpload);
      }
      if (imageUpload2) {
        const imageRef2 = ref(storage, `${cookies.access_token}/${imageUpload2.name}`);
        await uploadBytes(imageRef2, imageUpload2);
      }
      if (imageUpload3) {
        const imageRef3 = ref(storage, `${cookies.access_token}/${imageUpload3.name}`);
        await uploadBytes(imageRef3, imageUpload3);
      }
      if (imageUpload4) {
        const imageRef4 = ref(storage, `${cookies.access_token}/${imageUpload4.name}`);
        await uploadBytes(imageRef4, imageUpload4);
      }
      if (imageUpload5) {
        const imageRef5 = ref(storage, `${cookies.access_token}/${imageUpload5.name}`);
        await uploadBytes(imageRef5, imageUpload5);
      }
      alert("Data has been created");
      navigate('/')
      

    } catch (err) {
      console.log(err)
    } 
  }



  const handleChange = (event) => {
    const {name, value} = event.target;
    setDataOfUser({...dataOfUser, [name]: value})
  };

  const handleChange2 = (event) => {
    setImageUpload(event.target.files[0])
    setImageUpload2(event.target.files[1])
    setImageUpload3(event.target.files[2])
    setImageUpload4(event.target.files[3])
    setImageUpload5(event.target.files[4])
    const fileNames = event.target.files;
    let copy = Object.assign([], imgUser)
    for (const file of fileNames) {
      copy.push(file.name)
      setImgUser(copy)
      console.log(file.name)
    }
    setDataOfUser({...dataOfUser, images: imgUser})  
  };

  const handleChange3 = (event) => {
    const {name, value} = event.target;
    const modernVa = value.split('\n');
    console.log(modernVa)
    setDataOfUser({...dataOfUser, [name]: value})
  };

  




  
  return (
    <div className='create-data'>
      {!cookies.access_token ? (
        <div style={{ color: 'white' }}>You must first log in to your account.</div>
      ) : (
      <div className='create-data-container'>
        <div className='data-cont-small'>
          <label for="fullName" >Full Name:</label>
          <input id='fullName' className='create-data-inp' name='fullName' onChange={(handleChange)}></input>
        </div>
        <div className='data-cont-small'>
          <label for="dateOfBirth">Date of Birth:</label>
          <input id='dateOfBirth' className='create-data-inp' type='date' name='dateOfBirth' onChange={(handleChange)}></input>
        </div>
        <div className='data-cont-small'>
          <label for="country">A country:</label>
          <input id='country' className='create-data-inp' name='country' onChange={(handleChange)}></input>
        </div>
        <div className='data-cont-small'>
          <label for="phone">Phone number:</label>
          <input id='phone' className='create-data-inp' name='phone' onChange={(handleChange)}></input>
        </div>
        <div className='data-cont-small'>
          <label for="data-area">Description:</label>
          <textarea id='data-area' name='description' onChange={(handleChange3)}></textarea>
        </div>
        <div className='data-cont-small'>
          <label for="data-files" style={{ marginBottom: '5px' }}>Images:</label>
          <input id='data-files' type='file' multiple accept="image/*" onChange={(handleChange2)}></input>
          <p>After selecting files, click on the save button</p>
          <p>A maximum of 5 files can be uploaded at a time.</p>
          <div>
            {isSaved ? (
            <FcCheckmark size='20px' style={{ marginRight: "5px" }}/>
            ) : (
            <FcDownload size='20px' style={{ marginRight: "5px" }}/>
            )}
            
            <button onClick={saveData} id="save-btn">Save</button>
          </div>
          
        </div>
        <div className='data-btn-cont'>
          <button id='data-btn' onClick={sendDataOfUser}>Confirm</button>
        </div>
      </div>
    )}
    </div>   
  )
}