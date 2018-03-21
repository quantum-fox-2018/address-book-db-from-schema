var Table = require('cli-table');

class ViewContact {
    static notifAdd(report){
        console.log(report)
    }
    static notifUpdate(report){
        console.log(report)
    }
    static notifDelete(report){
        console.log(report)
    }
    static show(data){
        console.log('Data Contact')

        // instantiate 
        var table = new Table({
            head: ['No','Full Name', 'Email', 'Phone','Group']
        , colWidths: [5,15,15,10,35]
        });
        
        let no = 1;
        for(let i=0; i<data.length; i++){
            let fname = data[i].fullname;
            let email = data[i].email;
            let phone = data[i].phone;
            let ngroup = data[i].group;
            
            table.push(
                [no,fname,email,phone,ngroup]
            );
            no++;
        }
        console.log(table.toString());
    }
}

module.exports = ViewContact;