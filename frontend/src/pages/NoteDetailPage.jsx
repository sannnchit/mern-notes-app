import {React, useState, useEffect} from 'react';
import{Link, useNavigate, useParams} from 'react-router';
import api from '../lib/axios';
import './NoteDetailPage.css';

const NoteDetailPage = () => {
  const [note, setNote]=useState("");
  const [loading, setLoading]= useState(true);
  const [saving, setSaving] = useState(false);
  const {id}= useParams();
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchNote= async ()=>{
      try{
        const res=await api.get(`/notes/${id}`);
        setNote(res.data);
        console.log(res.data);
      }
      catch(error){
        console.log("Error in fetchNote");
        window.alert("Couldn't fetch the Note");
      }
      finally{setLoading(false)};
    };
    fetchNote();
  },[id]);
  
  const handleDelete=async()=>{
    try{
      if(!window.confirm("Are you sure you want to delete this note?")) return; 
      await api.delete(`/notes/${id}`);
      console.log("Deleted successfully");
      navigate('/');
    }
    catch(error){
      console.log("Error while deleting note");
    }
  };

  const handleSubmit=async()=>{
    setSaving(true);
    try{
      await api.put(`/notes/${id}`,note);
      console.log("Successfully updated the note");
      navigate('/');
    }
    catch(error){
      console.log("Error in handleSubmit");
    }
    finally{setSaving(false)};
  };

  if(loading){return <div>Loading... Please wait</div>}

  return (
    <div className="notedetailpage">
      <Link to="/"  className="goback2">Back to Home Page</Link>
      <button className='detaildelete' onClick={(e)=>handleDelete(e)}>Delete Note</button>
      <form className='updateform' onSubmit={(e)=>{e.preventDefault(); handleSubmit(); }}>
        <label className="title2">Title :</label>
        <input className='title3' type='text' value={note.title} onChange={(e)=>setNote({...note, title:e.target.value})} />
        <label className="content2">Content :</label>
        <textarea className='content3' value={note.content} onChange={(e)=>setNote({...note, content:e.target.value})} />
        <button className='detailsubmit' disabled={saving} type='submit'>{saving ? "Updating..." : "Update"}</button>
      </form>
    </div>
  )
}

export default NoteDetailPage;