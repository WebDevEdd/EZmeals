
// SIDE NAV MENU ANIMATION
function sideNav() {
      //DECLARED NAV ITEMS
      const navBtn = document.querySelector('.burger');
      const line1 = document.querySelector('.line1');
      const line2 = document.querySelector('.line2');
      const line3 = document.querySelector('.line3');
      const sideNav = document.querySelector('.nav-links-container')

      //EVENT LISTENER TO NAV BUTTON (BURGER)
      navBtn.addEventListener('click', () => {
            //button animation
            line1.classList.toggle('line1-open');
            line2.classList.toggle('line2-open');
            line3.classList.toggle('line3-open');
            //side menu slide
            sideNav.classList.toggle('sideNav');
      })
}
sideNav();
//NAV BG COLOR CHANGE ON SCROLL
function navBG() {
      const nav = document.querySelector('.nav-wrapper');

      window.addEventListener('scroll', () => {
            if (window.scrollY > 5) {
                  nav.style.backgroundColor = 'white';
            } else {
                  nav.style.backgroundColor = 'rgba(255, 255, 255, 0.616)';
            }
      })
}
navBG();
//HOME BREAKFAST LIST
function getBreakfast() {
      const container = document.querySelector('.breakfast-cards-container');
      let APP_ID = 'eeab0073';
      let API_KEY = 'ea82b59d97cc29c1cb4715cafd4913c0';


      fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=breakfast&from=10&to=16`, {
            "method": "GET"
      })
            .then(response => response.json())
            .then(data => {
                  try {
                        const recipes = data.hits;
                        recipes.forEach(e => {
                              let name = e.recipe.label
                              let calories = Math.round(e.recipe.calories);
                              let chef = e.recipe.source;
                              let photo = e.recipe.image;
                              let link = e.recipe.url;




                              let card = `
                        <div class="bf-card-pad">
                              <div class="bf-card">
                                    <div class="bf-card-container">
                                          <div class="bf-card-img" style="background-image:url('${photo}')">

                                          </div>
                                          <h2 class="bf-card-name">
                                                ${name}
                                          </h2>
                                          <div class="bf-card-info">
                                          <div class="bf-info">
                                                <p class="bf-card-calories">Calories: ${calories}</p>
                                                <p class="bf-card-cook-time">Chef: ${chef}</p>
                                          </div>
                                          <div class="bf-link">
                                                <a href=${link} target="_blank">
                                                      <button class="bf-link-btn">
                                                            RECIPE
                                                      </button>
                                                </a>
                                          </div>

                                          </div>
                                    </div>
                              </div>
                        </div>
                        `;

                              container.innerHTML += card;

                        })
                        console.log(recipes);
                  } catch (error) {

                  }

            }).catch(err => {
                  console.error(err);
            });
}
getBreakfast();

// ***** RECIPE PAGE SECTION ***** //
window.onload = loadOnOpen;
let cardContainer = document.querySelector('.recipes-container');
let from = 0;
let to = 30;
//RESET FROM AND TO
function resetLoad() {
      from = 0;
      to = 30;
}
//GET RECIPES
function getRecipes(meal, q, from, to) {
      let APP_ID = 'eeab0073';
      let API_KEY = 'ea82b59d97cc29c1cb4715cafd4913c0';
      if (!meal) {
            fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}&from=${from}&to=${to}`, {
                  "method": "GET"
            })
                  .then(response => response.json())
                  .then(data => {
                        let results = data.hits;
                        results.forEach(e => {
                              let recipe = e.recipe;
                              let image = recipe.image;
                              let name = recipe.label;
                              let calories = Math.round(recipe.calories);
                              let chef = recipe.source;
                              let link = recipe.url;

                              makeCards(image, name, calories, chef, link);
                        })

                  }).catch(err => {
                        console.error(err);
                  });
      }
      else {
            fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}&mealType=${meal}&from=${from}&to=${to}`, {
                  "method": "GET"
            })
                  .then(response => response.json())
                  .then(data => {
                        let results = data.hits;
                        results.forEach(e => {
                              let recipe = e.recipe;
                              let image = recipe.image;
                              let name = recipe.label;
                              let calories = Math.round(recipe.calories);
                              let chef = recipe.source;
                              let link = recipe.url;

                              makeCards(image, name, calories, chef, link);
                        })

                  }).catch(err => {
                        console.error(err);
                  });
      }
}

function loadOnOpen() {
      getRecipes('dinner', 'popular', from, to);
}

//RECIPE SEARCH FILTER
function searchRecipes() {
      let searchBar = document.getElementById('recipe-search');
      let form = document.querySelector('.search-form');
      let filters = document.querySelectorAll('.filter-btn');
      let appliedFilter;
      let load = document.querySelector('.loadMore');

      filters.forEach(btn => {
            btn.addEventListener('click', (el) => {
                  filters.forEach(e => {
                        e.classList.remove('active-filter');
                  })
                  btn.classList.add('active-filter')
                  appliedFilter = btn.textContent;
            })
      })
      form.addEventListener('submit', (e) => {
            e.preventDefault();
            let search = searchBar.value;
            clearSearch();
            resetLoad();
            getRecipes(appliedFilter, search, from, to);
      })

      load.addEventListener('click', () => {
            let search = searchBar.value;
            to + 30;
            from + 30;
            getRecipes(appliedFilter, search, from, to);
      })
}
searchRecipes();

function makeCards(img, name, calories, chef, link) {
      let cardContent = `
      <div class="recipe-card">
            <div class="recipe-card-container">
                  <div class="card-image" style="background-image: url(${img})">

                  </div>
                  <div class="card-name-container">
                        <h2 class="card-name">${name}</h2>
                  </div>

                  <div class="card-bottom">
                        <div class="card-info">
                                          <p>Calories: ${calories}</p>
                                          <p>Designed by ${chef}</p>
                        </div>
                        <div class="card-link">
                              <a class="recipe-link" href=${link} target="_blank">
                                    Recipe
                              </a>
                        </div>
                  </div>
            </div>
      </div>
      `;

      cardContainer.innerHTML += cardContent;
}

function clearSearch() {
      cardContainer.innerHTML = '';
}








