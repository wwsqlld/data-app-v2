import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import ProfileImg from '../components/ProfileImg.js';
import MainImg from '../components/MainImg.js';
import { db } from '../firebase.js';

import {useCookies} from 'react-cookie';

import { GoPencil } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { GoX } from "react-icons/go";
import { GoTrash } from "react-icons/go";



export const IndPerson = () => {
    const { id } = useParams();
    const [cookies] = useCookies(["access_token"]);
    const docRef = doc(db, "people", `${id}`);
    const navigate = useNavigate();


    const [dataListOfUser, setDataListOfUser] = useState([]);

    const [listImgInUser, setListImgInUser] = useState(null);

    const [areaData, setAreaData] = useState('')
    const [changeButt, setChangeButt] = useState(false);


    

    const [uniqueDesc, setUniqueDesc] = useState([]);

    const onChangeButt = () => {
        setChangeButt(!changeButt)
    }

    const goChangeDesc = async () => {
        if (areaData === '') {
            setChangeButt(false)
        } else {
            const descRef = doc(db, "people", `${id}`);
            try {
                await updateDoc(descRef, {
                    description: areaData
                });
                setChangeButt(false)
                console.log("Ну вроде получилось!")
                window.location.reload()
            } catch (err) {
                console.log(err)
            } 
        }  
    }

    const deleteDataInUser = async () => {
        try {
            await deleteDoc(doc(db, "people", `${id}`));
            alert("Data has been deleted");
            navigate('/')
        } catch (err) {
            console.log(err)
        }
        
    }    
    
    

    useEffect(() => {
        const getPeople = async () => {
            try {
                await getDoc(docRef).then((response) => {
                                setDataListOfUser(response.data());
                                setUniqueDesc(response.data().description.split('\n'));
                                setListImgInUser(response.data().images);
                            })
            } catch (err) {
                console.log(err)
            } 
        }

        getPeople();
    }, []);



    return (
        <div className="home">
                    <div className='home-container' key={dataListOfUser.id} >
                        <div className='home-cont-small-1'>
                            {listImgInUser ? (
                                <ProfileImg listImgInUser={listImgInUser} />
                            ) : (
                            <div className='profile-img'></div>
                            )}
                            <div className='profile-data'>
                                <p className='txt-data-user'>Full Name: {dataListOfUser.fullName}</p>
                                <p className='txt-data-user'>Country: {dataListOfUser.country}</p>
                                <p className='txt-data-user'>Date of Birthday: {dataListOfUser.dateOfBirth}</p>
                                <p className='txt-data-user'>Phone Number: {dataListOfUser.phone}</p>
                            </div>
                        </div>
                        <div className='home-cont-small-2'>
                            <div className='cont-for-desc'>
                                {!changeButt ? (
                                    <p className='txt-data-user'>
                                        Description:
                                    <br />
                                    <br />
                                    {uniqueDesc.map((para, index) => (
                                        <React.Fragment key={index}>
                                            {para}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                    </p>
                                ) : (
                                    <textarea className='change-data-area' onChange={(e) => setAreaData(e.target.value)}>{dataListOfUser.description}</textarea>
                                )}
                                
                            </div>
                            <div className='cont-for-butt-change'>
                                {!changeButt ? (
                                    <div className='parent-for-change'>
                                        <div className='change-butt-with-ani' onClick={onChangeButt} >
                                            <GoPencil color='white' size="30px"/>  
                                        </div>
                                        <div className='delete-butt-with-ani' onClick={deleteDataInUser} >
                                            <GoTrash color='red' size="30px" />
                                        </div>    
                                    </div>
                                    

                                ) : (
                                    <div className='goOrNo'>
                                        <div className='cont-cencel-change ani-change' onClick={onChangeButt}><GoX color='white' size="30px" /></div>
                                        <div className='cont-change-go ani-change' onClick={goChangeDesc} ><GoCheck color='white' size="30px" /></div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {listImgInUser ? (
                                <MainImg listImgInUser={listImgInUser} />
                            ) : (
                            <div className='home-cont-for-img'></div>
                        )}
                    </div>
                    
        </div>
    )
}