import React, {useState, useEffect} from 'react';
import {auth} from '../Firebase/firebaseConfig'
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';


function Logout() {

const [checked, setChecked] = useState(false)

const navigate=useNavigate();

useEffect(() => {
  if(checked){
    
    signOut(auth).then(() => {
        console.log("déconnecté")
        setTimeout(()=>{
            navigate('/')
        },1000)
      }).catch((error) => {
        console.log("error")
      });
  }

  
}, [checked])

const handleChange = (e) =>{
    setChecked(e.target.checked)
}


  return (
    <div className='logoutContainer'>
        <label className='switch'>
            <input
                type='checkbox'
                checked ={checked}
                onChange={handleChange}/>
            <span className='slider round' data-tip="Déconnexion"></span>
        </label>
        <ReactTooltip place="left" effect="solid" />
    </div>
  )
}

export default Logout