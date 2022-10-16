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
        a.innerText = `${category.category_name}`;

        categoriesContainer.appendChild(a);
        console.log(category);
    });
    // console.log(categories);
}

loadCategories();