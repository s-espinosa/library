const express = require('express');
const router  = express.Router();
const papersController = require('../../../controllers/papers_controller')
const footnotesController = require('../../..//controllers/footnotes_controller')

router.get('/', papersController.index);
router.post('/', papersController.create);
router.post('/:id/footnotes', footnotesController.create);

module.exports = router
