const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db')

class ContactGroup{
    constructor() {
        
    }

    static assignGroup(contact_name, group_name){
        db.serialize((err) => {
            if(err){
                console.log(err.message)
            }
            db.get(`SELECT * FROM Contacts WHERE name = $name`, {
                $name: contact_name
            }  ,(err, dataContact)=> {
                
                db.get(`SELECT * FROM Groups WHERE group_name = $group_name`, {
                    $group_name: group_name
                },(err, dataGroup) => {
                    // console.log(dataGroup.group_id)
                    // console.log(dataContact.contact_id)
                    db.run(`INSERT INTO ContactGroups (contact_id, group_id)
                    SELECT $contact_id, $group_id
                    WHERE NOT EXISTS
                    (SELECT 1 FROM ContactGroups WHERE contact_id = $contact_id AND group_id = $group_id)`, {
                        $contact_id: dataContact.contact_id,
                        $group_id: dataGroup.group_id
                    })
                        
                })
            })
            
            console.log(`Assign Contact ID : "${contact_name}" to Group "${group_name}" , has been success`)
        })

    }
    
}

module.exports = ContactGroup