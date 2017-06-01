function isNumberChar(char) {
	return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

function isCharUpper(char) {
 return char === char.toUpperCase() && !isNumberChar(char);
}

function textToConst(text) {
  let newText = '';

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    console.log('char:', char);
    if (isCharUpper(char)) {
      newText = newText.concat('_');
    }
    newText = newText.concat(char.toUpperCase());
  }
  return newText;
}

module.exports = {
  textToConst,
};