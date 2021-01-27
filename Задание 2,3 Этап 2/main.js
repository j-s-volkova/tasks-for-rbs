var sum = 0;

webix.ui({
    rows: [{
            cols: [{
                    view: "datatable",
                    id: "Basket",
                    scroll: "y",
                    autoConfig: true,
                    data: dataBasket,
                    css: "styleBasket",
                    on: {
                        "onItemClick": function() {
                            var sel = $$("Basket").getSelectedId();
                            var row = $$("Basket").getItem(sel.row);
                            var title = row["title"];
                            var price = row["price"];
                            choiceArray("Basket", sel, title, price);

                        }
                    }
                },
                {
                    view: "datatable",
                    id: "Store",
                    scroll: "y",
                    autoConfig: true,
                    data: dataStore,
                    css: "styleStore",
                    on: {
                        "onItemClick": function() {
                            var sel = $$("Store").getSelectedId();
                            var row = $$("Store").getItem(sel.row);
                            var title = row["title"];
                            var price = row["price"];
                            choiceArray("Store", sel, title, price);
                        }
                    }
                },
                {
                    view: "form",
                    id: 'storeForm',
                    width: 450,
                    elements: [
                        { type: "section", template: "Добавить товар" },
                        {
                            view: "text",
                            id: "title",
                            label: "Название"
                        },
                        {
                            view: "text",
                            id: "count",
                            label: "Кол-во"
                        },
                        {
                            view: "text",
                            id: "price",
                            label: "Цена"
                        },
                        {
                            margin: 10,
                            cols: [{
                                    view: "button",
                                    id: "btn_add",
                                    minWidth: 65,
                                    value: "Добавить товар",
                                    css: "webix_primary",
                                    click: addNewProduct
                                },
                                {
                                    view: "button",
                                    id: "btn_clear",
                                    minWidth: 65,
                                    value: "Очистить форму",
                                    click: clearForm
                                }
                            ]
                        },
                        {}
                    ]
                }
            ]
        },
        {
            id: "Sum",
            view: "template",
            template: "Итого: 0"
        }
    ]
});

/*Функция-обертка для выбора массива, в котором производятся изменения. 
 Если передан type == "Basket", то изменяем Корзину, иначе - Склад*/
function choiceArray(type, sel, title, price) {
    if (type == "Basket") {
        //Уменьшаем количество товара при клике на Корзину
        var pos = countMinus(dataBasket, title, price, -1);
        //Удаление элементов
        if (pos != -1) {
            var sel = $$("Basket").getSelectedId(true);
            for (var j = 0; j < sel.length; j++)
                $$("Basket").remove(sel[j].row);
            dataBasket.splice(pos, 1);
        }
        //Увеличиваем количество товара на Складе при клике на Корзину
        countPlus(dataStore, title, price);
    } else {
        //Уменьшаем количество товара при клике на Склад
        var pos = countMinus(dataStore, title, price, 1);
        //Удаление элементов
        if (pos != -1) {
            var sel = $$("Store").getSelectedId(true);
            for (var j = 0; j < sel.length; j++)
                $$("Store").remove(sel[j].row);
            dataStore.splice(pos, 1);
        }
        //Увеличиваем количество товара в Корзине при клике на Склад
        countPlus(dataBasket, title, price);
    }

    //Обновление данных после всех манипуляций
    refresh();
}

/*Функция для изменения массива Корзины или Склада 
(в зависимости от значения, переданного функцией-оберткой choiceArray).
difSum принимает значение 1 или -1, в зависимости от того, увеличивается сумма или уменьшается,
 */
function countMinus(data, title, price, difSum) {
    for (i = 0; i < data.length; i++) {
        if (data[i].title == title) {
            data[i].count--;
            sum += price * difSum;
            if (data[i].count <= 0) {
                return i;
                //вернем позицию в функцию-обертку, чтобы удалить ее из массива и таблицы
            }
            break;
        }
    }

    //если не нужно ничего удалять, вернем -1
    return -1;
}
/*
Увеличение количества товара в массиве при клике на противолежащую таблицу
*/
function countPlus(data, title, price) {
    var flag = false;
    for (i = 0; i < data.length; i++) {
        //Увеличиваем количество товара при совпадении Названия
        if (data[i].title === title) {
            data[i].count++;
            flag = true;
            break;
        }
    }

    //Если такого товара в таблице нет, то создаем его вновь и ставим количество == 1
    if (flag == false) {
        addNewData(data, title, 1, price);
    }
}

/*
Функция добавления новых данных в массив
*/
function addNewData(data, title, count, price) {
    id = 0;
    if (data.length > 0) {
        id = data[data.length - 1].id + 1;
    }
    newItem = new Product(id, title, count, price);
    data[data.length] = newItem;
}


/*
Функция обновления данных после всех манипуляций.
 */
function refresh() {
    //alert(sum);
    $$("Sum").setHTML("Итого: " + sum);
    $$("Store").parse(dataStore);
    $$("Basket").parse(dataBasket);
};

//Очистка формы
function clearForm() {
    $$("title").setValueHere("");
    $$("count").setValueHere("");
    $$("price").setValueHere("");
}

//Добавление нового товара на склад
function addNewProduct() {
    title = $$("title").getValue();
    count = parseInt($$("count").getValue(), 10);
    price = parseInt($$("price").getValue(), 10);

    if (title == "" || count == "" || price == "") {
        webix.message("Пожалуйста, заполните форму целиком.");
    } else if (isNaN(count)) {
        webix.message("Некорректное значение для кол-ва товара.");
    } else if (isNaN(price)) {
        webix.message("Некорректное значение для цены товара.");
    } else {
        addNewData(dataStore, title, count, price);
        refresh();
        clearForm();
    }
}