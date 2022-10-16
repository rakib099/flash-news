const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(category => {
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.classList.add('fs-5');
        a.setAttribute('href', '#');
        a.setAttribute('onclick', `loadNews('${category.category_id}')`);
        a.innerText = `${category.category_name}`;

        categoriesContainer.appendChild(a);
        // console.log(category);
    });
    // console.log(categories);
}

const loadNews = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

const displayNews = news => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    news.forEach(singleNews => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('col');
        newsCard.innerHTML = `
            <div class="card">
            <div class="row g-0">
                <div class="col-md-4 p-3">
                    <img src="${singleNews.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${singleNews.title}</h5>
                        <p class="card-text">${singleNews.details.length === 700 ? singleNews.details : singleNews.details.slice(0, 700)}</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="author-details d-flex gap-2">
                                <img src="${singleNews.author.img}" class="author-img rounded-circle" alt="author-image">
                                <div class="author-info">
                                    <p class="mb-0">${singleNews.author.name}</p>
                                    <p class="text-secondary fs-6">
                                    ${singleNews.author.published_date}</p>
                                </div>
                            </div>

                            <div class="view-count d-flex align-items-center gap-2">
                                <i class="fa-regular fa-eye"></i>
                                <h6 class="mb-0">${singleNews.total_view}</h6>
                            </div>
                            <i class="fa-solid fa-arrow-right text-primary fs-5"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        newsContainer.appendChild(newsCard);
        console.log(singleNews);
    });
    // console.log(news);
}

loadCategories();