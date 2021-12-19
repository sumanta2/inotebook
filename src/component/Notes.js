//https://youtu.be/GQ0PzxV2p9k this video help to implement modal in react-js 
import React, { useState, useContext, useEffect } from 'react';
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import Noteitem from './Noteitem'
import { Button, Modal} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes,editNote} = context
    const [note,setNote]=useState({id:'',etitle:'',edescription:'',etag:''})
    const [modalOpen, modalOpenSet] = useState()
    const history=useHistory()
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes()
        }
        else{
            props.showAlert("Login Required to access Note","danger")
            history.push("/login")
        }
        modalOpenSet(false)
    }, [])
    // const ref=useRef()
    const updateNote = (oldNote) => {
        setNote({id:oldNote._id,etitle:oldNote.title,edescription:oldNote.description,etag:oldNote.tag})
        handleModal()

    }
    const handleModal = () => {
        modalOpenSet(!modalOpen)
    }

    // const addNote=()=>{

    // }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick=(e)=>{
        //console.log("Updating the note"+note.etitle)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        modalOpenSet(!modalOpen)
        props.showAlert("Updated Successfully","success")

        // addNote(note.title,note.description,note.tag)
    }
    return (
        <>
            <AddNote  showAlert={props.showAlert}/>
            <div>
                <Modal show={modalOpen} onHide={() => { handleModal() }}>
                    <Modal.Header closeButton>Edit Note</Modal.Header>
                    <Modal.Body>
                        <form className='my-3'>
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={(e)=>{onChange(e)}} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={(e)=>{onChange(e)}} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={(e)=>{onChange(e)}} />
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { handleModal() }}>Close</Button>
                        <Button onClick={handleClick} disabled={ note.etitle.length<5 || note.edescription.length< 5}>Update Note</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container mx-3">
                {notes.length===0 && 'No notes to display'}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                    })
                }
            </div>
        </>
    )
}
export default Notes;