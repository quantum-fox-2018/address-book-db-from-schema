const Contact = require('../Model/Model_Contact.js');
const ViewContact = require('../View/View_Contact.js')

class ControllerContact {
  static add(name, address, email, phone) {
    ControllerContact.checkEmail(email, checkEmail => {
      if (checkEmail == true) {
        ControllerContact.checkPhone(phone, checkPhone => {
          if (checkPhone == true) {
            let properties = new Contact(name, address, email, phone);
            Contact.add(properties, data => {
              ViewContact.addSuccess(data);
            });
          } else {
            let result = `Invalid phone number!`;
            ViewContact.addFailed(result);
          }
        });
      } else {
        let result = `Invalid email address!`;
        ViewContact.addFailed(result);
      }
    });
  }

  static update(id, name, address, email, phone) {
    let properties = new Contact(name, address, email, phone);
    Contact.update(id, properties, data => {
      ViewContact.updateSuccess(data);
    });
  }

  static delete(id) {
    Contact.delete(id, result => {
      ViewContact.deleteSuccess(result);
    });
  }

  static show() {
    Contact.show(data => {
      ViewContact.show(data);
    });
  }

  static checkPhone(phone, callback) {
    let result = false
    let str = phone + '';
    if (str.length < 13) {
      result = true;
    }
    callback(result);
  }

  static checkEmail(email, callback) {
    let pattern = /\S+@\S+\.\S+/;
    let validity = pattern.test(email);
    callback(validity);
  }
}

module.exports = ControllerContact;
