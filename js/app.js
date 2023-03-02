console.log('js loaded');

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
        displayAllNews(data.data, category_name);
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
        console.log(singleNews.author);
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
//loadCategoryLinks();