const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

class ContactGroup{
  constructor(contactId,groupId){
    this.contactId = contactId
    this.groupId = groupId
  }

  save(callback){
    db.run(`insert into contacts_groups(contactId,groupId) values($contactId,$groupId)`
    ,{
        $contactId : this.contactId,
        $groupId : this.groupId,
      },(err)=>{
          if(err) callback(err)
          else callback('insert data contacts groups successfully')
    })
    db.close()
  }

  update(contact_groupId,callback){
     db.run(`update contacts_groups set contactId=$contactId , groupId=$groupId where contact_groupId=$contact_groupId`
     ,{
       $contactId : this.contactId,
       $groupId : this.groupId,
       $contact_groupId : contact_groupId
     },(err)=>{
       if(err) callback(err)
         else callback('update data groups successfully')
       })
     db.close()
   }

   destroy(contact_groupId,callback){
      db.run(`delete from contacts_groups where contact_groupId=$contact_groupId`
      ,{
        $contact_groupId : contact_groupId
      },(err)=>{
        if(err) callback(err)
          else callback('delete data contacts groups successfully')
        })
      db.close()
    }

    assign(contactName,groupName,callback){
      db.get(`select * from contacts_groups as cg
      join contacts as c on cg.contactId=c.contactId
      join groups as g on cg.contactId=g.groupId
      where c.contactName=$contactName`,
        {
          $contactName : contactName,
        },
        (err,data)=>{
        if(err) callback(err)
        else{
          if(data===undefined){
            callback('contact not found')
          }
          else{
            var getContact=data.contactId
            var getNameContact=data.contactName
            db.get(`select * from contacts_groups as cg
            join contacts as c on cg.contactId=c.contactId
            join groups as g on cg.contactId=g.groupId
            where g.groupName=$groupName`,
            {
              $groupName : groupName,
            }
            ,(err,data)=>{
              if(err) callback(err);
              else {
                if(data===undefined){
                  callback('group not found')
                }
                else{
                  var getGroup=data.groupId
                  var getNameGroup=data.groupName
                  db.get(`select * from contacts_groups as cg
                  join contacts as c on cg.contactId=c.contactId
                  join groups as g on cg.contactId=g.groupId
                  where c.contactName=$contactName and g.groupName=$groupName`
                  ,{
                    $contactName : contactName,
                    $groupName : groupName
                  },(err,data)=>{
                    if(err) callback(err)
                    else
                      {
                        if(data!==undefined){
                          callback('contact '+data.contactName+' already exist on '+ data.groupName +' group !')
                        }
                        else{
                          db.run(`insert into contacts_groups(contactId,groupId)
                          values($contactId,$groupId)`,
                          {
                            $contactId : getContact,
                            $groupId : getGroup
                          },
                          (err)=>{
                            if(err) console.log(err);
                            else console.log('assign contact '+getNameContact+' to group '+getNameGroup+' successfully');
                          })
                        }
                      }
                  })
                }

              }

            })

          }
        }
      })
    }

}

module.exports = ContactGroup
