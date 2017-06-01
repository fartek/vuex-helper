const fs = require('fs');

/**
 * Returns true if the input char is a numeral char (0-9)
 */
function isNumberChar(char) {
	return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

/**
 * Returns true if the input char is uppercase and is not a numeral char (0-9)
 */
function isCharUpper(char) {
 return char === char.toUpperCase() && !isNumberChar(char);
}

/**
 * Transforms the input string ('text') from snakeCase
 * to CONSTANT_CASE
 */
function textToConst(text) {
  let newText = '';

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (isCharUpper(char)) {
      newText = newText.concat('_');
    }
    newText = newText.concat(char.toUpperCase());
  }
  return newText;
}

/**
 * Adds the newline char to the end of the input string ('text')
 * if the last char is not already a newline char.
 */
function addNewlineToString(text) {
  if (text.charAt(text.length - 1) !== '\n' && text.length > 0) {
    return text.concat('\n');
  }
  return text;
}

function joinSnakeCase(text1, text2) {
  return text1.concat(text2.charAt(0).toUpperCase().concat(text2.substr(1)));
}

function readFile(fileDir) {
  return new Promise(function readFilePromise(resolve, reject) {
    fs.readFile(fileDir, "utf8", function read(error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

function writeFile(fileDir, data) {
  return new Promise(function writeFilePromise(resolve, reject) {
    fs.writeFile(
      fileDir,
      data,
      function write(error) {
        if (error) reject(error);
        else resolve();
      });
  });
}

function isQuoteChar(char) {
  return char === '\'' || char === '"';
}

module.exports = {
  textToConst,
  addNewlineToString,
  readFile,
  writeFile,
  joinSnakeCase,
  isQuoteChar,
};