import { useState } from 'react';

import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = process.env.REACT_APP_host
  //GET ALL NOTES
  const [loaders,setLoaders] =useState(false)
  const getNotes = async () => {
    const url = `${host}api/notes/fetchallnotes`

    //API CALL
    setLoaders(true)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json()
      setLoaders(false)
      setNotes(json)
    }
    catch (err) {
      console.log("Error In Server")
      setLoaders(false)
      props.showAlert("Error from server side", "danger")
    }
  }
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Add a Note
  const addNote = async (title, description, tag) => {
    const url = `${host}api/notes/addnote`

    setLoaders(true)
    //API CALL
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title: title, description: description, tag: tag })
      })
      const note = await response.json()

      setNotes(notes.concat(note))  //here use concat() method instead of push() method because concat() add the parameter value to the existing array and return the whole array but push
      setLoaders(false)
      props.showAlert("Data Inserted Successfully","success") 
    }
    catch (err) {
      setLoaders(false)
      props.showAlert("Failed to add New Notes", "danger")
    }
  }

  //Delete a Note
  const deleteNote = async (id) => {

    //Api Call
    const url = `${host}api/notes/deletenote/${id}`
    //API CALL
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json()
      console.log(json)
      props.showAlert("Your note Deleted Successfully","success")
      // console.log("deleting the note with this id"+id)
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
     
    }
    catch (err) {
      props.showAlert("Failed to deleting the node", "danger")
    }

  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}api/notes/updatenote/${id}`
    //API CALL
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      })
      const json = await response.json()


      let newNotes = JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index]
        if (element._id === id) {
          // console.log('i run')
          newNotes[index]._id = id;
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }

      }
      setNotes(newNotes)
      props.showAlert("Updated Successfully","success")
    }
    catch (err) {
      props.showAlert("Failed to Update Your note", "danger")
    }

  }

  return (
    // in the next line in value's parameter  update is a function which pass as a object value and this function can call from another component
    <NoteContext.Provider value={{ notes: notes, addNote: addNote, deleteNote: deleteNote, editNote: editNote, getNotes: getNotes,loaderState:loaders }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;