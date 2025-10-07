//global
// var tablero = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function creaTablero(size) {
    return Array.from({ length: size }, () => Array(size).fill("X"));
}

function colocaMinas(totalMinas, tablero) {
    // let numMinas = 0;
    let sizeTablero = tablero.length;
    let randX = 0;
    let randY = 0;

    while(totalMinas > 0){
        randX = getRandomInt(tablero.length-1);
        randY = getRandomInt(tablero.length-1);

        // console.log("Mina " + numMinas);
        // console.log("RandX: " + randX);
        // console.log("RandY: " + randY);

        for(let i = 0; i < sizeTablero; i++) {
            for(let j = 0; j < sizeTablero; j++) {
                if(i === randX && j === randY){
                    tablero[i][j] = "*";
                }
            }
        }
        // numMinas++;
        totalMinas --;
    }
}

function adyacente(tablero, posX, posY) {
    let n = tablero.length;

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            //arriba
            if (posX > 0 && tablero[posX-1][posY] === "*") tablero[posX-1][posY] = 1;
            //abajo
            if (posX < n - 1 && tablero[posX+1][posY] === "*") tablero[posX-1][posY] = 1;
            //izq
            if (posY > 0 && tablero[posX][posY-1] === "*") tablero[posX-1][posY] = 1;
            //derecha
            if (posY < n - 1 && tablero[posX][posY+1] === "*") tablero[posX-1][posY] = 1;

            //diagonal
            if (posX > 0 && posY > 0 && tablero[posX-1][posY-1] === "*") tablero[posX-1][posY] = 1;
            if (posX > 0 && posY < n - 1 && tablero[posX-1][posY+1] === "*") tablero[posX-1][posY] = 1;
            if (posX < n - 1 && posY > 0 && tablero[posX+1][posY-1] === "*") tablero[posX-1][posY] = 1;
            if (posX < n - 1 && posY < n - 1 && tablero[posX+1][posY+1] === "*") tablero[posX-1][posY] = 1;
        }
    }
    return tablero;
}


function validaInput(n, opc, sizeTablero = 0) {
    switch (opc) {
        case 1://tablero
            return n >= 5; //mínimo 5x5
        case 2://num minas
            return n >= 1;//mínimo una mina
        case 3://pide coordenada para casilla
            return n >= sizeTablero;
        default:
            break;
    }
}

function pideSizeTablero() {
    let size;
    while (true) {
        size = parseInt((prompt("Tamaño del tablero: ")));
        if (validaInput(size,1)) return size;
        alert("Input inválido. Sólo números positivos mayores o iguales a 5");
    }
}
function pideNumMinas(){
    let minas;
    while (true) {
        minas = parseInt(prompt("Número de minas: "));
        if (validaInput(minas,2)) return minas;
        alert("Input inválido. Sólo números positivos mayores o iguales a 1");
    }
}

function pideCoordenada(tag, sizeTablero){
    let pos;
    while (true) {
        pos = parseInt(prompt(`Coordenada ${tag}:`));
        if (!validaInput(pos,3, sizeTablero)) return pos;
        alert("Input inválido. Tu coordenada se sale del tablero!");
    }
}

function imprimieTablero(tablero, tag) {
    console.log(tag);
    console.table(tablero);
}



function buscaminas(){
    let tablero = [];
    let size = pideSizeTablero();
    let numMinas = pideNumMinas();
    let posX;
    let posY


    tablero = creaTablero(size);

    colocaMinas(numMinas, tablero);

    posX = pideCoordenada("X", size);
    posY = pideCoordenada("Y", size);

    console.log(`Coordenadas introducidas: (${posX},${posY})`);

    imprimieTablero(tablero, "");
}