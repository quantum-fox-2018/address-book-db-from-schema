class View {

  static setup(setupMessage){
    console.log(setupMessage);
  }

  static save(database_contacs){
    let newData = database_contacs[0]
    console.log(`You just added ${newData.name} from ${newData.company} to your address_book`);
  }

  static show(database_contacs,database_groups){

    console.log('---------------------CONTACTS-------------------------');
    for(let i=0;i<database_contacs.length;i++){
      let database = database_contacs[i]
      console.log(`${database.id}. Name : ${database.name}, Company : ${database.company}, Phone Number : ${database.phone_number}, Email : ${database.email}`);
    }

    console.log('---------------------GROUPS-------------------------');
    for(let i=0;database_groups.length;i++){
      let database = database_groups[i];
      console.log(`${database.id}. Group Name : ${database.groupName}`);
    }
  }

  static update(commands,oldData,update_data,update_id){
    let dataUsers = oldData[0][commands];
    console.log(`New ${commands} has been updated from ${dataUsers} to ${update_data} at id : ${update_id}`);
  }

  static createGroup(totalGroups){
    console.log(totalGroups);
  }

  static addContact(addedData,groupName){
    console.log(`${addedData} has beed added to Group : ${groupName}`);
  }
}

module.exports = {View:View};
