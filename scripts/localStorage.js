let favorites = []

function SaveToLocalStorage(cityName) {
    favorites.push(cityName);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function RemoveFromLocalStorage() {
    favorites = [];
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function CheckLocalStorage() {
    const localStorageItem = localStorage.getItem('Favorites');
    localStorageItem !== null ? favorites = JSON.parse(localStorageItem) : favorites = [];

}



export {SaveToLocalStorage, RemoveFromLocalStorage, CheckLocalStorage}
