var mealForm = document.getElementById("searchForm"); // button used to search for meal
var mealsContainer = document.getElementById("mealsContainer"); // the container that will hold all the meals
var mealHistoryText = document.getElementById("mealHistoryText");
var clearMealHistory = document.getElementById("clearMealHistory");

function displayMealElements(mealObject){ // creates elements for display
    console.log(mealObject);

    mealsContainer.style.display = "block";

    if(document.getElementById("mealsListElement")){ // if this exists, it means user has searched before
        // therefore I don't want to display multiple things
        document.getElementById("mealsListElement").remove(); // so I will remove all information
    }

    // Now lets make/append elements and create that meal list
    var mealsListElement = document.createElement("section"); // will append all meals to this element
    mealsListElement.id = "mealsListElement";


   for(var i = 0; i < mealObject.meals.length; i++){
        // Create tile (BULMA framework) for meal
        var mainTile = document.createElement("div");

        //All the tiles on the left
        var leftTile = document.createElement("div");

        // Meal Name
        var headerTile = document.createElement("div");
        var header = document.createElement("p");
        header.textContent = mealObject.meals[i].strMeal;
        headerTile.append(header);
        leftTile.append(headerTile);

        // Meal Image
        var imageContainer = document.createElement("div");
        var mealImage = document.createElement("img");
        mealImage.setAttribute("src", mealObject.meals[i].strMealThumb);
        imageContainer.append(mealImage);
        leftTile.append(imageContainer);

        mainTile.append(leftTile);

        // The tile on the right
        var rightTile = document.createElement("div");

        // the div for the right tile
        var rightTileChild = document.createElement("div");

        // create table
        var table = document.createElement("table");

        // header for the table
        var tableHead = document.createElement("thead");
        var tableRow1 = document.createElement("tr");

        var tableHeader1 = document.createElement("th");
        tableHeader1.textContent = "Ingredient";
        tableRow1.append(tableHeader1);

        var tableHeader2 = document.createElement("th");
        tableHeader2.textContent = "Quantity";
        tableRow1.append(tableHeader2);

        tableHead.append(tableRow1);
        table.append(tableHead);

        // the main table body
        var tableBody = document.createElement("tbody");

        // keys are used in for loop so I know how long to loop
        var ingredientsKeys = Object.keys(mealObject.meals[i]).filter(function(key) {
            return key.includes('strIngredient');
        }); // get ingredient keys
    
          var quantitiesKeys = Object.keys(mealObject.meals[i]).filter(function(key) {
            return key.includes('strMeasure');
        }); // get quantity keys

        for(var j = 0; j < ingredientsKeys.length; j++){ // ingredients and quantities should be same length
      
            // check to make sure there is something there
            if(mealObject.meals[i][ingredientsKeys[j]] != "" && mealObject.meals[i][quantitiesKeys[j]] != "" && mealObject.meals[i][ingredientsKeys[j]] != null && mealObject.meals[i][quantitiesKeys[j]] != null){
              // create table row
              var tableRow = document.createElement("tr");
              // create table cell
              var tableCellIngredient = document.createElement("td");
              tableCellIngredient.textContent = mealObject.meals[i][ingredientsKeys[j]];
              // append to row
              tableRow.append(tableCellIngredient);
              // create table cell
              var tableCellQuantity = document.createElement("td");
              tableCellQuantity.textContent = mealObject.meals[i][quantitiesKeys[j]];
              // append to row
              tableRow.append(tableCellQuantity);
    
              // now append row to table body
              tableBody.append(tableRow);
            }
        } // end inner for loop

        table.append(tableBody); // now everything should be in table

        // lets add it to right tile child
        rightTileChild.append(table);

        // Lets get directions on how to make
        var directionsTitle = document.createElement("p");
        directionsTitle.textContent = "Directions: ";
        rightTileChild.append(directionsTitle);

        var directions = document.createElement("p");
        directions.textContent = mealObject.meals[i].strInstructions;
        rightTileChild.append(directions);

        //add video link 
        var linkParagraph = document.createElement("p");
        var link = document.createElement("a");
        link.target = "_blank";
        link.textContent = "Watch Video Here";
        link.href = mealObject.meals[i].strYoutube;
        linkParagraph.append(link);
        rightTileChild.append(linkParagraph);

        // appending all the right side stuff
        rightTile.append(rightTileChild);
        mainTile.append(rightTile);
        mealsListElement.append(mainTile);
        mealsContainer.append(mealsListElement);


        // Adding styles to each tile. Refer to index.html on how I did classes
        mainTile.classList.add("tile", "is-ancestor", "content", "is-medium");
        leftTile.classList.add("tile", "is-4", "is-vertical", "is-parent");
        headerTile.classList.add("tile", "is-child", "box");
        imageContainer.classList.add("tile", "is-child", "box");
        rightTile.classList.add("tile", "is-parent");
        rightTileChild.classList.add("tile", "is-child", "box");
        table.classList.add("table", "is-bordered", "is-striped", "is-hoverable", "is-narrow", "content", "is-small");


        // classes for titles
        header.classList.add("title", "foodTitle"); 
        directionsTitle.classList.add("title");

    } // end for loop

}

function mealNotFoundText(){
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

function findMeals(meal) { // finds meal in API
    console.log("Searching for " + meal);

    // Create API URL
    var mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + meal; // url to the database of meals 

    fetch(mealUrl) // send out request and fetch should return an object (the meal object)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) { // this is where html tags will be replaced or made
        if(data.meals == null){ // means nothing was found in API database
            // create error message
            console.log("MEAL NOT FOUND");

            // Display message for if meal not found
            mealNotFoundText();
        }
        else {
            // lets start working on creating display for meals
            console.log("Meals found!");
            displayMealElements(data); // lets display the meals

            if(document.getElementById("searchContentEmpty")){ // means previous search wasn't found so remove content
                var messageBox = document.getElementById("searchContentEmpty");
                messageBox.innerHTML = "";
            }
        }
    });
}

mealForm.addEventListener("submit", function(event){ // handle when user searches for meal

    event.preventDefault();

    var input = document.getElementById("mealSearchInput");
    
    if(input.value == ""){ // means user needs to type something in
        console.log("please put something!");
    } 
    else { // we have input
        // call function to show meals
        findMeals(input.value);
        addMealHistory(input.value);
        input.value = "";
    }
});

function addMealHistory(searchedmeal) {
    var mealHistory = [];
    var prevSearches = JSON.parse(localStorage.getItem("mealHistory"));

    if (prevSearches !== null) {
        mealHistory = prevSearches;
        mealHistory.push(" " + searchedmeal);
        localStorage.setItem("mealHistory", JSON.stringify(mealHistory));
    } else {
        mealHistory.push(" " + searchedmeal);
        localStorage.setItem("mealHistory", JSON.stringify(mealHistory));
    }
    mealHistoryText.textContent = mealHistory;
}

clearMealHistory.addEventListener("click", function(event){
    localStorage.clear();
    mealHistoryText.textContent = "";
});

function displayMealHistory() {
    mealHistoryText.textContent = JSON.parse(localStorage.getItem("mealHistory"));
}

// Adds or removes is-active class based on current status to allow burger to work on mobile as intended
function burgerFunction() {
    var burgerBtn = document.getElementById("burgerBtn");
    var navMenu = document.getElementById("navMenu");
  
    if (!burgerBtn.classList.contains('is-active')) {
      burgerBtn.classList.add("is-active");
    } else {
      burgerBtn.classList.remove("is-active");
    }
  
    if (!navMenu.classList.contains('is-active')) {
      navMenu.classList.add("is-active");
    } else {
      navMenu.classList.remove("is-active");
    }
  }

displayMealHistory();