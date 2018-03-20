let Contact = require('./Models/contact')
let Group = require('./Models/group')
let View = require('./view')
let ContactGroup = require('./Models/contact-group')

class Controller{
  static acceptCommand(action){
    if (action[2] === "contact") {
      if (action[3] === "add") {
        let object = {name: action[4], phoneNumber: action[5]}
        let contact = new Contact(object);
        contact.addContact(function(str){
          View.display(str);
        })
      }else if(action[3] === "update"){
        //id column value
        Contact.update(action[4], action[5], action[6], function(str){
          View.display(str)
        })
      }else if(action[3] === "delete"){
        Contact.delete(action[4], function(str){
          View.display(str)
        })
      }else if(action[3] === "read"){
        Contact.read(function(str){
          View.display(str)
        })
      }else{
        Controller.help()
      }
    }else if(action[2] === "group"){
      if (action[3] === "add") {
        let group = new Group(action[4]);
        group.addGroup(function(str){
          View.display(str);
        })
      }else if(action[3] === "update"){
        Group.update(action[4], action[5], function(str){
          View.display(str);
        })
      }else if(action[3] === "delete"){
        Group.delete(action[4], function(str){
          View.display(str);
        })
      }else if(action[3] === "read"){
        Group.read(function(str){
          View.display(str);
        })
      }else{
        Controller.help()
      }
    }else if(action[2] === "contactgroup"){
      if (action[3] === "addmember") {
        let object = {idContact: action[5], idGroup: action[4]}
        let contactGroup = new ContactGroup(object)
        contactGroup.addMember(function(str){
          View.display(str)
        })
      }else if (action[3] === "readmember") {
        ContactGroup.readMember(action[4], function(str){
          View.display(str)
        })
      }else if (action[3] === "deletemember") {
        ContactGroup.deleteMember(action[4], action[5], function(str){
          View.display(str)
        })
      }else{
        Controller.help()
      }
    }else{
      Controller.help()
    }
  }

  static help(){
    View.display("help")
  }
}

module.exports = Controller
