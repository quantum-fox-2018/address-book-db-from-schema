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
            db.all(`SELECT Contacts.contact_id, name, email, phone, group_name 
            FROM Contacts
            LEFT JOIN ContactGroups
            ON Contacts.contact_id = ContactGroups.contact_id
            LEFT JOIN Groups
            ON Groups.group_id = ContactGroups.group_id`, (err, data) => {
                let arrData = []
                for(let i=0; i<data.length; i++){
                    let count = 0
                    let newObj = {
                        contact_id: data[i].contact_id,
                        name: data[i].name,
                        email: data[i].email,
                        phone: data[i].phone,
                        group: []
                    }
                    arrData.push(newObj)
                    for(let j=0; j<arrData.length; j++){
                        if(arrData[j].contact_id == data[i].contact_id){
                            arrData[j].group.push(data[i].group_name)
                        }
                    }
                }
                function removeDuplicates( arr, prop ) {
                    var obj = {};
                    for ( var i = 0, len = arr.length; i < len; i++ ){
                      if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
                    }
                    var newArr = [];
                    for ( var key in obj ) newArr.push(obj[key]);
                    return newArr;
                  }
                let cleanData = removeDuplicates(arrData, 'contact_id')  
                callback(cleanData)
            })

        })

    }


    static addContact(nameContact, emailContact, phoneContact, showData){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            // console.log(phoneContact.length)
            let checkEmail = function checkingEmail(text) { 
                let check = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
                return check.test(text);
            }    
            if(phoneContact.length > 12){
                return console.log('ERROR.....Maximum Phone Digit is 12')
            }
            else if(checkEmail(emailContact) == false){
                return console.log('Your Format Email Not Valid')
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