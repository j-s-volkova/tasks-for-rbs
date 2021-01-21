//Массив с данными Склада: название, количество, цена товара
let dataStore = [
    { id: "store", title: "Тетрадь 48 л.", count: 14, price: 25 },
    { id: "store", title: "Тетрадь 96 л.", count: 10, price: 55 },
    { id: "store", title: "Ручка шариковая", count: 3, price: 9 },
    { id: "store", title: "Ручка гелевая", count: 6, price: 45 },
    { id: "store", title: "Блокнот", count: 2, price: 39 },
    { id: "store", title: "Карандаш простой", count: 4, price: 6 },
    { id: "store", title: "Маркер", count: 12, price: 37 }
];

//массив с данными Корзины: название, количество, цена товара
let dataBasket = new Array();

function Product(id, title, count, price) {
    this.id = id;
    this.title = title;
    this.count = count;
    this.price = price;
}

document.addEventListener("DOMContentLoaded", () => {
    // первичное отображение данных
    refresh(dataStore, dataBasket, 0);
    document.getElementById('store0').addEventListener("click", () => {});
    document.getElementById('basket0').addEventListener("click", () => {});
});

function refresh(store, basket, sum) {
    clear();

    basketSum.textContent = "Итого: " + sum;

    store.forEach(item => {
        document.getElementById('store0').appendChild(createElement(item, sum));
    });
    basket.forEach(item => {
        document.getElementById('basket0').appendChild(createElement(item, sum));
    });
}

function clear() {
    document.getElementById('basket0').innerHTML = '';
    document.getElementById('store0').innerHTML = '';
}

function createElement(item, sum) {
    // ячейка названия товара
    let divTitle = document.createElement('div');
    divTitle.className = "item-title";
    divTitle.innerHTML = item.title;

    // ячейка количества товара
    let divCount = document.createElement('div');
    divCount.className = "item-count";
    divCount.innerHTML = item.count;

    // ячейка цены товара
    let divPrice = document.createElement('div');
    divPrice.className = "item-price";
    divPrice.innerHTML = item.price;

    // строка товара
    let divItemContainer = document.createElement('div');
    divItemContainer.className = "row item disable-selection";
    divItemContainer.appendChild(divTitle);
    divItemContainer.appendChild(divCount);
    divItemContainer.appendChild(divPrice);
    divItemContainer.id = 'store_' + item.id;

    //Динамическое наполнение таблиц
    divItemContainer.addEventListener("click", () => {
        var flag = false;
        if (item.id == "store") {
            for (i = 0; i < dataBasket.length; i++) {
                if (dataBasket[i].title == item.title) {
                    dataBasket[i].count = dataBasket[i].count + 1;
                    sum += dataBasket[i].price;
                    for (j = 0; j < dataStore.length; j++) {
                        if (dataStore[j].title == dataBasket[i].title)
                            dataStore[j].count = dataStore[j].count - 1;
                        if (dataStore[j].count <= 0) {
                            dataStore.splice(j, 1);
                        }
                    }
                    flag = true;
                    break;
                }
            }

            if (flag == false) {
                newItem = new Product("basket", item.title, 1, item.price);
                dataBasket.unshift(newItem);
                for (j = 0; j < dataStore.length; j++) {
                    if (dataStore[j].title == newItem.title)
                        dataStore[j].count = dataStore[j].count - 1;
                    if (dataStore[j].count <= 0) {
                        dataStore.splice(j, 1);
                    }
                }
                sum += newItem.price;
            }
        } else {
            for (i = 0; i < dataStore.length; i++) {
                if (dataStore[i].title == item.title) {
                    dataStore[i].count = dataStore[i].count + 1;
                    sum -= dataStore[i].price;
                    for (j = 0; j < dataBasket.length; j++) {
                        if (dataBasket[j].title == dataStore[i].title)
                            dataBasket[j].count = dataBasket[j].count - 1;
                        if (dataBasket[j].count <= 0) {
                            dataBasket.splice(j, 1);
                        }
                    }
                    flag = true;
                    break;
                }
            }

            if (flag == false) {
                newItem = new Product("store", item.title, 1, item.price);
                dataStore.unshift(newItem);
                for (j = 0; j < dataBasket.length; j++) {
                    if (dataBasket[j].title == newItem.title)
                        dataBasket[j].count = dataBasket[j].count - 1;
                    if (dataBasket[j].count <= 0) {
                        dataBasket.splice(j, 1);
                    }
                }
                sum -= newItem.price;
            }
        }

        //alert(sum);
        refresh(dataStore, dataBasket, sum);
    })
    return divItemContainer;
}
/*1 - откуда. 2  - куда, 3 - item 
есть ли объект item в первом массиве
если нет, вывести ошибку
если есть, во второй массив, если его там нет, создаем его
в рефреш пихаем итог, чтобы его все время обновлять динамически
*/