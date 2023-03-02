import React ,{useEffect, useState} from 'react'
import Stepper from 'react-stepper-horizontal/lib/Stepper'

const Levels = ({levelNames, quizLevel}) => {

const [levels, setLevels] = useState([])

useEffect(() => {
  const quizSteps = levelNames.map(level=>({title: level.toUpperCase()}))
  setLevels(quizSteps)

 
}, [levelNames])


  return (
    <div className='levelsContainer' style={{
      background:'transparent'
    }}>
    
          <Stepper 
              steps={ levels } 
              activeStep={ quizLevel }
              activeColor={"#EB1D27"} 
              activeTitleColor={"#EB1D27"} 
              completeColor={"#EB1D27"} 
              size={48}
              circleFontSize={24}
              />
      
    </div>
  )
}

export default React.memo(Levels)