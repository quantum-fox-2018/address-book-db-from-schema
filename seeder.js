const fs = require('fs');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');

db.serialize(function(){
    // fs.readFile('./csv/contact.csv', 'utf8', function(err,data){
    //     let dataArray = data.split('\n')
        
    //     for(let i=1; i<dataArray.length; i++){
    //         let contact = dataArray[i].split(',')
    //         db.run(`INSERT INTO Contacts VALUES(?,?,?,?,?)`,[contact[0],contact[1],contact[2],contact[3],contact[4]],function(err){
    //             if(err) console.log(err)
    //             console.log('Data Kontak berhasil di tambahkan secara seed')
    //         })
    //     }
    // })

    // fs.readFile('./csv/group.csv', 'utf8', function(err, data){
    //     if(err) console.log(err)
    //     let dataArray = data.split('\n')

    //     for(let i=0; i<dataArray.length; i++){
    //         let group = dataArray[i].split(',')
    //         // console.log(group[0], group[1])
    //         db.run(`INSERT INTO Groups VALUES(?,?)`,[group[0],group[1]], function(err){
    //             if(err) console.log(err)
    //             console.log('Data Group berhasil di tambahkan secara seed !')
    //         })
    //     }
    // })
})
