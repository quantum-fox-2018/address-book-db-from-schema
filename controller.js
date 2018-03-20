var fs = require('fs');
var Contact = require('./model/contact.js')
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

  static viewList() {
    Contact.viewList(function(message) {
      View.showList(message);
    })
  }

  static deleteContact(value) {
    Contact.deleteContact(value, function(message) {
      View.deleteContact(message);
    })
  }
}

module.exports = Controller
