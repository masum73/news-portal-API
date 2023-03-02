console.log('js loaded');
let fetchData = [];
const loadCategoryLinks = async () => {
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        displayCategoryLinks(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
}

const displayCategoryLinks = (data) => {
    //console.log(data);
    data.forEach(singleCategory => {
        //console.log(singleCategory.category_id);
        const newsCategoryContainer = document.getElementById('newsCategoryLinks');
        const categoryLinkDiv = document.createElement('p');

        categoryLinkDiv.innerHTML = `
        <a href="#" onclick="fetchSingleCategoryNews('${singleCategory.category_id}', '${singleCategory.category_name}')" class="nav-link">${singleCategory.category_name}</a>
        `
        newsCategoryContainer.appendChild(categoryLinkDiv);
    });

}

const fetchSingleCategoryNews = async (category_id, category_name) => {
    //console.log(category_id, category_name);

    const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    //console.log(URL);
    try {
        const res = await fetch(URL);
        const data = await res.json();
        fetchData = data.data;
        displayAllNews(fetchData, category_name);
    } catch (error) {
        console.log(error);
    }

}

const displayAllNews = (data, category_name) => {
    //console.log(data);
    document.getElementById('totalNews').innerText = data.length;
    document.getElementById('category_name').innerText = category_name;
    const allNewsContainer = document.getElementById('allNewsContainer');
    allNewsContainer.innerHTML = '';
    data.forEach((singleNews) => {
        //console.log(singleNews.author);
        const card = document.createElement('div');
        card.classList.add("card", "mb-3");
        card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src=${singleNews.image_url} class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
                <h5 class="card-title">${singleNews.title}</h5>
                <p class="card-text">${singleNews.details.slice(0, 200)}...</p>
            </div>
            <div class="card-footer border-0 bg-body d-flex justify-content-between">
            <div class="d-flex gap-2">
                <img src=${singleNews.author.img} class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
            <div>
                <p class="m-0 p-0">${singleNews.author.name ? singleNews.author.name : "Not available"}</p>
                <p class="m-0 p-0">${singleNews.author.published_date}</p>
            </div>
        
        </div>
        
        <div class="d-flex align-items-center">
            <i class="fas fa-eye"></i>
            <p class="m-0 p-0">${singleNews.total_view ? singleNews.total_view : "Not available"}</p>
        </div>
        <div class="d-flex gap-2">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
            <p>${singleNews.rating.number}</p>
        </div>
        <div>
            <i class="fas fa-arrow-right" onclick="fetchNewsDetail('${singleNews._id}')" data-bs-toggle="modal"
            data-bs-target="#exampleModal"></i>
        </div>
      </div>
    </div>
  </div>`;

        allNewsContainer.appendChild(card);
    })
}

const fetchNewsDetail = async (news_id) => {
    const URL = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        showNewsDetail(data.data[0]);
    } catch (error) {
        console.log(error);
    }
}
const showNewsDetail = (newsDetail) => {
    //
    const { image_url, title, details, author, total_view, others_info } = newsDetail;
  
    document.getElementById("modal-body").innerHTML = `
    <div class= "card mb-3">
    <div class="row g-0">
      <div class="col-md-12">
        <img src=${image_url} class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-12 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title} <span class="badge text-bg-warning">
          ${others_info.is_trending ? "Trending" : "Not trending"}</span></h5>
          <p class="card-text">${details}</p>  
        </div>
        <div class="card-footer border-0 bg-body d-flex justify-content-between">
            <div class="d-flex gap-2">
                <img src=${author.img} class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
                <div>
                    <p class="m-0 p-0">${author.name ? author.name : "Not available"}</p>
                    <p class="m-0 p-0">${author.published_date}</p>
                </div>
            </div>
                <div class="d-flex align-items-center">
                    <i class="fas fa-eye"></i>
                    <p class="m-0 p-0">${total_view}</p>
                </div>
                </div>
            </div>
        </div>
    </div>
    `;
    
};

const showTrending=()=>{
    const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
    //console.log(trendingNews[0].others_info.is_trending);
    //console.log(others_info.is_trending);
    const category_name = document.getElementById("category_name").innerText;
    displayAllNews(trendingNews, category_name);

}

const showTodaysPick=()=>{
    const trendingNews = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
    //console.log(trendingNews[0].others_info.is_todays_pick);
    //console.log(others_info.is_trending);
    const category_name = document.getElementById("category_name").innerText;
    displayAllNews(trendingNews, category_name);

}

//loadCategoryLinks();