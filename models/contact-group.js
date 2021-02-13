const db = require('./koneksi.js')

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
      db.get(`select * from contacts
      where contactName=$contactName`,
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
            db.get(`select * from groups as g
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
                  where cg.contactId=$getContact and cg.groupId=$getGroup`
                  ,{
                    $getContact : getContact,
                    $getGroup : getGroup
                  },(err,data)=>{
                    if(err) callback(err)
                    else
                      {
                        if(data!==undefined){
                          callback('contact '+getNameContact+' already exist on '+ getNameGroup +' group !')
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
