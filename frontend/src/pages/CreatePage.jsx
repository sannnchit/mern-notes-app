import {React, useState} from 'react';
import {Link} from 'react-router';
import { useNavigate } from 'react-router';
import api from '../lib/axios';
import './CreatePage.css';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] =useState("");
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  const handleSubmit= async()=>{
    if(loading) return;
    setLoading(true);
    try{
      await api.post('/notes',{title,content});
      console.log("Created note successfully!");
      navigate("/");
    }
    catch(error){
      console.log("Error in handleSubmit");
      window.alert("Couldn't create note");
    }
    finally{setLoading(false)}
  }
  return (
    <div className="createpage">
        <Link to="/" className="goBack">Back to Home Page</Link>
        <form className="createform" onSubmit={(e)=> {e.preventDefault(); handleSubmit();}}>
          <label className="title0">Title :</label>
          <input type="text" className='title1' placeholder="Enter the title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <label className="content0">Content :</label>
          <textarea className='content1' placeholder="Enter the content" value={content} onChange={(e)=>setContent(e.target.value)} />
          <button disabled={loading} className="savebtn">{loading ? "Saving..." : "Create" }</button>
        </form>
    </div>
  )
}

export default CreatePage