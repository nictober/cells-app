import { cellsColl } from "./cellsColl.js";


// Создаем атрибуты для ячеек через dataset (в случае если LS - незаполнено)
function attributeCells() {
    if (localStorage.length >= 56) {
        for (let i = 0; i < cellsColl.length; i++) {
            const currentCell = JSON.parse(localStorage[i+1])

            cellsColl[i].dataset.cellNumber = cellsColl[i].innerText //get a order-number to cell
            cellsColl[i].dataset.cellStatus = currentCell["cell-status"] //get a status to cell
            cellsColl[i].dataset.expire = currentCell["cell-expire"] //get a expire date to cell
        }
    } else {
        for (let i = 0; i < cellsColl.length; i++) {
        cellsColl[i].dataset.cellNumber = cellsColl[i].innerText //get a order-number to cell
        cellsColl[i].dataset.cellStatus = "none" //get a status to cell
        cellsColl[i].dataset.expire = "none" //get a expire date to cell
        } 
    }
}
// Собираем значения свойств dataset чтобы положить их в LS
function getCellsData() {
    const cellsData = {}
    for (const cell of cellsColl) {
        cellsData[cell.dataset.cellNumber] = {
            "cell-status": cell.dataset.cellStatus,
            "cell-expire": cell.dataset.expire
        } 
    }
    return cellsData
}
// Наполняем LS: key - номер ячейки, значение key - остальные dataset атрибуты в виде строки
function fillStorage() {
    // const storageData = {}
    const cellsData = getCellsData()
    for (const key in cellsData) {
        // storageData[key] = JSON.stringify(cellsData[key])
        localStorage.setItem(key, JSON.stringify(cellsData[key]))
    }
    // return storageData
}

export {attributeCells, fillStorage}
