const Method = require('../setup.js');
const db = Method.db;

class Contacts{

    static getAllContacts(callback){
        db.all(`SELECT * FROM Contacts`, function(err, data){
            if(!err){
                if(data.length == 0){
                    callback(`Data is empty`)
                }else{
                    callback(data);
                }
            }else{
                console.log(err);
            }
        });
    }

    static addContact(name, phone, callback){
        db.run(`INSERT INTO Contacts VALUES (NULL, ?, ?)`, name, phone, function(err){
            if(err){
                callback(err);
            }else{
                callback(`Sukses!`);
            }
        });
    }

    static dropTable(callback){
        db.run(`DROP TABLE IF EXISTS Contacts`, function(err){
            if(err){
                callback(err);
            }else{
                callback('Table Contacts have been dropped!');
            }
        })
    }

    static deleteContact(id, callback){
        if(id == undefined){
            callback(`Please input a valid id`);
        }
        else{
            db.run(`DELETE FROM Contacts WHERE id = ?`, id, function(err){
                if(err){
                    callback(err);
                }else{
                    callback(`Contacts with id = ${id} has been deleted`);
                }
            });
        }
    }

    static updateContact(id, name, callback){
        if(id == undefined){
            callback(`Please input a valid id`);
        }else{
            db.run(`UPDATE Contacts SET name = ? WHERE id = ?`, name, id, function(err){
                if(err){
                    callback(err);
                }else{
                    callback(`Data has been updated!`);
                }
            })
        }   
    }

    static showAll(name, callback){
        db.all(`SELECT * FROM group_contacts`, name, function(err, result) {
                    if(err){
                        callback(err);
                    }else{
                        callback(result);
                    }
                })
    }

}

module.exports = Contacts;