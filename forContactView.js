function beautifyContact(input){
  let arrayOfContact = []
  let count = 0
  for(let i=0; i<input.length; i++){
    let contact = [input[i].id,input[i].contactName,input[i].address,input[i].phoneNumber,input[i].email]
    for(let j=0; j<arrayOfContact.length; j++){
      if(contact[0]==arrayOfContact[j][0]){
        count++
      }
    }
    if(count==0){
      arrayOfContact.push(contact)
    }
  }
  for(let i=0; i<arrayOfContact.length; i++){
    let groups = []
    for(let j=0; j<input.length; j++){
      if(arrayOfContact[i][1]==input[j].contactName){
        groups.push(input[j].groupName)
      }
    }
    arrayOfContact[i].push(groups)
  }
  return arrayOfContact
}

module.exports = beautifyContact
