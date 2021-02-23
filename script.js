const recipesList = document.getElementById("recipes-list");
const recipesListF = document.getElementById("recipes-listfilter");

const input = document.getElementById("input");

//////////******************** */
const cookingTime = 20;

let recipeExtract=[];
let API_URL; 

const fetchData = () => {
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log("recipe list", json);
      recipeExtract = json.hits
      console.log("extract", recipeExtract)

      recipeExtract.sort((a ,b) => {
        return a.recipe.totalTime - b.recipe.totalTime
                 
        }).forEach((item) => { 
        recipesList.innerHTML += `
            <li>
                ${item.recipe.label}
                <a href="${item.recipe.url}">
                    <img src="${item.recipe.image}"/>
                </a>
                <div> This dish is from: ${item.recipe.source}</div>
                <div>Total time: ${item.recipe.totalTime} minutes</div>
            </li>
        `;
      }); 
      filterCookingTime()
    });
};

/*********************FILTER ************************/
const filterCookingTime = () => {
  recipesListF.innerHTML = ""
  recipeExtract.forEach((item) => {
    if (item.recipe.totalTime < cookingTime) {
      recipesListF.innerHTML += `
        <li>
          ${item.recipe.label}
          <a href="${item.recipe.url}">
            <img src="${item.recipe.image}"/>
          </a>
          <div> This dish is from: ${item.recipe.source}</div>
          <div>Total time: ${item.recipe.totalTime} minutes</div>
        </li>
      `;
    } else {
      //do nothing
    }
  }) 
} 

const changeHandeler = () => {
  value = input.value;
  API_URL = `https://api.edamam.com/search?q=${value}&app_id=ae955ef4&app_key=ede746169d09b2dacf6c78ef642dbf97&from=0&to=15&calories=591-722&health=alcohol-free`;
  console.log(value);
  recipesList.innerHTML = "";
  fetchData();
};
