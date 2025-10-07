//global
var tablero = [];

function crearMatriz(n) {
    return Array.from({ length: n }, () => Array(n).fill(0));
}

function validaSizeRejilla(n) {
    return Number.isInteger(n) && n >= 3 && n <= 30;
}

function pideSizeRejilla() {
    let size;
    while (true) {
        const entrada = prompt("Tamaño de la rejilla: ");
        size = parseInt(entrada, 10);
        if (validaSizeRejilla(size)) return size;
        alert("Tamaño inválido. Introduce un entero entre 3 y 30.");
    }
}