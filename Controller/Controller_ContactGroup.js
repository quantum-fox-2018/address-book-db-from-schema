const ContactGroup = require('../Model/Model_ContactGroup.js');
const ViewContactGroup = require('../View/View_ContactGroup.js')

class ControllerContactGroup {
  static add(group_id, contact_id) {
    let properties = new ContactGroup(group_id, contact_id);
    ContactGroup.add(properties, data => {
      ViewContactGroup.addSuccess(data);
    });
  }

  static delete(id) {
    ContactGroup.delete(id, result => {
      ViewContactGroup.deleteSuccess(result);
    });
  }

  static show() {
    ContactGroup.show(data => {
      ViewContactGroup.show(data);
    });
  }
}

module.exports = ControllerContactGroup;
