const mkdirp = require('mkdirp');
const fs = require('fs');

const indexTemplate = require('../templates/index');
const actionsTemplate = require('../templates/actions');
const mutationsTemplate = require('../templates/mutations');
const stateTemplate = require('../templates/state');

function createStoreDir(storeDir) {
  return new Promise(function storeDirPromise(resolve, reject) {
    console.log(`Creating store directory at ${storeDir}`.yellow)
    mkdirp(storeDir, function mkdirpCallback(error) {
        if (error) reject(error);
        else {
          console.log('Done!'.green);
          resolve();
        }
    });
  });
}

function createIndex(storeDir) {
  return new Promise(function indexPromise(resolve, reject) {
    console.log('Creating initial index.js'.yellow);
    fs.writeFile(
      `${storeDir}/index.js`,
      indexTemplate,
      function writeIndex(error) {
        if (error) reject(error);
        else {
          console.log('Done!'.green);
          resolve();
        }
      });
  });
}

function createMutationTypes(storeDir) {
  return new Promise(function indexPromise(resolve, reject) {
    console.log('Creating initial mutation-types.js'.yellow);
    fs.writeFile(
      `${storeDir}/mutation-types.js`,
      '',
      function writeIndex(error) {
        if (error) reject(error);
        else {
          console.log('Done!'.green);
          resolve();
        }
      });
  });
}

function createGetters(storeDir) {
  return new Promise(function indexPromise(resolve, reject) {
    console.log('Creating initial getters.js'.yellow);
    fs.writeFile(
      `${storeDir}/getters.js`,
      '',
      function writeIndex(error) {
        if (error) reject(error);
        else {
          console.log('Done!'.green);
          resolve();
        }
      });
  });
}

function createActions(storeDir) {
  return new Promise(function indexPromise(resolve, reject) {
    console.log('Creating initial actions.js'.yellow);
    fs.writeFile(
      `${storeDir}/actions.js`,
      actionsTemplate,
      function writeIndex(error) {
        if (error) reject(error);
        else {
          console.log('Done!'.green);
          resolve();
        }
      });
  });
}

function createMutations(storeDir) {
  return new Promise(function indexPromise(resolve, reject) {
    console.log('Creating initial mutations.js'.yellow);
    fs.writeFile(
      `${storeDir}/mutations.js`,
      mutationsTemplate,
      function writeIndex(error) {
        if (error) reject(error);
        else {
          console.log('Done!'.green);
          resolve();
        }
      });
  });
}

function createState(storeDir) {
  return new Promise(function indexPromise(resolve, reject) {
    console.log('Creating initial state.js'.yellow);
    fs.writeFile(
      `${storeDir}/state.js`,
      stateTemplate,
      function writeIndex(error) {
        if (error) reject(error);
        else {
          console.log('Done!'.green);
          resolve();
        }
      });
  });
}

module.exports = {
  async run(storeDir) {
    console.log('Initializing vuex'.green.bold);
    await createStoreDir(storeDir);
    await createIndex(storeDir);
    await createMutationTypes(storeDir);
    await createMutations(storeDir);
    await createState(storeDir);
    await createGetters(storeDir);
    await createActions(storeDir);
    console.log('Done initializing'.green.bold);
  },
};