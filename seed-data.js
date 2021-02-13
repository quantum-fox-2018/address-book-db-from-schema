const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

var contact_csv = fs.readFileSync('contacts.csv','utf8')
  .toString()
  .trim()
  .split("\n")

var group_csv = fs.readFileSync('groups.csv','utf8')
  .toString()
  .trim()
  .split("\n")

var con_group_csv = fs.readFileSync('contacts_groups.csv','utf8')
  .toString()
  .trim()
  .split("\n")


var arrCon=[]
for (let i = 0; i < contact_csv.length; i++) {
  var splitCon = contact_csv[i].split(',')
  arrCon.push(splitCon)
}

var arrObjCon=[]
for (let i = 1; i < arrCon.length; i++) {
  objCon={}
  for (let j = 0; j < arrCon[i].length; j++) {
    objCon[arrCon[0][j]] = arrCon[i][j]

  }
  arrObjCon.push(objCon)
}


var arrGroup=[]
for (let i = 0; i < group_csv.length; i++) {
  var splitGroup = group_csv[i].split(',')
  arrGroup.push(splitGroup)
}

var arrObjGroup=[]
for (let i = 1; i < arrGroup.length; i++) {
  objGroup={}
  for (let j = 0; j < arrGroup[i].length; j++) {
    objGroup[arrGroup[0][j]] = arrGroup[i][j]

  }
  arrObjGroup.push(objGroup)
}


var arrConGroup=[]
for (let i = 0; i < con_group_csv.length; i++) {
  var splitConGroup = con_group_csv[i].split(',')
  arrConGroup.push(splitConGroup)
}

var arrObjConGroup=[]
for (let i = 1; i < arrConGroup.length; i++) {
  objConGroup={}
  for (let j = 0; j < arrConGroup[i].length; j++) {
    objConGroup[arrConGroup[0][j]] = arrConGroup[i][j]

  }
  arrObjConGroup.push(objConGroup)
}


db.serialize(()=>{
  db.run('DELETE from contacts',err=>{
    if(err) console.log(err);
  })
  let stmt = db.prepare('INSERT INTO contacts (contactName,phoneNumber)  VALUES (?,?)')
  for (let i = 0; i < arrObjCon.length; i++) {
    stmt.run(arrObjCon[i].contactName,arrObjCon[i].phoneNumber,(err)=>{
      if(err) console.log(err);
      else{
        console.log('insert data contacts successfully');
      }
    })
  }
  stmt.finalize()
})

db.serialize(()=>{
  db.run('DELETE from groups',err=>{
    if(err) console.log(err);
  })
  let stmt = db.prepare('INSERT INTO groups (groupName)  VALUES (?)')
  for (let i = 0; i < arrObjGroup.length; i++) {
    stmt.run(arrObjGroup[i].groupName,(err)=>{
      if(err) console.log(err);
      else{
        console.log('insert data groups successfully');
      }
    })
  }
  stmt.finalize()
})

db.serialize(()=>{
  db.run('DELETE from contacts_groups',err=>{
    if(err) console.log(err);
  })
  let stmt = db.prepare('INSERT INTO contacts_groups (contactId,groupId)  VALUES (?,?)')
  for (let i = 0; i < arrObjConGroup.length; i++) {
    stmt.run(arrObjConGroup[i].contactId,arrObjConGroup[i].groupId,err=>{
      if(err) console.log(err);
      else{
        console.log('insert data contacts_groups successfully');
      }
    })
  }
  stmt.finalize()
})


db.close();
