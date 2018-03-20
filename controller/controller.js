/*jshint esversion:6*/

const Contact = require('../model/contact');
const Group = require('../model/group');
const ContactGroup = require('../model/contact-group');
const View = require('../view/view');

class Controller {
  static addContact(name, phone_number, email, address){
    Contact.add(name, phone_number, email, address, (dis)=>{
      View.display(dis);
    });
  }
  static updateContact(name, phone_number, email, address, contact_id){
    Contact.update(name, phone_number, email, address, contact_id, (dis)=>{
      View.display(dis);
    });
  }
  static deleteContact(contact_id){
    Contact.delete(contact_id, (dis)=>{
      View.display(dis);
    });
  }
  //====
  static addGroup(name){
    Group.add(name, (dis)=>{
      View.display(dis);
    });
  }
  static updateGroup(name, group_id){
    Group.update(name, group_id, (dis)=>{
      View.display(dis);
    });
  }
  static deleteGroup(group_id){
    Group.delete(group_id, (dis)=>{
      View.display(dis);
    });
  }
  //====
  static addGroupContact(contact_id, group_id, cb){
    ContactGroup.add(contact_id, group_id, (dis)=>{
      View.display(dis);
    });
  }
  static showContact(cb){
    Contact.show((dis)=>{
      View.display(dis);
    });
  }
}

module.exports = Controller;
