const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db')

console.log('Connected to database "contacts.db" succesfuly')

let contact_data = fs.readFileSync('./contacts.csv').toString().trim().split('\n')
let group_data = fs.readFileSync('./groups.csv').toString().trim().split('\n')

// console.log(contact_data[0].split(',')[0])



db.serialize((err) => {
    if(err){
        console.log(err.message)
    }
    let seed_contact = db.prepare(`INSERT INTO Contacts (name, email, phone) VALUES (?,?,?)`)
    for(let i=1; i<contact_data.length; i++){
        let data = contact_data[i].split(',')
        let name = data[0]
        let email = data[1]
        let phone = data[2]

        seed_contact.run(name, email, phone)
    }
    seed_contact.finalize((err) => {
        if(err){
            console.log(er.message)
        }
        console.log(`Insert Data Contacts has been succesed`)
    })

    let seed_group = db.prepare(`INSERT INTO Groups (group_name) VALUES (?)`)
    for(let i=1; i<group_data.length; i++){
        let data = group_data[i].split(',')
        let group_name = data[0]

        seed_group.run(group_name)
    }
    seed_group.finalize((err) => {
        if(err){
            console.log(err.message)
        }
        console.log(`Insert Data Groups has been successed`)
    })


})

db.close((err) => {
    if(err){
        console.log(err.message)
    }
    console.log('Closed connection database')
})