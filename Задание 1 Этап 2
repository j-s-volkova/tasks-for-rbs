package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"
)

func main() {
	// чтение аргументов
	var datafile *string

	datafile = flag.String("datafile", "./indications.json", `Path to datafile. Default: "./indications.json"`)

	flag.Parse()

	log.Printf("Datafile: %s\n", *datafile)

	// открытие файла
	f, err := os.Open(*datafile)
	if err != nil {
		log.Printf("ERROR os.Open, %s\n", err)
		return
	}

	// преобразование в срез
	data, err := parseFile(f)
	if err != nil {
		log.Printf("ERROR parseFile, %s\n", err)
		return
	}

	// сортировка данных
	err = sortByDate(data)
	if err != nil {
		log.Printf("ERROR sortByDate, %s\n", err)
		return
	}

	// форматированный вывод
	print(data)
}

// Indication структура показания
type Indication struct {
	Indicator string    `json:"indicator"`
	Value     int       `json:"value"`
	Date      time.Time `json:"date"`
}

// преобразование файла в срез показаний приборов
func parseFile(file *os.File) (data []Indication, err error) {
	var (
		b []byte
	)

	// чтение содержимого файла
	b, err = ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	// преобразование из json в срез структур
	err = json.Unmarshal(b, &data)
	if err != nil {
		return nil, err
	}

	return
}

// функция сортировки данных по дате. Заменяет ссылку входного среза на отсортированный срез
func sortByDate(data []Indication) (err error) {
	var (
		sortedData []Indication
	)
	sortedData = data

	for i := 0; i < len(sortedData); i++ {
		for j := i; j < len(sortedData); j++ {
			if sortedData[i].Date.Unix() > sortedData[j].Date.Unix() {
				t := sortedData[i]
				sortedData[i] = sortedData[j]
				sortedData[j] = t
			}
		}
	}
	/*fmt.Println("sort\n")
	fmt.Println(len(sortedData))
	for i := 0; i < len(sortedData); i++ {
		fmt.Printf("%d ", sortedData[i].Date.Unix())
	}
	*/
	data = sortedData

	return
}

// функция форматированного вывода среза показаний
func print(data []Indication) {
	var (
		res string
	)
	for i := 0; i < len(data); i++ {
		res = fmt.Sprintf("%s", res)
		res = fmt.Sprintf("value: %v \tname: %s\tdate:%s ", data[i].Value, data[i].Indicator, data[i].Date) // поле "значение" показания прибора
		log.Printf(res)
	}
}
