const recipesList = document.getElementById("recipes-list");
const input = document.getElementById("input");
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
                ${item.recipe.label}
                <a href="${item.recipe.url}">
                    <img src="${item.recipe.image}"/>
                </a>
                <div> This dish is from: ${item.recipe.source}</div>
                <div>Total time: ${item.recipe.totalTime} minutes</div>
            </li>
        `;
      });
    });
    checkCookingTime()
};



const checkCookingTime = () => {
  let keep
  if (userSelectTime <= recipeCookingTime) {
    keep = true
} else {
  keep = false
  filterCookingTime()
}
}

const filterCookingTime = (keep) => {
  if (keep === false) {
    recipesDisplay = recipesDispaly.filter((recipes) => item.value !== value)
  } else {
    recipesDisplay = recipesDispaly.filter((recipes) => item.value === value)
  }
  recipesDisplay.innerHTML += `
  <li>
      ${item.recipe.label}
      <a href="${item.recipe.url}">
          <img src="${item.recipe.image}"/>
      </a>
      <div> This dish is from: ${item.recipe.source}</div>
      <div>Total time: ${item.recipe.totalTime} minutes</div>
  </li>
`;
}




const changeHandeler = () => {
  value = input.value;
  API_URL = `https://api.edamam.com/search?q=${value}&app_id=ae955ef4&app_key=ede746169d09b2dacf6c78ef642dbf97&from=0&to=15&calories=591-722&health=alcohol-free`;
  console.log(value);
  recipesList.innerHTML = "";
  fetchData();
};
