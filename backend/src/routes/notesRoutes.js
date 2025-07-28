import express from 'express';
import { getNote, getOneNote, createNote, updateNote, deleteNote } from '../controllers/notesController.js';

const router=express.Router();

router.get("/",getNote);
router.get("/:id",getOneNote);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;