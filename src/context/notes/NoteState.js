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
          }
      ]
      const [notes, setNotes]= useState(notesInitial)

      //Add a Note
      const addNote=(title,description,tag)=>{
        console.log("Adding a new NOte")
        const note={
          
          "_id": "6180af5083730bd65ca562iu5yt",
          "user": "617cd7c14430a42e6770b2a1",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "1635823440488",
          "__v": 0
        }
        setNotes(notes.concat(note))  //here use concat() method instead of push() method because concat() add the parameter value to the existing array and return the whole array but push 
      }

      //Delete a Note
      const deleteNote=(id)=>{
        
      }

      //Edit a Note
      const editNote=(id)=>{
        
      }
    
    return (
        // in the next line in value's parameter  update is a function which pass as a object value and this function can call from another component
        <NoteContext.Provider value={{notes:notes,addNote:addNote,deleteNote:deleteNote,editNote:editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;