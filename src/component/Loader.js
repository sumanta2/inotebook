import React,{useEffect} from 'react'
import lottie from 'lottie-web'
import loading from '../animation/9764-loader.json'

const Loader=()=>{
    useEffect(()=>{
        lottie.loadAnimation({
            container: document.querySelector("#react_logo"),
            animationData:loading,
          });
    })
    
    return(
        <div className=' d-flex flex-column justify-content-center align-items-center' style={{'width':'80vw', 'height':'76vh'}}>
        {/* <h1>This ls loader page</h1> */}
        <div id="react_logo" style={{'width':'100vw', 'height':'46vh'}}>

        </div>
    </div>
    )
}
export default Loader;