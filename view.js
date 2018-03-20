class View{
  static showSuccess(function_name){
    switch(function_name){
      case 'createContact':
        console.log('Success create new contact')
        break;
      case 'createGroup':
        console.log('Success create new group')
        break;
      case 'updateContact':
        console.log('Success update selected contact')
        break;
      case 'updateGroup':
        console.log('Success update selected group')
        break;
      case 'deleteContact':
        console.log('Success delete selected contact')
        break;
      case 'deleteGroup':
        console.log('Success delete selected group')
        break;
      case 'addToGroup':
        console.log('Success add contact to selected group')
        break;
      case 'showContact':
        console.log('')
        break;
      case 'showGroup':
        console.log('')
        break;
    }
  }

  static showFail(function_name){
    switch(function_name){
    case 'createContact':
      console.log('Fail create new contact')
      break;
    case 'createGroup':
      console.log('Fail create new group')
      break;
    case 'updateContact':
      console.log('Fail update selected contact')
      break;
    case 'updateGroup':
      console.log('Fail update selected group')
      break;
    case 'deleteContact':
      console.log('Fail delete selected contact')
      break;
    case 'deleteGroup':
      console.log('Fail delete selected group')
      break;
    case 'addToGroup':
      console.log('Fail add contact to selected group')
      break;
    case 'showContact':
      console.log('')
      break;
    case 'showGroup':
      console.log('')
      break;
    }
  }
}

module.exports = View;
