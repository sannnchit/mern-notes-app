import {React, useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import NoNotes from '../components/NoNotes';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import './HomePage.css';

const HomePage =()=>{
    const [notes, setNotes] = useState([]);
    const [loading, setLoading]= useState(false);

    useEffect(()=>{
        const fetchNotes = async ()=>{
            try{
                const res= await api.get('/notes');
                setNotes(res.data);
            }
            catch(error){
                console.log("Error in fetchNotes: ",error);
            }
        }
        fetchNotes();
    },[])

    return (
        <div className="homepage">
            <div className="sidebar">
                <Navbar />
            </div>
            {notes.length===0 && 
                <div className='content'>
                    <NoNotes />
                </div>
            }
            {notes.length > 0 && (
                <div className='content'>
                    {notes.map((note)=>(
                        <NoteCard key={note._id} note={note} setNotes={setNotes} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomePage;