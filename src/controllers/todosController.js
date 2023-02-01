
const {crud} = require('../utils/crud');
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
    crud(todosRef).on()
        .then(data=>{
            res.json({
                data: data
            })
        })
        .catch(err=>{
            res.json({
                message:"An error is occured",
                display: err.message
            })
        })

}

exports.addTodo = (req, res) => {
    
    if(!req.body.text || !req.body.tags){
        res.json("Bad request");
    }else{
        const date = new Date()

        const data = {
            todoName : req.body.text,
            tags: req.body.tags,
            created_at: date.toUTCString(),
            is_complete: false
        }

        const addTodo = crud(todosRef).push(data)
        
        res.json({
            key : addTodo.key,
            message: "Successfull"
        })

        // console.log(req.body)
        /*let genId = getArrayLength(todoFile)
        
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
        }*/
    }
    
}


exports.deleteTodo = (req, res)=>{
    const id = req.params.id


    const removeItem = crud(todosRef).remove(id)
    removeItem.then(
        isDelete=>{
            if(isDelete){
                res.json({
                    message : "success"
                })
            }else{
                res.json({
                    message : "Bad request"
                })
            }
        }
    )
    
}

exports.updateTodo = (req, res) => {

    const id = req.params.id
    const date = new Date()

    const data = {
        todoName : req.body.text,
        tags: req.body.tags,
        created_at: date.toUTCString(),
        is_complete: false
    }

    if(id){

        const updateItem = crud(todosRef).update(data, id)
        updateItem.then(
            isUpdate=>{
                if (isUpdate) {
                    res.json({
                        message: "success"
                    })    
                }else{
                    res.json({
                        message: "bad request"
                    })
                }
            }
        )
    }

}