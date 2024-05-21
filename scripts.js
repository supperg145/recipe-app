const recipesContainer = document.getElementById("recipe-container");
const mealName = document.createElement("h2");
const mealImage = document.createElement("img");
const howManyInput = document.getElementById("how-many-input")
const recipesButton = document.getElementById("getRecipes");


/* Get a random meal from API
async function getRandomMeal() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data = await response.json();
  const meal = data.meals[0];
  console.log(meal.strMeal);
}
*/

async function displayRandomMeals(count) {
    recipesContainer.innerHTML = ""
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

    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal-container")
    mealContainer.appendChild(mealName);
    mealContainer.appendChild(mealImage);
    mealContainer.appendChild(button);

    recipesContainer.appendChild(mealContainer)
  }
}

recipesButton.addEventListener("click", function() {
    const howMany = howManyInput.value
    displayRandomMeals(howMany)
    console.log("Button clicekd")
    console.log(howMany)
  });
  

  const mealContainers = document.getElementsByClassName("meal-container")

  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("meal-container")) {
      console.log("Meal container clicked");
    }
  });