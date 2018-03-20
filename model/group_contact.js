const Method = require('../setup.js');
const db = Method.db;

class group_contact{
    static joinGroup(nameId, groupNameId, callback){
        db.run(`INSERT INTO group_contacts VALUES(NULL, ?, ?)`, nameId, groupNameId, function(err){
            if(err){
                callback(err);
            }else{
                callback(`${nameId} has join ${groupNameId}`);
            }
        })
    }

    //If group is deleted
    static deleteConjuncGroup(groupId, callback){
        db.run(`DELETE FROM group_contacts WHERE groupId = ?`, groupId, function(err){
            if(err){
                callback(err);
            }
        })
    }

    //If contact is deleted
    static deleteConjuncContact(contactId, callback){
        db.run(`DELETE FROM group_contacts WHERE contactId = ?`, contactId, function(err){
            if(err){
                callback(err);
            }
        })
    }

    static getLength(callback){
        db.all(`SELECT * FROM group_contacts`, function(err, dataConjunc){
            if(err){
                callback(err);
            }else{
                callback(dataConjunc.length);
            }
        })
    }

    static dropGroupContact(callback){
        db.run(`DROP TABLE group_contacts`, function(err){
            if(err){
                callback(err);
            }else{
                callback(`table group_contact has been dropped`);
            }
        });
    }
}

module.exports = group_contact;