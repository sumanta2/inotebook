import React,{useContext, useEffect} from "react";
import noteContext from "../context/notes/noteContext";

const About =()=>{
    const a=useContext(noteContext)
    useEffect(()=>{
        a.update()
    },[])
    return(
        <>
            This is About Page {a.state.name} and he is in class {a.state.class}
        </>
    )
}

export default About;