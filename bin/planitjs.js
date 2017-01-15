#!/usr/bin/env node
const options = require('command-line-args')(
    [
        {
            name: 'version',
            alias: 'v',
            type: Boolean
        }
    ]
);
const clc = require('cli-color');
const fs = require('fs');
const path = require('path');
const planitjs = require('../lib/planitjs');

if (options.version)
    console.log(clc.blue("Planitjs v.1.0.0. Made by Towni and Eyan."));
else
    planitjs(fs, clc, path);
    // console.log("I'm towni and I love my eyan!");