var data = [
	{ id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rating: 9.2, rank: 1 },
	{ id: 2, title: "The Godfather", year: 1972, votes: 511495, rating: 9.2, rank: 2 },
	{ id: 3, title: "The Godfather: Part II", year: 1974, votes: 319352, rating: 9.0, rank: 3 },
	{ id: 4, title: "The Good, the Bad and the Ugly", year: 1966, votes: 213030, rating: 8.9, rank: 4 },
	{ id: 6, title: "12 Angry Men", year: 1957, votes: 164558, rating: 8.9, rank: 6 },
	{ id: 5, title: "My Fair Lady", year: 1964, votes: 533848, rating: 8.9, rank: 5 }
];

document.addEventListener("DOMContentLoaded", () => {
	// обработка нажатия на кнопку "сортировать"
	document.getElementById("sort_btn").addEventListener("click", () => {
		var sortedData = sortByRating(data, 0, data.length - 1);
		refresh(sortedData);
	});

	// обработка нажатия "обновить"
	document.getElementById("refresh_btn").addEventListener("click", () => {
		refresh(data);
	});

	// первичное отображение данных
	refresh(data);
});

// функция обновления данных в контейнере
function refresh(data) {
	clear();

	data.forEach(item => {
		document.getElementById('films').appendChild(createElement(item))
	});
}

// функция сортировки фильмов по рейтингу. использован алгоритм быстрой сортировки
function sortByRating(data, left, right) {
	var sortedData = data.filter(d => d.rating < 100);
	
	sortedData.sort((a, b) => a.rating > b.rating ? 1 : -1);
	
    var n = sortedData.length;
    for (var i = 0; i < n-1; i++)
     { for (var j = 0; j < n-1-i; j++)
        { if (sortedData[j+1] < sortedData[j])
           { var t = sortedData[j+1]; sortedData[j+1] = sortedData[j]; sortedData[j] = t; }
        }
     }     
     
	return sortedData;
}

// функция очищения контейнера фильмов
function clear() {
	document.getElementById('films').innerHTML = '';
}

// создание html представления фильма
function createElement(item) {
	// ячейка названия фильма
	var divTitle = document.createElement('div');
	divTitle.className = "item-title";
	divTitle.innerHTML = item.title;

	// ячейка год выхода фильма
	var divYear = document.createElement('div');
	divYear.className = "item-year";
	divYear.innerHTML = item.year;

	// ячейка рейтинга фильма
	var divRating = document.createElement('div');
	divRating.className = "item-rating";
	divRating.innerHTML = item.rating;

	// строка фильма
	var divItemContainer = document.createElement('div');
	divItemContainer.className = "row item disable-selection";
	divItemContainer.appendChild(divTitle);
	divItemContainer.appendChild(divYear);
	divItemContainer.appendChild(divRating);
	divItemContainer.id = 'film_' + item.id;

	return divItemContainer;
}
