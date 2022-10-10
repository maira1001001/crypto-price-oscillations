"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
(0, fs_1.readFile)('package.json', 'utf8', (error, data) => {
    if (error) {
        console.log('Error while reading package.json', error);
        return;
    }
    console.log(`Testing typescript config with nodejs and es module, Version: , ${JSON.parse(data).version}`);
});
