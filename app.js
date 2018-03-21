const {ControllerContact,ControllerGroup,ControllerGroupContact} = require('./controllers/index.js')

let argv = process.argv;
let optClass = argv[2];
let action = argv[3];
let value = argv.slice(4);

if(optClass == null){
    console.log('argv kedua null')
} else if(optClass == 'contact'){
    if(action == 'add'){
        ControllerContact.add(value)
    } else if(action == 'edit'){
        ControllerContact.edit(value)
    } else if(action == 'delete'){
        ControllerContact.delete(value[0])
    } else if(action == 'show'){
        ControllerContact.show()
    }
} else if(optClass == 'group'){
    if(action == 'add'){
        ControllerGroup.add(value)
    } else if(action == 'edit'){
        ControllerGroup.edit(value)
    } else if(action == 'delete'){
        ControllerGroup.delete(value[0])
    }
} else if(optClass == 'groupcontact'){
    if(action == 'add'){
        ControllerGroupContact.add(value)
    } else if(action == 'edit'){
        console.log(`Edit Group Contact ${value}`)
    } else if(action == 'delete'){
        console.log(`Delete Group Contact ${value}`)
    }
}