const express = require('express');
const router= express.Router();
const controllerTodos = require('../controllers/todosController')

const route = '/todo'

router.get(route+'/getTodos', controllerTodos.getTodos)
router.post(route+'/addTodos', controllerTodos.addTodo)
router.delete(route+'/deleteTodo/:id', controllerTodos.deleteTodo)
router.put(route+'/updateTodo/:id', controllerTodos.updateTodo)
module.exports = router