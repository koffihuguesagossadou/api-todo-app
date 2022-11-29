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
            console.log(this.filename)

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
    
}


module.exports.getArrayLength =  (filname)=>{
    try {
        const data =  JSON.parse(fs.readFileSync(filname, 'utf8'))
    
        return data.length
        
    } catch (error) {
        
    }

    

}