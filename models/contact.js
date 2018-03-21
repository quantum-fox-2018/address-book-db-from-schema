const db = require('./koneksi.js')

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
    var arrContact=[]
    db.serialize(()=>{
      db.all(`select * from contacts where contactId=$contactId`,{
        $contactId :contactId
      },(err,data)=>{
        if(err) callback(err)
        else{
          db.all(`select * from contacts_groups as cg join contacts as c
          on cg.contactId=c.contactId join groups as g
          on cg.groupId=g.groupId`,(err,dataGroup)=>{
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < dataGroup.length; j++) {
                if(data[i].contactId===dataGroup[j].contactId){
                  arrContact.push(dataGroup[j].groupName)
                  data[i].groupName=arrContact
                }
              }
              callback(data[i])
              arrContact=[]
            }
          })
        }

      })

    })
  }

  showAll(callback){
    var arrContact=[]
    db.serialize(()=>{
      db.all(`select * from contacts`,(err,data)=>{
        if(err) callback(err)
        else{
          db.all(`select * from contacts_groups as cg join contacts as c
          on cg.contactId=c.contactId join groups as g
          on cg.groupId=g.groupId`,(err,dataGroup)=>{
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < dataGroup.length; j++) {
                if(data[i].contactId===dataGroup[j].contactId){
                  arrContact.push(dataGroup[j].groupName)
                  data[i].groupName=arrContact
                }
              }
              callback(data[i])
              arrContact=[]
            }
          })
        }

      })

    })
  }


}

module.exports = Contact
