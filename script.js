const recipesList = document.getElementById("recipes-list");
const input = document.getElementById("input");
const headerImage = document.getElementById("header-img");
const headerTitle = document.getElementById("header-title");
let value = "fish";

let API_URL; //= `https://api.edamam.com/search?q=${value}&app_id=ae955ef4&app_key=ede746169d09b2dacf6c78ef642dbf97&from=0&to=15&calories=591-722&health=alcohol-free`;

const fetchData = () => {
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log("recipe list", json);
      json.hits.forEach((item) => {
        // console.log(item);
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
    });
};

const changeHandeler = () => {
  value = input.value;
  API_URL = `https://api.edamam.com/search?q=${value}&app_id=ae955ef4&app_key=ede746169d09b2dacf6c78ef642dbf97&from=0&to=15&calories=591-722&health=alcohol-free`;
  console.log(value);
  recipesList.innerHTML = "";
  headerImage.style.height = "50vh";
  headerImage.style.transition = "height 0.5s ease-in";
  headerTitle.style.display = "block";
  fetchData();
  input.value = "";
};
