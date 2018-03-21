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

  static tampilkanKontak(){
    ContactModel.selectContact(ContactController.tampilkanDataKontak)
  }

  static tampilkanDataKontak(dataContact){
    ContactView.displayKontak(dataContact)
  }

  static rubahKontak(contact_name,phoneNumber,id){
    ContactModel.updateContact(contact_name,phoneNumber,id,ContactController.tampilkanNotifUpdateKontak)
  }

  static tampilkanNotifUpdateKontak(id){
    ContactView.displayRubahKontak(id)
  }

}

module.exports = ContactController
