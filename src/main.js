require('colors');
const commandLineCommands = require('command-line-commands');
const path = require('path');
const initCmd = require('./commands/init');
const addCmd = require('./commands/add');
const utils = require('./utils');

const executionPath = process.cwd();
const projectRoot = executionPath;
let projectSourceRoot = 'src';
const storeDir = 'store';

const validCommands = [null, 'init', 'add'];

try {
  const { command, argv } = commandLineCommands(validCommands);
  run(command, argv);
} catch (error) {
  console.error('Invalid command, yo.'.red);
  console.error(error);
}

function run(command, argv) {
  const absoluteStoreDir = `${projectRoot}/${projectSourceRoot}/${storeDir}`;

  if (command === 'init') {
    initCmd.run(absoluteStoreDir);
  } else if (command === 'add') {
    const property = argv[0]; // TODO: turn these into actual arguments
    const mutation = utils.textToConst(argv[1]); // -------------------
    addCmd.run(absoluteStoreDir, property, mutation);
  }
}