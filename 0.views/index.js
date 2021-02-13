class View {

    static showHelp() {
        console.log(`$ node main.js List of Available Tables: Contacts, Groups, ContactGroups`)
        console.log(`$ node main.js help                                                 # menampilkan command apa saja yang tersedia`)
        console.log(`$ node main.js insertall <tableName> <csvFileName.csv>              # memasukkan data ke dalam database secara massal menggunakan CSV file`)
        console.log(`$ node main.js insertaone Contacts <firstName> <lastName> <company> <phone> <email>    # memasukkan satu data ke dalam database Contact`)
        console.log(`$ node main.js insertaone Groups <groupName>                        # memasukkan satu data ke dalam database Group`)
        console.log(`$ node main.js insertaone ContactGroups <contactId> <groupId>       # memasukkan satu data ke dalam database Group`)
        console.log(`$ node main.js update <tableName> <columnToUpdate> <updateData> <id> # update satu data ke dalam database terkait`)
        console.log(`$ node main.js delete <tableName> <id>                              # delete satu data ke dalam database terkait`)
        console.log(`$ node main.js show <tableName>                                     # show semua data dalam database terkait`)
    }

    static insertall(tableName) {
        console.log(`Data sudah berhasil diinput ke dalam table ${tableName}`);
    }
    
    static inserone() {
        
    }
    
    static update(tableName) {
        console.log(`Table ${tableName} sudah berhasil diupdate dengan data baru !`);
    }
    
    static delete(tableName) {
        console.log(`Penghapusan data pada Table ${tableName} sudah berhasil`);
    }

    static show(arrObjData) {
        console.log(arrObjData);
    }

    static insertone(tableName) {
        console.log(`Data sudah berhasil diinput ke dalam table ${tableName}`);
    }




}

module.exports = View;