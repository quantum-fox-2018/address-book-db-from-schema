function beautifyContact(input){
  let arrayOfContact = []
  let count = 0
  for(let i=0; i<input.length; i++){
    let contact = {
      id:input[i].id,
      contactName:input[i].contactName,
      address:input[i].address,
      phoneNumber:input[i].phoneNumber,
      email:input[i].email}
    for(let j=0; j<arrayOfContact.length; j++){
      if(contact.id==arrayOfContact[j].id){
        count++
      }
    }
    if(count==0){
      arrayOfContact.push(contact)
    }
  }
  for(let i=0; i<arrayOfContact.length; i++){
    let arrayOfGroups = []
    for(let j=0; j<input.length; j++){
      if(arrayOfContact[i].contactName==input[j].contactName){
        arrayOfGroups.push(input[j].groupName)
      }
    }
    arrayOfContact[i].groups = arrayOfGroups
  }
  return arrayOfContact
}

module.exports = beautifyContact
