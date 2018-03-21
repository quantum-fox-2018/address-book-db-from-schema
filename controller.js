const Contact = require('./Models/contact.js').Contact;
const Database = require('./setup.js').Database;
const View = require('./view.js').View;
const Group = require('./Models/group.js').Group;

class Controller {

  static setup(){
    Database.setup(function(setupMessage){
      View.setup(setupMessage);
    })
  }

  static save(new_data){

    let contact = new Contact(new_data);
    contact.save(function(newContact){
      View.save(newContact);
    });

  }

  static show(){
    Contact.show(function (database_contacs) {
        View.show(database_contacs);
    });
  }

  static update(commands,update_data,update_id){

    Contact.searchId(update_id, function(getDataObj) {
      let contact = new Contact(getDataObj);
      contact[commands] = update_data;
      contact.update(commands, getDataObj.id, function(oldData){
        View.update(commands,oldData,update_data,update_id);
      })
    })

  }

  static createGroup(name){

    let group = new Group(name);
    let checkCond = true
    group.create(function(newGroup){

      if(newGroup.length == undefined){
        let errorMsg = "This group is already on address book";
        checkCond = false;
        View.createGroup(checkCond, errorMsg);
      }else{
        View.createGroup(checkCond, newGroup);
      }
    })

  }

  static addGroup(groupName, contact_id){

    let group = new Group(groupName);
    group.addContact(contact_id, function (checkCond, memberData) {

      if(!checkCond){
        View.newMember(checkCond,memberData,groupName)
      }
      else{
        View.newMember(checkCond, memberData, groupName);
      }
    })
  }

  static updateGroup(groupName, contact_id){
    let group = new Group(groupName);
    group.update(contact_id,function(message){
      console.log(message);
    })
  }

  static deleteGroup(groupName){

    let group = new Group(groupName);
    group.delete(function (message) {
      View.delete(message);
    })
  }
}

module.exports = {Controller};
