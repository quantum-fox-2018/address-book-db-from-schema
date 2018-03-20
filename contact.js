const controller = require('./controller.js');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('addressbook.db');


class Contact {
  constructor(name, company, phone, email) {
    this.name = name
    this.company = company
    this.phone = phone
    this.email = email
  }
  createContact(contact) {
    db.run("INSERT INTO Contacts VALUES (NULL, ?, ?, ?, ?)", [contact.name, contact.company, contact.phone, contact.email])
    console.log(`kontak ${contact.name} telah di save!`);
  }

  deleteContact(id) {
    db.run("delete from Contacts where id = ?;", id)
  }

  updateContact(id, param, data) {
    db.run(`update or replace Contacts set ${param} = ? where id = ?`, [data, id])
    console.log(`data ${param} dari id ${id} telah diupdate!`);
  }

  showContact() {
    db.all("SELECT * from Contacts;", function(err, row) {
      console.log(row);
    });
  }
}

let kontak = new Contact('Samson', 'Google', 087809870987, 'samson@betawi.com')

kontak.updateContact(1, 'phone', 087901981234)
