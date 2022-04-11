//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getDrink)

const random =(num) => Math.round(Math.random()*num)

function concatArrays(arr1,arr2){
    let result = []
    for(let i=0 ; i < arr1.length; i++){
        result.push(`${arr1[i]} ${arr2[i]}`)
    }
    return(result)
}

function getDrink(){
 let drink = document.querySelector('input').value.toLowerCase()
    document.getElementById('ingredients').innerText = '' //deletes li's if any remain

fetch(`https:www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      let numOfDrinks = Object.keys(data.drinks).length //finds the number of drink objects in Json
      let randomDrink = random(numOfDrinks)
      let drinks = data.drinks[randomDrink]

      // make arrays of the ingrdients and measurements then concats them
      let ingredients = [...Array(15)].map((_,i) => data.drinks[randomDrink][`strIngredient${i+1}`]).filter(Boolean)
      let mesurement = [...Array(15)].map((_,i) => data.drinks[randomDrink][`strMeasure${i+1}`]).filter(Boolean)
      let measuredIngredients = concatArrays(mesurement,ingredients)
      
      // assigns places for the data on the dom
      document.querySelector('img').src = drinks.strDrinkThumb
      document.querySelector('h2').innerText = drinks.strDrink
      document.querySelector('p').innerText = drinks.strInstructions

      for(let i=0; i < measuredIngredients.length; i++){ // creates an li element for each ingredient
        let ul = document.getElementById("ingredients");
        let li = document.createElement("li");
        li.value = measuredIngredients[i]
        li.innerText = measuredIngredients[i]
        ul.appendChild(li)
      }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}