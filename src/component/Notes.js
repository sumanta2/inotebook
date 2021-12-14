//https://youtu.be/GQ0PzxV2p9k this video help to implement modal in react-js 
import React, { useState, useContext, useEffect } from 'react';
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import Noteitem from './Noteitem'
import { Button, Modal} from 'react-bootstrap';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes,editNote} = context
    const [note,setNote]=useState({id:'',etitle:'',edescription:'',etag:''})
    const [modalOpen, modalOpenSet] = useState()
    useEffect(() => {
        getNotes()
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
        console.log("Updating the note"+note.etitle)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        modalOpenSet(!modalOpen)
        // addNote(note.title,note.description,note.tag)
    }
    return (
        <>
            <AddNote />
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
                        <Button onClick={handleClick}>Update Note</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>
    )
}
export default Notes;