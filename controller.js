const View = require('./view.js');
const Database = require('./setup');
const Contact = require('./model/contact.js');



class Controller {
  static cekCommands(param_command){
    let command = param_command[2];

    switch (command) {
      case undefined:
        View.show(`Isi Nama Commands`);
        break;

      case 'setup':
        Database.setup();
        break;

      case 'show':
        let tableName = param_command[3];

        if(tableName == 'Contacts'){
          Contact.show((cbResult) =>{
            View.show(cbResult);
          });
        }else if (tableName == 'Groups') {
          //Group show in here later..
        }else{
          View.show(`${tableName} is not in Database`)
        }
        break;

      case 'addContact':
        let contactObj = JSON.parse(param_command[3]);
        let contact = new Contact(contactObj);
        contact.save((results) => {
          View.show(results)
        })
        // View.show(contactObj.phone_number);
        break;

      case 'update':
        let contact_id = JSON.parse(param_command[3]);
        let ContactUpdate = new Contact(contact_id);
        ContactUpdate.update((results) =>{
          View.show(results)
        })
        // View.show(ContactUpdate);
      default:

    }
    // console.log(param_command);

  }
}

module.exports = Controller;
