const express = require('express');
const app = express();
const todosRoute =  require('./routes/todosRoute')
const port = 5000

const apiEndpoint = "/api"

app.use(apiEndpoint, todosRoute)

app.listen(port, ()=> {
    console.log(`api-app-todo listening on port ${port}`)
})