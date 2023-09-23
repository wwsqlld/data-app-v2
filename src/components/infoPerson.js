import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js';
import {useCookies} from 'react-cookie';

export const InfoPerson = (props) => {

    const [cookies] = useCookies(["access_token"]);

    const [listImgInUser] = useState(props.images);

    const [listIm1, setListIm1] = useState([]);


    

    useEffect(() => {
        if (listImgInUser[0]) {
            const listRef1 = ref(storage, `${cookies.access_token}/${listImgInUser[0]}`);
            getDownloadURL(listRef1).then((url) => {
                setListIm1((prev) => [...prev, url])
            })
        }
        if (listImgInUser[1]) {
            const listRef2 = ref(storage, `${cookies.access_token}/${listImgInUser[1]}`);
            getDownloadURL(listRef2).then((url) => {
                setListIm1((prev) => [...prev, url])
            })
        }
        if (listImgInUser[2]) {
            const listRef3 = ref(storage, `${cookies.access_token}/${listImgInUser[2]}`);
            getDownloadURL(listRef3).then((url) => {
                setListIm1((prev) => [...prev, url])
            })
        }
        if (listImgInUser[3]) {
            const listRef4 = ref(storage, `${cookies.access_token}/${listImgInUser[3]}`);
            getDownloadURL(listRef4).then((url) => {
                setListIm1((prev) => [...prev, url])
            })
        }
        if (listImgInUser[4]) {
            const listRef5 = ref(storage, `${cookies.access_token}/${listImgInUser[4]}`);
            getDownloadURL(listRef5).then((url) => {
                setListIm1((prev) => [...prev, url])
            })
        }

    },[]);

    const uniqueArray = listIm1.filter((item, index) => {
        return listIm1.indexOf(item) === index
    });







  return (
    <div>
        <div className='home-container' key={props.id}>
            <div className='home-cont-small-1'>
                <div className='profile-img'>
                    {uniqueArray.length === 0 ? (
                        <div style={{ color: 'black'}}>Нет фото</div>
                    ) : (
                    <img src={uniqueArray[1]} width="200px" alt=''/>    
                    )}
                        
                </div>
                <div className='profile-data'>
                    <p className='txt-data-user'>Full Name: {props.fullName}</p>
                    <p className='txt-data-user'>Country: {props.country}</p>
                    <p className='txt-data-user'>Date of Birthday: {props.dateOfBirth}</p>
                    <p className='txt-data-user'>Phone Number: {props.phone}</p>
                </div>
            </div> 
       </div> 
    </div>
  );
};
