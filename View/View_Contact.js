class ViewContact {
  static setupDbSuccess(result) {
    console.log(result);
  }

  static addSuccess(result) {
    console.log(`Add Contact name: ${result.name}`);
    console.log(result);
  }

  static addFailed(result) {
    console.log(result);
  }

  static updateSuccess(result) {
    console.log(`Update Contact name: ${result.name}`);
    console.log(result);
  }

  static deleteSuccess(result) {
    console.log(result);
  }

  static show(result) {
    console.log(`Show ${result.length} Contact(s):`);
    console.log(result);
  }
}

module.exports = ViewContact;
