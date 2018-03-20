const Contact = require('./contact.js').Contact;
const Database = require('./setup.js').Database;
const View = require('./view.js').View;
const Group = require('./group.js').Group;

class Controller {

  static setup(){
    Database.setup(function(setupMessage){
      View.setup(setupMessage);
    })
  }

  static save(new_data){
    let contact = new Contact();
    contact.save(new_data,function(newContact){
      View.save(newContact);
    });
  }

  static show(){
    Contact.show(function (database_contacs) {
      Group.show(function(database_groups){
        View.show(database_contacs,database_groups);
      });
    });
  }

  static update(commands,update_data,update_id){
    let contact = new Contact(commands,update_data,update_id);
    contact.update(commands,update_data,update_id,function(oldData){
      View.update(commands,oldData,update_data,update_id);
    } )
  }

  static createGroup(name){
    let group = new Group();
    group.create(name,function(totalGroups){
      View.createGroup(totalGroups);
    })

  }

  static addGroup(groupName, contact_id){
    let group = new Group();
    group.addContact(groupName, contact_id, function(addedData){
      View.addContact(addedData,groupName);
    })
  }
}

module.exports = {Controller};
