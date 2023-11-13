// Define variables
var cocktailSearchForm = document.getElementById("cocktailSearchForm");
var cocktailContainer = document.getElementById("cocktailContainer");
var cocktailTableBody = document.getElementById("cocktailTableBody");
var cocktailHistoryText = document.getElementById("cocktailHistoryText");
var clearCocktailHistory = document.getElementById("clearCocktailHistory");

// Add event listener for the search button
cocktailSearchForm.addEventListener("submit", function (event) {

  event.preventDefault();

  var cocktailSearchInput = document.getElementById("cocktailSearchInput");
  var cocktail = cocktailSearchInput.value;

  
      // Make API request using 'fetch' function
  var cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail;

  fetch(cocktailUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // see if not found
      if(data.drinks == null){
        // Display message for if meal not found
        cocktailNotFoundText();
      }
      else {
        // Handle API response and update HTML
        displayCocktailElements(data);

        if(document.getElementById("searchContentEmpty")){ // means previous search wasn't found so remove content
          var messageBox = document.getElementById("searchContentEmpty");
          messageBox.innerHTML = "";
        }
      }
    });
    addCocktailHistory(cocktailSearchInput.value);
    cocktailSearchInput.value = "";
});

// Function to create and display HTML elements based on cocktail data
function displayCocktailElements(cocktailData) {
  // Clear previous content in the container
  cocktailTableBody.innerHTML = '';

  cocktailContainer.style.display = "block";

  console.log(cocktailData);
  // Check if cocktails are found
  if (cocktailData.drinks == null) {
    // Display a message for no results
    cocktailContainer.innerHTML = '<p>No cocktails found.</p>';
  } else {
    var cocktail = cocktailData.drinks[0];

    // Create HTML elements for cocktail details
    var cocktailName = document.getElementById("cocktailName");
    cocktailName.textContent = cocktail.strDrink;

    var image = document.createElement("img");
    image.setAttribute("src", cocktail.strDrinkThumb);
    var imageContainer = document.getElementById("cocktailImageContainer");
    imageContainer.innerHTML = ''; // Clear previous image
    imageContainer.appendChild(image);

    var directions = document.getElementById("directionsCocktail");
    directions.textContent = cocktail.strInstructions;

    var cocktailLink = document.getElementById("cocktailLink");
    cocktailLink.href = cocktail.strVideo;

    // Log the generated ingredients list to the console
    console.log(generateIngredientsList(cocktail));

    // Create HTML elements for ingredients
    for (var j = 1; j <= 15; j++) {
      var ingredientKey = 'strIngredient' + j;
      var measureKey = 'strMeasure' + j;

      // Check if ingredient and measurement exist
      if (cocktail[ingredientKey] || cocktail[measureKey]) {
        var tableRow = document.createElement("tr");
        var tableCellIngredient = document.createElement("td");
        tableCellIngredient.textContent = cocktail[ingredientKey];
        tableRow.appendChild(tableCellIngredient);

        var tableCellQuantity = document.createElement("td");
        tableCellQuantity.textContent = cocktail[measureKey];
        tableRow.appendChild(tableCellQuantity);

        cocktailTableBody.appendChild(tableRow);
      }
    }
  }
}

// Function to generate HTML list of ingredients and measurements
function generateIngredientsList(cocktail) {
  var ingredientsList = '';

  // Loop through the ingredients and measurements
  for (var i = 1; i <= 15; i++) {
    var ingredientKey = 'strIngredient' + i;
    var measureKey = 'strMeasure' + i;

    // Check if ingredient and measurement exist
    if (cocktail[ingredientKey] && cocktail[measureKey]) {
      ingredientsList += `<li>${cocktail[measureKey]} ${cocktail[ingredientKey]}</li>`;
    } else if (cocktail[ingredientKey]) {
      ingredientsList += `<li>${cocktail[ingredientKey]}</li>`;
    }
  }
  return ingredientsList;
}

function cocktailNotFoundText(){
  var messageBox = document.getElementById("searchMessageBox");
  messageBox.innerHTML = "";
  var message = document.createElement("h1");
  message.setAttribute("id", "searchContentEmpty");
  message.textContent = "Nothing was Found!";
  message.classList.add("title", "is-2");
  message.style.textAlign = "center";
  message.style.marginBottom = "20px";
  message.style.color = "red";
  messageBox.append(message);
}

function addCocktailHistory(searchedcocktail) {
  var cocktailHistory = [];
  var prevSearches = JSON.parse(localStorage.getItem("cocktailHistory"));

  if (prevSearches !== null) {
    cocktailHistory = prevSearches;
    cocktailHistory.push(" " + searchedcocktail);
    localStorage.setItem("cocktailHistory", JSON.stringify(cocktailHistory));
  } else {
    cocktailHistory.push(" " + searchedcocktail);
    localStorage.setItem("cocktailHistory", JSON.stringify(cocktailHistory));
  }
  cocktailHistoryText.textContent = cocktailHistory;
  console.log("test")
}

clearCocktailHistory.addEventListener("click", function(event){
  localStorage.clear();
  cocktailHistoryText.textContent = "";
});

function displayCocktailHistory() {
  cocktailHistoryText.textContent = JSON.parse(localStorage.getItem("cocktailHistory"));
}

displayCocktailHistory();