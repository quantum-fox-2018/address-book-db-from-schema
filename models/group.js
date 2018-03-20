const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

class Group{
  constructor(groupName){
    this.groupName = groupName
  }

  save(callback){
    db.run(`insert into groups(groupName) values($groupName)`
    ,{
        $groupName : this.groupName,
      },(err)=>{
          if(err) callback(err)
          else callback('insert data groups successfully')
    })
    db.close()
  }

  update(groupId,callback){
     db.run(`update groups set groupName=$groupName where groupId=$groupId`
     ,{
       $groupName : this.groupName,
       $groupId : groupId
     },(err)=>{
       if(err) callback(err)
         else callback('update data groups successfully')
       })
     db.close()
   }

   destroy(groupId,callback){
     db.serialize(()=>{
       db.run(`delete from groups where groupId=$groupId`
       ,{
         $groupId : groupId
       },(err)=>{
         if(err) callback(err)
           else callback('delete data groups successfully')
      })

      db.run(`delete from contacts_groups where groupId=$groupId`
      ,{
        $groupId : groupId
      },(err)=>{
        if(err) callback(err)
          else callback('delete data groups from contacts groups successfully')
     })

       db.close()
     })
  }

  show(groupId,callback){
    db.all(`select g.groupName,c.contactName from groups as g
     left join contacts_groups as cg on g.groupId = cg.groupId
     left join contacts as c on c.contactId = cg.contactId
     where g.groupId=$groupId`,
    {
      $groupId : groupId
    }
    ,(err,data)=>{
      if(err) callback(err);
      else callback(data);
    })
  }

  showAll(callback){
    db.all(`select g.groupName from groups as g
      `,(err,data)=>{
      if(err) callback(err);
      else callback(data);
    })
  }
}

module.exports = Group
