const  searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContents = document.querySelector('.recipe-details-contents');
const recipeCloseBtn = document.querySelector('.recipe-colse-btn');

 

const fetchRecipes  = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching recipies...</h2>";
  try {
    
    
    const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response =  await data.json();

   recipeContainer.innerHTML = "";
   response.meals.forEach(meal => {
   const recipeDiv = document.createElement('div');
   recipeDiv.classList.add('recipe');
   recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</P>
            <p>Belong to <span>${meal.strCategory}</span> Category</P>
   `
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    /*Adding addEventListener to recipe button*/

    button.addEventListener('click', ()=> {
       openRecipepopup(meal);
    });

   recipeContainer.appendChild(recipeDiv);

    });
  }
       catch (error) {
        recipeContainer.innerHTML = "<h2> Error inFetching recipies...</h2>";
   }
}

const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for(let i=1; i<=20; i++){
    const ingredients = meal[`strIngredient${i}`];
    if(ingredients){
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredients}</li>`
    }
    else{
      break;
    }
  }
  return ingredientsList;
}