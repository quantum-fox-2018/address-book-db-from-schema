const db = require('./koneksi.js')

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
    var arrGroup=[]
    db.serialize(()=>{
      db.all(`select * from groups where groupId=$groupId`,{
        $groupId : groupId
      },(err,data)=>{
        if(err) callback(err)
        else{
          db.all(`select * from contacts_groups as cg join contacts as c
          on cg.contactId=c.contactId join groups as g
          on cg.groupId=g.groupId`,(err,dataGroup)=>{
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < dataGroup.length; j++) {
                if(data[i].groupId===dataGroup[j].groupId){
                  arrGroup.push(dataGroup[j].contactName)
                  data[i].members=arrGroup
                }
              }
              callback(data[i])
              arrGroup=[]
            }
          })
        }
      })
    })
  }

  showAll(callback){
    var arrGroup=[]
    db.serialize(()=>{
      db.all(`select * from groups`,(err,data)=>{
        if(err) callback(err)
        else{
          db.all(`select * from contacts_groups as cg join contacts as c
          on cg.contactId=c.contactId join groups as g
          on cg.groupId=g.groupId`,(err,dataGroup)=>{
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < dataGroup.length; j++) {
                if(data[i].groupId===dataGroup[j].groupId){
                  arrGroup.push(dataGroup[j].contactName)
                  data[i].members=arrGroup
                }
              }
              callback(data[i])
              arrGroup=[]
            }
          })
        }
      })
    })
  }
}

module.exports = Group
