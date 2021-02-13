var fs = require('fs');
var Contact = require('./model/contact.js')
var Group = require('./model/group.js')
var ContactGroup = require('./model/contact-group.js')
var View = require('./view.js')

class Controller{
  static addContact(name, phoneNumber, address) {
    Contact.addContact(name, phoneNumber, address, function(message) {
      View.addContact(message);
    })
  }

  static updateContact(set, setData, where, whereData) {
    Contact.updateContact(set, setData, where, whereData, function(message) {
      View.updateContact(message);
    })
  }

  static viewListContact() {
    Contact.viewList(function(message) {
      View.shoqContacts(message);
    })
  }

  static deleteContact(where, value) {
    Contact.deleteContact(where, value, function(message) {
      View.deleteContact(message);
    })
  }

  static addGroup(groupName) {
    Group.addGroup(groupName, function(message) {
      View.addGroup(message);
    })
  }

  static showGroups() {
    Group.viewListGroup(function(message) {
      View.showListGroup(message);
    })
  }

  static groupUpdate(set, setData, where, whereData) {
    Group.updateGroup(set, setData, where, whereData, function(message) {
      View.updateGroup(message);
    })
  }

  static addContactToGroup(memberId, groupId) {
    ContactGroup.addContactToGroup(memberId, groupId, function(message) {
      View.addContactToGroup(message);
    })
  }

  static deleteGroupFromGroups(groupId) {
    Group.deleteGroup(groupId, function(message) {
      View.deleteGroup(message);
    })
  }

  static deleteGroupFromContactGroups(groupId) {
    ContactGroup.deleteGroup(groupId, function(message) {
      View.deleteGroupFromContactGroup(message);
    })
  }
}

module.exports = Controller
