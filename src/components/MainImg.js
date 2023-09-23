import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import { storage } from '../firebase.js';
import { ref, getDownloadURL } from "firebase/storage";

function MainImg(props) {

    const [listIm1, setListIm1] = useState([]);

    const [listImgProp] = useState(props.listImgInUser);



    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {

        if (listImgProp[0]) {
            const listRef1 = ref(storage, `${cookies.access_token}/${listImgProp[0]}`);
            try {
                getDownloadURL(listRef1).then((url) => {
                    setListIm1((prev) => [...prev, url])
                })
            } catch (err) {
                console.log(err)
            } 
        }

        if (listImgProp[1]) {
            const listRef2 = ref(storage, `${cookies.access_token}/${listImgProp[1]}`);
            try {
                getDownloadURL(listRef2).then((url) => {
                    setListIm1((prev) => [...prev, url])
                })
            } catch (err) {
                console.log(err)
            } 
        }

        if (listImgProp[2]) {
            const listRef3 = ref(storage, `${cookies.access_token}/${listImgProp[2]}`);
            try {
                getDownloadURL(listRef3).then((url) => {
                    setListIm1((prev) => [...prev, url])
                })
            } catch (err) {
                console.log(err)
            } 
        }

        if (listImgProp[3]) {
            const listRef4 = ref(storage, `${cookies.access_token}/${listImgProp[3]}`);
            try {
                getDownloadURL(listRef4).then((url) => {
                    setListIm1((prev) => [...prev, url])
                })
            } catch (err) {
                console.log(err)
            } 
        }

        if (listImgProp[4]) {
            const listRef5 = ref(storage, `${cookies.access_token}/${listImgProp[4]}`);
            try {
                getDownloadURL(listRef5).then((url) => {
                    setListIm1((prev) => [...prev, url])
                })
            } catch (err) {
                console.log(err)
            } 
        }
        
    }, []);


    const uniqueArray = listIm1.filter((item, index) => {
        return listIm1.indexOf(item) === index
    });



  return (
    <div className='home-cont-for-image'>
        {uniqueArray.map((url) => {
            return (
                <div className='cont-image-100' >
                    <img src={url} className="data-img-url" alt='Loading...'/>
                </div>
            )
        })}          
    </div>
  )
}

export default MainImg;