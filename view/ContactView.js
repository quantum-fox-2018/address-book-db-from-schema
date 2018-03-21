class ContactView{
//========================================== TAMBAH KONTAK
  static displayTambahKontakSalah(text){
    console.log(text)
  }

  static displayTambahKontak(contact_name, phoneNumber){
    console.log(`nomor ${phoneNumber} dengan nama ${contact_name} berhasil ditambahkan ke dalam kontak...`)
  }

//========================================== HAPUS KONTAK
  static displayHapusKontak(contact_name){
    console.log(`nama kontak ${contact_name}, berhasil dihapus dari kontak...`)
  }

//========================================== TAMPILKAN KONTAK
  static displayKontak(dataContact){
    console.log(`NO | ID CONTACT | NAMA | PHONE NUMBER | GROUP NAME`)
    for(let i=0; i<dataContact.length; i++){
      console.log(`${i+1} | ${dataContact[i].id} | ${dataContact[i].contact_name} | ${dataContact[i].phoneNumber} | ${dataContact[i].group_name}`)
    }
  }

  static displayRubahKontak(id){
    console.log(`contact name dan phoneNumber untuk id contact ${id} berhasil dirubah...`)
  }

}

module.exports = ContactView
// comment biar bisa ke push
