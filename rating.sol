// version of compiler this code will compile with
pragma solidity ^0.4.18;

contract rating {

  mapping (bytes32 => uint8) public ratingReceived;

  /* Solidity doesn't let you pass in an array of strings in the constructor.
  Using an array of bytes32 instead to store the list of languages
  */

  bytes32[] public languagesList;

  //This is the constructor and is called once you deploy the contract
  function rating(bytes32[] languagesNames) public {
    languagesList = languagesNames;
  }

  // Returns the total rating a language has received
  function totalRatingFor(bytes32 language) view public returns (uint8) {
    require(validLanguage(language));
    return ratingReceived[language];
  }

  // Increments the rating count for the specified language
  function rateForLanguage(bytes32 language) public {
    require(validLanguage(language));
    ratingReceived[language] += 1;
  }

  function validLanguage(bytes32 language) view public returns (bool) {
    for(uint i = 0; i < languagesList.length; i++) {
      if (languagesList[i] == language) {
        return true;
      }
    }
    return false;
  }
}
