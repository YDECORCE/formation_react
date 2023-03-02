import React, {useRef, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {

const [Btn, setBtn] = useState(false)

const refwolverine = useRef(null)

useEffect(() => {
  refwolverine.current.classList.add("startingImg");
  setTimeout(
      ()=>{refwolverine.current.classList.remove("startingImg");
           setBtn(true); 
    },1000)
}, [])

const setleftImg =()=>{
  refwolverine.current.classList.add("leftImg")
}

const setrightImg =()=>{
  refwolverine.current.classList.add("rightImg")
}

const clearImg = () =>{
  if(refwolverine.current.classList.contains("leftImg")){
    refwolverine.current.classList.remove("leftImg")
  } else if (refwolverine.current.classList.contains("rightImg")){
    refwolverine.current.classList.remove("rightImg")
  }
}

const displayBtn = Btn && (
  <>
    <div  onMouseOver={setleftImg}  onMouseOut={clearImg} className='leftBox'>
        <Link to="/signup" className='btn-welcome'>Inscription</Link>
      </div>
      <div  onMouseOver={setrightImg} onMouseOut={clearImg} className='rightBox'>
        <Link to="/login" className='btn-welcome'>Connexion</Link>
      </div>
  </>
)

  return (
    <main  ref={refwolverine} className='welcomePage'>
      {displayBtn}
    </main>
  )
}

export default Landing