var mealButton = document.getElementById("mealSearchButton"); // button used to search for meal
var mealsContainer = document.getElementById("mealsContainer"); // the container that will hold all the meals

function displayMealElements(mealObject){ // creates elements for display
    console.log(mealObject);

    if(document.getElementById("mealsListElement")){ // if this exists, it means user has searched before
        // therefore I don't want to display multiple things
        document.getElementById("mealsListElement").remove(); // so I will remove all information
    }

    // Now lets make/append elements and create that meal list
    var mealsListElement = document.createElement("section"); // will append all meals to this element
    mealsListElement.id = "mealsListElement";


   for(var i = 0; i < mealObject.meals.length; i++){
        console.log("Meal: " + i);
        
    }


}
function findMeals(meal) { // finds meal in API
    console.log("Searching for " + meal);

    // Create API URL
    var mealUrl = 'https:www.themealdb.com/api/json/v1/1/search.php?s=' + meal; // url to the database of meals 

    fetch(mealUrl) // send out request and fetch should return an object (the meal object)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) { // this is where html tags will be replaced or made
        if(data.meals == null){ // means nothing was found in API database
            // create error message
            console.log("MEAL NOT FOUND");
        }
        else {
            // lets start working on creating display for meals
            console.log("Meals found!");
            displayMealElements(data); // lets display the meals
        }
    });
}

mealButton.addEventListener("click", function(){ // handle when user searches for meal
    var input = document.getElementById("mealSearchInput");
    
    if(input.value == ""){ // means user needs to type something in
        console.log("please put something!");
    } 
    else { // we have input
        // call function to show meals
        findMeals(input.value);
    }
})