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

async function handleState(storeDir, property) {
  let stateFile = await utils.readFile(`${storeDir}/state.js`);

  const openTag = 'export default {';
  const closeTag = '};';

  const startIndex = stateFile.indexOf(openTag) + openTag.length;
  const endIndex = stateFile.lastIndexOf(closeTag);

  let state = stateFile.substring(startIndex, endIndex);
  state = utils.addNewlineToString(state);
  state = state.concat(`  ${property}: 0,\n`);

  const finalState = openTag.concat(state).concat(closeTag);
  
  utils.writeFile(`${storeDir}/state.js`, finalState);
}

function processInput(text) {
  // TODO: first check if can parse it -> then it's a Number

  let textArray = text.split(':');
  if (textArray.length > 2) {
    const lastElement = textArray.pop();
    textArray = [textArray.join(':'), lastElement];
  }

  console.log(textArray);

  return {
    value: 'dummy',
    type: 'string',
  }
}

module.exports = {
  async run(storeDir, property = null, inputValue = 0, action = null) {
    if (property === null) {
      console.log('No property to add!'.red);
      return;
    }
    console.log('Adding the property:'.green.bold, property.yellow.bold);
    if (action) {
      const mutation = utils.textToConst(utils.joinSnakeCase(action, property));
      handleMutationTypes(storeDir, mutation);
    }
    console.log(processInput(inputValue));

    handleGetters(storeDir, property)
    handleState(storeDir, property);
  },
};
