const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class Contact {

    static insertall() {

        const db = new sqlite3.Database('./group1.db', (err) => {
            if (err) {
              return console.error('Connect',err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
        
        db.serialize(function() {
            let pathFileName = '../address-book-db-from-schema/0.seed-data/contacts.csv';
            
            let raw_data = fs.readFileSync(pathFileName, 'utf8').trim().split('\r\n');
            let table_data = [];
            for (let i = 1; i < raw_data.length; i++) {
                table_data.push(raw_data[i].split(','));
            }
    
            let maxColumn = [];
            for (let i = 0; i < table_data[0].length; i++) {
                maxColumn.push('?');
            }
            let joinMaxColumn = maxColumn.join(',');

            var stmt = db.prepare(`INSERT INTO Contacts VALUES (null,${joinMaxColumn})`);
            
            for (var i = 0; i < table_data.length; i++) {
                stmt.run(table_data[i]);
            }
            stmt.finalize();
           
            db.close((err) => {
            if (err) {
            return console.error('Close',err.message);
            }
            console.log('Close the database connection.');
            });
        })
    }

    static update(data) {

        const db = new sqlite3.Database('./group1.db', (err) => {
            if (err) {
              return console.error('Connect',err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
        
        db.serialize(function() {
            
            let columnToUpdate = data[0];
            let updateData = data[1];
            let id = data[2];

            db.run(`UPDATE Contacts SET ${columnToUpdate} = '${updateData}' WHERE Contacts.contactId = ${id}`)
           
            db.close((err) => {
            if (err) {
            return console.error('Close',err.message);
            }
            console.log('Close the database connection.');
            });
        })
    }

    static delete(id) {
        const db = new sqlite3.Database('./group1.db');
        
        db.serialize(function() {     
            db.run(`DELETE FROM ContactGroups WHERE ContactGroups.contactId = ${id}`)
            db.run(`DELETE FROM Contacts WHERE Contacts.contactId = ${id}`)
            db.close();
        })
    }

    static show(cb) {
        const db = new sqlite3.Database('./group1.db');
        
        db.serialize(function() {     
            let query = `SELECT Contacts.contactId, Contacts.first_name || " "|| Contacts.last_name AS FullName, Contacts.company, Contacts.phone, Contacts.email, Groups.name AS GroupName
            FROM Contacts
            LEFT JOIN ContactGroups ON Contacts.contactId = ContactGroups.contactId
            LEFT JOIN Groups ON ContactGroups.groupId = Groups.groupId
            ORDER BY Contacts.contactId;`;
            
            db.all(query, function(err, arrObjContacs) {
                cb(arrObjContacs)
            });

            db.close();
        })
    }


    static insertone(data) {
        const db = new sqlite3.Database('./group1.db');
        db.serialize(function() {     
            let first_name = data[0];
            let last_name = data[1];
            let company = data[2];
            let phone = data[3];
            let email = data[4];
    
            db.run(`INSERT INTO Contacts VALUES (null,'${first_name}','${last_name}','${company}','${phone}','${email}')`)
    
            db.close();
        })
    }

}







module.exports = Contact;