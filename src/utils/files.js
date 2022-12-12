const { throws } = require('assert');
const fs = require('fs');

module.exports = class fileClass{
    filename;

    constructor(filename) {
        this.filename = filename
    }


    /**
     * allow to read in file to perform an action with a callback
     * @param {function} callback 
     */
    retreiveData (callback) {

        try {
            fs.readFile(this.filename, 'utf8', callback)

        } catch (error) {
            console.error(error)
        }
    }

    /**
     * allow to write in a file with given data
     * @param {Object} data 
     * @param {function} callback 
     */
    writeData(data, callback) {
        try {

            this.retreiveData((err, items)=>{
                if(err) throw err
                const todos = JSON.parse(items)
                // console.log(typeof todos)
                const newData = JSON.stringify([...todos, data], null, 4)
                // console.log(newData)
                fs.writeFile(this.filename, newData, 'utf8', callback)
            });

            

        } catch (error) {
            console.error(error)
        }
    }


    /**
     * delete specific data in the file
     * @param {number} id 
     * @param {function} callback 
     */
    deleteData(id, callback) {
        try {

            this.retreiveData((err, items) => {

                if(err) throw err;

                const data = JSON.parse(items)
                delete data[id]
                console.log(data)
                fs.writeFile(this.filename,JSON.stringify(data, null, 4), 'utf8', callback)

            })
        } catch (error) {
            console.error(error)
        }
    }
    
}

/**
 * get lenght of file array table
 * @param {string} filname 
 * @returns number
 */
module.exports.getArrayLength =  (filname)=>{
    try {
        const data =  JSON.parse(fs.readFileSync(filname, 'utf8'))
    
        return data.length
        
    } catch (error) {
        console.log(error)
    }

    

}