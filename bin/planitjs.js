#!/usr/bin/env node
const commandLineCommands = require('command-line-commands');
const validCommands = [null, 'init', 'create'];
const {command, argv} = commandLineCommands(validCommands);

const options = require('command-line-args')(
    [
        {
            name: 'version',
            alias: 'v',
            type: Boolean
        }
    ]
);

var planitjs = require('../index');

switch (command) {
    case null:
        if (options.version)
            planitjs.showVersion();
        else
            planitjs.run();
            // console.log("I'm towni and I love my eyan!");
        break;
    case 'init':
        planitjs.init();
        break;
    case 'create':
        planitjs.create(argv);
}