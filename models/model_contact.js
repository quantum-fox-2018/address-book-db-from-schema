const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db')

console.log('Connected to database "contacts.db" succesfuly')

class Contact{
    constructor() {
        
    }

    static showContact(callback){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.all(`SELECT * FROM Contacts`, (err, data) => {
                callback(data)
            })

        })

        db.close((err) => {
            if(err){
                console.log(err.message)
            }
            console.log('Closed connection database')
        })


    }

    static addContact(nameContact, emailContact, phoneContact, showData){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.run(`INSERT INTO Contacts (name, email, phone) VALUES($name,$email,$phone)`, {
                $name: nameContact,
                $email: emailContact,
                $phone: phoneContact
            })
            console.log(`Create Data Contact : "${nameContact}" , has been success`)
            showData()
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