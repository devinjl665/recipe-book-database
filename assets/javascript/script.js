// Get user inputs 
// ********* Get HTML ID's later
var recommendedMeal = 'Arrabiata'; // change accordinly to what you recommened
var recommendedCocktail = 'Old Fashioned'; // change accordinly to what you recommened
var searchForm = document.getElementById("searchForm"); // form for searches
var mealSearchInput = document.getElementById("mealSearchInput");
var cocktailSearchInput = document.getElementById("cocktailSearchInput");

function displayRecommenedMeal(meal){ // takes in a meal

  var mealUrl = 'https:www.themealdb.com/api/json/v1/1/search.php?s=' + meal; // the database of meals 

  fetch(mealUrl) // send out request and fetch should return an object (the meal object)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) { // this is where html tags will be replaced or made

      // Get the meal name and display
      var mealName = document.getElementById("mealName");
      mealName.textContent = data.meals[0].strMeal;

      // Get the meal image and display
      var image = document.createElement("img");
      image.setAttribute("src", data.meals[0].strMealThumb);
      
      var imageContainer = document.getElementById("mealImageContainer");
      imageContainer.append(image); // append image to container

      // INGREDIANTS/Quantities HERE

      var ingredientsKeys = Object.keys(data.meals[0]).filter(function(key) {
        return key.includes('strIngredient');
      }); // get ingredient keys

      var quantitiesKeys = Object.keys(data.meals[0]).filter(function(key) {
        return key.includes('strMeasure');
      }); // get quantity keys

      var mealTableBody = document.getElementById("mealTableBody"); // the tbody in html

      for(var i = 0; i < ingredientsKeys.length; i++){ // ingredients and quantities should be same length
      
        // check to make sure there is something there
        if(data.meals[0][ingredientsKeys[i]] != "" && data.meals[0][quantitiesKeys[i]] != "" && data.meals[0][ingredientsKeys[i]] != null && data.meals[0][quantitiesKeys[i]] != null){
          // create table row
          var tableRow = document.createElement("tr");
          // create table cell
          var tableCellIngredient = document.createElement("td");
          tableCellIngredient.textContent = data.meals[0][ingredientsKeys[i]];
          // append to row
          tableRow.append(tableCellIngredient);
          // create table cell
          var tableCellQuantity = document.createElement("td");
          tableCellQuantity.textContent = data.meals[0][quantitiesKeys[i]];
          // append to row
          tableRow.append(tableCellQuantity);

          // now append row to table body
          mealTableBody.append(tableRow);
        }
      }

      // Get meal directions and display
      var directions = document.getElementById("directionsMeal");
      directions.textContent = data.meals[0].strInstructions;
      
      // Get meal link and display
      var mealLink = document.getElementById("mealLink");
      mealLink.href = data.meals[0].strYoutube;

    });

}

function displayRecommenedCocktails(cocktail){ // takes in a cocktail

  var cocktailUrl = 'https:www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail; // the database of cocktails (later put input inside html link after '?s=')

  fetch(cocktailUrl) // send out request and fetch should return an object (the meal object)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) { // this is where html tags will be replaced or made

    // Get the cocktail name and display
    var cocktailName = document.getElementById("cocktailName");
    cocktailName.textContent = data.drinks[0].strDrink;

    // Get the cocktail image and display
    var image = document.createElement("img");
    image.setAttribute("src", data.drinks[0].strDrinkThumb);
    
    var imageContainer = document.getElementById("cocktailImageContainer");
    imageContainer.append(image); // append image to container
  
    // INGREDIANTS/Quantities HERE
    var ingredientsKeys = Object.keys(data.drinks[0]).filter(function(key) {
      return key.includes('strIngredient');
    }); // get ingredient keys

    var quantitiesKeys = Object.keys(data.drinks[0]).filter(function(key) {
      return key.includes('strMeasure');
    }); // get quantity keys

    var cocktailTableBody = document.getElementById("cocktailTableBody"); // the tbody in html

    for(var i = 0; i < ingredientsKeys.length; i++){ // ingredients and quantities should be same length
    
      // check to make sure there is something there
      if(data.drinks[0][ingredientsKeys[i]] != "" && data.drinks[0][quantitiesKeys[i]] != "" && data.drinks[0][ingredientsKeys[i]] != null && data.drinks[0][quantitiesKeys[i]] != null){
        // create table row
        var tableRow = document.createElement("tr");
        // create table cell
        var tableCellIngredient = document.createElement("td");
        tableCellIngredient.textContent = data.drinks[0][ingredientsKeys[i]];
        // append to row
        tableRow.append(tableCellIngredient);
        // create table cell
        var tableCellQuantity = document.createElement("td");
        tableCellQuantity.textContent = data.drinks[0][quantitiesKeys[i]];
        // append to row
        tableRow.append(tableCellQuantity);

        // now append row to table body
        cocktailTableBody.append(tableRow);
      }
    }

    // Get cocktail directions and display
    var directions = document.getElementById("directionsCocktail");
    directions.textContent = data.drinks[0].strInstructions;
    
    // Get cocktail link and display
    var cocktailLink = document.getElementById("cocktailLink");
    cocktailLink.href = data.drinks[0].strVideo;
  });

}

displayRecommenedMeal(recommendedMeal);
displayRecommenedCocktails(recommendedCocktail);