// __________Объявление переменных___________

const cellsColl = getCellsColl()

// ___________Вызовы функций______________
listenCells()
attributeCells() //стартовое объявление атрибутов (атрибуты заполняются по умолчанию, если данных о них нет в локальном хранилище)

// ___________Функции_________________

//            ___________Инициализация Ячеек (навешивание атрибутов, ...)
function getCellsColl() {
    return document.querySelectorAll(".floor__cell-item")
}

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

function listenCells() {
    for (const cell of cellsColl) {
        cell.addEventListener("click", e => {
            console.log("cell " + e.target.dataset.cellNumber + " clicked")

            openEdit(e.target)
        })
        cell.addEventListener("mouseover", e => {
            var mouseX = e.pageX;
            var mouseY = e.pageY;

            const clone = dropdownTmpl.content.cloneNode(true) 
            const domTemplate = clone.querySelector(".dropdown")
            const tmplValues = domTemplate.querySelectorAll(".dropdown__value")

            function addProperty(prop) {
                for (let i = 0; i < tmplValues.length; i++) {
                    if (tmplValues[i].innerText === "") {
                        tmplValues[i].innerText = prop
                        break
                    }
                }
            }

            for (const value in cell.dataset) {
                const currentValue = cell.dataset[value]
                addProperty(currentValue)
            }

            domTemplate.style.position = "absolute"
            domTemplate.style.top = `${mouseY + 5}px`
            domTemplate.style.left = `${mouseX + 5}px`

            document.body.appendChild(domTemplate)
        })
        cell.addEventListener("mouseout", e => {
            const template = document.body.querySelector(".dropdown")
            document.body.removeChild(template)
        })
    }
}

function fillStorage() {
    const cellsData = getCellsData()
    // const storageData = {}

    for (const key in cellsData) {
        // storageData[key] = JSON.stringify(cellsData[key])
        localStorage.setItem(key, JSON.stringify(cellsData[key]))
    }
    // return storageData
}



//          ____________Элементы интерфейса (взаимодействие с ячейками)

function openEdit(cellElement) {
    // const menuElement = здесь должен быть шаблон HTMl элемента для меню
    const clone = modalTmpl.content.cloneNode(true) 
    const domTemplate = clone.querySelector(".modal-wrapper")
    const cellNumber = cellElement.dataset.cellNumber

    //определим ссылки на инпуты
    const inputStatus = domTemplate.querySelector("#modal-status")
    const inputExpire = domTemplate.querySelector("#modal-expire")

    const submitBtn = domTemplate.querySelector("#submit-btn")
    const cancelBtn = domTemplate.querySelector("#cancel-btn")
    const clearBtn = domTemplate.querySelector("#clear-btn")

    submitBtn.addEventListener("click", e => {
        changeCellData(cellElement, inputStatus.value, inputExpire.value)
        fillStorage()

        document.body.removeChild(domTemplate)
    })
    cancelBtn.addEventListener("click", e => {
        document.body.removeChild(domTemplate)
    })
    clearBtn.addEventListener("click", e => {
        for (const value in cellElement.dataset) {
            if (cellElement.dataset[value] === "on") {
                cellElement.dataset[value] = ""
            }
            if (cellElement.dataset[value].length > 2){
                cellElement.dataset[value] = ""
            }
        }
        
        fillStorage()
        document.body.removeChild(domTemplate)
    })
    
    domTemplate.querySelector(".modal-number__num").innerText = cellNumber

    document.body.appendChild(domTemplate)
    // const tmplValues = domTemplate.querySelectorAll(".dropdown__value")

}

function changeCellData(cell, status, expire) {
    cell.dataset.cellStatus = status
    cell.dataset.expire = expire 
}

function showStatus(cellElement) {
    // реализовано прямо в обработчике, нужно разделить функционал
}
function makeCounter() {
    var currentCount = 1;
  
    return function() {
      currentCount;
      console.log(currentCount)
      console.log("currentCount")
      // можно ли здесь вывести currentCount из внешней функции (равный 1)?
    };
  }

makeCounter()()
someFn()