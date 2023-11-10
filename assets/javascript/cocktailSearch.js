document.addEventListener('DOMContentLoaded', function () {
    // Define variables
    var cocktailSearchButton = document.getElementById("cocktailSearchButton");
    var cocktailContainer = document.getElementById("container");
    var cocktailTableBody = document.getElementById("cocktailTableBody");
  
    // Add event listener for the search button
    cocktailSearchButton.addEventListener("click", function () {
      var cocktailSearchInput = document.getElementById("cocktailSearchInput");
      var cocktail = cocktailSearchInput.value;
  
      // Make API request using 'fetch' function
      var cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail;
  
      fetch(cocktailUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Handle API response and update HTML
          displayCocktailElements(data);
        });
    });
  
    // Function to create and display HTML elements based on cocktail data
    function displayCocktailElements(cocktailData) {
      // Clear previous content in the container
      cocktailContainer.innerHTML = '';
      cocktailTableBody.innerHTML = '';
  
      // Check if cocktails are found
      if (cocktailData.drinks == null) {
        // Display a message for no results
        cocktailContainer.innerHTML = '<p>No cocktails found.</p>';
      } else {
        // Loop through each cocktail in the data and create HTML elements
        for (var i = 0; i < cocktailData.drinks.length; i++) {
          var cocktail = cocktailData.drinks[i];
  
          // Create HTML elements for cocktail details
          var cocktailName = document.getElementById("cocktailName");
          cocktailName.textContent = cocktailData.drinks[i].strDrink;
  
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
            if (cocktail[ingredientKey] && cocktail[measureKey]) {
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
  });
  