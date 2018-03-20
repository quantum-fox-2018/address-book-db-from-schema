class Controller{
    constructor() {
        
    }

    static checkSyntax(syntax, table, value1, value2, value3){
        if(syntax == 'insert'){
            if(table == 'contacts'){
                console.log('Insert Table', table)
            }
            else if(table == 'groups'){
                console.log('Insert Table', table)
            }
            else{
                console.log('node main.js insert <table>')
            }
        }
    }

}

module.exports = Controller