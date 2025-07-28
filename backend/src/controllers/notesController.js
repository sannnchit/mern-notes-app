import Note from "../models/Note.js";

export async function getNote(req,res) {
    try{
        const notes= await Note.find();
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error in getNote: ",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getOneNote(req, res){
    try{
        const getNote= await Note.findById(req.params.id);
        if(!getNote) return res.status(404).json({message: "Couldnt find Note"});
        res.status(200).json(getNote);
    }
    catch(error){
        console.error("Error in getOneNote", error);
        res.status(500).json({message: "Server Error"});
    }
}

export async function createNote(req,res) {
    try{
        const {title, content} = req.body;
        const newNote= new Note({title: title, content:content});
        const created= await newNote.save();
        if(!created) return res.json({message: "Please provide proper data"});
        res.status(201).json({message: "Successfully created Note", created});
    }
    catch(error){
        console.error("Error in createNote: ", error);
        res.status(500).json({message: "Server error"});
    }
}   
export async function updateNote(req,res) {
    try{
        const {title, content} =req.body;
        const updated= await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});
        if(!updated) return res.status(404).json({message: "Couldnt find note"});
        res.status(200).json({message: "Successfully updated note", updated});
    }
    catch(error){
        console.error("Error in updateNote: ", error);
        res.status(500).json({message: "Server Error"});
    }
}   
export async function deleteNote(req,res) {
    try{
        const deleted= await Note.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message: "Couldnt find note"});
        res.status(200).json({message: "Deletion successful", deleted});
    }
    catch(error){
        console.error("Error in deleteNode", error);
        res.status(500).json({message: "Server Error"});
    }
}