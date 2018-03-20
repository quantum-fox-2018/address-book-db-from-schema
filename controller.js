const View = require('./view.js')
const Contact = require('./contact.js')

class Controller {

    static contactCmd(input) {

        if(input[0] == 'getContact') {

            Contact.getContacts(function(dataContact){

                View.show(dataContact)
            })
        }

        if(input[0] == 'addContact') {

            let name = input[1]
            let address = input[2]
            let phone = input[3]

            Contact.addContact(name, address, phone, function(pesan){
            View.show(pesan)
            })
        }

        if(input[0] == 'updateContactNumber') {

            let id = input[1]
            let phone = input[2]

            Contact.updateContact(id, phone, function(pesan) {
            View.show(pesan)
            })
        }

        if(input[0] == 'deleteContact') {

            let id = input[1]

            Contact.deleteContact(id, function(pesan) {
            View.show(pesan)
            })
        }
    }
}

module.exports = Controller