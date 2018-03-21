"use strict"
const Controller = require('./controller.js');

const argv = process.argv;
const input = {
    argv1: argv[3],
    argv2: argv[4],
    argv3: argv[5],
    argv4: argv[6]
};

switch(argv[2]) {
    case 'showData':
    Controller.showData(input.argv1);
    break;
    case 'saveContact':
    Controller.saveContact(input.argv1, input.argv2, input.argv3);
    break;
    case 'updateContact':
    Controller.updateContact(input.argv1, input.argv2, input.argv3);
    break;
    case 'deleteContact':
    Controller.deleteContact(input.argv1);
    break;
    case 'createGroup':
    Controller.saveGroup(input.argv1);
    break;
    case 'updateGroup':
    Controller.updateGroup(input.argv1, input.argv2);
    break;
    case 'deleteGroup':
    Controller.deleteGroup(input.argv1);
    break;
}