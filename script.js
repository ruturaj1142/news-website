const API_KEY = "f84ae229c57e4caf8d1c63435094f889";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India")); 

function reload()
{
    window.location.reload();
}

// fetch is library who gives promise
async function fetchNews(query)
{
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data); check whether data is came properly
    bindData(data.articles); //articles having data array
}

function bindData(articles)
{
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML=''; // to avoid whenever api call, 100 new cards are in container comes where container consist already 100 articles
    //each api call only that 100 articles shown

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); // clone means together.Here newsCardTemplate, all its content stay together, means newsCardTemplate all its div stay always together if we do not do clone so at binding time only first div bind (bind= newsCardTemplate to cardContainer),but now by cloning all its div stay together and bind to cardContainer
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);

    });
}

function fillDataInCard(cardClone,article)
{
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })  

}

let curSelectedNav = null;
function onNavItemClick(id)
{
    fetchNews(id);
     const navItem = document.getElementById(id);
     curSelectedNav?.classList.remove('active'); //click on new nav item then remove previous nav item active class remove
     curSelectedNav = navItem;
     curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})
