import React,{useEffect} from 'react'
import lottie from 'lottie-web'
import Error404Animation from '../animation/84918-404-error-doodle-animation.json'
//import  '../../public/84918-404-error-doodle-animation.json'

const NotFound=()=>{
    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#react_logo"),
          animationData:Error404Animation,
        });
      }, []);
    return(
    <div className=' d-flex flex-column justify-content-center align-items-center' style={{'backgroundColor':'rgb(153 233 255)','width':'80vw', 'height':'76vh'}}>
        <h1>404 not found</h1>
        <div id="react_logo" style={{'width':'100vw', 'height':'46vh'}}>

        </div>
    </div>
    )

}

export default NotFound;