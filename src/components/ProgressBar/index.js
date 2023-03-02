import React from 'react'

const ProgressBar = ({idQuestion,maxQuestions}) => {

  const actualQuestion=idQuestion + 1;
  const GetWidth =(total,question)=>{
    return (100/total)*question
  }

  const progressPercent=GetWidth(maxQuestions,actualQuestion);

  return (
    <>
     <div className='percentage'>
        <div className='progressPercent'>{`Question : ${actualQuestion}/${maxQuestions}`}</div>
        <div className='progressPercent'>{`Progression ${progressPercent}%`}</div>
    </div>
    <div className='progressBar'>
    <div className='progressBarChange' style={{width:`${progressPercent}%`}}></div>
    </div>
    </>
   
  )
}

export default React.memo(ProgressBar) //ajout Memo pou réviter les rechargements inutiles