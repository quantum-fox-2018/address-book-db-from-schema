const Contact = require('./models/model_contact')
const Group = require('./models/model_group')
const ContactGroup = require('./models/model_contact-group')
const View = require('./views')

class Controller{
    constructor() {
        
    }
    
    static checkSyntax(syntax, table, value1, value2, value3, value4){
        let helplist = ['node main.js show <table>',
                'node main.js insert <table> <value>',
                'node main.js update <table> <id> <value>',
                'node main.js delete <table> <id>',
                'node main.js assign <contact_name> <group_name>'
            ]
        if(syntax == 'help'){
            
            console.log(helplist.join('\n'))
        }
        else if(syntax == 'show'){
            if(table == 'contacts'){
                Contact.showContact(View.showContact)
            }
            else if(table == 'groups'){
                Group.showGroup(View.showGroup)
            }
            else{
                console.log('node main.js show <table>')
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
                Contact.updateContact(value1, value2, value3, value4, ()=> {
                    Contact.showContact(View.showContact)
                })
            }
            else if(table == 'groups'){
                Group.updateGroup(value1, value2, () => {
                    Group.showGroup(View.showGroup)
                })
            }
            else{
                console.log('node main.js update <table> <id>')
            }
        }
        else if(syntax == 'delete'){
            if(table == 'contacts'){
                Contact.deleteContact(value1)
            }
            else if(table == 'groups'){
                Group.deleteGroup(value1)
            }
            else{
                console.log('node main.js delete <table> <id>')
            }
        }
        else if(syntax == 'assign'){
            ContactGroup.assignGroup(table, value1, () => {
                setTimeout(() => {
                    Contact.showContact(View.showContact)
                }, 3000);
            })
        }
        else{
            console.log('Your Syntax Wrong...Try Again...')
            console.log(helplist.join('\n'))
        }
    }
    

}

module.exports = Controller