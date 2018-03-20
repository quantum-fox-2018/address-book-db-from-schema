const ContactModel = require('../model/ContactModel');
const ContactView = require('../view/ContactView');

class ContactController{
  static tambahKontak(contact_name, phoneNumber){
    ContactModel.addContact(contact_name, phoneNumber, ContactController.tampilkanNotifTambahKontak)
  }

  static tampilkanNotifTambahKontak(contact_name, phoneNumber){
    ContactView.displayTambahKontak(contact_name, phoneNumber)
  }

  static hapusKontak(contact_name){
    ContactModel.deleteContact(contact_name,ContactController.tampilkanNotifHapusKontak)
  }

  static tampilkanNotifHapusKontak(contact_name){
    ContactView.displayHapusKontak(contact_name)
  }

}

module.exports = ContactController
