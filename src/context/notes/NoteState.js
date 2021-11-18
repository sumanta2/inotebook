import {useState} from 'react';

import NoteContext from "./noteContext";


const NoteState = (props) => {
    
    return (
        // in the next line in value's parameter  update is a function which pass as a object value and this function can call from another component
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;