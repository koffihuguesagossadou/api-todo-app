require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const todosRoute =  require('./routes/todosRoute')
const {getArrayLength} = require('./utils/files')
const fileClass = require('./utils/files')
const todos = __dirname + '\\data\\todos.json'
const port = 5000


 
app.use(cors())
app.use(bodyParser.json())

const apiEndpoint = "/api"

app.use(apiEndpoint, todosRoute)
// console.log(__dirname)

// const date = new Date()

// console.log(date.toUTCString())

// const myFileClass = new fileClass(todos)

// myFileClass.deleteData(0)

// console.log(typeof getArrayLength(todos))

// myFileClass.getFileLength()

// myFileClass.readFile()

app.listen(port, ()=> {
    console.log(`api-app-todo listening on port ${port}`)
})