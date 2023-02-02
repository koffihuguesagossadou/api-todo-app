require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const todosRoute =  require('./routes/todosRoute')

const port = process.env.PORT || '4000'

const apiEndpoint = "/api"
const whitelist = [ 
    'https://doit-todo.netlify.app/',
] 
const corsOptions = {
origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
    callback(null, true)
    } else {
    callback(new Error('Not allowed by CORS'))
    }
}
}

// setup CORS origin
if (process.env.NODE_ENV === 'prod') {
    app.use(cors(corsOptions))
}else{
    app.use(cors())
}


// set up bodyParser for json responses
app.use(bodyParser.json())

// Express app routes
app.use(apiEndpoint, todosRoute)

// index route
app.get('/', function (req, res, next) {
    res.send('You should call api on /api/* endpoint')
})

// Listen app
app.listen(port, ()=> {
    console.log(`api-app-todo listening on port ${port}`)
})