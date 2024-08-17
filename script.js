// Function to generate and display a password
function generateAndDisplayPassword(event) {
  if (event) event.preventDefault(); // Prevent the form from submitting

  let characterAmount = document.getElementById("characterAmountNumber").value;
  const customCharacterSet =
    document.getElementById("customCharacterSet").value;

  let includeUppercase = document.getElementById("includeUppercase").checked;
  let includeLowercase = document.getElementById("includeLowercase").checked;
  let includeNumbers = document.getElementById("includeNumbers").checked;
  let includeSymbols = document.getElementById("includeSymbols").checked;
  let includeSpaces = document.getElementById("includeSpaces").checked;
  let excludeSimilarCharacters = document.getElementById(
    "excludeSimilarCharacters"
  ).checked;
  let excludeAmbiguousCharacters = document.getElementById(
    "excludeAmbiguousCharacters"
  ).checked;
  let includeLeetSpeak = document.getElementById("includeLeetSpeak").checked;
  const randomizeLength = document.getElementById("randomizeLength").checked;
  const camelCase = document.getElementById("camelCase").checked;
  const kebabCase = document.getElementById("kebabCase").checked;

  // Uncheck and disable other options if custom character set is provided
  if (customCharacterSet && customCharacterSet.length > 0) {
    includeUppercase =
      includeLowercase =
      includeNumbers =
      includeSymbols =
      includeSpaces =
      excludeSimilarCharacters =
      excludeAmbiguousCharacters =
      includeLeetSpeak =
        false;

    document.getElementById("includeUppercase").checked = false;
    document.getElementById("includeLowercase").checked = false;
    document.getElementById("includeNumbers").checked = false;
    document.getElementById("includeSymbols").checked = false;
    document.getElementById("includeSpaces").checked = false;
    document.getElementById("excludeSimilarCharacters").checked = false;
    document.getElementById("excludeAmbiguousCharacters").checked = false;
    document.getElementById("includeLeetSpeak").checked = false;
  }

  if (randomizeLength) {
    characterAmount = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Random length between 10 and 50
  }

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    includeSpaces,
    excludeSimilarCharacters,
    excludeAmbiguousCharacters,
    includeLeetSpeak,
    customCharacterSet
  );

  let formattedPassword = formatPassword(password, camelCase, kebabCase);

  document.getElementById("passwordDisplay").innerText = formattedPassword;
}

// Function to generate a password
function generatePassword(
  characterAmount,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  includeSpaces,
  excludeSimilarCharacters,
  excludeAmbiguousCharacters,
  includeLeetSpeak,
  customCharacterSet
) {
  let charset = "";

  // Use custom character set if provided, otherwise build the charset based on options
  if (customCharacterSet && customCharacterSet.length > 0) {
    charset = customCharacterSet;
  } else {
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
    if (includeSpaces) charset += " ";
  }

  let password = "";
  for (let i = 0; i < characterAmount; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

// Function to format the password
function formatPassword(password, camelCase, kebabCase) {
  if (camelCase) {
    return password
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  } else if (kebabCase) {
    return password.replace(/\s+/g, "-").toLowerCase();
  } else {
    return password;
  }
}

// Automatically generate and display a password when the page loads
window.onload = generateAndDisplayPassword;

// Ensure password is copied to the clipboard when clicking on the password display
document
  .getElementById("passwordDisplay")
  .addEventListener("click", function () {
    const password = document.getElementById("passwordDisplay").textContent;
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy password!");
      });
  });

// Add event listener to the form to prevent default submit behavior
document
  .getElementById("passwordGeneratorForm")
  .addEventListener("submit", generateAndDisplayPassword);
