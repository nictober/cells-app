import { cellsColl } from "./cellsColl.js";
import { showStatus, openEdit } from "./interfaceCells.js";

// Добавляем обработчики событий
function listenCells() {
    for (const cell of cellsColl) {
        cell.addEventListener("click", e => {
            console.log("cell " + e.target.dataset.cellNumber + " clicked")

            openEdit(e.target)
        })
        cell.addEventListener("mouseover", e => {

            showStatus(e.target, e)
        })
        cell.addEventListener("mouseout", e => {
            const template = document.body.querySelector(".dropdown")
            document.body.removeChild(template)
        })
    }
}

export {listenCells}