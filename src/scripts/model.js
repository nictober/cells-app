function getCellsColl() {
    return document.querySelectorAll(".floor__cell-item")
}

function orderCells() {
    const cellsColl = getCellsColl()

    for (let i = 0; i < cellsColl.length; i++) {
        cellsColl[i].dataset.cellNumber = cellsColl[i].innerText
    }
}

function getCellsData() {
    const cellsColl = getCellsColl()

    
}