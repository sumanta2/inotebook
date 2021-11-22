import {useState} from 'react';

import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host="http://localhost:5000/"
  //GET ALL NOTES
  const getNotes= async ()=>{
    const url=`${host}api/notes/fetchallnotes`

      //API CALL
      const response= await fetch(url,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Y2Q3YzE0NDMwYTQyZTY3NzBiMmExIn0sImlhdCI6MTYzNTY3NDQxNX0.eR0JZA1kd5gKHQr-TCg_SgidVOTvptDePsGTWgdhcSo'
        }
      })
      const json= await response.json()
      console.log("Adding a new NOte",json)
      setNotes(json)
      }
    const notesInitial=[]
      const [notes, setNotes]= useState(notesInitial)

      //Add a Note
      const addNote= async (title,description,tag)=>{
      const url=`${host}api/notes/addnote`

        //API CALL
        const response= await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Y2Q3YzE0NDMwYTQyZTY3NzBiMmExIn0sImlhdCI6MTYzNTY3NDQxNX0.eR0JZA1kd5gKHQr-TCg_SgidVOTvptDePsGTWgdhcSo'
          },
          body:JSON.stringify({title:title,description:description,tag:tag})
        })
        const json=response.json()
        console.log("Adding a new NOte")
        const note={
          
          "_id": "6180af508373bd65ca562i9ya8t",
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

        const newNotes= notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes)
        
      }
      //Edit a Note
      const editNote= async (id,title,description,tag)=>{
        const url=`${host}api/notes/updatenote/${id}`
        //API CALL
        const response= await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Y2Q3YzE0NDMwYTQyZTY3NzBiMmExIn0sImlhdCI6MTYzNTY3NDQxNX0.eR0JZA1kd5gKHQr-TCg_SgidVOTvptDePsGTWgdhcSo'
          },
          body:JSON.stringify({title,description,tag})
        })
        const json=response.json()
        
        for(let index=0;index<notes.length;index++)
        {
          const element=notes[index]
          if(element._id=== id)
          {
            element._id=id;
            element.title=title;
            element.tag=tag
          }

        }

      }
    
    return (
        // in the next line in value's parameter  update is a function which pass as a object value and this function can call from another component
        <NoteContext.Provider value={{notes:notes,addNote:addNote,deleteNote:deleteNote,editNote:editNote,getNotes:getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;