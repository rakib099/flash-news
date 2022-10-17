function toggleSpinner(isLoading) {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}
