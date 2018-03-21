const Contact = require('../model/contact.js');
//const View = require('../view.js');

class ContactController{
  static Command(param_command, cbResult){
    let command = param_command[3];

    if(param_command[4] != undefined && param_command[4] != ''){
      let contactObj = JSON.parse(param_command[4]);
      var contact = new Contact(contactObj); // pake var biar bisa di akses di bawah
      // console.log(contact);
    }

    switch (command) {
      case 'show':
      case 'Show':
      case undefined:
        Contact.show((results) => {
          cbResult(results);
        })
        break;

      case 'add':
        contact.save((results) =>{
          // View.show(results);
          cbResult(results);
        })
        break;

      case 'update':
        contact.update((results) => {
          cbResult(results);
        })
        break;

      case 'delete':
        contact.delete((results) => {
          cbResult(results);
        })
        break;

      default:
        cbResult(`${command} is not in the Program`)
    }
  }
}

module.exports = ContactController;
