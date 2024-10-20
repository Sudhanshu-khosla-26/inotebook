import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useState } from 'react';

const AddNote = (props) => {
  const context = useContext(noteContext)
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: "default"})
  const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added successfully", "success")
  }
  const onchange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
  }
  
  
  return (
    <div className="container my-3">
    <h2>Add a Note</h2>
    <form className='my-3'>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onchange} required minLength={5}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={onchange}  required minLength={5}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" value={note.tag} id="tag" name='tag' onChange={onchange} />
      </div>
      
      <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary"  onClick={handleClick}>Add Note</button>
    </form>
    </div> 
  )
}

export default AddNote
