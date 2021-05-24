const router = require('express').Router();
const controller = require('../Controllers/note');
const auth = require('../middlewares/auth');

router.get('/notes',auth, controller.getAllNotes);
router.post('/note/create',auth, controller.createNotes);
router.get('/note/:id',auth, controller.getNoteById);
router.put('/note/:id',auth, controller.updateNote);
router.delete('/note/:id',auth, controller.deleteNote);

module.exports = router;