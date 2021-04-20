
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
//HOME SEARCH FUNCTIONALITY
function homeSearchForm() {
      const form = document.querySelector('.home-search-form');
      const searchCover = document.querySelector('.search-home');
      const searchForm = document.querySelector('.home-search-food');
      const searchSubmit = document.querySelector('.home-search-sub');

      searchCover.addEventListener('click', (e) => {
            e.preventDefault();
            searchCover.classList.add('hide-home-search');
            searchForm.classList.add('show-home-search');
            searchSubmit.style.top = 0;
      })
}

homeSearchForm();
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
            }).catch(err => {
                  console.error(err);
            });
}
getBreakfast();

