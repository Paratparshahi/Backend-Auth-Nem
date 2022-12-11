const express = require('express');
const {notesmodel } = require('../Models/NoteModel')
const Notes = express.Router();

Notes.get("/",async (req,res)=>{
   const note = await notesmodel.find();
   res.send(note);
});

Notes.post('/create' ,async (req,res)=>{
    const payload = req.body;
    const new_note=await new notesmodel(payload);
    new_note.save();
    res.send("notes created");

});

Notes.patch("/update/:id",async (req,res)=>{
    const id = req.params.id;
    const userId = req.body.userId;
    const note = await notesmodel.findOne({_id:id});
    if(userId !== note.userId){
        res.send("Not authorised");
    }else{
        await notesmodel.findByIdAndUpdate({_id:id},req.body);
        res.send("Note updated Successfully")
    }
});

Notes.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    const userId = req.body.userId;
    const note = await notesmodel.find({_id:id});
    if(userId !== note.userId){
        res.send("Not authorised");
    }else{
        await notesmodel.findByIdAndDelete({_id:id});
        res.send("Note updated Successfully")
    }
}) 

module.exports ={Notes}