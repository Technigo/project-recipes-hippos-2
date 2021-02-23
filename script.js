const recipesList = document.getElementById("recipes-list");
const recipesListF = document.getElementById("recipes-listfilter");

const input = document.getElementById("input");
const headerImage = document.getElementById("header-img");
const headerTitle = document.getElementById("header-title");
const sliderStyle = document.getElementById("slider-wrapper");

//////////******************** */
let cookingTime = document.getElementById("slider").value;
console.log("cooking time", cookingTime);
let recipeExtract = [];
let API_URL;

const fetchData = () => {
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      recipeExtract = json.hits;
      recipeExtract
        .sort((a, b) => {
          return a.recipe.totalTime - b.recipe.totalTime;
        })
        .forEach((item) => {
          recipesList.innerHTML += `
            <li>
                <a href="${item.recipe.url}" class="recipe-image">
                    <img src="${item.recipe.image}" class="responsive-img" />
                </a>
                <h5 class="recipe-title">${item.recipe.label}</h5>
                <div class="recipe-info"> This dish is from: ${item.recipe.source}</div>
                <div class="recipe-info">Total time: ${item.recipe.totalTime} minutes</div>
            </li>
        `;
        });
      //filterCookingTime();
    });
};

/*********************FILTER ************************/
const filterCookingTime = () => {
  recipesList.innerHTML = "";
  cookingTime = document.getElementById("slider").value;
  document.getElementById("range-value").innerText =
    document.getElementById("slider").value + " min";
  recipeExtract.forEach((item) => {
    if (item.recipe.totalTime < cookingTime) {
      recipesList.innerHTML += `
        <li>
          <a href="${item.recipe.url}" class="recipe-image">
            <img src="${item.recipe.image}" class="responsive-img" />
          </a>
          <h5 class="recipe-title">${item.recipe.label}</h5>
          <div class="recipe-info"> This dish is from: ${item.recipe.source}</div>
          <div class="recipe-info">Total time: ${item.recipe.totalTime} minutes</div>
        </li>
      `;
    } else {
      //do nothing
    }
  });
};

const changeHandeler = () => {
  value = input.value;
  sliderStyle.style.display = "block";
  API_URL = `https://api.edamam.com/search?q=${value}&app_id=ae955ef4&app_key=ede746169d09b2dacf6c78ef642dbf97&from=0&to=16&calories=591-722&health=alcohol-free`;
  recipesList.innerHTML = "";
  headerImage.style.height = "50vh";
  headerImage.style.transition = "height 0.5s ease-in";
  headerTitle.style.display = "block";
  fetchData();
  input.value = "";
};
