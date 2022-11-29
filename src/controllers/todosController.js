const express = require('express');
const fs = require('fs');
const fileClass = require('../utils/files')
const {getArrayLength} = require('../utils/files')
const Todo = require('../models/todosModel')

const todos = process.cwd() + '\\src\\data\\todos.json'

// instance of fileClass with json database givn as parameter
const todosFile = new fileClass(todos)

exports.getTodos = (req, res)=>{
    
    

    // retrive all data and send it to the client
    todosFile.retreiveData(
        (err, data)=>{
            const todos = JSON.parse(data)
            return res.json(todos)
        }
    )

}

exports.addTodo = (req, res) => {
    
    // console.log(req.body)
    let genId = getArrayLength(todos)
    
    if (!(typeof genId === 'number')) {
        
    }
    else{
        const date = new Date()
        const todo = {
            id: genId +1,
            text : req.body.text,
            created_at: date.toUTCString(),
            Tags : req.body.Tags
        }

        // add client data to file
        todosFile.writeData(todo, err => {
            if(err)
            {
                console.log(err)
            }else{
                res.json("ok sir")
            }
        })
    }
    

    
}