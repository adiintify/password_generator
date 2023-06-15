// get the password display element
const passwordDisplay = document.getElementById("passwordDisplay");

// add a click event listener to the password display element
passwordDisplay.addEventListener("click", function () {
  // get the password text
  const password = passwordDisplay.textContent;

  // copy the password to the clipboard using the navigator.clipboard API
  navigator.clipboard
    .writeText(password)
    .then(() => {
      // show a success message
      alert("Password copied to clipboard!");
    })
    .catch(() => {
      // show an error message
      alert("Failed to copy password!");
    });
});

// get the other elements from the HTML file
const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeLowercaseElement = document.getElementById("includeLowercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const excludeSimilarCharactersElement = document.getElementById(
  "excludeSimilarCharacters"
);
const excludeAmbiguousCharactersElement = document.getElementById(
  "excludeAmbiguousCharacters"
);
const form = document.getElementById("passwordGeneratorForm");

// define the character codes for each type of character
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

// sync the character amount range and number inputs
characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

// add a submit event listener to the form element
form.addEventListener("submit", (e) => {
  // prevent the default behavior of the form
  e.preventDefault();

  // get the values of the inputs and checkboxes
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeLowercase = includeLowercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const excludeSimilarCharacters = excludeSimilarCharactersElement.checked;
  const excludeAmbiguousCharacters = excludeAmbiguousCharactersElement.checked;

  // generate a password based on the user's preferences
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeSimilarCharacters,
    excludeAmbiguousCharacters
  );

  // display the password in the password display element
  passwordDisplay.innerText = password;
});

// define a function to generate a password
function generatePassword(
  characterAmount,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  excludeSimilarCharacters,
  excludeAmbiguousCharacters
) {
  // initialize an empty array for the character codes
  let charCodes = [];

  // add the character codes for each type of character if selected by the user
  if (includeUppercase) {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  }

  if (includeLowercase) {
    charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
  }

  if (includeNumbers) {
    charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  }

  if (includeSymbols) {
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  }

  // exclude some characters if selected by the user
  if (excludeSimilarCharacters) {
    charCodes = excludeCharacters(charCodes, ["i", "l", "1", "I"]);
  }

  if (excludeAmbiguousCharacters) {
    charCodes = excludeCharacters(charCodes, ["{", "}", "[", "]"]);
  }

  // initialize an empty array for the password characters
  const passwordCharacters = [];

  // loop through the character amount and pick a random character code from the charCodes array
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];

    // convert the character code to a string and push it to the password characters array
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  // join the password characters array into a string and return it as the password
  return passwordCharacters.join("");
}

// define a function to exclude some characters from the charCodes array
function excludeCharacters(charCodes, excludedCharacters) {
  // filter the charCodes array and return only the ones that are not in the excludedCharacters array
  return charCodes.filter((charCode) => {
    const character = String.fromCharCode(charCode);
    return !excludedCharacters.includes(character);
  });
}

// define a function to create an array of numbers from a low to a high value
function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

// define a function to sync the character amount range and number inputs
function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}
