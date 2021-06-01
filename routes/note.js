const router = require('express').Router();
const controller = require('../Controllers/note');
const auth = require('../middlewares/auth');
const { body, query, check } = require('express-validator');

router.get('/notes',auth, controller.getAllNotes);

router.post('/note/create',auth, [
    body('title', 'title is required').isString(),
    body('content', 'content is required').isString(),
    body('description', 'description is required').isString(),
    body('category', 'category is required').isString()
], controller.createNotes);

router.get('/note/:id',auth, controller.getNoteById);
router.put('/note/:id',auth, controller.updateNote);
router.delete('/note/:id',auth, controller.deleteNote);

module.exports = router;