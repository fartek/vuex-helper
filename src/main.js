require('colors');
const commandLineCommands = require('command-line-commands');
const path = require('path');
const initCmd = require('./commands/init');

const executionPath = process.cwd();
const projectRoot = executionPath;
let projectSourceRoot = 'src';
const storeDir = 'store';

const validCommands = [ null, 'init' ]

try {
  const { command, argv } = commandLineCommands(validCommands);
  run(command, argv);
} catch (error) {
  console.error('Invalid command, yo.'.red);
  console.error(error);
}

function run(command, argv) {
  console.log('command: %s', command);
  console.log('argv:    %s', JSON.stringify(argv));



  if (command === 'init') {
    initCmd.run(`${projectRoot}/${projectSourceRoot}/${storeDir}`);
  }
}