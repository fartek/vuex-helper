const utils = require('../utils');

async function handleMutationTypes(storeDir, mutation) {
  let mutationTypes = await utils.readFile(`${storeDir}/mutation-types.js`);

  // Add a newline if one is not already there
  mutationTypes = utils.addNewlineToString(mutationTypes);

  mutationTypes = mutationTypes.concat(
    `export const ${mutation} = '${mutation}';\n`
  );
  utils.writeFile(`${storeDir}/mutation-types.js`, mutationTypes);
}

async function handleGetters(storeDir, property) {
  let getters = await utils.readFile(`${storeDir}/getters.js`);

  getters = utils.addNewlineToString(getters);
  getters = getters.concat(
    `export const ${property} = state => state.${property};\n`
  );
  utils.writeFile(`${storeDir}/getters.js`, getters);
}

module.exports = {
  async run(storeDir, action = null, property = null) {
    if (property === null) {
      console.log('No property to add!'.red);
      return;
    }
    console.log('Adding the property:'.green.bold, property.yellow.bold);
    if (action) {
      const mutation = utils.textToConst(utils.joinSnakeCase(action, property));
      handleMutationTypes(storeDir, mutation);
    }
    handleGetters(storeDir, property)
  },
};
