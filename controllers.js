const Contact = require('./models/model_contact')
const Group = require('./models/model_group')
const View = require('./views')

class Controller{
    constructor() {
        
    }

    static checkSyntax(syntax, table, value1, value2, value3){
        if(syntax == 'select'){
            if(table == 'contacts'){
                Contact.showContact(View.showContact)
            }
            else if(table == 'groups'){
                Group.showGroup(View.showGroup)
            }
            else{
                console.log('node main.js select <table>')
            }
        }

        else if(syntax == 'insert'){
            if(table == 'contacts'){
                Contact.addContact(value1, value2, value3, ()=> {
                    Contact.showContact(View.showContact)
                })
            }
            else if(table == 'groups'){
                Group.addGroup(value1, () => {
                    Group.showGroup(View.showGroup)
                })
            }
            else{
                console.log('node main.js insert <table>')
            }
        }
        else if(syntax == 'update'){
            if(table == 'contacts'){
                console.log('Update Table', table, 'ID', value1)
            }
            else if(table == 'groups'){
                console.log('Update Table', table, 'ID', value1)
            }
            else{
                console.log('node main.js update <table> <id>')
            }
        }
        else if(syntax == 'delete'){
            if(table == 'contacts'){
                console.log('Delete Table', table, 'ID', value1)
            }
            else if(table == 'groups'){
                console.log('Delete Table', table, 'ID', value1)
            }
            else{
                console.log('node main.js delete <table> <id>')
            }
        }
    }

}

module.exports = Controller