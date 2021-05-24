const Note = require('../models/note');
const note = require('../models/note');

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
    res.status(200).status({
        error: false,
        status: 1,
        data: data
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
            message: 'Note created successfull'
        })
    } catch (error) {
        error.status = 400;
        next(error);
    }

};

exports.getNoteById = async(req, res, next) => {};

exports.updateNote = async(req, res, next) => {};

exports.deleteNote = async(req, res, next) => {};