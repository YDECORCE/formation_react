import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../Firebase/firebaseConfig'
import {signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [btn, setBtn] = useState(false);
const [error, setError] = useState('')
const navigate = useNavigate();

const handleEmail = (e) =>{
  setEmail(e.target.value);
}

const handlePassword = (e) =>{
  setPassword(e.target.value);
}

useEffect(() => {
  if(password.length>5 && email!==''){
    setBtn(true);
  }else if (btn===true){
    setBtn(false)
  }

}, [email, password, btn])

const handleSubmit = e =>{
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setEmail('');
    setPassword('');
    navigate('/welcome', {replace:true})
  })
  .catch((error) => {
    setEmail('');
    setPassword('');
    setError(error)
    
  });

}




  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
        <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                    {error!==''&& <span>{error.message}</span>}

                    <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            

                            <div className="inputBox">
                                <input onChange={handleEmail} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handlePassword} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {btn ? <button>Connexion</button>:<button disabled>Connexion</button>}

                            
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/signup">Nouveau? inscrivez-vous</Link>
                            <br/>
                            <Link className='simpleLink' to="/forgetpassword">Mot de passe oubli?? ? R??cup??rez-le ici</Link>
                        </div>
                        
                    </div>
                </div>
        </div>    
    </div>
  )
}

export default Login