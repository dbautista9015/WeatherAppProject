let favorites = []

function SaveToLocalStorage(cityName) {
    favorites.push(cityName);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function DeleteLocalStorage() {
    favorites = [];
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export {SaveToLocalStorage, DeleteLocalStorage}
