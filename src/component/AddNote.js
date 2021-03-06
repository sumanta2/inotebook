import React, {useState, useContext} from 'react';
import noteContext from "../context/notes/noteContext"
import Loader from './Loader'

const AddNote=(props)=>{
    const context=useContext(noteContext)
    const {addNote,loaderState}=context;

    const [note,setNote]=useState({title:'',description:'',tag:''})
    
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        // props.showAlert("Data Inserted Successfully","success")

        setNote({title:'',description:'',tag:''})
    }

    if (loaderState)
    {
        return <Loader/>
    }

    return(
        <div>
            <h2>Add a Note</h2>
            <div className='container'>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
                </div>
                
                <button type="submit" disabled={ note.title.length<5 || note.description.length< 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
            </div>
        </div>
    )
}


export default AddNote;