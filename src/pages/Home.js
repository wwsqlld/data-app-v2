import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db} from '../firebase.js';
import {useCookies} from 'react-cookie';
import { InfoPerson } from '../components/infoPerson';

export const Home = () => {

    const [cookies] = useCookies(["access_token"]); 

    const [dataList, setDataList] = useState([]);
    

    const peopleCollectionRef = collection(db, "people");


    useEffect(() => {
        const getPeople = async () => {
            await getDocs(query(peopleCollectionRef, where("owner", "==", `${cookies.access_token}`))).then((response) => {
                setDataList(response.docs.map((doc) => ({...doc.data(), id: doc.id })));  
            })  
        }
        getPeople();
    }, []);

    




    return (
        <div className='home'>
            {!cookies.access_token ? (
                <div style={{ color: 'white' }}>You must first log in to your account.</div>
            ) : ( 
            <div>
               {dataList.map((data) => {
                return (
                    <Link to={`/person/${data.id}`} style={{ textDecoration: 'none'}} >
                        <InfoPerson 
                        id={data.id} 
                        fullName={data.fullName} 
                        country={data.country} 
                        dateOfBirth={data.dateOfBirth} 
                        phone={data.phone} 
                        description={data.description} 
                        images={data.images} 
                        />
                    </Link>
                )
            })} 
            </div> 
        )}
        </div>
    )
}