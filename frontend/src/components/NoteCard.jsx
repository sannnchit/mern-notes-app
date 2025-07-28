import React from 'react';
import {Link} from 'react-router';
import api from '../lib/axios';
import './NoteCard.css';
import TrashIcon from '../images/trash-icon.svg';
import EditIcon from '../images/pencil.png';
import formatDate from '../lib/formatDate';

const NoteCard = ({note, setNotes}) => {
    const handleDelete= async (e, id)=>{
        e.preventDefault();
        if(!window.confirm("Delete this Note?")) return;
        try{
            await api.delete(`/notes/${id}`);
            console.log(`note with id ${id} deleted`);
        }
        catch(error){
            console.log("Error in handleDelete");
        }
        setNotes((prev)=> prev.filter((note)=>note._id!==id));
    }

  return (
    <Link to={`/notes/${note._id}`} className="notebox">
        <label className='notetitle0'>Title :</label>
        <div className='notetitle'>
            {note.title}
        </div>
        <label className='notecontent0'>Content :</label>
        <div className='notecontent'>
            {note.content}
        </div>
        <span>{formatDate(new Date(note.createdAt)) }</span>
        <img src={EditIcon} alt='Edit' />
        <button className="delbutton" onClick={(e)=> handleDelete(e, note._id)}><img src={TrashIcon} alt="Delete"/></button>
    </Link>
  )
}

export default NoteCard;