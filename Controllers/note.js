const Note = require('../models/note');
const { validationResult } = require('express-validator')

const bodyValidate = (req, res)=> {

    const result = validationResult(req);

    const hasErrors = !result.isEmpty();

    if(hasErrors){

        return res.status(422).json({
            statusCode: 0,
            message: 'Invalid body requres',
            errors: result.array({onlyFirstError: true})
        })
    }
}


exports.getAllNotes = async(req, res, next)=> {
    const notes = await Note.find({ createdBy: req.user.id})
    res.status(200).json({
        error: false,
        status: 1,
        data: notes
    })
};

exports.createNotes = async(req, res, next) => {

    bodyValidate(req, res);

    try {
        const obj = req.body;
        const newNote =  new Note(obj);
        newNote.createdBy = req.user.id;
        const note = await newNote.save();
        res.status(200).json({
            error: false,
            status: 1,
            message: "Note Add successfull",
            data: note
        })
    } catch (error) {
        error.status = 400;
        next(error);
    }

};

exports.getNoteById = async(req, res, next) => {

    bodyValidate(res, req);

    try {
        
        const id = req.params.id;
        
        const note = await Note.findById(id);

        res.status(200).json({
            error: false,
            status: 1,
            message: "success",
            data: note
        })
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.updateNote = async(req, res, next) => {

    const id = req.params.id
    
    try {
        
        await Note.findByIdAndUpdate(id, req.body, {new:true})
                .then((note) => {
                    res.status(200).json({
                        error:false,
                        status:1,
                        message: "Note updated successfull",
                        data:note
                    })
                }).catch((error)=> {
                    error.status = 400;
                    next(error)
                })

    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.deleteNote = async(req, res, next) => {

    bodyValidate(req, res);

    try {
        
        const id = req.params.id;

        await Note.findByIdAndRemove(id)
                    .then((note)=>{
                        res.status(200).json({
                            error:false,
                            status:1,
                            message:"Note deleted successfull",
                            data:note
                        })
                    })
    } catch (error) {
        error.status = 400;
        next(error);
    }
};