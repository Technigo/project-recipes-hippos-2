const recipesList = document.getElementById("recipes-list");
const recipesListF = document.getElementById("recipes-listfilter");

const input = document.getElementById("input");
//let value = "fish";


const cookingTime = 20;

let recipeExtract=[],
dish, newRecipe;

let API_URL; //= `https://api.edamam.com/search?q=${value}&app_id=ae955ef4&app_key=ede746169d09b2dacf6c78ef642dbf97&from=0&to=15&calories=591-722&health=alcohol-free`;

const fetchData = () => {
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log("recipe list", json);
      recipeExtract = json.hits
      console.log("extract", recipeExtract)

      json.hits.forEach((item) => {
        // console.log(item);


        //+if (item.recipe.totalTime < cookingTime) {
        
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

       //+ }   
        
      }); 
      filterCookingTime()
       
    });
    
    
    
  //filterCookingTime()
    
};


const filterCookingTime = () => {
  
  console.log("check1")
  recipesListF.innerHTML = ""

  recipeExtract.forEach((item) => {
    
    //recipesListF.innerHTML = ""

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
  console.log("check2")
} 



console.log("check3")




const changeHandeler = () => {
  value = input.value;
  API_URL = `https://api.edamam.com/search?q=${value}&app_id=ae955ef4&app_key=ede746169d09b2dacf6c78ef642dbf97&from=0&to=15&calories=591-722&health=alcohol-free`;
  console.log(value);
  recipesList.innerHTML = "";
  fetchData();
};
