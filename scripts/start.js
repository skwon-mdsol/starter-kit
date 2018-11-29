#!/usr/bin/env node

const startServer = require('./devServer');
const commander = require('commander');

commander
  .version('0.0.1')
  .command('dev <configFilePath>')
  .action((configFilePath, cmd) => {
    console.log(configFilePath)
    startServer(configFilePath);
  });

commander.parse(process.argv);
