"use strict"
const db = require('../config/database.js');

class Contact {
    constructor(option) {
        this.name = option.name;
        this.email = option.email;
        this.phone = option.phone;
    }

    static show(tableName, cbData) {
        let sql = `SELECT * FROM '${tableName}';`;

        db.all(sql, (err, data) => {
            if (err) {
                cbData(err.message, true)
            } else {
                cbData(data, false);
            }
        });
    }

    static save(name, email, phone, cbContact) {
        let contact = new Contact({
            name: name,
            email: email,
            phone: phone
        });

        let queryContact = `INSERT INTO Contacts
                            VALUES (NULL, '${contact.name}', '${contact.email}', '${contact.phone}');`;

        db.run(queryContact, (err) => {
            if (err) {
                cbContact(err.message, true);
            } else {
                cbContact(`${contact.name} has added to the contact`, false);
            }
        });
    }

    static update(column, value, id, cbUpdate) {
        db.all(`SELECT * FROM Contacts WHERE id = ${id};`, (err, rows) => {
            if (rows.length === 0) {
                cbUpdate(`There is no contact with id ${id}`, true)
            } else {
                let queryUpdate = `UPDATE Contacts
                                   SET ${column} = '${value}'
                                   WHERE id = ${id};`;

                db.run(queryUpdate, (err) => {
                    if (err) {
                        cbUpdate(err.message, true);
                    } else {
                        cbUpdate(`The contact with id ${id} has been updated`, false);
                    }
                });
            }
        });
    }

    static delete(id, cbDelete) {
        db.all(`SELECT * FROM Contacts WHERE id = ${id};`, (err, rows) => {
            if (rows.length === 0) {
                cbDelete(`There is no contact with id ${id}`, true);
            } else {
                let queryDelete = `DELETE FROM Contacts
                                   WHERE id = ${id};`;

                db.run(queryDelete, (err) => {
                    if (err) {
                        cbDelete(err.message, true);
                    } else {
                        cbDelete(`The contact with id ${id} has been deleted`, false);
                    }
                });
            }
        });
    }

}

module.exports = Contact;