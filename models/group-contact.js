var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');

class GroupContact {
    constructor(groupID, contactID){
        this.groupID = groupID
        this.contactID = contactID
    }

    save(callback){
        let groupId = this.groupID;
        let contactId = this.contactID;
        
        db.run(`INSERT INTO GroupContacts VALUES (null,$groupId,$contactId)`,{$groupId:groupId,$contactId:contactId}, function(err){
            if(err){
                callback(err)
            } else {
                callback(`Data berhasil disimpan !`)
            }
        })
    }
}

module.exports = GroupContact;