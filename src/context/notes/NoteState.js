import {useState} from 'react';

import NoteContext from "./noteContext";


const NoteState = (props) => {
    const s1 = {
        "name": "Harry",
        "class": "5b"
    }
    const [state, setState] = useState(s1)
    const update = () => {
        setInterval(() => {
            setState({
                "name":"Tarry",
                "class":"10b"
            })
        }, 1000)
    }
    return (
        // in the next line in value's parameter  update is a function which pass as a object value and this function can call from another component
        <NoteContext.Provider value={{state:state,update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;