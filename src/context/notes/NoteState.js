import {useState} from 'react';

import NoteContext from "./noteContext";


const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "617ffac55ab9d96aa29b2bc22",
          "user": "617cd7c14430a42e6770b2a1",
          "title": "My title is this",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "1635777221149",
          "__v": 0
        },
        {
          "_id": "6180af65083730bd65ca562f6q",
          "user": "617cd7c14430a42e6770b2a1",
          "title": "My title is this",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "1635823440488",
          "__v": 0
        },
        {
            "_id": "617ff2ac5ab9d96aa29b2bc22",
            "user": "617cd7c14430a42e6770b2a1",
            "title": "My title is this",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "1635777221149",
            "__v": 0
          },
          {
            "_id": "61870af5083730bd65ca562f6T",
            "user": "617cd7c14430a42e6770b2a1",
            "title": "My title is this",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "1635823440488",
            "__v": 0
          },{
            "_id": "617ffac5ab9d96aa279b2bc22",
            "user": "617cd7c14430a42e6770b2a1",
            "title": "My title is this",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "1635777221149",
            "__v": 0
          },
          {
            "_id": "6180af5083730bd65ca562f6X",
            "user": "617cd7c14430a42e6770b2a1",
            "title": "My title is this",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "1635823440488",
            "__v": 0
          },{
            "_id": "617ffac5ab9d96aa29b2bc22",
            "user": "617cd7c14430a42e6770b2a1",
            "title": "My title is this",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "1635777221149",
            "__v": 0
          },
          {
            "_id": "6180af5083730bd65ca562f6ki",
            "user": "617cd7c14430a42e6770b2a1",
            "title": "My title is this",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "1635823440488",
            "__v": 0
          }
      ]
      const [notes, setNotes]= useState(notesInitial)
    
    return (
        // in the next line in value's parameter  update is a function which pass as a object value and this function can call from another component
        <NoteContext.Provider value={{notes:notes,setNotes:setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;