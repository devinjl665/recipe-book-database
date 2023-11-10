var mealButton = document.getElementById("mealSearchButton");
var mealsContainer = document.getElementById("mealsContainer");

function displayMealElements(mealObject) {
    console.log(mealObject);

    // Clear existing content in mealsContainer
    mealsContainer.innerHTML = "";

    // Loop through mealObject and create/display elements
    for (var i = 0; i < mealObject.meals.length; i++) {
        var meal = mealObject.meals[i];

        // Create elements for each meal
        var mealElement = document.createElement("div");
        mealElement.classList.add("meal"); 

        // Create and append elements such as title, image, ingredients, etc.
        var mealTitle = document.createElement("h3");
        mealTitle.textContent = meal.strMeal;
        mealElement.appendChild(mealTitle);

        var mealImage = document.createElement("img");
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;
        mealElement.appendChild(mealImage);

        var mealIngredients = document.createElement("p");
        mealIngredients.textContent = "Ingredients: " + meal.strIngredient;
        mealElement.appendChild(mealIngredients);

        var mealRecipe = document.createElement("p");
        mealRecipe.textContent = "Recipe: " + meal.strInstructions;
        mealElement.appendChild(mealRecipe);


        // Append the meal element to the mealsContainer
        mealsContainer.appendChild(mealElement);
    }
}

function findMeals(meal) {
    console.log("Searching for " + meal);

    var mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + meal;

    fetch(mealUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.meals == null) {
                console.log("MEAL NOT FOUND");
            } else {
                console.log("Meals found!");
                displayMealElements(data);
            }
        });
}

mealButton.addEventListener("click", function () {
    var input = document.getElementById("mealSearchInput");

    if (input.value == "") {
        console.log("please put something!");
    } else {
        findMeals(input.value);
    }
});
