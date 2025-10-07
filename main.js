//global
// var tablero = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function creaTablero(size) {
    //esta forma de crear un array con valores deseados la vi en internet, paar el ejercicio del juego de la vida
    return Array.from({ length: size }, () => Array(size).fill("X"));
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

function pideCoordenada(tag, sizeTablero){
    let pos;
    while (true) {
        pos = parseInt(prompt(`Coordenada ${tag}:`));
        if (!validaInput(pos,3, sizeTablero)) return pos;
        alert("Input inválido. Tu coordenada se sale del tablero!");
    }
}



function colocaMinas(tablero, cantidad) {//coloca minas deseadas en posición random dentro del tablero
    let size = tablero.length;
    let minasColocadas = 0;//contador

    while (minasColocadas < cantidad) {
        let x = getRandomInt(size);
        let y = getRandomInt(size);

        if (tablero[x][y] !== "*") {//si no es una mina
            tablero[x][y] = "*";//pone una mina
            minasColocadas++;//aumenta el total
        }
    }
}

function contarMinasAdyacentes(tablero, posX, posY) {
    let size = tablero.length;
    let total = 0;

    //recorre desde la anterior a la siguiente fila
    for (let i = -1; i <= 1; i++) {
        //recorre desde la anterior a la siguiente columna
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;//se salta la casilla que llega, sólo comprobará las adyacentes

            //se mueve por las casillas que rodean a (posX,posY)
            let x = posX + i;
            let y = posY + j;

            if (x >= 0 && x < size && y >= 0 && y < size && tablero[x][y] === "*") { //si se sale del tablero, no entra
                total++;//acumula los *
            }
        }
    }
    return total;
}

function generaAdyacentes(tablero) {//rellena las casillas que rodean a las minas
    let size = tablero.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (tablero[i][j] !== "*") {
                //acumula cuántas minas hay
                tablero[i][j] = contarMinasAdyacentes(tablero, i, j); //el valor de la casilla es el total de minas adyacentes
            }
        }
    }
}

//hace lo que dice
function mostrarTablero(tableroVisible) {
    console.table(tableroVisible);
}
function compruebaAdyacentes(tableroReal, tableroVisible, posX, posY) {
    let size = tableroReal.length;
    //comprueba los límites del tablero
    if (posX < 0 || posX >= size || posY < 0 || posY >= size) return;
    //comprueba si ya se ha elegido
    if (tableroVisible[posX][posY] !== "X") return;

    //se altera el tablero visible
    let valor = tableroReal[posX][posY]; //coge el valor de la casilla elegida
    tableroVisible[posX][posY] = valor;//lo asigna al tablero visible en la misma pos

    //si es una casilla vacía (0) revela las adyacentes
    if (valor === 0) {
        //recorre desde la anterior a la siguiente fila
        for (let i = -1; i <= 1; i++) {
            //recorre desde la anterior a la siguiente columna
            for (let j = -1; j <= 1; j++) {
                if (i !== 0 || j !== 0) {//se salta la casilla actual
                    //se llama a sí misma, pero con las posiciones que rodean a la casilla en cuestión
                    compruebaAdyacentes(tableroReal, tableroVisible, posX + i, posY + j);
                }
            }
        }
    }
}

function victoria(tableroReal, tableroVisible) {
    let size = tableroReal.length;

    //recorre tó el tablero
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            //si hay alguna mina descubierta o casillas sin elegir, aún no has ganado
            if (tableroReal[i][j] !== "*" && tableroVisible[i][j] === "X") {
                return false;
            }
        }
    }
    return true;//has ganado
}



function buscaminas() {
    let size = pideSizeTablero(); //crea matriz simétrica con tamaño deseado

    //coordenadas
    let posX;
    let posY;

    //número proporcional de minaas
    let numMinas = Math.floor(size * size * 0.2);
    alert(`Se colocarán ${numMinas} minas.`);

    //el tablero que no se muestra
    let tableroReal = creaTablero(size);

    //posiciona las minas aleatoriamente
    colocaMinas(tableroReal, numMinas);
    //pone los números adyacentes a las minas
    generaAdyacentes(tableroReal);

    //tablero que se mostrará
    let tableroVisible = creaTablero(size);
    let fin = false;//condición de victoria/derrota

    while (!fin) {
        mostrarTablero(tableroVisible);
        //pide coordenadas
        posX = pideCoordenada("X", size);
        posY = pideCoordenada("Y", size);
        console.log(`Última casilla: (${posX},${posY})`);
        console.clear();//va limpiando

        //si cae en una mina
        if (tableroReal[posX][posY] === "*") {
            alert("¡BOOM! Has perdido.");
            mostrarTablero(tableroReal);
            fin = true; //pierdes
            break;//termina
        } else {
            //si lo que elige no es una mina
            compruebaAdyacentes(tableroReal, tableroVisible, posX, posY);

            //comprueba victoria en cada turno
            if (victoria(tableroReal, tableroVisible)) {
                console.log(`Última casilla: (${posX},${posY})`);
                alert("Enhorabuena, has ganado!");
                fin = true;//ganas
            }
        }

    }
}