class ContactView{
  static displayTambahKontak(contact_name, phoneNumber){
    console.log(`nomor ${phoneNumber} dengan nama ${contact_name} berhasil ditambahkan ke dalam kontak...`)
  }

  static displayHapusKontak(contact_name){
    console.log(`nama kontak ${contact_name}, berhasil dihapus dari kontak...`)
  }
}

module.exports = ContactView
