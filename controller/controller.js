const Contact = require('../models/contact')
const Group = require('../models/group')
const ContactGroups = require('../models/contact-group')

const View = require('../views/view')
const setup = require('../seeds/setup')

class Controller {
  static routes(argv) {
    let command = argv[2]

    switch (command) {
      case 'help': View.help();break;
      case 'Show:Contact': Contact.show(View.show); break;
      case 'Show:Group': Group.show(View.show); break;
      case 'Add:Contact': Contact.create(argv.splice(3), View.printLine); break;
      case 'Add:Group': Group.create(argv.splice(3), View.printLine); break;
      case 'Delete:Contact': Contact.delete(argv.splice(3), View.printLine); break;
      case 'Delete:Group': Group.delete(argv.splice(3), View.printLine); break;
      case 'Update:Contact': Contact.update(argv[3], argv.splice(4), View.printLine); break;
      case 'Update:Group': Group.update(argv[3], argv.splice(4), View.printLine); break;
      case 'setup': setup(); break;
      default: View.help();break;
    }
  }
}

module.exports = Controller