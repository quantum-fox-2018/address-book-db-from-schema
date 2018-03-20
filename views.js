const Table = require('cli-table')

class View{
    constructor() {
        
    }

    static showContact(datacontact){
        console.log(`This Data Contact List :`)
        console.log(datacontact)
        let tableContact = new Table({
            head: ['Contact ID', 'Full Name', 'Email', 'Phone Number'],
            colWidths: [24, 25, 25, 15] 
        })

        // for(let i=0; i<datacontact.length; i++){
        //     tableContact.push([datacontact[i].group_name,
        //         datacontact[i].name,
        //         datacontact[i].email,
        //         datacontact[i].phone
        //     ])
        // }
        // console.log(tableContact.toString())
    }

    static showGroup(datagroup){
        console.log(`This Data Group List :`)
        
        let tableGroup = new Table({
            head: ['Group ID', 'Group  Name'],
            colWidths: [10, 25] 
        })

        for(let i=0; i<datagroup.length; i++){
            tableGroup.push([datagroup[i].group_id,
                datagroup[i].group_name
            ])
        }
        console.log(tableGroup.toString())
    }

}

module.exports = View