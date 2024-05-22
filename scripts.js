const recipesContainer = document.getElementById("recipe-container");
const mealName = document.createElement("h2");
const mealImage = document.createElement("img");
const howManyInput = document.getElementById("how-many-input");
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
  console.log("Button clicekd");
  console.log(howMany);
});

const mealContainers = document.getElementsByClassName("meal-container");

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("get-recipe")) {
    console.log(event.target);

    event.target.style.display = "none"

    let mealInstructions = document.createElement("p")
    mealInstructions.classList.add("meal-instructions")

    let linkToValue = event.target.getAttribute("linkTo");
    mealInstructions.textContent = linkToValue;

    const mealContainer = event.target.closest(".meal-container")
    console.log(mealContainer)
    mealContainer.appendChild(mealInstructions)

    const closeButton = document.createElement("button");
    closeButton.id = "close-button"
    closeButton.textContent = "X"
    mealContainer.appendChild(closeButton)

  }
});

document.addEventListener("click", function (event) {
  if (event.target.id === "close-button") {
    const mealContainer = event.target.closest(".meal-container");
    const mealInstructions = mealContainer.querySelector(".meal-instructions");
    mealInstructions.style.display = "none";


  }
});

