import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout';
import Quiz from '../Quiz';
import {auth, user} from '../Firebase/firebaseConfig';
import { getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../Loader';

const Welcome = () => {

  const [userSession, setUserSession] = useState(null);

  const [userData, setUserData] = useState({});


  const navigate=useNavigate();

useEffect(() => {
   let listener = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserSession(user);
    } else {
      navigate('/');
    }

  });
  if(!!userSession){
    
    getDoc(user(userSession.uid))
    .then(snapshot =>{
      if(snapshot.exists()){
        const myData = snapshot.data();
        setUserData(myData)
      }

    })
  }

  return () => {
    listener()
  }
}, [userSession])


 return userSession === null ? (
    <>
    <Loader loadingMsg={"Loading..."} styling={{color:"#FFF"}}/>
  
    </>

 ):(
  <div className='quizz-bg'>
  <div className='container'>
      <Logout/>
      <Quiz userData={userData}/>
      </div>
  </div>
 );

  
}

export default Welcome