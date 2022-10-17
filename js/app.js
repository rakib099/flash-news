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
        a.setAttribute('onclick', `toggleSpinner(true);loadNews('${category.category_id}', 
        '${category.category_name}')`);
        a.innerText = `${category.category_name}`;

        categoriesContainer.appendChild(a);
        // console.log(category);
    });
    // console.log(categories);
}

const loadNews = (id, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, categoryName))
        .catch(error => console.log(error))
}

const displayNews = (news, categoryName) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    // News Found Message
    const messageContainer = document.getElementById('result-message-container');
    const resultMessage = document.getElementById('result-message');
    const footer = document.getElementById('footer');
    
    if (news.length === 0) {
        messageContainer.classList.remove('d-none');
        messageContainer.classList.remove('text-bg-primary');
        messageContainer.classList.add('bg-white');
        resultMessage.innerText = `No News Found for category ${categoryName}`;
        footer.classList.add('d-none');
    }
    else if (news.length > 0) {
        messageContainer.classList.remove('d-none');
        messageContainer.classList.remove('bg-white');
        messageContainer.classList.add('text-bg-primary');
        resultMessage.innerText = `${news.length} news found for category ${categoryName}`;
        footer.classList.remove('d-none');
    }
    else {
        messageContainer.classList.add('d-none');
        footer.classList.remove('d-none');
    }
    news.forEach(singleNews => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('col');
        newsCard.innerHTML = `
        <div class="card">
            <div class="row g-0">
                <div class="col-md-4 p-3 thumb-img">
                    <img src="${singleNews.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 d-flex flex-column">
                    <div class="card-body">
                        <h5 class="card-title">${singleNews.title}</h5>
                        <p class="card-text">${singleNews.details.length === 700 ? singleNews.details : singleNews.details.slice(0, 700)}</p>
                    </div>

                    <!-- Card Footer -->
                    <div class="card-info d-flex justify-content-between gap-1 gap-md-0 p-3 pe-4">
                        <div class="d-flex gap-5">
                            <div class="author-details d-flex gap-2">
                                <img src="${singleNews.author.img}" class="author-img rounded-circle" alt="author-image">
                                <div class="author-info">
                                    <p class="mb-0">${singleNews.author.name? singleNews.author.name : "No Data Available"}</p>
                                    <p class="text-secondary fs-6">
                                    ${singleNews.author.published_date}</p>
                                </div>
                            </div>
                            <div class="view-count d-flex align-items-center gap-2">
                                <i class="fa-regular fa-eye"></i>
                                <h6 class="mb-0">${singleNews.total_view? singleNews.total_view : "No Data Available"}</h6>
                            </div>
                        </div>

                        <!-- Button trigger modal -->
                        <i onclick="loadDetails('${singleNews._id}')" class="fa-solid fa-arrow-right text-primary fs-5" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"></i>
                    </div>

                </div>
            </div>
        </div>
        `;

        newsContainer.appendChild(newsCard);
        // console.log(singleNews);
    });
    // console.log(news, categoryName);
    // Stop the spinner or loader
    toggleSpinner(false);
}

const loadDetails = async(newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}

const displayDetails = singleNews => {
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText = `${singleNews.title}`;

    const modalContents = document.getElementById('modal-contents');
    modalContents.innerHTML = `
    <div class="row row-cols-1 g-4">
    <div class="col">
      <div class="card h-100">
        <img src="${singleNews.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <div class="author-details d-flex gap-2">
                    <img src="${singleNews.author.img}" class="author-img rounded-circle" alt="author-image">
                    <div class="author-info">
                        <p class="mb-0">${singleNews.author.name? singleNews.author.name : "No Data Available"}</p>
                        <p class="text-secondary fs-6">
                        ${singleNews.author.published_date}</p>
                    </div>
                </div>

                <div class="view-count d-flex align-items-center gap-2">
                    <i class="fa-regular fa-eye"></i>
                    <h6 class="mb-0">${singleNews.total_view? singleNews.total_view : "No Data Available"}</h6>
                </div>
            </div>
            <p class="card-text">${singleNews.details}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
  </div>
    `;
    console.log(singleNews);
}

loadNews("08", "All News");     // Set All News as default category
loadCategories();   // categories will be loaded by default