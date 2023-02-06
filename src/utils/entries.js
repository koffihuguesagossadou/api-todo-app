
/**
 * Function whom remove brackets
 * @param {string} entrie The string to parse
 * @returns A string without brackets
 */
module.exports.removeBarckets = function(entrie) {

    const regexp = /(<|>)/g

    return{
        string: ()=>{
            entrie = entrie.trim()
            return entrie.replaceAll(regexp, "")
            
        },

        array: ()=>{
            return entrie.map((value, index) =>{
                value = value.trim();
                return value.replaceAll(regexp, "")
            });
        }
    }
    
    
}
