const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.form.js');
router.get('/', controllers.findForms );
router.get('/:id', controllers.findForms );
router.post('/', controllers.createFromBBDD);
router.put('/:id', controllers.updateFromBBDD);
router.delete('/:id', controllers.delete);
module.exports = router;
