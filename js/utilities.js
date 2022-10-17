function toggleSpinner(isLoading) {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

const loadAllNews = () => {
    // Start the spinner or loader
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/08`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
        .catch(error => console.log(error))
}

const displayAllNews = allNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    // sort by view count
    allNews.sort((a, b) => (a.total_view > b.total_view) ? -1 : 1);

    allNews.forEach(singleNews => {
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
                        <p class="card-text">${singleNews.details.length === 400 ? singleNews.details : `${singleNews.details.slice(0, 400)}...`}</p>
                    </div>

                    <!-- Card Footer -->
                    <div class="card-info d-flex justify-content-between gap-1 gap-md-0 p-3 pe-4">
                        <div class="d-flex gap-5">
                            <div class="author-details d-flex gap-2">
                                <img src="${singleNews.author.img}" class="author-img rounded-circle" alt="author-image">
                                <div class="author-info">
                                    <p class="mb-0">${singleNews.author.name? singleNews.author.name : "No Data Available"}</p>
                                    <p class="text-secondary fs-6">
                                    ${singleNews.author.published_date? singleNews.author.published_date : "No Data Available"}</p>
                                </div>
                            </div>
                            <div class="view-count d-flex align-items-center gap-2">
                                <i class="fa-regular fa-eye"></i>
                                <h6 class="mb-0">${singleNews.total_view? singleNews.total_view : "No Data Available"}</h6>
                            </div>
                        </div>

                        <!-- Button trigger modal -->
                        <div onclick="loadDetails('${singleNews._id}')" class="sec-btn-details d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                            <span class="fw-semibold text-primary">Read Details</span>
                            <i class="fa-solid fa-arrow-right text-primary fs-5"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        `;

        newsContainer.appendChild(newsCard);
        // console.log(singleNews);
    });
    // console.log(allNews);
    // Stop the spinner or loader
    toggleSpinner(false);
}

