const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db')

// console.log('Connected to database "contacts.db" succesfuly')

class Contact{
    constructor() {
        
    }

    static showContact(callback){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.all(`select name, email, phone, group_name 
            FROM Contacts
            LEFT JOIN ContactGroups
            ON Contacts.contact_id = ContactGroups.contact_id
            LEFT JOIN Groups
            ON Groups.group_id = ContactGroups.group_id`, (err, data) => {
                callback(data)
            })

        })

    }

    static addContact(nameContact, emailContact, phoneContact, showData){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            
                // console.log(phoneContact.length)
            if(phoneContact.length > 12){
                return console.log('ERROR.....Maximum Phone Digit is 12')
            }
            else{
                db.run(`INSERT INTO Contacts (name, email, phone) VALUES($name,$email,$phone)`, {
                    $name: nameContact,
                    $email: emailContact,
                    $phone: phoneContact
                })
                showData()
                console.log(`Create Data Contact : "${nameContact}" , has been success`)
            }

        })

        db.close((err) => {
            if(err){
                console.log(err.message)
            }
            console.log('Closed connection database')
        })
    }

    static updateContact(id, name, email, phone, showData){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.run(`UPDATE Contacts SET name = $name, email = $email, phone = $phone WHERE contact_id = $contact_id` , {
                $contact_id: id,
                $name: name,
                $email: email,
                $phone: phone
            })
            console.log(`Update Data Contact : "${name}" , has been success`)
            showData()

        })

        db.close((err) => {
            if(err){
                console.log(err.message)
            }
            console.log('Closed connection database')
        })
    }

    static deleteContact(contact_id){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.run(`DELETE FROM ContactGroups WHERE contact_id = $contact_id`, {
                $contact_id: contact_id
            })
            db.run(`DELETE FROM Contacts WHERE contact_id = $contact_id`, {
                $contact_id:contact_id
            })
            console.log(`Delete Data Contact with ID : "${contact_id}" , has been success`)

        })

        db.close((err) => {
            if(err){
                console.log(err.message)
            }
            console.log('Closed connection database')
        })
    }

}

module.exports = Contact