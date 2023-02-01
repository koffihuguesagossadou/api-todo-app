const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testfirebase-792e2-default-rtdb.firebaseio.com"
});

const database = admin.database();

function checkChild(ref,key) {
    const dataRef = database.ref(ref)

    return{
        exists : async ()=>{
            const refKey = dataRef.child(key)
            const existence = await refKey.get().then(
                result=>{
                    return result.exists()
                }
            )

            return existence
        }
    }
}

exports.crud = (ref)=> {

    const dataRef = database.ref(ref)

    /**
     * Check if a key exist
     *
     * @param {string} key The number to raise.
     * @return {boolean} true if key exists, false otherwise
     */

    
    return{
        on: () =>{

            return new Promise((resolve, reject)=>{
                dataRef.on('value', snapShot=>{
                    resolve(snapShot.val())
                })
            })
        },


        push : (data) =>{
            return dataRef.push(data)
        },


        remove: (id)=>{
            
            const remove = checkChild(ref,id).exists()
                .then(isExist=>{
                    if (isExist) {
                        dataRef.child(id).remove()
                        return true
                    }
                    return false;
                })
                
            return remove;
            /*return refKey.child(id)*/
            // if( isKeyExist(id) ){

            //     dataRef.child(id).remove()
            //     return true;
            // }
            // return false;
        },


        update : (data, id) =>{
            const update = checkChild(ref,id).exists()
                .then(isExist=>{
                    if (isExist) {
                        dataRef.child(id).set(data);
                        return true;
                    }
                    return false;
                })

            return update;
        }

    }
}