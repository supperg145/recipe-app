$(document).ready(function () {
  const recipesContainer = $("#recipe-container");
  const howManyInput = $("#how-many-input");
  const recipesButton = $("#getRecipes");

  function displayRandomMeals(count) {
    recipesContainer.empty();
    for (let i = 0; i < count; i++) {
      $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/random.php",
        method: "GET",
        success: function (data) {
          const meal = data.meals[0];

          const ingredients = []
          for(let i = 1; i<= 20; i++) {
           const ingredient =  meal[`strIngredient${i}`]
           if(ingredient) {
            ingredients.push(ingredient)
           }
          }

          const measures = []
          for(let j = 1; j<=20; j++) {
            const measure = meal[`strMeasure${j}`]
            if(measure){
              measures.push(measure)
            }
          }

          const ingredientsWithMeasure = [];

          // Combine each ingredient with its corresponding measure
          for (let i = 0; i < ingredients.length; i++) {
              const ingredient = ingredients[i];
              const measure = measures[i];
              const ingredientWithMeasure = `${ingredient} - ${measure} <br>`;
              ingredientsWithMeasure.push(ingredientWithMeasure);
          }
          
          // Create an unordered list element
          const ingredientsList = $("<ul>").addClass("ingredients-list");
          
          // Append each ingredient with its measure as a list item
          ingredientsWithMeasure.forEach(ingredient => {
              const listItem = $("<li>").text(ingredient);
              ingredientsList.append(listItem);
          });

          const mealName = $("<h2>").text(meal.strMeal);

          const mealImage = $("<img>")
            .addClass("meal-image card-img-top")
            .attr("src", meal.strMealThumb + "/preview")
            .attr("alt", meal.strMeal);

          const button = $("<button>")
            .text("Click here for recipe!")
            .addClass("get-recipe")
            .attr("linkTo", meal.strInstructions)
            .attr("strTo", ingredients)
            .attr("measures", measures);

          const mealContainer = $("<div>")
            .addClass("meal-container card")
            .append(mealName, mealImage, button, ingredientsWithMeasure);

          recipesContainer.append(mealContainer);
        },
      });
    }
  }

  recipesButton.on("click", function () {
    const howMany = howManyInput.val();
    displayRandomMeals(howMany);
  });

  function getRecipe() {
    $(document).on("click", ".get-recipe", function () {
        const button = $(this);
        button.hide();

        // Replace \r\n with <br> for HTML formatting
        const formattedInstructions = button.attr("linkTo").replace(/\r\n/g, '<br>');

        const mealInstructions = $("<p>")
            .addClass("meal-instructions")
            .html(formattedInstructions)
            .hide();

        const closeButton = $("<button>")
            .attr("id", "close-button")
            .text("Close")
            .addClass("btn btn-secondary mt-2");

        const mealContainer = button.closest(".meal-container");
        mealContainer.append(mealInstructions, closeButton);

        // Slide down the meal instructions
        mealInstructions.slideDown();
    });
}

getRecipe();

  $(document).on("click", "#close-button", function () {
    const closeButton = $(this);
    const mealContainer = closeButton.closest(".meal-container");
    const mealInstructions = mealContainer.find(".meal-instructions");

    mealInstructions.remove();

    const getRecipeButton = mealContainer.find(".get-recipe");
    if (getRecipeButton.length) {
      getRecipeButton.show();
    }

    closeButton.remove();
  });
});
