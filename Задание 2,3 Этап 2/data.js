//Массив с данными Склада: название, количество, цена товара
let dataStore = [
    { id: 1, title: "Тетрадь 48 л.", count: 14, price: 25 },
    { id: 2, title: "Тетрадь 96 л.", count: 10, price: 55 },
    { id: 3, title: "Ручка шариковая", count: 3, price: 9 },
    { id: 4, title: "Ручка гелевая", count: 6, price: 45 },
    { id: 5, title: "Блокнот", count: 2, price: 39 },
    { id: 6, title: "Карандаш простой", count: 4, price: 6 },
    { id: 7, title: "Маркер", count: 12, price: 37 },
    { id: 8, title: "Ластик", count: 9, price: 25 }
];

let dataBasket = new Array();

function Product(id, title, count, price) {
    this.id = id;
    this.title = title;
    this.count = count;
    this.price = price;
}

/*var small_film_set = [
    { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rating: 9.2, rank: 1, category: "Thriller" },
    { id: 2, title: "The Godfather", year: 1972, votes: 511495, rating: 9.2, rank: 2, category: "Crime" },
    { id: 3, title: "The Godfather: Part II", year: 1974, votes: 319352, rating: 9.0, rank: 3, category: "Crime" },
    { id: 4, title: "The Good, the Bad and the Ugly", year: 1966, votes: 213030, rating: 8.9, rank: 4, category: "Western" },
    { id: 5, title: "Pulp fiction", year: 1994, votes: 533848, rating: 8.9, rank: 5, category: "Crime" },
    { id: 6, title: "12 Angry Men", year: 1957, votes: 164558, rating: 8.9, rank: 6, category: "Western" }
];

webix.ui({
    rows: [{
            cols: [
                { template: "Корзина" },
                { template: "Склад" }
            ]
        },
        { template: "Итого:" }
    ]
});*/