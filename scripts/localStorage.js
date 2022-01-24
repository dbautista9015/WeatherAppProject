let favorites = []

function SaveToLocalStorage(cityName) {
    favorites.push(cityName);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function RemoveFromLocalStorage() {
    favorites = [];
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export {SaveToLocalStorage, RemoveFromLocalStorage}
