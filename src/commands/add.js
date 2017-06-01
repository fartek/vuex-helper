const fs = require('fs');
const utils = require('../utils');

function readMutationTypes(storeDir) {
  return new Promise(function readMutationTypesPromise(resolve, reject) {
    console.log('Reading mutation-types.js'.yellow);
    fs.readFile(`${storeDir}/mutation-types.js`, "utf8", function read(err, data) {
      if (err) reject(err);
      else {
        console.log('Done'.green);
        resolve(data);
      }
    });
  });
}

function writeMutationTypes(storeDir, data) {
  return new Promise(function writeMutationTypesPromise(resolve, reject) {
    console.log('Writing new mutation-types.js'.yellow);
    fs.writeFile(
      `${storeDir}/mutation-types.js`,
      data,
      function write(error) {
        if (error) reject(error);
        else {
          console.log('Done'.green);
          resolve();
        }
      });
  });
}

async function handleMutationTypes(storeDir, mutation) {
  const mutationTypesInitial = await readMutationTypes(storeDir);
  let mutationTypes = mutationTypesInitial;

  // Last char is a newline and the file is not empty
  if (mutationTypes.charAt(mutationTypes.length - 1) !== '\n' && mutationTypes.length > 0) {
    console.log('last char NOT newline');
    mutationTypes = mutationTypes.concat('\n');
  }
  mutationTypes = mutationTypes.concat(
    `export const ${mutation} = '${mutation}';\n`
  );
  await writeMutationTypes(storeDir, mutationTypes);
}

module.exports = {
  async run(storeDir, property = null, mutation = null) {
    if (property === null) {
      console.log('No property to add!'.red);
      return;
    } else if (mutation === null) {
      console.log('No mutation to add!'.red);
      return;
    }
    console.log('Adding the property:'.green.bold, property.yellow.bold);
    handleMutationTypes(storeDir, mutation);
  },
};
