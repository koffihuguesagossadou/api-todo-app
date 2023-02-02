const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testfirebase-792e2-default-rtdb.firebaseio.com"
});

const database = admin.database();

/**
 * Check if key exist
 * @param {string} ref reference to an element in database
 * @param {any} key element unique key in database
 * @returns Promise contains true if key exist, false otherwise
 */
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

/**
 * 
 * @param {string} ref reference to an element in database
 * @returns {function} crud functions (get, post, )
 */
exports.crud = (ref)=> {

    const dataRef = database.ref(ref)

    
    return{
        /**
         * retrieve dataS
         * @returns {promise} promise containing dataS
         */
        readAll: () =>{

            return new Promise((resolve, reject)=>{
                dataRef.on('value', snapShot=>{
                    resolve(snapShot.val())
                })
            })
        },

        /**
         * 
         * @param {*} data 
         * @returns 
         */
        create : (data) =>{
            return dataRef.push(data)
        },


        /**
         * delete specific data
         * @param {string} id element id to delete
         * @returns {Promise} Promise containing true if data is deleted, false otherwise
         */
        delete: (id)=>{
            
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

        /**
         * update specific data
         * @param {string} id element id to update
         * @returns {Promise} Promise containing true if data is update, false otherwise
         */
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