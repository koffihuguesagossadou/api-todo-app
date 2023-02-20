
const {crud} = require('../utils/crud');
const { removeBarckets } = require('../utils/entries')
// const admin = require("firebase-admin");
// const serviceAccount = require("../../serviceAccountKey.json");

//const todoFile = process.cwd() + '\\src\\data\\todos.json'
// instance of fileClass with json file given as parameter
//const todosFile = new fileClass(todoFile)

const todosRef = 'todos';

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://testfirebase-792e2-default-rtdb.firebaseio.com"
// });
  

// const database = admin.database();
// const dataRef = database.ref('todos')


exports.getTodos = (req, res)=>{

    // retreive all data and send it to the client
    crud(todosRef).readAll()
        .then(data=>{
            res.status(200).json({
                message:"succes",
                data: data
            })
        })
        .catch(err=>{
            res.status(200).json({
                message:"an error is occured",
                display: err.message
            })
        })

}

exports.addTodo = (req, res) => {
    
    if(!req.body.text || !req.body.tags){
        res.status(400).json({
            message:"bad request",
            description: "request parameters not define"
        });
    }else{
        const date = new Date()
        //console.log(body)
        
        const data = {
            todoName : removeBarckets(req.body.text).string(),
            tags: removeBarckets(req.body.tags).array(),
            created_at: date.toUTCString(),
            is_complete: false
        }
        

        const addTodo = crud(todosRef).create(data)
        if(addTodo!==null){
            res.status(201).json({
                key : addTodo.key,
                message: "success",
                description: "Todo added."
            })
        }else{
            res.status(201).json({
                key : addTodo.key,
                message: "fail",
                description: "Something wrong happened, please try again."
            })
        }
        
        
        
    }
    
}


exports.deleteTodo = (req, res)=>{
    
    const id = removeBarckets(req.params.id).string()

    if(!id){
        res.status(400).json({
            message: "bad request",
            description: "request parameters not defined"
        })
    }else{

        const removeItem = crud(todosRef).delete(id)
        removeItem.then(
            isDelete=>{
                if(isDelete){
                    res.json({
                        message : "success",
                        description: "your item has been deleted"
                    })
                }else{
                    res.status(200).json({
                        message : "bad request",
                        description: "this item does not exist"
                    })
                }
            }
        )
    }
}

exports.updateTodo = (req, res) => {

    const id = removeBarckets(req.params.id).string()
    const date = new Date()

    const data = {
        todoName : removeBarckets(req.body.text).string(),
        tags: removeBarckets(req.body.tags).array(),
        created_at: date.toUTCString(),
        is_complete: false
    }

    if(id){

        const updateItem = crud(todosRef).update(data, id)
        updateItem.then(isUpdate=>{
                if (isUpdate) {
                    res.json({
                        message: "success",
                        description: "Your item has been updated"
                    })    
                }else{
                    res.json({
                        message: "bad request",
                        description: "Something happen, please try again."
                    })
                }
            }
        )
    }else{
        res.status(400).json({
            message: "bad request",
            description: "the requested page does not exist"
        })
    }

}