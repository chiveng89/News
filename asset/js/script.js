function initializeSearchFeature() {
    const data = [
        { id: 'nav-news', title: 'News', link: 'news.html' },
        { id: 'nav-media', title: 'Media Center', link: 'media.html' },
        { id: 'nav-social', title: 'Social Media', link: 'social.html' },
        { id: 'nav-entertainment', title: 'Entertainment', link: 'entertainment.html' },
        { id: 'nav-article', title: 'Article', link: 'article.html' },
    ];

    function showSearchPopup(event) {
        event.preventDefault();
        document.getElementById('search-popup').style.display = 'flex';
        document.getElementById('search-input').focus();
    }

    function closeSearchPopup() {
        document.getElementById('search-popup').style.display = 'none';
    }

    function hideSearchPopupOnClick(event) {
        if (event.target === document.getElementById('search-popup')) {
            document.getElementById('search-popup').style.display = 'none';
        }
    }

    function handleSearchInput(event) {
        const searchInput = document.getElementById('search-input');
        const suggestionsBox = document.getElementById('suggestions');
        const noResults = document.querySelector('.no-results');
        const query = searchInput.value.toLowerCase();
        suggestionsBox.innerHTML = '';
        noResults.style.display = 'none';

        if (query.length > 0) {
            const filteredData = data.filter(item => item.title.toLowerCase().includes(query));
            if (filteredData.length > 0) {
                filteredData.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.title;
                    li.dataset.id = item.id;
                    suggestionsBox.appendChild(li);
                });
                suggestionsBox.style.display = 'block';
            } else {
                noResults.style.display = 'block';
            }
        } else {
            suggestionsBox.style.display = 'none';
        }

        if (event.key === 'Enter') {
            handleSearchButtonClick();
        }
    }

    function handleSuggestionClick(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'li') {
            const id = target.dataset.id;
            const selectedItem = data.find(item => item.id === id);
            if (selectedItem) {
                window.location.href = selectedItem.link;
            }
        }
    }

    function handleSearchButtonClick() {
        const searchInput = document.getElementById('search-input');
        const noResults = document.querySelector('.no-results');
        const query = searchInput.value.toLowerCase();
        const filteredData = data.filter(item => item.title.toLowerCase().includes(query));

        if (filteredData.length > 0) {
            const selectedItem = filteredData[0];
            window.location.href = selectedItem.link;
        } else {
            noResults.style.display = 'block';
        }
    }

    document.getElementById('nav-search').onclick = showSearchPopup;
    document.getElementById('close-search-popup').onclick = closeSearchPopup;
    document.getElementById('search-popup').onclick = hideSearchPopupOnClick;
    document.getElementById('search-input').oninput = handleSearchInput;
    document.getElementById('search-input').onkeydown = handleSearchInput;
    document.getElementById('suggestions').onclick = handleSuggestionClick;
    document.getElementById('search-button').onclick = handleSearchButtonClick;
    document.getElementById('search-icon').onclick = showSearchPopup;
}

document.addEventListener('DOMContentLoaded', initializeSearchFeature);
