// List of routes and the controller that will be executed.
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.form.js');
router.get('/', controllers.findForms );
router.get('/inputs/:id', controllers.findInputsValues);
router.post('/', controllers.createNewForm);
router.post('/inputs', controllers.createNewInputValue);
router.get('/:id', controllers.findForms );
router.delete('/:id', controllers.delete);
router.put('/:id', controllers.updateForm);
module.exports = router;
