class View {

  static setup(setupMessage){
    console.log(setupMessage);
  }

  static save(database_contacs){
    let newData = database_contacs[0]
    console.log(`You just added ${newData.name} from ${newData.company} to your address_book`);
  }

  static show(database_contacs){

    console.log('---------------------ADDRESS BOOK-------------------------');
    for(let i=0;i<database_contacs.length;i++){
      let database = database_contacs[i];
      console.log(`${database.id}. Name : ${database.name}, Company : ${database.company}, Phone Number : ${database.phone_number}, Email : ${database.email}, Group : ${database.groupName}`);
    }
  }


  static update(commands,oldData,update_data,update_id){

    let dataUsers = oldData[0][commands];
    console.log(`New ${commands} has been updated from ${dataUsers} to ${update_data} at id : ${update_id}`);
  }

  static createGroup(checkCond, dataGroup){

    if(checkCond){
      let newGroup = dataGroup[dataGroup.length-1].groupName;
      console.log(`Group ${newGroup} has been added to groups table`);
    }else{
      console.log(dataGroup);
    }

  }

  static addContact(addedData,groupName){
    console.log(`${addedData} has beed added to Group : ${groupName}`);
  }

  static newMember(checkCond, newContact, groupName){
    if(checkCond){
      console.log(`${newContact} has been added to ${groupName} group`);
    }
    else{
      console.log(`This conctact is already member on ${groupName} group or other groups`);
    }
  }

  static delete(message){
    console.log(message);
  }
}

module.exports = {View:View};
