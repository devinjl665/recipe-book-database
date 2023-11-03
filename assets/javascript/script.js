// Get user inputs 
// ********* Get HTML ID's later
var mealSearch = 'Arrabiata'; 
var mealIngrediantSearch = 'Beef'; 

var cocktailSearch = 'Margarita'; 
var cocktailIngrediantSearch = 'Whiskey'; 

// Create URL Strings 
var mealUrl = 'https:www.themealdb.com/api/json/v1/1/search.php?s=' + mealSearch; // the database of meals (later put input inside html link after '?s=')
var mealIngrediantUrl= 'https:www.themealdb.com/api/json/v1/1/filter.php?i=' + mealIngrediantSearch;

var cocktailUrl = 'https:www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktailSearch; // the database of cocktails (later put input inside html link after '?s=')
var cocktailIngrediantUrl = 'https:www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + cocktailIngrediantSearch; // Get input from html


function displayMeal(mealObject){ // when called html tags will be replaced with information from object 
    console.log(mealObject);
    return;
}

function displayCocktail(cocktailObject){ // when called html tags will be replaced with information from object 
    console.log(cocktailObject);
    return;
}

// Meal Stuffs
fetch(mealUrl) // send out request and fetch should return an object (the meal object)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) { // this is where html tags will be replaced (maybe make a function later)
    displayMeal(data);
  });
  
// Cocktail Stuffs
fetch(cocktailUrl) // send out request and fetch should return an object (the meal object)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) { // this is where html tags will be replaced (maybe make a function later)
    displayCocktail(data);
  });

  // Meal Ingrediant Stuffs
fetch(mealIngrediantUrl) // send out request and fetch should return an object (the meal object)
.then(function (response) {
  return response.json();
})
.then(function (data) { // this is where html tags will be replaced (maybe make a function later)
  displayMeal(data);
});

// Cocktail Ingrediant Stuffs
fetch(cocktailIngrediantUrl) // send out request and fetch should return an object (the meal object)
.then(function (response) {
  return response.json();
})
.then(function (data) { // this is where html tags will be replaced (maybe make a function later)
  displayCocktail(data);
});