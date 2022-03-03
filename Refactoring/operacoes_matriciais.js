
//================================== CLASSES ================================== 
    
    class Matriz{
        constructor(rows, cols){
            this.rows = rows;
            this.cols = cols;

            let matriz = [rows];
            
            for(var i = 0; i < rows; i++){
                matriz[i] = [cols];
            }

            this.matriz = matriz;
        }

        getN(){
            return this.rows;
        }
        
        getM(){
            return this.cols;
        }

    }

    /*class Termo{
        constructor(i, j){
            this.i = i;
            this.j = j;
        }

        getI(){
            return i;
        }
        
        getJ(){
            return j;
        }

    }*/

//================================== /CLASSES ==================================

//================================== BUBBLE SORT ==================================

    let bubbleSort = (matriz, termosInd) => {
        let k = matriz.matriz.length;
        var aux;
        for (let i = 0; i < (k - 1); i++) {
            for (let j = 0; j < (k - 1); j++) {
                if (matriz.matriz[j][0] < matriz.matriz[j + 1][0]) {
                    aux = matriz.matriz[j];
                    matriz.matriz[j] = matriz.matriz[j + 1];
                    matriz.matriz[j + 1] = aux;
                    aux = termosInd[j];
                    termosInd[j] = termosInd[j + 1];
                    termosInd[j + 1] = aux;
                }
            }
        }
    }

//================================== /BUBBLE SORT ==================================

//================================== FUNÇÃO MULTIPLICA e SOMA VETOR ==================================

    function multVetor(vetor, mult){
        for (let i = 0; i < vetor.length; i++) {
            vetor[i] = vetor[i] * mult;
        }
    }

    function subVetor(vetor1, vetor2, mult) {
        for (let i = 0; i < vetor1.length; i++) {
            vetor1[i] -= (vetor2[i] * mult);
        }
    }

//================================== /FUNÇÃO MULTIPLICA e SOMA VETOR ==================================

//================================== FUNÇÃO PARA CRIAR UMA MATRIZ ==================================

    function createMatriz(){
        let linhas = parseInt(prompt("Quantas linhas terá a matriz?"));
        let colunas = parseInt(prompt("Quantas colunas terá a matriz?"));

        var matriz = new Matriz(linhas, colunas);

        console.log(matriz);

        for(let i = 0; i < matriz.getN(); i++){
            for (let j = 0; j < matriz.getM(); j++) {
                let termo = parseInt(prompt("Qual o valor do termo " + (i + 1) + (j + 1)+ ":"));
                matriz.matriz[i][j] = termo;
            }
        }
        console.log(matriz);

        return matriz;
    }

//================================== /FUNÇÃO PARA CRIAR UMA MATRIZ ==================================


//================================== FUNÇÃO PARA TRANSFORMAR MATRIZ EM UMA TABLE HTML ==================================
    let tabela = document.getElementById("tabela");

    console.log(tabela);
    
    function writeMatriz(matriz) {

        let table = document.createElement('table');

        for (let i = 0; i < matriz.getN(); i++) {

            let tr = document.createElement('tr');

            for (let j = 0; j < matriz.getM(); j++) {
                var td = document.createElement('td')
                var data = document.createTextNode(matriz.matriz[i][j]);

                td.appendChild(data);

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        console.log(table);
        document.getElementById('matrizArea').appendChild(table);
    }

//================================== /FUNÇÃO PARA TRANSFORMAR MATRIZ EM UMA TABLE HTML ==================================

//================================== SOMA ENTRE DUAS MATRIZES ==================================

    function somaMatriz(matriz1, matriz2) {

        if(matriz1.getN() != matriz2.getN() || matriz1.getM() != matriz2.getM()){
            alert("Essa operação não pode ser realizada! (As matrizes devem ter a mesma ordem)");
            return(null);
        } else {

            var matriz = new Matriz(matriz1.getN(), matriz1.getM());

            console.log(matriz);
    
            for(let i = 0; i < matriz.getN(); i++){
                for (let j = 0; j < matriz.getM(); j++) {
                    let termo = matriz1.matriz[i][j] + matriz2.matriz[i][j];
                    matriz.matriz[i][j] = termo;
                }
            }
            console.log(matriz);
    
        }
        return(matriz);

    }

//================================== /SOMA ENTRE DUAS MATRIZES ==================================

//================================== MULTIPLICAÇÃO POR ESCALAR ==================================

    function multEscalar(matriz1, matriz2) {
        if (matriz1.getM() != matriz2.getN()) {
            alert("Essa operação não pode ser realizada! (colunas da Matriz1 é diferente do número de linhas da Matriz2)");
            return null;
        } else {

            var matriz = new Matriz(matriz1.getN(), matriz2.getM());
            let termo;

            for (let i = 0; i < matriz1.getN(); i++) {
                for (let j = 0; j < matriz2.getM(); j++) {
                    termo = 0;
                    for (let k = 0; k < matriz2.getN(); k++) {
                        termo += matriz1.matriz[i][k] * matriz2.matriz[k][j];
                    }
                    matriz.matriz[i][j] = termo;
                }
            }
            return matriz;
        }
    }

//================================== /MULTIPLICAÇÃO POR ESCALAR ==================================

//================================== MULTIPLICAÇÃO TERMO A TERMO ==================================

function multTermo(matriz1, matriz2) {
    if (matriz1.getM() != matriz2.getM() || matriz1.getN() != matriz2.getN()) {
        alert("Essa operação não pode ser realizada! (As matrizes devem ter a mesma ordem)");
    } else {

        var matriz = new Matriz(matriz1.getN(), matriz1.getM());

        console.log(matriz);

        for(let i = 0; i < matriz.getN(); i++){
            for (let j = 0; j < matriz.getM(); j++) {
                let termo = matriz1.matriz[i][j] * matriz2.matriz[i][j];
                matriz.matriz[i][j] = termo;
            }
        }
        console.log(matriz);

    }
}

//================================== /MULTIPLICAÇÃO TERMO A TERMO ==================================

//================================== ELIMINAÇÃO GAUSSIANA ==================================

    /*function gauss(matriz){
        if(matriz.getN() != matriz.getM()) {
            alert("Essa operação não pode ser realizada! (As matrizes devem ser quadradas)");
            return null;
        } else {

            // IMPLEMENTAR MATRIZ DOS RESULTADOS

            bubbleSort(matriz);
            let pivo;
            let j = 0;
            for (let i = 0; i < matriz.getN(); i++) {
                    pivo = matriz.matriz[i][j];
                    if(pivo == 0){
                        j++;
                    }
                    if (pivo == undefined){
                        return matriz;
                    } else {
                        if(pivo != 1){
                            multVetor(matriz.matriz[i], 1/pivo);
                        }                            
                        for (let k = (matriz.getN() - 1); k > 0; k--) {
                            if(matriz.matriz[k][i] != 0){
                                subVetor(matriz.matriz[k], matriz.matriz[i], matriz.matriz[k][i]);
                            }
                        }
                    }
                    j++;
            }
                

            return matriz;
        }
    }*/

    function gaussSolver(matriz){

        var b = [];

        for (let x = 0; x < matriz.getN(); x++) {
            b[x] = parseInt(prompt('Digite o ' + (x + 1) + 'º termo independente:'));
        }

        bubbleSort(matriz, b);

        var i, j, k, l, m;
        //ETAPA DE ESCALONAMENTO
        for(k = 0; k < matriz.getN() - 1; k++){
            //Se A[k][k] é zero, então a matriz dos coeficiente é singular
            //det A = 0
            if(matriz.matriz[k][k] == 0){
                document.write("A = 0");
                return null;
            }else{
                for(m = k + 1; m < matriz.getN(); m++){ //laço para zerar o que estiver em baixo do pivô
                    if(matriz.matriz[k][k] != 1)
                        multVetor(matriz.matriz[k], 1/matriz.matriz[k][k]);
                    var F = -matriz.matriz[m][k] / matriz.matriz[k][k];
                    matriz.matriz[m][k] = 0; //evita uma iteração
                    b[m] = b[m] + F * b[k];
                    for(l = k + 1; l < matriz.getN(); l++){
                        matriz.matriz[m][l] = matriz.matriz[m][l] + F * matriz.matriz[k][l];
                    }
                }
            }
        }
        //ETAPA DE RESOLUÇÃO DO SISTEMA
        var X = [];
        for(i = matriz.getN() - 1; i >= 0; i--){
            X[i] = b[i];
            for(j = i + 1; j < matriz.getN(); j++){
                X[i] = X[i] - X[j] * matriz.matriz[i][j];
            }
            X[i] = X[i] / matriz.matriz[i][i];
        }
        console.log(matriz);
        console.log(X);
        return X;
    }

//================================== /ELIMINAÇÃO GAUSSIANA ==================================

//================================== FUNÇÃO DO BOTÃO ==================================

    function selectOperation(){
        let select = parseInt(prompt("Escolha a operação que você deseja fazer:\n1- Soma entre matrizes;\n2- Multiplicação por escalar;\n3- Multiplicação termo a termo;\n4- Eliminação Gaussiana;"))
    
        switch(select){

            case 1:

                let soma = somaMatriz(createMatriz(), createMatriz());
                document.getElementById('matrizArea').appendChild(writeMatriz(soma));

            break;

            case 2:

                let mult_escalar = multEscalar(createMatriz(), createMatriz());
                document.getElementById('matrizArea').appendChild(writeMatriz(mult_escalar));

            break;

            case 3:

                let mult_termo = multTermo(createMatriz(), createMatriz());
                document.getElementById('matrizArea').appendChild(writeMatriz(mult_termo));

            break;

            case 4:

                var teste = new Matriz(3, 3);
                teste.matriz = [[1, 0, 3], [2, -4, 0], [3, -2, -5]];
                //termos independentes para teste: -8, -4, 26
                document.getElementById('matrizArea').appendChild(writeMatriz(gaussSolver(teste)));

            break;
        }
    }