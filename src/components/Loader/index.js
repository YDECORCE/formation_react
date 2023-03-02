import React from 'react'

const Loader = ({loadingMsg, styling}) => {
  return (
   <>
   <div className='loader'></div>
    <p className='loaderText' style={styling}>{loadingMsg}</p>
   </>
  )
}

export default React.memo(Loader)