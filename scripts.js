const recipesContainer = document.getElementById("recipe-container");
const howManyInput = document.getElementById("how-many-input");
const recipesButton = document.getElementById("getRecipes");

async function displayRandomMeals(count) {
  recipesContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const meal = data.meals[0];

    const mealName = document.createElement("h2");
    mealName.textContent = meal.strMeal;

    const mealImage = document.createElement("img");
    mealImage.classList.add("meal-image");
    mealImage.src = meal.strMealThumb + "/preview";
    mealImage.alt = meal.strMeal;

    const button = document.createElement("button");
    button.textContent = "Click here for recipe!";
    button.classList.add("get-recipe");
    button.setAttribute("linkTo", `${meal.strInstructions}`);

    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal-container");
    mealContainer.appendChild(mealName);
    mealContainer.appendChild(mealImage);
    mealContainer.appendChild(button);

    recipesContainer.appendChild(mealContainer);
  }
}

recipesButton.addEventListener("click", function () {
  const howMany = howManyInput.value;
  displayRandomMeals(howMany);
});

// Function to handle displaying recipe instructions and close button
function getRecipe() {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("get-recipe")) {
      const button = event.target;
      button.style.display = "none";

      const mealInstructions = document.createElement("p");
      mealInstructions.classList.add("meal-instructions");
      mealInstructions.textContent = button.getAttribute("linkTo");

      const closeButton = document.createElement("button");
      closeButton.id = "close-button";
      closeButton.textContent = "Close";

      const mealContainer = button.closest(".meal-container");
      mealContainer.appendChild(mealInstructions);
      mealContainer.appendChild(closeButton);
    }
  });
}

// Call getRecipe function to attach event listener for displaying recipes
getRecipe();

// Event listener for closing recipe instructions
document.addEventListener("click", function (event) {
  if (event.target.id === "close-button") {
    const closeButton = event.target;
    const mealContainer = closeButton.closest(".meal-container");
    const mealInstructions = mealContainer.querySelector(".meal-instructions");

    mealInstructions.remove();

    const getRecipeButton = mealContainer.querySelector(".get-recipe");
    if (getRecipeButton) {
      getRecipeButton.style.display = "block";
    }

    closeButton.remove();
  }
});
