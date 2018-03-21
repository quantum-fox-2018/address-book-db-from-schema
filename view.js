"use strict"
const Controller = require('./controller.js');

class View {
    static showMessage(statusMessage) {
        console.log(statusMessage);
    }

    static showErrorMessage(statusMessage) {
        console.log(statusMessage);
    }
}

module.exports = View;