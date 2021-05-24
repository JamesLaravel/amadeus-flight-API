const router = require('express').Router();

const controller = require('../Controllers/note');

router.get('/notes', controller.getAllNotes);
router.post('/note/create',  controller.createNotes);
router.get('/note/:id', controller.getNoteById);
router.put('/note/:id', controller.updateNote);
router.delete('/note/:id', controller.deleteNote);

module.exports = router;