const express = require('express');
const router= express.Router();
const controllerTodos = require('../controllers/todosController')

const route = 'todo'
router.get(route+'/getTodos', controllerTodos.getTodos)

module.exports = router;