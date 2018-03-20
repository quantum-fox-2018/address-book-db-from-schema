const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

class Contact{
  constructor(contactName,phoneNumber){
    this.contactName = contactName
    this.phoneNumber = phoneNumber
  }

 save(callback){
   if(this.phoneNumber.length>15){
     callback('Phone number more than 15 digit is not allowed')
   }
   else{
     db.run(`insert into contacts(contactName,phoneNumber) values($contactName,$phoneNumber)`
     ,{
       $contactName : this.contactName,
       $phoneNumber : this.phoneNumber
     },(err)=>{
       if(err) callback(err)
         else callback('insert data contacts successfully')
       })
     db.close()
   }

  }

  update(contactId,callback){
     db.run(`update contacts set contactName=$contactName, phoneNumber=$phoneNumber where contactId=$contactId`
     ,{
       $contactName : this.contactName,
       $phoneNumber : this.phoneNumber,
       $contactId : contactId
     },(err)=>{
       if(err) callback(err)
         else callback('update data contacts successfully')
       })
     db.close()
   }

   destroy(contactId,callback){
     db.serialize(()=>{
       db.run(`delete from contacts where contactId=$contactId`
       ,{
         $contactId : contactId
       },(err)=>{
         if(err) callback(err)
           else callback('delete data contacts successfully')
      })
      db.run(`delete from contacts_groups where contactId=$contactId`
      ,{
        $contactId : contactId
      },(err)=>{
        if(err) callback(err)
          else callback('delete data contacts from contacts_groups successfully')
     })
     })
    db.close()
  }

  show(contactId,callback){
    db.all(`select c.contactName,c.phoneNumber,g.groupName from contacts as c
    left join contacts_groups as cg on c.contactId = cg.contactId
    left join groups as g on g.groupId = cg.groupId
    where c.contactId=$contactId`,
    {
      $contactId : contactId
    }
    ,(err,data)=>{
      if(err) callback(err);
      else callback(data);
    })
  }

  showAll(callback){
    db.all(`select c.contactName,c.phoneNumber,g.groupName from contacts as c
    left join contacts_groups as cg on c.contactId = cg.contactId
    left join groups as g on g.groupId = cg.groupId`,(err,data)=>{
      if(err) callback(err);
      else callback(data);
    })
  }


}

module.exports = Contact
