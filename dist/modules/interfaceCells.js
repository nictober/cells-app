import { fillStorage } from "./initCells.js";

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
}

function changeCellData(cell, status, expire) {
    cell.dataset.cellStatus = status
    cell.dataset.expire = expire 
}

function showStatus(cellElement, event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;

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

    for (const value in cellElement.dataset) {
        const currentValue = cellElement.dataset[value]
        addProperty(currentValue)
    }

    domTemplate.style.position = "absolute"
    domTemplate.style.top = `${mouseY + 5}px`
    domTemplate.style.left = `${mouseX + 5}px`

    document.body.appendChild(domTemplate)
}


export {openEdit, showStatus}