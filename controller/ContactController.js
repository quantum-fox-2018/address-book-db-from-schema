const ContactModel = require('../model/ContactModel');
const ContactView = require('../view/ContactView');

class ContactController{
//=========================================== TAMBAH KONTAK
  static cekTambahKontak(contact_name, phoneNumber){
    ContactModel.cekTambahKontakModel(contact_name, phoneNumber, ContactController.tampilkanNotifTambahKontakSalah, ContactController.tampilkanNotifTambahKontak)
  }

  static tampilkanNotifTambahKontakSalah(text){
    ContactView.displayTambahKontakSalah(text)
  }

  static tampilkanNotifTambahKontak(contact_name, phoneNumber){
    ContactView.displayTambahKontak(contact_name, phoneNumber)
  }

//=========================================== HAPUS KONTAK
  static hapusKontak(contact_name){
    ContactModel.deleteContact(contact_name,ContactController.tampilkanNotifHapusKontak)
  }

  static tampilkanNotifHapusKontak(contact_name){
    ContactView.displayHapusKontak(contact_name)
  }

//=========================================== TAMPILKAN KONTAK
  static tampilkanKontak(){
    ContactModel.selectContact(ContactController.tampilkanDataKontak)
  }

  static tampilkanDataKontak(dataContact){
    ContactView.displayKontak(dataContact)
  }

//=========================================== RUBAH KONTAK
  static rubahKontak(contact_name,phoneNumber,id){
    ContactModel.updateContact(contact_name,phoneNumber,id,ContactController.tampilkanNotifUpdateKontak)
  }

  static tampilkanNotifUpdateKontak(id){
    ContactView.displayRubahKontak(id)
  }

//=========================================== TAMPILKAN GROUP
  static tampilkanGrup(){
    ContactModel.selectGroup(ContactController.tampilkanDataGrup)
  }

  static tampilkanDataGrup(dataGroup){
    ContactView.displayGroup(dataGroup)
  }

  static tambahKontakKeGrup(ContactName,GroupName){
    ContactModel.insertContactGroups(ContactName,GroupName,ContactController.tampilkanDataKontakKeGrup)
    // console.log(`${ContactName} ${GroupName}`)
  }

  static tampilkanDataKontakKeGrup(text){
    ContactView.displayContactGroup(text)
  }

}

module.exports = ContactController
// comment bisar bisa ke push
