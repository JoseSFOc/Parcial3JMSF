const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.findAll);
router.post('/', userController.create);
router.get('/:id', userController.findById);
router.delete('/:id', userController.delete);
router.put('/:id', userController.put);

module.exports = router;