console.log('js loaded');

const loadCategoryLinks = async () => {
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(URL);
        const data = await res.json();
        displayCategoryLinks(data.data.news_category);
    }catch(error){
        console.log(error);
    }
}

const displayCategoryLinks = (data) => {
    //console.log(data);
    data.forEach(singleCategory => {
        console.log(singleCategory.category_name);
        const newsCategoryContainer = document.getElementById('newsCategoryLinks');
        const categoryLinkDiv = document.createElement('p');

        categoryLinkDiv.innerHTML = `
        <a href="" class="nav-link">${singleCategory.category_name}</a>
        `
        newsCategoryContainer.appendChild(categoryLinkDiv);
    });
    
}
//loadCategoryLinks();