const express = require('express');
const fs = require('fs');
const fileClass = require('../utils/files')
const {getArrayLength} = require('../utils/files')
const Todo = require('../models/todosModel')

const todoFile = process.cwd() + '\\src\\data\\todos.json'

// instance of fileClass with json file given as parameter
const todosFile = new fileClass(todoFile)

exports.getTodos = (req, res)=>{

    // retreive all data and send it to the client
    todosFile.retreiveData(
        (err, data)=>{
            const todos = JSON.parse(data)
            return res.json(todos)
        }
    )

}

exports.addTodo = (req, res) => {
    
    if(!req.body.text || !req.body.Tags){
        res.json("Bad request");
    }else{

        // console.log(req.body)
        let genId = getArrayLength(todoFile)
        
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
    
}


exports.deleteTodo = (req, res)=>{
    const id = req.params.id
    // console.log(getArrayLength(todoFile))
    // console.log(id)
    todosFile.deleteData(id, err=>{
        if(err) throw err

        console.log(getArrayLength(todoFile))
        res.json("items delete")
        
    })
}