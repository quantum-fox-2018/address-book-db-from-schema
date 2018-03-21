var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');


class Contacts {

    constructor(fname,lname,email,telp){
        this.fname = fname
        this.lname = lname
        this.email = email
        this.telp = telp
    }

    save(callback){
        let fname = this.fname;
        let lname = this.lname;
        let email = this.email;
        let telp = this.telp;
        db.run(`INSERT INTO Contacts VALUES(null,$fname,$lname,$email,$phone)`,{ $fname:fname, $lname:lname, $email:email, $phone:telp }, function(err){
            if(err) {
                callback(err);
            } else {
                callback(`Data ${fname} berhasil disimpan`);
            }
        });
    }
    
    static update(data, callback){
        let id = data[0];
        let fname = data[1];
        let lname = data[2];
        let email = data[3];
        let telp = data[4];

        db.run(`UPDATE Contacts SET first_name=$fname, last_name=$lname,email=$email,phone=$phone WHERE id=$id`, {$fname:fname, $lname:lname, $email:email, $phone:telp, $id:id}, function(err){
            if(err) {
                callback(err);
            } else {
                callback(`Data dengan ID ${id} berhasil diubah!`);
            }
        })
    }

    static delete(id, callback){
        db.run(`DELETE FROM contacts WHERE id=$id`,{$id:id}, function(err){
            if(err){
                callback(err);
            } else {
                callback(`Data dengan ID ${id} berhasil terhapus!`);
            }
        })
    }

    static show(callback){
        db.all(`SELECT
                    Contacts.id,
                    Contacts.first_name||' '|| Contacts.last_name AS fullName,
                    Contacts.email,
                    Contacts.phone,
                    Groups.id AS GroupID,
                    Groups.name AS groupName
                FROM Contacts
                LEFT JOIN GroupContacts
                ON Contacts.id = GroupContacts.contactId
                LEFT JOIN Groups
                ON GroupContacts.groupId = Groups.id`, function(err,data){
                        if(err) {
                            callback(err)
                        } else {
                            let contactMerging = data;
                            // console.log(contactMerging)

                            let arrayId = [];
                            let newData = [];
                            for(let i=0; i<contactMerging.length; i++){
                                if(arrayId.indexOf(contactMerging[i].id) === -1){
                                    arrayId.push(contactMerging[i].id)
                                    let obj = {
                                        id: `${contactMerging[i].id}`,
                                        fullname : `${contactMerging[i].fullName}`,
                                        email : `${contactMerging[i].email}`,
                                        phone : `${contactMerging[i].phone}`
                                    };
                                    newData.push(obj)
                                }
                            }

                            for(let i=0; i<newData.length; i++){
                                let temp = [];
                                for(let j=0; j<contactMerging.length; j++){
                                    if(contactMerging[j].id == newData[i].id){
                                        temp.push(contactMerging[j].groupName)
                                    }
                                }
                                newData[i].group = temp
                            }

                            callback(newData)
                        }
                    })
    }
}

module.exports = Contacts;