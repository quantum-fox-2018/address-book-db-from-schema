class ContactView{
  static displayTambahKontak(contact_name, phoneNumber){
    console.log(`nomor ${phoneNumber} dengan nama ${contact_name} berhasil ditambahkan ke dalam kontak...`)
  }

  static displayHapusKontak(contact_name){
    console.log(`nama kontak ${contact_name}, berhasil dihapus dari kontak...`)
  }

  static displayKontak(dataContact){
    console.log(`NO | ID CONTACT | NAMA | PHONE NUMBER`)
    for(let i=0; i<dataContact.length; i++){
      console.log(`${i+1} | ${dataContact[i].id} | ${dataContact[i].contact_name} | ${dataContact[i].phoneNumber}`)
    }
  }

  static displayRubahKontak(id){
    console.log(`contact name dan phoneNumber untuk id contact ${id} berhasil dirubah...`)
  }

}

module.exports = ContactView
